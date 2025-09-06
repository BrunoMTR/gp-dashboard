import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type Status = "INICIATED" | "PENDING" | "CONCLUDED" | "CANCELED";

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const colors: Record<Status, string> = {
    INICIATED: "bg-blue-500 text-white dark:bg-blue-600",
    PENDING: "bg-yellow-500 text-white",
    CONCLUDED: "bg-green-500 text-white",
    CANCELED: "bg-red-500 text-white",
  };

  return (
    <Badge
      className={cn(
        colors[status],
        "px-2 py-1 rounded-md text-xs text-center w-28"
      )}
    >
      {status}
    </Badge>
  );
}