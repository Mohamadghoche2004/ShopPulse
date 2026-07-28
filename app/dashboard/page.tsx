"use client";

import {
  Bell,
  ChartColumn,
  CreditCard,
  FileText,
  HelpCircle,
  Home,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";
import { dashboardConfig, type SidebarIcon } from "@/config/dashboard.config";
import { useDashboard } from "@/hooks/useDashboard";
import { formatCurrency, formatPercent } from "@/lib/dashboard-utils";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { DataTable, type DataTableColumn } from "@/components/dashboard/DataTable";
import { ErrorState } from "@/components/dashboard/ErrorState";
import { DashboardThemeProvider } from "@/components/dashboard/ThemeProvider";

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

interface RecentUser extends Record<string, unknown> {
  name: string;
  email: string;
  role: string;
  status: string;
  joined: string;
}

const RECENT_USERS: RecentUser[] = [
  {
    name: "Maya Haddad",
    email: "maya@example.com",
    role: "Admin",
    status: "Active",
    joined: "2026-01-12",
  },
  {
    name: "Karim Nassar",
    email: "karim@example.com",
    role: "Editor",
    status: "Active",
    joined: "2026-02-03",
  },
  {
    name: "Lara Farah",
    email: "lara@example.com",
    role: "Viewer",
    status: "Invited",
    joined: "2026-03-18",
  },
  {
    name: "Omar Khalil",
    email: "omar@example.com",
    role: "Editor",
    status: "Active",
    joined: "2026-04-01",
  },
  {
    name: "Nour Saleh",
    email: "nour@example.com",
    role: "Viewer",
    status: "Suspended",
    joined: "2026-05-22",
  },
];

const COLUMNS: DataTableColumn<RecentUser>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
  { key: "role", header: "Role", sortable: true },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (row) => (
      <span
        className={
          row.status === "Active"
            ? "rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
            : row.status === "Invited"
              ? "rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-950 dark:text-amber-400"
              : "rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300"
        }
      >
        {row.status}
      </span>
    ),
  },
  { key: "joined", header: "Joined", sortable: true },
];

export default function DashboardPage() {
  return (
    <DashboardThemeProvider>
      <DashboardView />
    </DashboardThemeProvider>
  );
}

function DashboardView() {
  const { status, error, stats, trends, sidebarCollapsed, toggleSidebar, refresh } =
    useDashboard();

  const loading = status === "loading" || status === "idle";

  return (
    <DashboardShell
      title="Overview"
      sidebarCollapsed={sidebarCollapsed}
      onToggleSidebar={toggleSidebar}
    >
      {status === "error" ? (
        <ErrorState description={error ?? undefined} onRetry={() => void refresh()} />
      ) : (
        <div className="space-y-6">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {dashboardConfig.cards.map((card) => {
              const trend = trends.find((t) => t.key === card.key)?.value;
              const raw = stats ? stats[card.key as keyof typeof stats] : undefined;
              const Icon = card.icon ? ICON_MAP[card.icon] : undefined;

              let display: string | number = "—";
              if (raw !== undefined) {
                if (card.key === "revenue") display = formatCurrency(raw);
                else if (card.key === "conversion") display = formatPercent(raw).replace("+", "");
                else display = raw;
              }

              return (
                <StatCard
                  key={card.key}
                  title={card.title}
                  value={display}
                  icon={Icon}
                  trend={trend}
                  loading={loading}
                />
              );
            })}
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <ChartCard
              title="Traffic"
              description="Sessions over the last 7 days"
              type="area"
              data={[
                { label: "Mon", value: 420 },
                { label: "Tue", value: 510 },
                { label: "Wed", value: 480 },
                { label: "Thu", value: 620 },
                { label: "Fri", value: 700 },
                { label: "Sat", value: 560 },
                { label: "Sun", value: 640 },
              ]}
              loading={loading}
            />
            <ChartCard
              title="Revenue"
              description="Weekly revenue breakdown"
              type="bar"
              data={[
                { label: "Mon", value: 1200 },
                { label: "Tue", value: 1800 },
                { label: "Wed", value: 1500 },
                { label: "Thu", value: 2200 },
                { label: "Fri", value: 2600 },
                { label: "Sat", value: 1900 },
                { label: "Sun", value: 2100 },
              ]}
              loading={loading}
            />
          </section>

          <section>
            <div className="mb-3">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Recent users</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Sortable, filterable table — replace with your API data
              </p>
            </div>
            <DataTable columns={COLUMNS} data={RECENT_USERS} loading={loading} />
          </section>
        </div>
      )}
    </DashboardShell>
  );
}
