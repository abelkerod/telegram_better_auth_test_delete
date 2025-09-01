import { Home, Building2, Users, Settings, Shield, CreditCard, FileText  } from "lucide-react";
import type { SidebarData } from "./types";

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
  ],
};
