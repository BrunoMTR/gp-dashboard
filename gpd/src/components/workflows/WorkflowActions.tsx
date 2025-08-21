// import * as React from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Plus, GripVertical } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Label } from "@/components/ui/label";
// import SortableJS from "sortablejs";
// import { useCreateWorkflow, useCreateFlow } from "../../api/workflows/mutations";
// import { useGetUnitsOptions } from '../../api/units/queries'
// import { useQuery } from "@tanstack/react-query";
// import type { Unit } from "@/api/units/types";
// import type { Flow, WorkflowInput } from "@/api/workflows/types";
// import { AlertMutation } from "./alert"
// import { WorkflowForm } from "./WorkflowForm";


// export interface NodeItem {
//   id: number;
//   holder: string;
//   parecer: number;
// }

// interface WorkflowConfigurationProps {
//   onChangeNodes?: (nodes: NodeItem[]) => void;
// }


// export function WorkflowConfiguration({ onChangeNodes }: WorkflowConfigurationProps) {
//   const { mutate: mutateFlow } = useCreateFlow();

//   const { mutate: mutateWorkflow, isPending, isError, error, isSuccess } = useCreateWorkflow(
//     (workflowCriado) => {
//       // 🔹 quando workflow for criado com sucesso → cria o flow
//       const flowPayload: Flow = {
//         applicationId: workflowCriado.id, // id retornado do backend
//         nodes: nodesList.map((n) => ({
//           originId: n.id,
//           destinationId: n.id, // <-- aqui depende da tua lógica real
//           approvals: n.parecer,
//         })),
//       };

//       mutateFlow(flowPayload);
//     }
//   );

//   const handleSave = () => {
//     mutateWorkflow({ ...workflow });
//   };




//   const { data: unitsData = [], isLoading: isLoadingUnits, error: unitsError } =
//     useQuery(useGetUnitsOptions())

//   const [holder, setHolder] = React.useState<string | undefined>();
//   const [pareceres, setPareceres] = React.useState<number>(0);
//   const [nodesList, setNodesList] = React.useState<NodeItem[]>([]);
//   const [selectKey, setSelectKey] = React.useState<number>(0);
  

//   const listRef = React.useRef<HTMLDivElement>(null);
//   const idCounter = React.useRef(0);

// const [workflow, setWorkflow] = React.useState<WorkflowInput>({
//   name: "",
//   abbreviation: "",
//   applicationEmail: "",
//   team: "",
//   teamEmail: "",
// });


//   React.useEffect(() => {
//     if (!listRef.current) return;

//     const sortable = SortableJS.create(listRef.current, {
//       animation: 150,
//       ghostClass: "bg-gray-200/50",
//       handle: ".drag-handle",
//       onEnd: (evt) => {
//         setNodesList((prev) => {
//           const newList = [...prev];
//           const [movedItem] = newList.splice(evt.oldIndex!, 1);
//           newList.splice(evt.newIndex!, 0, movedItem);
//           return newList;
//         });
//       },
//     });

//     return () => sortable.destroy();
//   }, []);


//   React.useEffect(() => {
//     if (onChangeNodes) onChangeNodes([...nodesList]);
//   }, [nodesList, onChangeNodes]);

//   const handleAdicionar = () => {
//     if (!holder) return;
//     if (nodesList.length >= 10) return;

//     const novoItem: NodeItem = {
//       id: idCounter.current++,
//       holder,
//       parecer: pareceres,
//     };

//     setNodesList((prev) => [...prev, novoItem]);
//   };

//   const handleLimpar = () => {
//     setHolder(undefined);
//     setPareceres(0);
//     setNodesList([]);
//     setSelectKey((prev) => prev + 1);
//   };

//   const handlePareceresChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     let value = Number(e.target.value);
//     if (value < 0) value = 0;
//     if (value > 5) value = 5;
//     setPareceres(value);
//   };

//   const podeAdicionar = holder !== undefined && nodesList.length < 10;
//   const podeLimpar = nodesList.length > 0;
 

//   return (
//     <Card className="fixed right-10 w-[310px] h-[440px] flex flex-col z-50 shadow-lg opacity-90">

//       <CardHeader className=" px-4 flex flex-col gap-2">
//         <CardTitle className="text-base font-semibold">Configuração do Workflow</CardTitle>
//         <p className="text-xs text-gray-600">Indique os dados do workflow.</p>
//       </CardHeader>


//       <CardContent className="flex-1 overflow-y-auto px-4 flex flex-col gap-4">

//         <div className="flex gap-2">
//           <Input type="text" placeholder="Nome" maxLength={50} className="flex-1"
//             onChange={(e) => setWorkflow((prev) => ({ ...prev, name: e.target.value }))} />
//           <Input type="text" placeholder="Abreviação" maxLength={15} className="w-28"
//             onChange={(e) => setWorkflow((prev) => ({ ...prev, abbreviation: e.target.value }))} />
//         </div>


//         <Input type="email" placeholder="Application Email" className="w-full"
//           onChange={(e) => setWorkflow((prev) => ({ ...prev, applicationEmail: e.target.value }))} />


//         <div className="flex gap-2">
//           <Input type="text" placeholder="Team" className="flex-1"
//             onChange={(e) => setWorkflow((prev) => ({ ...prev, team: e.target.value }))} />
//           <Input type="email" placeholder="Team Email" className="flex-1"
//             onChange={(e) => setWorkflow((prev) => ({ ...prev, teamEmail: e.target.value }))} />
//         </div>

//         <div>
//           <h2 className="text-sm font-semibold mb-0.5">Configuração do Flow</h2>
//           <p className="text-xs text-gray-600 mb-2">
//             Selecione o holder e indique o número de pareceres necessários.
//           </p>

