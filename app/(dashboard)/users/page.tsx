"use client";

import { DataTable, type DataTableColumn } from "@/components/dashboard/DataTable";

interface UserRow extends Record<string, unknown> {
  name: string;
  email: string;
  role: string;
  status: string;
}

const USERS: UserRow[] = [
  { name: "Maya Haddad", email: "maya@example.com", role: "Admin", status: "Active" },
  { name: "Karim Nassar", email: "karim@example.com", role: "Editor", status: "Active" },
  { name: "Lara Farah", email: "lara@example.com", role: "Viewer", status: "Invited" },
  { name: "Omar Khalil", email: "omar@example.com", role: "Editor", status: "Active" },
  { name: "Nour Aoun", email: "nour@example.com", role: "Viewer", status: "Suspended" },
];

const COLUMNS: DataTableColumn<UserRow>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
  { key: "role", header: "Role", sortable: true },
  { key: "status", header: "Status", sortable: true },
];

/**
 * Example extra page — no ThemeProvider / Shell wrapping needed.
 * Create more routes the same way under app/(dashboard)/.
 */
export default function UsersPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Users</h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Add pages under{" "}
          <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">app/(dashboard)/</code> — they
          automatically get the dashboard chrome.
        </p>
      </div>
      <DataTable columns={COLUMNS} data={USERS} />
    </div>
  );
}
