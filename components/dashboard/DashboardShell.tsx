"use client";

import { useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { MobileSidebar } from "./MobileSidebar";
import { Header } from "./Header";
import { cn } from "@/lib/dashboard-utils";

export interface DashboardShellProps {
  children: ReactNode;
  title?: string;
  sidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
  className?: string;
}

/**
 * Main layout wrapper — sidebar + header + content.
 * Must be rendered inside DashboardThemeProvider.
 */
export function DashboardShell({
  children,
  title,
  sidebarCollapsed = false,
  onToggleSidebar,
  className,
}: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={cn("flex min-h-screen bg-zinc-50 dark:bg-zinc-900", className)}>
      <Sidebar collapsed={sidebarCollapsed} onToggleCollapse={onToggleSidebar} />
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header title={title} onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
