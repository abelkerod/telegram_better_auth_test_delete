import type { Role } from "@backend/lib/auth/permissions"
import type { LinkProps } from "@tanstack/react-router"

// Base interface for all navigation items
interface BaseNavItem {
  title: string
  badge?: string
  icon?: React.ElementType
  requiredRoles: Role[]
}

// A simple navigation link
export type NavLink = BaseNavItem & {
  url: LinkProps["to"]
  items?: never
}

// A navigation item that contains sub-items
export type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: LinkProps["to"] })[]
  url?: never
  // The single, unified property for collapse behavior
  collapseMode?: "static" | "expanded" | "collapsed" | "persisted"
}

// A union type for any kind of navigation item
export type NavItem = NavCollapsible | NavLink

// Defines a group of navigation items with a title
export interface NavGroupType {
  title: string
  items: NavItem[]
}

// The top-level structure for all sidebar data
export interface SidebarData {
  navGroups: NavGroupType[]
}
