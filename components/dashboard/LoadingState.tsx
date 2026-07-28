import { Loader2 } from "lucide-react";
import { cn } from "@/lib/dashboard-utils";

export interface LoadingStateProps {
  label?: string;
  className?: string;
}

export function LoadingState({ label = "Loading…", className }: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 px-6 py-12 text-center",
        className,
      )}
    >
      <Loader2 className="h-6 w-6 animate-spin text-[color:var(--dashboard-primary,#2563eb)]" />
      <p className="text-xs text-zinc-500 dark:text-zinc-400">{label}</p>
    </div>
  );
}
