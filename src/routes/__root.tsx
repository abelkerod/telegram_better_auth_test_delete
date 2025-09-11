import type { QueryClient } from "@tanstack/react-query"
import { TanstackDevtools } from "@tanstack/react-devtools"
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools"

import { createRootRouteWithContext, Outlet, redirect } from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"

import { Toaster } from "@/components/ui/sonner"
import { env } from "@/env"
import { Unauthenticated } from "@/features/auth/components/Unauthenticated"
import { getSession } from "@/lib/auth-client"
import Header from "../components/Header"

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async ({ location }) => {
    const session = await getSession()
    const ON_LANDING_PAGE = location.pathname === "/"
    if (session.data && ON_LANDING_PAGE) {
      throw redirect({ to: "/dashboard" })
    }
  },
  component: () => (
    <main className="flex flex-col min-h-screen w-full overflow-hidden">
      <Toaster position="top-center" richColors />

      <div className="w-2/3 mx-auto bg-red-200">
        <Unauthenticated>
          <Header />
        </Unauthenticated>
      </div>
      <section className="flex-1 w-full">
        <Outlet />
      </section>

      {/* devtools only in dev */}
      {env.VITE_NODE_ENV === "development" && (
        <TanstackDevtools
          config={{ position: "bottom-left" }}
          plugins={[
            { name: "Tanstack Router", render: <TanStackRouterDevtoolsPanel /> },
            { name: "Tanstack Query", render: <ReactQueryDevtoolsPanel /> },
          ]}
        />
      )}
    </main>
  ),
})
