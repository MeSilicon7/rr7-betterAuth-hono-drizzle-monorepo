import { authClient } from "~/lib/auth-client"

export default function Protected() {

const { data: session, isPending, error } = authClient.useSession();

if(error){
  return(
    <>
      something wrong happend
    </>
  )
}

if(isPending){
  return(
    <>
      Pending
    </>
  )
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

  const logout = () => {
    authClient.signOut({});
    window.location.href = "/"; // Redirect to home or login page after logout
  }

  const fetchProtectedData = async () => {
    try {
      const response = await fetch('http://localhost:8787/api/protected', {
        method: 'GET',
        credentials: 'include', // Important to include cookies
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Protected data:', data);
    } catch (error) {
      console.error('Failed to fetch protected data:', error);
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