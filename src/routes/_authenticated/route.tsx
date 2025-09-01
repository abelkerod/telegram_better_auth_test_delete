import { createFileRoute, Outlet } from "@tanstack/react-router"
import Cookies from "js-cookie"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Authenticated } from "@/features/auth/components/Authenticated"
import { cn } from "@/lib/utils"

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
  beforeLoad: () => {
  },
})

function AuthenticatedLayout() {
  const defaultOpen = Cookies.get("sidebar:state") !== "false"
  return (
    <Authenticated>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarTrigger
          className={cn(
            "fixed bottom-6 right-6 z-30 h-11 w-11 rounded-full md:hidden",
            "bg-primary text-primary-foreground shadow-lg",
            "hover:bg-primary/90 active:scale-95",
            "focus-visible:ring-2 focus-visible:ring-ring",
          )}
        />
        <div
          id="content"
          className={cn(
            "ml-auto w-full max-w-full pt-3 px-4 md:px-1",
            "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
            "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
            "transition-[width] duration-200 ease-linear",
            "flex h-svh flex-col",
            "group-data-[scroll-locked=1]/body:h-full",
            "group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh",
          )}
        >
          <Outlet />
        </div>
      </SidebarProvider>
    </Authenticated>
  )
}
