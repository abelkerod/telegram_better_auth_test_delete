import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { sidebarData } from "./sidebar-data.ts";

import { NavGroup } from "./nav-group";
import { ProfileDropdown } from "@/features/auth/components/profile-dropdown";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // TODO: Implement user roles logic
  const filteredNavGroups = {
    navGroups: sidebarData.navGroups.map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.requiredRoles.includes("owner")
      ),
    })).filter((group) => group.items.length > 0),
  };

  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <div
          className={`flex items-center  w-full px-4 ${state === 'collapsed' ? 'justify-center' : 'justify-start'
            }`}
        >
          <h3 className="text-lg font-semibold">
            {state === 'collapsed' ? 'R' : 'RCS'}
          </h3>
        </div>

        <hr className="w-full border-border" />
      </SidebarHeader>
      <SidebarRail />
      <SidebarContent>
        {filteredNavGroups.navGroups.map((group) => (
          <NavGroup
            key={group.title}
            title={group.title}
            items={group.items}
          />
        ))}
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
  );
}
