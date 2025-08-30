import type { AppType } from "@backend/app"
import { hc } from "hono/client"
import { env } from "@/env"

const client = hc<AppType>(env.VITE_BACKEND_URL, {
  fetch: ((input, init) => {
    return fetch(input, {
      ...init,
      credentials: "include",
    })
  }) satisfies typeof fetch,
})
export default client
