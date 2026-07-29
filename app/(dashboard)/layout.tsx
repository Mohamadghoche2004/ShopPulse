"use client";

import type { ReactNode } from "react";
import { DashboardThemeProvider } from "@/components/dashboard/ThemeProvider";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

/**
 * Shared chrome for every dashboard route.
 *
 * Theme + sidebar + header live here ONCE. Add new pages under
 * app/(dashboard)/ and they inherit this layout automatically —
 * no need to re-wrap the provider or shell.
 *
 *   app/(dashboard)/orders/page.tsx  →  /orders
 */
export default function DashboardGroupLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardThemeProvider>
      <DashboardShell>{children}</DashboardShell>
    </DashboardThemeProvider>
  );
}
