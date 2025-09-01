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
          requiredRoles: ["owner", "tenant"],
        },
        {
          title: "Properties",
          url: "/",
          icon: Building2,
          badge: "12",
          requiredRoles: ["owner", "admin"],
        },
        {
          title: "Settings",
          url: "/",
          icon: Settings,
          requiredRoles: ["owner", "tenant"],
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
          requiredRoles: ["owner", "admin"],
        },
        {
          title: "Payments",
          url: "/",
          icon: CreditCard,
          requiredRoles: ["owner", "admin"],
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
          requiredRoles: ["owner", "admin"],
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
          requiredRoles: ["superadmin"],
        },
      ],
    },
  ],
}
