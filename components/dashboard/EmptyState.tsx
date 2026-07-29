import type { ReactNode } from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/dashboard-utils";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
  action?: ReactNode;
}

export function EmptyState({
  title = "Nothing here yet",
  description = "Data will appear once your sources are connected.",
  className,
  action,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 px-6 py-12 text-center",
        className,
      )}
    >
      <span className="mb-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400 dark:bg-zinc-900">
        <Inbox className="h-5 w-5" />
      </span>
      <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{title}</h4>
      <p className="max-w-sm text-xs text-zinc-500 dark:text-zinc-400">{description}</p>
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
