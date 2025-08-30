import type { ReactNode } from "react"
import { useSession } from "@/lib/auth-client"

export function Authenticated({ children }: { children: ReactNode }) {
  const { data } = useSession()
  return data ? children : null
}
