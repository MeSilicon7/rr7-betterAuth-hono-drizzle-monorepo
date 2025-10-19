import { createAuthClient } from "better-auth/react"


export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    // advanced: {
    //     cookies: {
    //         sessionToken: {
    //             attributes: {
    //                 sameSite: "none",
    //                 secure: true,
    //                 partitioned: true // New browser standards will mandate this for foreign cookies
    //             }
    //         }
    //     },
    //     crossSubDomainCookies: {
    //         enabled: true
    //     }
    // },
    baseURL: "http://localhost:8787"
})