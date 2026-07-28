import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names with conflict resolution.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as compact currency (USD by default).
 */
export function formatCurrency(
  value: number,
  currency = "USD",
  locale = "en-US",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    notation: value >= 10_000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

/**
 * Format a number with locale-aware grouping.
 */
export function formatNumber(value: number, locale = "en-US"): string {
  return new Intl.NumberFormat(locale).format(value);
}

/**
 * Format a percentage with optional sign prefix.
 */
export function formatPercent(value: number, digits = 1): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(digits)}%`;
}

/**
 * Apply CSS custom properties from the dashboard theme.
 */
export function applyThemePrimary(primary: string): void {
  if (typeof document === "undefined") return;
  document.documentElement.style.setProperty("--dashboard-primary", primary);
}
