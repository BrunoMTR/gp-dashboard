import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCreateWorkflow } from "../../api/workflows/mutations";
import { useGetUnitsOptions } from '../../api/units/queries'
import { useQuery } from "@tanstack/react-query";
import type { Workflow } from "@/api/workflows/types";
import { WorkflowForm } from "./WorkflowForm";
import { FlowConfiguration } from "./FlowConfigurator";
import type { NodeItem } from "./types";
import { WorkflowAlerts } from "./WorkflowAlerts";
import { toast } from "sonner";
import { WorkflowErrorAlert } from "./WorkflowErrorAlert";
import { QueryErrorDialog } from "../../components/QueryErrorDialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useErrorMessage } from "../../hook/useErrorMessage"

interface WorkflowConfigurationProps {
  onChangeNodes?: (nodes: NodeItem[]) => void;
}


export function WorkflowConfiguration({ onChangeNodes }: WorkflowConfigurationProps) {
  const [selectedUnitId, setSelectedUnitId] = React.useState<string | undefined>();
  const [pareceres, setPareceres] = React.useState<number>(0);
  const [nodesList, setNodesList] = React.useState<NodeItem[]>([]);
  const [selectKey, setSelectKey] = React.useState<number>(0);



  const idCounter = React.useRef(0);

  const listRef = React.useRef<HTMLDivElement>(null);
  const { data: unitsData = [], isLoading: isLoadingUnits, error: unitsError, refetch: refetchUnits } =
    useQuery(useGetUnitsOptions())



  const { mutate: mutateWorkflow, isPending, isError, isSuccess } = useCreateWorkflow();



  const [workflow, setWorkflow] = React.useState<Workflow>({
    application: {
      name: "",
      abbreviation: "",
      applicationEmail: "",
      team: "",
      teamEmail: "",
    },
    graph: { nodes: [] },
  });


  const handleSave = () => {
    if (nodesList.length === 0) {
      WorkflowErrorAlert("Adicione pelo menos um node antes de salvar.");
      return;
    }


    // Valida pareceres
    for (let i = 0; i < nodesList.length; i++) {
      if (i > 0 && nodesList[i].parecer <= 0) {
        WorkflowErrorAlert(`O número de pareceres do node ${i + 1} deve ser maior que 0.`);
        return;
      }
    }

    // Valida nodes consecutivos iguais
    for (let i = 1; i < nodesList.length; i++) {
      if (nodesList[i].id === nodesList[i - 1].id) {
        WorkflowErrorAlert(`Os nodes ${i} e ${i + 1} não podem ter a mesma unidade.`);
        return;
      }
    }

    // Valida último node != primeiro node (se houver mais de 1)
    if (nodesList.length > 1 && nodesList[0].id === nodesList[nodesList.length - 1].id) {
      WorkflowErrorAlert("O último node não pode ser igual ao primeiro.");

      return;
    }


    const nodesPayload = nodesList.map((node, index) => ({
      originId: node.id,
      destinationId: index < nodesList.length - 1
        ? nodesList[index + 1].id
        : nodesList[0].id,
      approvals: node.parecer,
      direction: "AVANÇO",
    }));

    // Atualiza workflow
    const wPayload: Workflow = {
      application: workflow.application,
      graph: { nodes: nodesPayload },
    };

    mutateWorkflow(wPayload, {
      onSuccess: () => {
        toast.success("Workflow criado com sucesso!");
        handleLimpar();
      },
      onError: (err: any) => {
        WorkflowErrorAlert("Erro ao criar workflow: " + err?.message || "Erro desconhecido");
      },
    });
  };



  React.useEffect(() => {
    if (onChangeNodes) onChangeNodes([...nodesList]);
  }, [nodesList, onChangeNodes]);

  const handleAdicionar = () => {
    if (!selectedUnitId) return;
    if (nodesList.length >= 10) return;

    const lastNode = nodesList[nodesList.length - 1];
    const firstNode = nodesList[0];

    // Não permitir unidade repetida consecutiva
    if (lastNode && lastNode.id === Number(selectedUnitId)) {
      WorkflowErrorAlert("Não pode adicionar a mesma unidade consecutivamente.");
      return;
    }

    // Valida pareceres (exceto no primeiro node, que pode ser 0)
    if (nodesList.length > 0 && pareceres <= 0) {
      WorkflowErrorAlert("O número de pareceres deve ser maior que 0.");
      return;
    }

    // Não permitir que o último node seja igual ao primeiro (apenas se houver >1 node)
    if (nodesList.length > 1 && firstNode.id === Number(selectedUnitId)) {
      WorkflowErrorAlert("O último node não pode ser igual ao primeiro.");
      return;
    }



    const novoItem: NodeItem = {
      key: idCounter.current++,
      id: Number(selectedUnitId),
      holder: unitsData.find(u => u.id === Number(selectedUnitId))?.name || "",
      parecer: pareceres,
    };

    setNodesList(prev => [...prev, novoItem]);
  };


  const handleLimpar = () => {
    setSelectedUnitId(undefined);
    setPareceres(0);
    setNodesList([]);
    setSelectKey((prev) => prev + 1);
  };


  const podeAdicionar = !!selectedUnitId && nodesList.length < 10;
  const podeLimpar = nodesList.length > 0;

  if (unitsError) {
    return (<div>
      <QueryErrorDialog error={unitsError} refetch={refetchUnits} />
      <div>
        <Alert variant="destructive" className="max-w-xl w-full">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle>Erro:</AlertTitle>
          <AlertDescription>
            {useErrorMessage(unitsError)}
          </AlertDescription>
        </Alert>
      </div>
    </div>
    )
  }

  return (

    <Card className="flex flex-col opacity-90 w-full h-full">

      <CardHeader className=" flex flex-col ">
        <CardTitle className="text-sm font-semibold">Configuração do Workflow</CardTitle>
        <p className="text-xs text-gray-600">Indique os dados do workflow.</p>
      </CardHeader>


      <CardContent className="flex-1 overflow-auto ">
        <WorkflowForm
          value={workflow.application}
          onChange={(newApplication) =>
            setWorkflow((prev: any) => ({
              ...prev,
              application: newApplication,
            }))
          }
        />

        <FlowConfiguration
          units={unitsData}
          unitsError={unitsError}
          isLoadingUnits={isLoadingUnits}
          holder={selectedUnitId}
          onHolderChange={setSelectedUnitId}
          pareceres={pareceres}
          onPareceresChange={(val) => {
            let value = Math.min(5, Math.max(0, val));
            setPareceres(value);
          }}
          nodesList={nodesList}
          onAdicionar={handleAdicionar}
          podeAdicionar={podeAdicionar}
          listRef={listRef}
          key={selectKey}
          onNodesChange={setNodesList} selectKey={0} />



        <div className="h-[10%] flex  border-t items-center">
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
        </div>

      </CardContent>
      <WorkflowAlerts isPending={isPending} isSuccess={isSuccess} isError={isError} />

    </Card>

  );
}