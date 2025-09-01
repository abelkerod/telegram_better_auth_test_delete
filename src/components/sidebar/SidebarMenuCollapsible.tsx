"use client";

import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useSidebar, SidebarMenuItem, SidebarMenuButton, SidebarMenuBadge, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from "@/components/ui/sidebar";
import type { NavCollapsible } from "./types";
import { checkIsActive, getCookie } from "./utils";

interface SidebarMenuCollapsibleProps {
  item: NavCollapsible;
  href: string;
}

// For rendering a toggleable sub-menu.
export function SidebarMenuCollapsible({ item, href }: SidebarMenuCollapsibleProps) {
  const { setOpenMobile } = useSidebar();
  const cookieKey = `sidebar_submenu_${item.title.replace(/\s+/g, '_')}`;

  const getInitialOpenState = () => {
    switch (item.collapseMode) {
      case 'expanded': return true;
      case 'collapsed': return false;
      case 'persisted':
        const cookieValue = getCookie(cookieKey);
        return cookieValue ? cookieValue === 'true' : checkIsActive(href, item, true);
      default:
        return checkIsActive(href, item, true);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (item.collapseMode === 'persisted') {
      document.cookie = `${cookieKey}=${isOpen}; path=/; max-age=31536000`;
    }
  };

  return (
    <Collapsible asChild defaultOpen={getInitialOpenState()} onOpenChange={handleOpenChange} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild isActive={checkIsActive(href, subItem)}>
                  <Link to={subItem.url} onClick={() => setOpenMobile(false)}>
                    {subItem.icon && <subItem.icon />}
                    <span>{subItem.title}</span>
                    {subItem.badge && <SidebarMenuBadge>{subItem.badge}</SidebarMenuBadge>}
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
