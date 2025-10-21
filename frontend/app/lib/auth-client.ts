import { createAuthClient } from "better-auth/react"



export const getAuthClient = (server_url: string): ReturnType<typeof createAuthClient> =>
	createAuthClient({
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
		baseURL: server_url
	})

