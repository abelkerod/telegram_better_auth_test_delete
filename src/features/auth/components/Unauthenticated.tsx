import type { ReactNode } from "react"
import { useSession } from "@/lib/auth-client"

export function Unauthenticated({ children }: { children: ReactNode }) {
  const { data, isPending } = useSession()
  return !data && !isPending ? children : null
}
