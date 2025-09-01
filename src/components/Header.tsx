import { Link, useNavigate } from "@tanstack/react-router"
import { Authenticated } from "@/features/auth/components/Authenticated"
import { Unauthenticated } from "@/features/auth/components/Unauthenticated"

import { signOut } from "@/lib/auth-client"
import { Button } from "../components/ui/button"

export default function Header() {
  const navigate = useNavigate()

  return (
    <nav className="flex flex-row w-full justify-between p-4 ">
      <div className="flex">
        <div className="px-2 font-bold">
          <Link to="/">LOGO</Link>
        </div>
      </div>

      <div className="flex">
        <div className="px-2 font-bold">
          <Link to="/demo/form/simple">Simple Form</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/form/address">Address Form</Link>
        </div>
        <div className="px-2 font-bold">
          <Link to="/demo/table">TanStack Table</Link>
        </div>
      </div>

      <div className="flex">
        <Unauthenticated>
          <Button onClick={() => navigate({ to: "/auth", search: prev => ({ ...prev, mode: "login" }) })} size="lg">
            Sign In
          </Button>

        </Unauthenticated>
        <Authenticated>
          <Button onClick={() => signOut()} size="lg">
            Sign Out
          </Button>
        </Authenticated>
      </div>
    </nav>
  )
}
