import type { LucideIcon } from "lucide-react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Minus,
  TrendingUp,
} from "lucide-react";
import { cn, formatNumber, formatPercent } from "@/lib/dashboard-utils";

export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: number;
  trendLabel?: string;
  loading?: boolean;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon = TrendingUp,
  trend,
  trendLabel = "vs last period",
  loading = false,
  className,
}: StatCardProps) {
  if (loading) {
    return (
      <div
        className={cn(
          "animate-pulse rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950",
          className,
        )}
      >
        <div className="mb-4 h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="mb-2 h-8 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-3 w-28 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
    );
  }

  const direction =
    trend === undefined || trend === 0 ? "flat" : trend > 0 ? "up" : "down";

  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950",
        className,
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</p>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[color:var(--dashboard-primary,#2563eb)]/10 text-[color:var(--dashboard-primary,#2563eb)]">
          <Icon className="h-4 w-4" />
        </span>
      </div>

      <p className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        {typeof value === "number" ? formatNumber(value) : value}
      </p>

      {trend !== undefined && (
        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <TrendBadge direction={direction} value={trend} />
          <span className="text-zinc-500 dark:text-zinc-400">{trendLabel}</span>
        </div>
      )}
    </div>
  );
}

function TrendBadge({
  direction,
  value,
}: {
  direction: "up" | "down" | "flat";
  value: number;
}) {
  const Icon =
    direction === "up" ? ArrowUpRight : direction === "down" ? ArrowDownRight : Minus;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-medium",
        direction === "up" && "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
        direction === "down" && "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400",
        direction === "flat" && "bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300",
      )}
    >
      <Icon className="h-3 w-3" />
      {formatPercent(value)}
    </span>
  );
}
