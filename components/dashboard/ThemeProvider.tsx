"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dashboardConfig, type ThemeMode } from "@/config/dashboard.config";
import { applyThemePrimary } from "@/lib/dashboard-utils";

export const THEME_STORAGE_KEY = "uspotleb-dashboard-theme";

export interface DashboardThemeContextValue {
  themeMode: ThemeMode;
  /** Resolved appearance — true when dark styles should apply */
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const DashboardThemeContext = createContext<DashboardThemeContextValue | null>(null);

function resolveIsDark(mode: ThemeMode): boolean {
  if (mode === "dark") return true;
  if (mode === "light") return false;
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

/** Apply `.dark` on <html> so Tailwind `dark:` utilities respond to the button. */
export function applyDocumentTheme(mode: ThemeMode): boolean {
  const isDark = resolveIsDark(mode);
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", isDark);
    applyThemePrimary(dashboardConfig.theme.primary);
  }
  return isDark;
}

/**
 * Inline script for root layout <head> — prevents flash before hydration.
 * Keep in sync with THEME_STORAGE_KEY.
 */
export const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k);var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

export interface DashboardThemeProviderProps {
  children: ReactNode;
  defaultMode?: ThemeMode;
}

/**
 * Theme state for the dashboard. Styles use Tailwind `dark:` utilities;
 * this provider toggles the `.dark` class on <html> when the user clicks the header button.
 *
 * Requires class-based dark mode (configured by the CLI on `init`):
 * - Tailwind v4: `@custom-variant dark (&:where(.dark, .dark *));` in globals.css
 * - Tailwind v3: `darkMode: "class"` in tailwind.config
 */
export function DashboardThemeProvider({
  children,
  defaultMode = dashboardConfig.theme.mode,
}: DashboardThemeProviderProps) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(defaultMode);
  const [isDark, setIsDark] = useState(false);

  const applyMode = useCallback((mode: ThemeMode) => {
    setIsDark(applyDocumentTheme(mode));
  }, []);

  const setThemeMode = useCallback(
    (mode: ThemeMode) => {
      setThemeModeState(mode);
      applyMode(mode);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, mode);
      } catch {
        /* ignore */
      }
    },
    [applyMode],
  );

  const toggleTheme = useCallback(() => {
    setThemeMode(isDark ? "light" : "dark");
  }, [isDark, setThemeMode]);

  useEffect(() => {
    let stored: ThemeMode | null = null;
    try {
      stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    } catch {
      /* ignore */
    }
    const initial = stored ?? defaultMode;
    setThemeModeState(initial);
    applyMode(initial);
  }, [applyMode, defaultMode]);

  useEffect(() => {
    if (themeMode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyMode("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [themeMode, applyMode]);

  const value = useMemo(
    () => ({ themeMode, isDark, setThemeMode, toggleTheme }),
    [themeMode, isDark, setThemeMode, toggleTheme],
  );

  return (
    <DashboardThemeContext.Provider value={value}>{children}</DashboardThemeContext.Provider>
  );
}

/** @deprecated Alias — prefer DashboardThemeProvider */
export const ThemeProvider = DashboardThemeProvider;

export function useDashboardTheme(): DashboardThemeContextValue {
  const ctx = useContext(DashboardThemeContext);
  if (!ctx) {
    throw new Error("useDashboardTheme must be used within DashboardThemeProvider");
  }
  return ctx;
}
