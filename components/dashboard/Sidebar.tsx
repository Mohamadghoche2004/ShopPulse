"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChartColumn,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileText,
  HelpCircle,
  Home,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  dashboardConfig,
  type SidebarIcon,
  type SidebarItem,
} from "@/config/dashboard.config";
import { cn } from "@/lib/dashboard-utils";

const ICON_MAP: Record<SidebarIcon, LucideIcon> = {
  home: Home,
  users: Users,
  settings: Settings,
  chart: ChartColumn,
  billing: CreditCard,
  help: HelpCircle,
  file: FileText,
  bell: Bell,
};

export interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

export function Sidebar({
  collapsed = false,
  onToggleCollapse,
  className,
}: SidebarProps) {
  const pathname = usePathname();
  const { brand, sidebar } = dashboardConfig;

  return (
    <aside
      className={cn(
        "hidden md:flex h-screen sticky top-0 flex-col border-r border-zinc-200 bg-white transition-[width] duration-200 dark:border-zinc-800 dark:bg-zinc-950",
        collapsed ? "w-[72px]" : "w-64",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center border-b border-zinc-200 px-4 dark:border-zinc-800",
          collapsed ? "justify-center" : "gap-3",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={brand.logo}
          alt={`${brand.name} logo`}
          className="h-8 w-8 rounded-md object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {!collapsed && (
          <span className="truncate text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {brand.name}
          </span>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {sidebar.map((item) => (
          <SidebarLink
            key={item.href}
            item={item}
            collapsed={collapsed}
            active={isActive(pathname, item.href)}
          />
        ))}
      </nav>

      {onToggleCollapse && (
        <button
          type="button"
          onClick={onToggleCollapse}
          className="m-3 flex items-center justify-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      )}
    </aside>
  );
}

function SidebarLink({
  item,
  collapsed,
  active,
}: {
  item: SidebarItem;
  collapsed: boolean;
  active: boolean;
}) {
  const Icon = ICON_MAP[item.icon] ?? Home;

  return (
    <Link
      href={item.href}
      title={collapsed ? item.title : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-[color:var(--dashboard-primary,#2563eb)]/10 text-[color:var(--dashboard-primary,#2563eb)]"
          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50",
        collapsed && "justify-center px-2",
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.title}</span>
          {item.badge && (
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
              {item.badge}
            </span>
          )}
        </>
      )}
    </Link>
  );
}

function isActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") {
    return pathname === "/dashboard" || pathname === "/dashboard/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
