import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type Status = "INICIATED" | "UPLOADING" |"PENDING" | "CONCLUDED" | "CANCELED";

interface StatusBadgeProps {
  status: number; // agora recebe o número
}

export function StatusBadge({ status }: StatusBadgeProps) {
  // Mapeia o número para o nome do status
  const statusMap: Record<number, Status> = {
    0: "INICIATED",
    1:"UPLOADING",
    2: "PENDING",
    3: "CONCLUDED",
    4: "CANCELED",
  };

  const statusLabel = statusMap[status] || "INICIATED"; // fallback

  const colors: Record<Status, string> = {
    INICIATED: "bg-blue-500 text-white dark:bg-blue-600",
    UPLOADING: "bg-blue-500 text-white dark:bg-blue-600",
    PENDING: "bg-yellow-500 text-white",
    CONCLUDED: "bg-green-500 text-white",
    CANCELED: "bg-red-500 text-white",
  };

  return (
    <Badge
      className={cn(
        colors[statusLabel],
        "px-2 py-1 rounded-md text-xs text-center w-28"
      )}
    >
      {statusLabel}
    </Badge>
  );
}
