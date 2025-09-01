import { Link } from "@tanstack/react-router";
import { useSidebar, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, SidebarMenuBadge } from "@/components/ui/sidebar";
import type { NavCollapsible } from "./types";
import { checkIsActive } from "./utils";

interface SidebarMenuGroupStaticProps {
  item: NavCollapsible;
  href: string;
}

// For rendering a non - collapsible group of links.
export function SidebarMenuGroupStatic({ item, href }: SidebarMenuGroupStaticProps) {
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarMenuItem className="flex flex-col items-start">
      <SidebarMenuButton tooltip={item.title} className="w-full justify-start font-semibold text-sidebar-foreground">
        {item.icon && <item.icon />}
        <span>{item.title}</span>
      </SidebarMenuButton>
      <SidebarMenuSub className="w-full">
        {item.items.map((subItem) => (
          <SidebarMenuSubItem key={subItem.title} className="w-full">
            <SidebarMenuSubButton asChild isActive={checkIsActive(href, subItem)}>
              <Link to={subItem.url} onClick={() => setOpenMobile(false)}>
                <span>{subItem.title}</span>
                {subItem.badge && <SidebarMenuBadge>{subItem.badge}</SidebarMenuBadge>}
              </Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        ))}
      </SidebarMenuSub>
    </SidebarMenuItem>
  );
}
