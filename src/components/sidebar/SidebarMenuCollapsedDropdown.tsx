import type { NavCollapsible } from "./types"
import { Link } from "@tanstack/react-router"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { checkIsActive } from "./utils"

interface SidebarMenuCollapsedDropdownProps {
  item: NavCollapsible
  href: string
}

// For rendering the dropdown in icon-only mode.
export function SidebarMenuCollapsedDropdown({ item, href }: SidebarMenuCollapsedDropdownProps) {
  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton tooltip={item.title} isActive={checkIsActive(href, item, true)}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start" sideOffset={4}>
          <DropdownMenuLabel>
            {item.title}
            {" "}
            {item.badge && `(${item.badge})`}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {item.items.map(sub => (
            <DropdownMenuItem key={`${sub.title}-${sub.url}`} asChild>
              <Link to={sub.url} className={cn(checkIsActive(href, sub) && "bg-secondary")}>
                {sub.icon && <sub.icon className="mr-2 h-4 w-4" />}
                <span className="max-w-52 text-wrap">{sub.title}</span>
                {sub.badge && <span className="ml-auto text-xs">{sub.badge}</span>}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}
