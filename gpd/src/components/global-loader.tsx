import {
  Alert,
  AlertDescription,
  AlertTitle
} from "@/components/ui/alert";
import {
  Loader2Icon,
  CheckIcon,
  XIcon
} from "lucide-react";
import React from "react";
import {
  useQueryClient,
  useIsFetching,
  useIsMutating
} from "@tanstack/react-query";
import { useRouterState } from "@tanstack/react-router";

export function GlobalLoader() {
  const queryClient = useQueryClient();

  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const isRouting = useRouterState({
    select: (state) => state.status === "pending",
  });

  const isLoading = isRouting || isFetching > 0 || isMutating > 0;

  const [visible, setVisible] = React.useState(false);
  const [erroredQueries, setErroredQueries] = React.useState<string[]>([]);
  const [successfulQueries, setSuccessfulQueries] = React.useState<string[]>([]);

  React.useEffect(() => {
    const queries = queryClient.getQueryCache().getAll();

    setErroredQueries(
      queries
        .filter(q => q.state.status === "error")
        .map(q => q.queryKey.join(" / "))
    );

    setSuccessfulQueries(
      queries
        .filter(q => q.state.status === "success")
        .map(q => q.queryKey.join(" / "))
    );
  }, [isFetching, isMutating, queryClient]);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isLoading) {
      setVisible(true);
    } else if (erroredQueries.length || successfulQueries.length) {
      timeout = setTimeout(() => setVisible(false), 1200);
    } else {
      setVisible(false);
    }

    return () => clearTimeout(timeout);
  }, [isLoading, erroredQueries, successfulQueries]);

  if (!visible) return null;

  let icon, title, description;

  if (isLoading) {
    icon = <Loader2Icon className="animate-spin" />;
    title = "A carregar...";
    description = isRouting
      ? "A navegar entre páginas"
      : "A comunicar com o servidor";
  } else if (erroredQueries.length) {
    icon = <XIcon className="text-red-500" />;
    title = "Erro ao carregar dados";
    description = erroredQueries.map(k => (
      <div key={k}>{k}</div>
    ));
  } else {
    icon = <CheckIcon className="text-green-500" />;
    title = "Dados carregados";
    description = "Operação concluída com sucesso";
  }

  return (
    <div className="fixed bottom-4 left-4 z-50  max-w-md">
      <Alert>
        {icon}
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </div>
  );
}
