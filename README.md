# ShopPulse

ShopPulse is a Next.js 16 app for shop analytics and operations. It embeds a **config-driven dashboard kit** so you can test shell, stats, charts, and tables before publishing that kit as an npm package.

**Stack:** Next.js App Router · React 19 · Tailwind CSS v4 · Recharts · Lucide · TypeScript

---

## Getting started

```bash
npm install
npm run dev
```

| URL | What you get |
|-----|----------------|
| http://localhost:3000 | Public home (`app/page.tsx`) |
| http://localhost:3000/dashboard | Overview: stat cards + charts |
| http://localhost:3000/users | Example `DataTable` page |

Scripts:

```bash
npm run build   # production build
npm run start   # run production server
npm run lint    # ESLint
```

---

## Project structure

```
shoppulse/
├── app/
│   ├── layout.tsx                 # Root layout + theme flash script
│   ├── page.tsx                   # Public home (not dashboard)
│   ├── globals.css                # Tailwind + class-based dark mode
│   └── (dashboard)/               # Route group — shared chrome
│       ├── layout.tsx             # ThemeProvider + DashboardShell
│       ├── dashboard/page.tsx     # Overview
│       └── users/page.tsx         # Users table example
│
├── components/dashboard/          # Dashboard kit (test surface)
│   ├── DashboardShell.tsx         # Sidebar + header + main
│   ├── Sidebar.tsx / MobileSidebar.tsx
│   ├── Header.tsx
│   ├── ThemeProvider.tsx
│   ├── StatCard.tsx
│   ├── ChartCard.tsx
│   ├── DataTable.tsx
│   ├── EmptyState.tsx
│   ├── LoadingState.tsx
│   └── ErrorState.tsx
│
├── config/
│   └── dashboard.config.ts        # Brand, nav, theme, stat cards
│
├── hooks/
│   └── useDashboard.ts            # Mock stats/trends (swap for real API later)
│
└── lib/
    └── dashboard-utils.ts         # cn, formatCurrency, formatNumber, theme helper
```

**How routing works**

- `(dashboard)` is a **route group** — it does **not** appear in the URL.
- `app/(dashboard)/dashboard/page.tsx` → `/dashboard`
- `app/(dashboard)/users/page.tsx` → `/users`
- New pages under `app/(dashboard)/…` automatically get theme + sidebar + header from `layout.tsx`.

---

## Config (start here)

Edit `config/dashboard.config.ts`:

```ts
export const dashboardConfig = {
  brand: { name: "ShopPulse", logo: "/logo.svg" },
  theme: { mode: "light", primary: "#2563eb" },
  sidebar: [ /* nav items */ ],
  cards: [ /* overview StatCards */ ],
};
```

Sidebar, header subtitle, and overview cards all read from this file.

> **Note:** Some kit leftovers may still say USpotLeb (brand name, theme storage key). Update those when you rebrand fully.

---

## How to add a new page

1. Create the route under the dashboard group:

```
app/(dashboard)/orders/page.tsx   →   /orders
```

2. Register it in config:

```ts
{ title: "Orders", href: "/orders", icon: "file", badge: "New" }
```

3. Page content only — **do not** wrap `ThemeProvider` / `DashboardShell` again:

```tsx
"use client";

export default function OrdersPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold">Orders</h2>
      {/* StatCard, ChartCard, DataTable, … */}
    </div>
  );
}
```

Sidebar may list Analytics / Billing / Settings — add matching `page.tsx` files when you need those routes.

---

## How to add a table

Pattern from `app/(dashboard)/users/page.tsx`:

```tsx
import { DataTable, type DataTableColumn } from "@/components/dashboard/DataTable";

interface OrderRow extends Record<string, unknown> {
  id: string;
  customer: string;
  total: number;
  status: string;
}

const COLUMNS: DataTableColumn<OrderRow>[] = [
  { key: "id", header: "Order", sortable: true },
  { key: "customer", header: "Customer", sortable: true },
  {
    key: "status",
    header: "Status",
    render: (row) => <span className="font-medium">{row.status}</span>,
  },
];

export default function OrdersPage() {
  return <DataTable columns={COLUMNS} data={orders} pageSize={10} searchable />;
}
```

Built-in: search, sort, pagination, loading / empty states, custom `render` per column.

---

## How to use kit components

| Component | Use for |
|-----------|---------|
| `StatCard` | KPI tiles (title, value, icon, trend %) |
| `ChartCard` | `line` \| `bar` \| `area` via Recharts |
| `DataTable` | Filterable, sortable, paginated tables |
| `EmptyState` / `LoadingState` / `ErrorState` | Async UX |
| `DashboardShell` | App chrome (used once in layout) |
| `useDashboard` | Mock overview data — replace with fetch |

### New UI piece in the kit

1. Add `components/dashboard/MyWidget.tsx`
2. Export typed props; use `cn()` from `@/lib/dashboard-utils`
3. Respect `dark:` and `--dashboard-primary`
4. Use it from any `(dashboard)` page

### New overview card

1. Add an entry to `dashboardConfig.cards`
2. Extend `DashboardStats` / mock data in `useDashboard`
3. Map an icon in `CARD_ICONS` on the dashboard page
4. Format the value in the page’s `value()` helper

---

## Architecture

```
RootLayout (fonts, theme flash script)
  └── Home (/)  OR  DashboardGroupLayout
        └── DashboardThemeProvider
              └── DashboardShell (Sidebar + Header + <main>)
                    └── Page content (stats / charts / tables)
```

- **Theme:** class `.dark` on `<html>`, persisted in `localStorage`, flash prevented by an inline script in `app/layout.tsx`.
- **Data:** mock today (`useDashboard` + hard-coded chart series). Wire real APIs when ready.
- **Kit location:** vendored under `components/dashboard/` — not yet an npm dependency. This app is the dogfood / integration sandbox.

---

## Suggested next steps

1. Rebrand config + theme key + metadata fully to ShopPulse
2. Replace `app/page.tsx` with a ShopPulse landing or redirect to `/dashboard`
3. Implement missing sidebar routes (Analytics, Billing, Settings)
4. Replace `useDashboard` mocks with real endpoints
5. Add `public/logo.svg`
6. When the kit is stable, extract `components/dashboard` + config + hooks/utils into your npm package and install it here for a real consumer test

---

## Dashboard kit assessment

**Solid starter / mid-tier kit** for shipping an admin shell quickly.

**Strengths**

- Clear separation: config → shell → page content
- Layout mounts chrome once; pages stay thin
- Loading / empty / error covered
- Dark mode done properly (class + FOUC script)
- `DataTable` is practical (search, sort, pagination, custom cells)
- Charts cover line / bar / area with a shared primary color token
- Mobile drawer + collapsible sidebar

**Gaps before a production npm package**

- Legacy brand strings may remain in places
- Some sidebar links may lack pages
- Header user menu / notifications are decorative (no auth)
- Mock data only
- Limited chart depth (no date ranges, rich legends, etc.)

**Verdict:** Good foundation to build and test your npm dashboard package. For ShopPulse, treat this as the **integration sandbox**: rebrand, add shop-specific pages (orders, products, inventory), then extract the kit once the APIs feel right.
