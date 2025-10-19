import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createDBClient } from "../db/create-db-client";


// @ts-ignore
export const createAuth = ({databaseUrl, github_client_id, github_client_secret, secret}) => {
  return betterAuth({
    database: drizzleAdapter(createDBClient(databaseUrl), {
      provider: "pg",
    }),
    socialProviders: {
      github: {
        clientId: github_client_id,
        clientSecret: github_client_secret,
      },
    },
    // baseURL: "http://localhost:5173", // Base URL of your app
    trustedOrigins: ["http://localhost:5173"], // Trusted origins for CORS
    secret: secret , // Replace with a strong secret in production
  });
};
