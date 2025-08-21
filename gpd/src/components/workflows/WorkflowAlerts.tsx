import { AlertMutation } from "../workflows/alert";

interface Props {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
}

export function WorkflowAlerts({ isPending, isSuccess, isError, errorMessage }: Props) {
  return (
    <>
      {isPending && <AlertMutation status="loading" message="Salvando workflow..." />}
      {isSuccess && <AlertMutation status="success" message="Workflow criado com sucesso!" />}
      {isError && <AlertMutation status="error" message={errorMessage || "Falha ao criar workflow"} />}
    </>
  );
}
