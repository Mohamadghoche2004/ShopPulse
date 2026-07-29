"use client";

import { useMemo, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { MobileSidebar } from "./MobileSidebar";
import { Header } from "./Header";
import { dashboardConfig } from "@/config/dashboard.config";
import { cn } from "@/lib/dashboard-utils";

export interface DashboardShellProps {
  children: ReactNode;
  /** Optional override — defaults to the active sidebar item title */
  title?: string;
  className?: string;
}

/**
 * App chrome: sidebar + header + main.
 * Mount once from the dashboard route-group layout — pages only render children.
 * Owns sidebar collapse + mobile state so navigation never remounts the shell.
 */
export function DashboardShell({ children, title, className }: DashboardShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const resolvedTitle = useMemo(() => {
    if (title) return title;
    const match = dashboardConfig.sidebar.find(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
    );
    return match?.title ?? dashboardConfig.brand.name;
  }, [pathname, title]);

  return (
    <div className={cn("flex min-h-screen bg-zinc-50 dark:bg-zinc-900", className)}>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
      />
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header title={resolvedTitle} onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
