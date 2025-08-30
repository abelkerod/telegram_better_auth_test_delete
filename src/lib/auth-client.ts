import { adminClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import { env } from "@/env"

const authClient = createAuthClient({
  baseURL: env.VITE_BACKEND_URL,
  plugins: [
    adminClient(),
  ],
})

export const { useSession, signIn, signOut, signUp, getSession } = authClient
export default authClient
