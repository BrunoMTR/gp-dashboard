import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCreateWorkflow, useCreateFlow } from "../../api/workflows/mutations";
import { useGetUnitsOptions } from '../../api/units/queries'
import { useQuery } from "@tanstack/react-query";
import type { Flow, WorkflowInput } from "@/api/workflows/types";
import { AlertMutation } from "./alert"
import { WorkflowForm } from "./WorkflowForm";
import { FlowConfiguration } from "./FlowConfigurator";
import type { NodeItem } from "./types";



interface WorkflowConfigurationProps {
  onChangeNodes?: (nodes: NodeItem[]) => void;
}


export function WorkflowConfiguration({ onChangeNodes }: WorkflowConfigurationProps) {
  const [holder, setHolder] = React.useState<string | undefined>();
  const [pareceres, setPareceres] = React.useState<number>(0);
  const [nodesList, setNodesList] = React.useState<NodeItem[]>([]);
  const [selectKey, setSelectKey] = React.useState<number>(0);


  const idCounter = React.useRef(0);

  const listRef = React.useRef<HTMLDivElement>(null);
  const { data: unitsData = [], isLoading: isLoadingUnits, error: unitsError } =
    useQuery(useGetUnitsOptions())

  const { mutate: mutateFlow } = useCreateFlow();

  const { mutate: mutateWorkflow, isPending, isError, error, isSuccess } = useCreateWorkflow(
    (workflowCriado) => {
      const flowPayload: Flow = {
        applicationId: workflowCriado.id,
        nodes: nodesList.map((n) => ({
          originId: n.id,
          destinationId: n.id,
          approvals: n.parecer,
        })),
      };

      mutateFlow(flowPayload);
    }
  );


  const [workflow, setWorkflow] = React.useState<WorkflowInput>({
    name: "",
    abbreviation: "",
    applicationEmail: "",
    team: "",
    teamEmail: "",
  });

  const handleSave = () => {
    mutateWorkflow({ ...workflow });
  };




  React.useEffect(() => {
    if (onChangeNodes) onChangeNodes([...nodesList]);
  }, [nodesList, onChangeNodes]);

  const handleAdicionar = () => {
    if (!holder) return;
    if (nodesList.length >= 10) return;

    const novoItem: NodeItem = {
      id: idCounter.current++,
      holder,
      parecer: pareceres,
    };

    setNodesList((prev) => [...prev, novoItem]);
  };

  const handleLimpar = () => {
    setHolder(undefined);
    setPareceres(0);
    setNodesList([]);
    setSelectKey((prev) => prev + 1);
  };


  const podeAdicionar = holder !== undefined && nodesList.length < 10;
  const podeLimpar = nodesList.length > 0;


  return (
    <Card className="fixed right-10 w-[310px] h-[520px] flex flex-col z-50 shadow-lg opacity-90">

      <CardHeader className=" px-4 flex flex-col gap-2">
        <CardTitle className="text-base font-semibold">Configuração do Workflow</CardTitle>
        <p className="text-xs text-gray-600">Indique os dados do workflow.</p>
      </CardHeader>


      <CardContent className="flex-1 overflow-y-auto px-4 flex flex-col gap-4">
        <WorkflowForm value={workflow} onChange={setWorkflow} />

        <FlowConfiguration
          units={unitsData}
          unitsError={unitsError}
          isLoadingUnits={isLoadingUnits}
          holder={holder}
          onHolderChange={setHolder}
          pareceres={pareceres}
          onPareceresChange={(val) => {
            let value = Math.min(5, Math.max(0, val));
            setPareceres(value);
          } }
          nodesList={nodesList}
          onAdicionar={handleAdicionar}
          podeAdicionar={podeAdicionar}
          listRef={listRef}
          key={selectKey}
          onNodesChange={setNodesList} selectKey={0}        />

      </CardContent>


      <CardContent className="h-[10%] py-1 px-4 flex gap-2 border-t items-center">
        <Button className="flex-1 text-xs h-7" onClick={handleSave} disabled={isPending}>
          {isPending ? "Salvando..." : "Salvar"}
        </Button>


        <Button
          variant="outline"
          onClick={handleLimpar}
          className="flex-1 text-xs h-7"
          disabled={!podeLimpar}
        >
          Limpar
        </Button>
      </CardContent>

      {isPending && (
        <AlertMutation status="loading" message="Salvando workflow..." />
      )}
      {isSuccess && (
        <AlertMutation status="success" message="Workflow criado com sucesso!" />
      )}
      {isError && (
        <AlertMutation status="error" message={error?.message || "Falha ao criar workflow"} />
      )}
    </Card>

  );
}
