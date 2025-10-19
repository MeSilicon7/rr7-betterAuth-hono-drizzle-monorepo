import { authClient } from "~/lib/auth-client";

export default function BetterAuth() {
  return (
    <div>
      {/* Login with github */}
      <button 
      onClick={() => {
                    authClient.signIn.social({
                      provider: "github",
                      callbackURL: "http://localhost:5173/protected",
                      // errorCallbackURL: "/error-login",
                      // newUserCallbackURL: "/welcome-new-user",
                    });
                  }}
                >Login with GitHub</button>
    </div>
  );
}