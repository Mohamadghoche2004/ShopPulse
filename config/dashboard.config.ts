/**
 * USpotLeb Dashboard Configuration
 *
 * Edit this file to customize brand, theme, navigation, and dashboard cards.
 * All generated components read from this single source of truth.
 */

export type ThemeMode = "light" | "dark" | "system";

export type SidebarIcon =
  | "home"
  | "users"
  | "settings"
  | "chart"
  | "billing"
  | "help"
  | "file"
  | "bell";

export interface SidebarItem {
  title: string;
  href: string;
  icon: SidebarIcon;
  /** Optional badge text shown next to the label */
  badge?: string;
}

export interface StatCardConfig {
  title: string;
  key: string;
  /** Lucide icon name hint for StatCard */
  icon?: SidebarIcon;
}

export interface DashboardConfig {
  brand: {
    name: string;
    logo: string;
  };
  theme: {
    mode: ThemeMode;
    primary: string;
  };
  sidebar: SidebarItem[];
  cards: StatCardConfig[];
}

export const dashboardConfig: DashboardConfig = {
  brand: {
    name: "USpotLeb",
    logo: "/logo.svg",
  },

  theme: {
    mode: "light",
    primary: "#2563eb",
  },

  sidebar: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "home",
    },
    {
      title: "Users",
      href: "/users",
      icon: "users",
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: "chart",
    },
    {
      title: "Billing",
      href: "/billing",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/settings",
      icon: "settings",
    },
  ],

  cards: [
    {
      title: "Total Users",
      key: "users",
      icon: "users",
    },
    {
      title: "Revenue",
      key: "revenue",
      icon: "billing",
    },
    {
      title: "Active Sessions",
      key: "sessions",
      icon: "chart",
    },
    {
      title: "Conversion",
      key: "conversion",
      icon: "file",
    },
  ],
};
