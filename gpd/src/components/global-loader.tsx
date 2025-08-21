import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2Icon, CheckIcon, XIcon } from "lucide-react";
import React from "react";
import { useQueryClient, useIsFetching } from "@tanstack/react-query";

export function GlobalLoader() {
  const queryClient = useQueryClient();
  const isFetchingCount = useIsFetching();
  const [visible, setVisible] = React.useState(false);
  const [erroredQueries, setErroredQueries] = React.useState<string[]>([]);
  const [successfulQueries, setSuccessfulQueries] = React.useState<string[]>([]);

  React.useEffect(() => {
    const queries = queryClient.getQueryCache().getAll();

    setErroredQueries(
      queries
        .filter(q => q.state.status === 'error')
        .map(q => q.queryKey.toString())
    );

    setSuccessfulQueries(
      queries
        .filter(q => q.state.status === 'success')
        .map(q => q.queryKey.toString())
    );
  }, [isFetchingCount, queryClient]);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isFetchingCount > 0) {
      setVisible(true);
    } else if (erroredQueries.length > 0 || successfulQueries.length > 0) {
      timeout = setTimeout(() => setVisible(false), 1500);
    }

    return () => clearTimeout(timeout);
  }, [isFetchingCount, erroredQueries, successfulQueries]);

  if (!visible) return null;

  let icon, title, description;

  if (isFetchingCount > 0) {
    icon = <Loader2Icon className="animate-spin" />;
    title = "A carregar dados...";
    description = "A aplicação está a comunicar com a API.";
  } else if (erroredQueries.length > 0) {
    icon = <XIcon className="text-red-500" />;
    title = "Erro ao carregar";
    description = (
      <div>
        {erroredQueries.map(key => (
          <div key={key}>{key}</div>
        ))}
      </div>
    );
  } else if (successfulQueries.length > 0) {
    icon = <CheckIcon className="text-green-500" />;
    title = "Dados carregados";
    description = (
      <div>
        {successfulQueries.map(key => (
          <div key={key}>{key} carregado com sucesso</div>
        ))}
      </div>
    );
  }

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md transition-opacity duration-300">
      <Alert>
        {icon}
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </div>
  );
}
