"use client";

import { useState } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { dashboardConfig } from "@/config/dashboard.config";
import { cn } from "@/lib/dashboard-utils";
import { useDashboardTheme } from "./ThemeProvider";

export interface HeaderProps {
  title?: string;
  onMenuClick?: () => void;
  className?: string;
}

export function Header({ title = "Dashboard", onMenuClick, className }: HeaderProps) {
  const { isDark, toggleTheme } = useDashboardTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-zinc-200 bg-white/80 px-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80 md:px-6",
        className,
      )}
    >
      <button
        type="button"
        className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 md:hidden dark:text-zinc-300 dark:hover:bg-zinc-900"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex-1">
        <h1 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{title}</h1>
        <p className="hidden text-xs text-zinc-500 sm:block dark:text-zinc-400">
          {dashboardConfig.brand.name} control panel
        </p>
      </div>

      <button
        type="button"
        onClick={toggleTheme}
        className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>

      <button
        type="button"
        className="relative rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
        aria-label="Notifications"
      >
        <Bell className="h-4 w-4" />
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
      </button>

      <div className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center gap-2 rounded-lg border border-zinc-200 px-2 py-1.5 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
          aria-expanded={menuOpen}
          aria-haspopup="menu"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--dashboard-primary,#2563eb)] text-xs font-semibold text-white">
            U
          </span>
          <span className="hidden text-zinc-700 sm:inline dark:text-zinc-200">Admin</span>
          <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
        </button>

        {menuOpen && (
          <>
            <button
              type="button"
              className="fixed inset-0 z-40 cursor-default"
              aria-label="Close user menu"
              onClick={() => setMenuOpen(false)}
            />
            <div
              role="menu"
              className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
            >
              <MenuItem icon={User} label="Profile" />
              <MenuItem icon={Settings} label="Settings" />
              <div className="my-1 border-t border-zinc-100 dark:border-zinc-800" />
              <MenuItem icon={LogOut} label="Sign out" danger />
            </div>
          </>
        )}
      </div>
    </header>
  );
}

function MenuItem({
  icon: Icon,
  label,
  danger,
}: {
  icon: typeof User;
  label: string;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      className={cn(
        "flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition hover:bg-zinc-50 dark:hover:bg-zinc-900",
        danger ? "text-red-600 dark:text-red-400" : "text-zinc-700 dark:text-zinc-200",
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}
