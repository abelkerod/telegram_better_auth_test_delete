import type { SidebarData } from "./types"
import { Building2, CreditCard, FileText, Home, Settings, Shield, Users } from "lucide-react"

export const sidebarData: SidebarData = {
  navGroups: [
    /* ── 1. General (static open) ─────────────────────────────── */
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          url: "/",
          icon: Home,
          requiredRoles: ["user"],
        },
        {
          title: "Properties",
          url: "/",
          icon: Building2,
          badge: "12",
          requiredRoles: ["user"],
        },
        {
          title: "Settings",
          url: "/",
          icon: Settings,
          requiredRoles: ["user"],
        },
      ],
    },

    /* ── 2. Finance (starts collapsed, remembers state) ───────── */
    {
      title: "Finance",
      items: [
        {
          title: "Invoices",
          url: "/",
          icon: FileText,
          badge: "3 new",
          requiredRoles: ["user"],
        },
        {
          title: "Payments",
          url: "/",
          icon: CreditCard,
          requiredRoles: ["user"],
        },
      ],
    },

    /* ── 3. Users (forced expanded) ───────────────────────────── */
    {
      title: "Users & Permissions",
      items: [
        {
          title: "Tenants",
          url: "/",
          icon: Users,
          requiredRoles: ["user"],
        },
        {
          title: "Admins",
          url: "/",
          icon: Shield,
          badge: "5",
          requiredRoles: ["owner"],
        },
      ],
    },
    /* ── 4. Organizations (for superadmin) ───────────────────────── */
    {
      title: "Organizations",
      items: [
        {
          title: "Manage Organizations",
          url: "/",
          icon: Building2,
          requiredRoles: ["superAdmin"],
        },
      ],
    },
  ],
}