//           <div className="flex gap-2 items-end">
//             <div className="flex-1 flex flex-col gap-1">
//               <Label htmlFor="holder" className="text-xs font-medium">Holder</Label>
//               <Select key={selectKey} value={holder} onValueChange={setHolder}>
//                 <SelectTrigger className="w-full min-w-[150px] max-w-[150px]">
//                   <SelectValue placeholder={isLoadingUnits ? "Carregando Units..." : "Selecionar Unit"} />
//                 </SelectTrigger>
//                 <SelectContent className="w-full min-w-[150px] max-w-[150px]">
//                   {unitsError && <span className="text-red-500 text-xs">Erro ao carregar Units</span>}
//                   {isLoadingUnits && <span className="text-xs">Carregando...</span>}
//                   {!isLoadingUnits &&
//                     unitsData.map((unit: Unit) => (
//                       <SelectItem key={unit.id} value={unit.name}>
//                         {unit.name}
//                       </SelectItem>
//                     ))
//                   }
//                 </SelectContent>
//               </Select>

//             </div>

//             <div className="w-16 flex flex-col gap-1">
//               <Label htmlFor="pareceres" className="text-xs font-medium text-right">Pareceres</Label>
//               <Input
//                 id="pareceres"
//                 type="number"
//                 value={pareceres}
//                 onChange={handlePareceresChange}
//                 placeholder="0-5"
//                 min={0}
//                 max={5}
//               />
//             </div>

//             <Button
//               onClick={handleAdicionar}
//               className="p-0 flex justify-center items-center"
//               disabled={!podeAdicionar}
//             >
//               <Plus className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>


//         <div>
//           <h2 className="text-sm font-semibold mb-0.5">Nós Criados</h2>
//           <p className="text-xs text-gray-600 mb-1">
//             Lista dos nós atualmente adicionados ao fluxo.
//           </p>

//           <div ref={listRef} className="flex flex-col gap-1">
//             {nodesList.map((node) => (
//               <div
//                 key={node.id}
//                 className="flex items-center justify-between text-xs cursor-default"
//               >
//                 <span className="overflow-hidden whitespace-nowrap text-ellipsis">
//                   {node.holder} - {node.parecer} parecer{node.parecer === 1 ? "" : "es"}
//                 </span>
//                 <GripVertical className="drag-handle w-4 h-4 text-gray-500 cursor-grab hover:cursor-grab" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </CardContent>


//       <CardContent className="h-[10%] py-1 px-4 flex gap-2 border-t items-center">
//         <Button className="flex-1 text-xs h-7" onClick={handleSave} disabled={isPending}>
//           {isPending ? "Salvando..." : "Salvar"}
//         </Button>


//         <Button
//           variant="outline"
//           onClick={handleLimpar}
//           className="flex-1 text-xs h-7"
//           disabled={!podeLimpar}
//         >
//           Limpar
//         </Button>
//       </CardContent>

//       {isPending && (
//         <AlertMutation status="loading" message="Salvando workflow..." />
//       )}
//       {isSuccess && (
//         <AlertMutation status="success" message="Workflow criado com sucesso!" />
//       )}
//       {isError && (
//         <AlertMutation status="error" message={error?.message || "Falha ao criar workflow"} />
//       )}
//     </Card>

//   );
// }  pretendo tirar essa parte para outro componente:         <div className="flex gap-2">
//           <Input type="text" placeholder="Nome" maxLength={50} className="flex-1"
//             onChange={(e) => setWorkflow((prev) => ({ ...prev, name: e.target.value }))} />
//           <Input type="text" placeholder="Abreviação" maxLength={15} className="w-28"
//             onChange={(e) => setWorkflow((prev) => ({ ...prev, abbreviation: e.target.value }))} />
//         </div>


//         <Input type="email" placeholder="Application Email" className="w-full"
//           onChange={(e) => setWorkflow((prev) => ({ ...prev, applicationEmail: e.target.value }))} />


//         <div className="flex gap-2">
//           <Input type="text" placeholder="Team" className="flex-1"
//             onChange={(e) => setWorkflow((prev) => ({ ...prev, team: e.target.value }))} />
//           <Input type="email" placeholder="Team Email" className="flex-1"
//             onChange={(e) => setWorkflow((prev) => ({ ...prev, teamEmail: e.target.value }))} />
//         </div> criei o componente e ficou assim: import { Input } from "@/components/ui/input";
// import type { WorkflowInput } from "@/api/workflows/types";

// interface Props {
//   value: WorkflowInput;
//   onChange: (value: WorkflowInput) => void;
// }

// export function WorkflowForm({ value, onChange }: Props) {
//   return (
//     <>
//       <div className="flex gap-2">
//         <Input
//           type="text"
//           placeholder="Nome"
//           maxLength={50}
//           className="flex-1"
//           onChange={(e) => onChange({ ...value, name: e.target.value })}
//         />
//         <Input
//           type="text"
//           placeholder="Abreviação"
//           maxLength={15}
//           className="w-28"
//           onChange={(e) => onChange({ ...value, abbreviation: e.target.value })}
//         />
//       </div>

//       <Input
//         type="email"
//         placeholder="Application Email"
//         className="w-full"
//         onChange={(e) => onChange({ ...value, applicationEmail: e.target.value })}
//       />

//       <div className="flex gap-2">
//         <Input
//           type="text"
//           placeholder="Team"
//           className="flex-1"
//           onChange={(e) => onChange({ ...value, team: e.target.value })}
//         />
//         <Input
//           type="email"
//           placeholder="Team Email"
//           className="flex-1"
//           onChange={(e) => onChange({ ...value, teamEmail: e.target.value })}
//         />
//       </div>
//     </>
//   );
// } 