import type { AppType } from "@backend/app"
import { hc } from "hono/client"

const client = hc<AppType>("http://localhost:9090", {
  fetch: ((input, init) => {
    return fetch(input, {
      ...init,
      credentials: "include",
    })
  }) satisfies typeof fetch,
})
export default client
