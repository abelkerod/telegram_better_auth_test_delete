import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { StrictMode } from "react"
import ReactDOM from "react-dom/client"

import { ThemeProvider } from "./components/custom/theme-provider"
import { routeTree } from "./routeTree.gen"
import "./styles.css"

//  Create a fresh React-Query client + tiny helper component
const queryClient = new QueryClient()

// eslint-disable-next-line react-refresh/only-export-components
function QueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

// Build the TanStack Router with the Query client in context
const router = createRouter({
  routeTree,
  context: { queryClient }, // injected into every loader / beforeLoad
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register router for type-safe navigation
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById("app")
if (rootElement && !rootElement.innerHTML) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <ThemeProvider defaultTheme="light" storageKey="zemen-bus">
        <QueryProvider>
          <RouterProvider router={router} />
        </QueryProvider>
      </ThemeProvider>
    </StrictMode>,
  )
}
