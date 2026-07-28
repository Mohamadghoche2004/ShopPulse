"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChartColumn,
  CreditCard,
  FileText,
  HelpCircle,
  Home,
  Settings,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  dashboardConfig,
  type SidebarIcon,
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

export interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  const pathname = usePathname();
  const { brand, sidebar } = dashboardConfig;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
        aria-label="Close navigation"
        onClick={onClose}
      />

      <aside
        className={cn(
          "absolute inset-y-0 left-0 flex w-[min(100%,20rem)] flex-col bg-white shadow-xl dark:bg-zinc-950",
          "animate-in slide-in-from-left duration-200",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brand.logo}
              alt=""
              className="h-8 w-8 rounded-md object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {brand.name}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {sidebar.map((item) => {
            const Icon = ICON_MAP[item.icon] ?? Home;
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard" || pathname === "/dashboard/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-[color:var(--dashboard-primary,#2563eb)]/10 text-[color:var(--dashboard-primary,#2563eb)]"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
