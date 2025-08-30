import type { QueryClient } from "@tanstack/react-query"
import { TanstackDevtools } from "@tanstack/react-devtools"
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools"

import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"

import { env } from "@/env"
import Header from "../components/Header"

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <main className="flex flex-col min-h-screen w-full overflow-hidden">
      <div className="w-2/3 mx-auto bg-red-200">
        <Header />
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
