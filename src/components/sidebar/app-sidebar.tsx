import type { Role } from "@backend/lib/auth/permissions"
import { useMemo } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { ProfileDropdown } from "@/features/auth/components/profile-dropdown"
import authClient, { useSession } from "@/lib/auth-client.ts" // Corrected import source for useSession
import { NavGroup } from "./nav-group"
import { sidebarData } from "./sidebar-data.ts"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()

  const { data: session, isPending: isSessionLoading, error: sessionError } = useSession()
  const { data: activeMember, isPending: isActiveMemberLoading, error: activeMemberError } = authClient.useActiveMember()

  const isLoading = isSessionLoading || isActiveMemberLoading
  const error = sessionError || activeMemberError

  const filteredNavGroups = useMemo(() => {
    if (isLoading || !session) {
      return { navGroups: [] }
    }

    const systemRole = session?.user?.role
    const organizationRole = activeMember?.role

    return {
      navGroups: sidebarData.navGroups
        .map(group => ({
          ...group,
          items: group.items.filter((item) => {
            const hasSystemRole = systemRole && item.requiredRoles.includes(systemRole as Role)
            const hasOrgRole = organizationRole && item.requiredRoles.includes(organizationRole as Role)
            return hasSystemRole || hasOrgRole
          }),
        }))
        .filter(group => group.items.length > 0),
    }
  }, [isLoading, session, activeMember])

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <div
          className={`flex items-center w-full px-4 ${state === "collapsed" ? "justify-center" : "justify-start"}`}
        >
          <h3 className="text-lg font-semibold">
            {state === "collapsed" ? "R" : "RCS"}
          </h3>
        </div>
        <hr className="w-full border-border" />
      </SidebarHeader>

      <SidebarRail />

      <SidebarContent>
        {isLoading && (
          <div className="p-4 text-muted-foreground">Loading navigation...</div>
        )}

        {error && (
          <div className="p-4 text-destructive">Failed to load navigation.</div>
        )}

        {!isLoading && !error && session && (
          filteredNavGroups.navGroups.map(group => (
            <NavGroup
              key={group.title}
              title={group.title}
              items={group.items}
            />
          ))
        )}
      </SidebarContent>

      <hr className="w-full border-border" />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <ProfileDropdown />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
