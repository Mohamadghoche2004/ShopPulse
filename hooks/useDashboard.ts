"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export interface DashboardStats {
  users: number;
  revenue: number;
  sessions: number;
  conversion: number;
}

export interface DashboardTrend {
  key: string;
  value: number;
  direction: "up" | "down" | "flat";
}

export type DashboardStatus = "idle" | "loading" | "success" | "error";

export interface UseDashboardReturn {
  status: DashboardStatus;
  error: string | null;
  stats: DashboardStats | null;
  trends: DashboardTrend[];
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  refresh: () => Promise<void>;
}

const MOCK_STATS: DashboardStats = {
  users: 12840,
  revenue: 98420,
  sessions: 3421,
  conversion: 3.8,
};

const MOCK_TRENDS: DashboardTrend[] = [
  { key: "users", value: 12.4, direction: "up" },
  { key: "revenue", value: 8.1, direction: "up" },
  { key: "sessions", value: -2.3, direction: "down" },
  { key: "conversion", value: 0.4, direction: "up" },
];

/**
 * Dashboard data hook. Theme is owned by DashboardThemeProvider.
 */
export function useDashboard(): UseDashboardReturn {
  const [status, setStatus] = useState<DashboardStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [trends, setTrends] = useState<DashboardTrend[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  const refresh = useCallback(async () => {
    setStatus("loading");
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStats(MOCK_STATS);
      setTrends(MOCK_TRENDS);
      setStatus("success");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load dashboard";
      setError(message);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return useMemo(
    () => ({
      status,
      error,
      stats,
      trends,
      sidebarCollapsed,
      toggleSidebar,
      refresh,
    }),
    [status, error, stats, trends, sidebarCollapsed, toggleSidebar, refresh],
  );
}
