"use client";

import {
  ChartColumn,
  CreditCard,
  FileText,
  Users,
  type LucideIcon,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { ErrorState } from "@/components/dashboard/ErrorState";
import { dashboardConfig } from "@/config/dashboard.config";
import { useDashboard } from "@/hooks/useDashboard";
import { formatCurrency } from "@/lib/dashboard-utils";

const CARD_ICONS: Record<string, LucideIcon> = {
  users: Users,
  revenue: CreditCard,
  sessions: ChartColumn,
  conversion: FileText,
};

const REVENUE_SERIES = [
  { label: "Mon", value: 8200 },
  { label: "Tue", value: 9100 },
  { label: "Wed", value: 8700 },
  { label: "Thu", value: 11200 },
  { label: "Fri", value: 12800 },
  { label: "Sat", value: 10400 },
  { label: "Sun", value: 13600 },
];

const SIGNUPS_SERIES = [
  { label: "Mon", value: 120 },
  { label: "Tue", value: 180 },
  { label: "Wed", value: 150 },
  { label: "Thu", value: 240 },
  { label: "Fri", value: 300 },
  { label: "Sat", value: 210 },
  { label: "Sun", value: 280 },
];

/**
 * Overview page — content only.
 * Chrome (theme, sidebar, header) is provided by app/(dashboard)/layout.tsx.
 */
export default function DashboardPage() {
  const { status, error, stats, trends, refresh } = useDashboard();
  const loading = status === "loading" || status === "idle";

  if (status === "error") {
    return <ErrorState description={error ?? undefined} onRetry={refresh} />;
  }

  const trendFor = (key: string) => trends.find((t) => t.key === key)?.value;

  const value = (key: string): string | number => {
    if (!stats) return 0;
    if (key === "revenue") return formatCurrency(stats.revenue);
    if (key === "conversion") return `${stats.conversion}%`;
    return stats[key as "users" | "sessions"] ?? 0;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardConfig.cards.map((card) => (
          <StatCard
            key={card.key}
            title={card.title}
            value={value(card.key)}
            icon={CARD_ICONS[card.key]}
            trend={trendFor(card.key)}
            loading={loading}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard
          title="Revenue"
          description="Last 7 days"
          type="area"
          data={REVENUE_SERIES}
          loading={loading}
        />
        <ChartCard
          title="New signups"
          description="Last 7 days"
          type="bar"
          data={SIGNUPS_SERIES}
          loading={loading}
        />
      </div>
    </div>
  );
}
