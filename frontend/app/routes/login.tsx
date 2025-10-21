import type { Route } from "./+types/login";

import { getAuthClient } from "~/lib/auth-client";


export async function loader({ context }: Route.LoaderArgs) {
  return { backend_url: context.cloudflare.env.BACKEND_URL,
          frontend_url: context.cloudflare.env.FRONTEND_URL
   };
}

export default function BetterAuth({loaderData} : Route.ComponentProps) {
  console.log("Loader Data:", loaderData.backend_url);
  const authClient = getAuthClient(loaderData.backend_url);

  return (
    <div>
      {/* Login with github */}
      <button 
      onClick={() => {
                    authClient.signIn.social({
                      provider: "github",
                      callbackURL: loaderData.frontend_url + "/protected",
                      errorCallbackURL: loaderData.frontend_url + "/error-login",
                      newUserCallbackURL: loaderData.frontend_url + "/welcome-new-user",
                    });
                  }}
                >Login with GitHub</button>
    </div>
  );
}