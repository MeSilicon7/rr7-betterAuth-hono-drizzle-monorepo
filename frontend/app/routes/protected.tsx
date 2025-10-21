import type { Route } from "./+types/protected";
import { useState } from "react";
import { getAuthClient } from "~/lib/auth-client";

export async function loader({ context }: Route.LoaderArgs) {
  return {
    backend_url: context.cloudflare.env.BACKEND_URL,
  };
}

export default function Protected({ loaderData }: Route.ComponentProps) {
  console.log("Loader Data:", loaderData.backend_url);

  // Use useState with lazy initialization to create authClient only once
  const [authClient] = useState(() => getAuthClient(loaderData.backend_url));

  const { data: session, isPending, error } = authClient.useSession();

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>Something went wrong: {error.message || "Unknown error"}</p>
      </div>
    );
  }

  if (isPending) {
    return <>Pending</>;
  }
  if (!session) {
    // If no session, user is not logged in
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You must be logged in to view this page.</p>
        <a href="/login">Go to Login</a>
      </div>
    );
  }

  const logout = async () => {
    try {
      await authClient.signOut({}); // Fix: Await the async operation
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const fetchProtectedData = async () => {
    try {
      // Fix: Use dynamic backend URL instead of hardcoded localhost
      const response = await fetch(`${loaderData.backend_url}/api/protected`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Protected data:", data);
    } catch (error) {
      console.error("Failed to fetch protected data:", error);
    }
  };

  return (
    <div>
      <h1>Protected Page</h1>
      <p>You have successfully logged in!</p>
      <button onClick={logout}>Logout</button>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <button onClick={fetchProtectedData}>Fetch Protected Data</button>
    </div>
  );
}
