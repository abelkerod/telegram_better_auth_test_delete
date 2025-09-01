import { useLocation } from "@tanstack/react-router";
import { useSidebar, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from "@/components/ui/sidebar";
import { SidebarMenuCollapsedDropdown } from "./SidebarMenuCollapsedDropdown";
import { SidebarMenuGroupStatic } from "./SidebarMenuGroupStatic";
import { SidebarMenuCollapsible } from "./SidebarMenuCollapsible";
import type { NavCollapsible, NavGroupType, NavLink } from "./types";
import { SidebarMenuLink } from "./SidebarMenuLink";

export function NavGroup({ title, items }: NavGroupType) {
  const { state } = useSidebar();
  const href = useLocation({ select: (location) => location.href });

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const key = `${item.title}-${"url" in item ? item.url : item.items[0].url}`;

            if (!item.items) {
              return <SidebarMenuLink key={key} item={item as NavLink} href={href} />;
            }

            const navCollapsibleItem = item as NavCollapsible;

            if (state === "collapsed") {
              return <SidebarMenuCollapsedDropdown key={key} item={navCollapsibleItem} href={href} />;
            }

            if (navCollapsibleItem.collapseMode === 'static') {
              return <SidebarMenuGroupStatic key={key} item={navCollapsibleItem} href={href} />;
            }

            return <SidebarMenuCollapsible key={key} item={navCollapsibleItem} href={href} />;
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
