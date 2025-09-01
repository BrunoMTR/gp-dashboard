import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";

// Guarda mensagens já exibidas para evitar repetição
const shownMessages = new Set<string>();

export function WorkflowErrorAlert(message: string) {
  if (shownMessages.has(message)) return; // já mostrado, não exibe de novo

  shownMessages.add(message);

  toast(message, {
    icon: <AlertTriangle className="w-4 h-4 text-red-500" />,
    style: {
      backgroundColor: "#fee2e2", // vermelho claro
      color: "#b91c1c",           // vermelho escuro
    },
  });

  // Remove da lista após 3 segundos para permitir mostrar novamente
  setTimeout(() => shownMessages.delete(message), 3000);
}
