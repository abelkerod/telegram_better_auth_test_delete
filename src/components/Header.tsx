import { Link } from "@tanstack/react-router"

export default function Header() {
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
        <div className="px-2 font-bold">
          <Link to="/demo/tanstack-query">TanStack Query</Link>
        </div>
      </div>
    </nav>
  )
}
