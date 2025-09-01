import { Link } from "@tanstack/react-router";
import { useSidebar, SidebarMenuItem, SidebarMenuButton, SidebarMenuBadge } from "@/components/ui/sidebar";
import type { NavLink } from "./types";

interface SidebarMenuLinkProps {
  item: NavLink;
  href: string;
}

// For rendering a simple navigation link.
export function SidebarMenuLink({ item, href }: SidebarMenuLinkProps) {
  const { setOpenMobile } = useSidebar();
  const isActive = "url" in item && item.url === href;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={item.title}
      >
        <Link to={item.url} onClick={() => setOpenMobile(false)}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
          {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
