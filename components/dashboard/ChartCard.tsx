"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/dashboard-utils";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";

export type ChartType = "line" | "bar" | "area";

export interface ChartDatum {
  label: string;
  value: number;
  secondary?: number;
}

export interface ChartCardProps {
  title: string;
  description?: string;
  type?: ChartType;
  data: ChartDatum[];
  loading?: boolean;
  className?: string;
  height?: number;
  dataKey?: string;
  secondaryKey?: string;
}

const DEFAULT_DATA: ChartDatum[] = [
  { label: "Mon", value: 420 },
  { label: "Tue", value: 510 },
  { label: "Wed", value: 480 },
  { label: "Thu", value: 620 },
  { label: "Fri", value: 700 },
  { label: "Sat", value: 560 },
  { label: "Sun", value: 640 },
];

export function ChartCard({
  title,
  description,
  type = "area",
  data = DEFAULT_DATA,
  loading = false,
  className,
  height = 280,
  dataKey = "value",
  secondaryKey,
}: ChartCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950",
        className,
      )}
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{title}</h3>
        {description && (
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{description}</p>
        )}
      </div>

      {loading ? (
        <LoadingState label="Loading chart…" className="h-[280px]" />
      ) : data.length === 0 ? (
        <EmptyState
          title="No chart data"
          description="Connect your analytics source to populate this chart."
        />
      ) : (
        <div style={{ width: "100%", height }}>
          <ResponsiveContainer>
            {type === "bar" ? (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-800" />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#a1a1aa" />
                <YAxis tick={{ fontSize: 12 }} stroke="#a1a1aa" />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #e4e4e7",
                    fontSize: 12,
                  }}
                />
                <Bar
                  dataKey={dataKey}
                  fill="var(--dashboard-primary, #2563eb)"
                  radius={[6, 6, 0, 0]}
                />
                {secondaryKey && (
                  <Bar dataKey={secondaryKey} fill="#94a3b8" radius={[6, 6, 0, 0]} />
                )}
              </BarChart>
            ) : type === "line" ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-800" />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#a1a1aa" />
                <YAxis tick={{ fontSize: 12 }} stroke="#a1a1aa" />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #e4e4e7",
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey={dataKey}
                  stroke="var(--dashboard-primary, #2563eb)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            ) : (
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="uspotArea" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="var(--dashboard-primary, #2563eb)"
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--dashboard-primary, #2563eb)"
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-800" />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#a1a1aa" />
                <YAxis tick={{ fontSize: 12 }} stroke="#a1a1aa" />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #e4e4e7",
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey={dataKey}
                  stroke="var(--dashboard-primary, #2563eb)"
                  fill="url(#uspotArea)"
                  strokeWidth={2}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
