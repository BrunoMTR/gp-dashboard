import { createFileRoute } from "@tanstack/react-router"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"

import {
  useTopWorkflows,
  useProcessStatusPerWorkflow,
  useProcessStatusPerUnit,
  useTopUnits,
  useProcessDurationByWorkflow,
} from "../../api/Dashboard/queries"

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
})

const chartConfig = {
  initiated: { label: "INITIETED", color: "var(--chart-1)" },
  pending: { label: "PENDING", color: "var(--chart-2)" },
  concluded: { label: "CONCLUDED", color: "var(--chart-3)" },
  canceled: { label: "CANCELED", color: "var(--chart-4)" },
} satisfies ChartConfig

function RouteComponent() {
  const { data: workflows } = useTopWorkflows(5)
  const { data: statusByWorkflow } = useProcessStatusPerWorkflow()
  const { data: statusByUnit } = useProcessStatusPerUnit()
  const { data: topUnits } = useTopUnits(5)
  const { data: duration } = useProcessDurationByWorkflow(6)

  // --- TRANSFORMS ---

  const pieData =
    workflows?.map(w => ({
      name: w.workflowName ?? "Sem nome",
      value: w.totalProcesses ?? 0,
    })) ?? []

  const stackedData =
    statusByWorkflow?.map(w => {
      const statuses = w.statuses ?? []

      return {
        name: w.name ?? "Sem nome",
        initiated: statuses.find(s => s.status === "Initiated")?.count ?? 0,
        pending: statuses.find(s => s.status === "Pending")?.count ?? 0,
        concluded: statuses.find(s => s.status === "Concluded")?.count ?? 0,
        canceled: statuses.find(s => s.status === "Canceled")?.count ?? 0,
      }
    }) ?? []

  const donutData =
    statusByUnit?.reduce(
      (acc, unit) => {
        const statuses = unit.statuses ?? []

        statuses.forEach(s => {
          if (s.status === "Initiated") acc[0].value += s.count
          if (s.status === "Pending") acc[1].value += s.count
          if (s.status === "Concluded") acc[2].value += s.count
          if (s.status === "Canceled") acc[3].value += s.count
        })

        return acc
      },
      [
        { name: "Initiated", value: 0 },
        { name: "Pending", value: 0 },
        { name: "Concluded", value: 0 },
        { name: "Canceled", value: 0 },
      ]
    ) ?? []

  const radarData =
    topUnits?.map(u => ({
      unit: u.workflowName ?? "Sem nome",
      processos: u.totalProcesses ?? 0,
    })) ?? []

  const lineData =
    duration?.map(d => ({
      workflow: d.workflowName ?? "Sem nome",
      total: d.averageDurationHours ?? 0,
    })) ?? []

  // --- RENDER ---

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
      {/* PIE – PROCESSOS POR WORKFLOW */}
      <Card>
        <CardHeader className="items-center pb-0">
          <CardTitle>Processos por Workflow</CardTitle>
          <CardDescription>Distribuição total</CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center">
          <ChartContainer config={chartConfig} className="w-[220px] h-[220px]">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" label />
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* STACKED BAR – STATUS POR WORKFLOW */}
      <Card>
        <CardHeader>
          <CardTitle>Status por Workflow</CardTitle>
          <CardDescription>Distribuição de estados</CardDescription>
        </CardHeader>

        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart data={stackedData}>
              <XAxis dataKey="name" />
              <Bar dataKey="initiated" stackId="a" fill="var(--chart-1)" />
              <Bar dataKey="pending" stackId="a" fill="var(--chart-2)" />
              <Bar dataKey="concluded" stackId="a" fill="var(--chart-3)" />
              <Bar dataKey="canceled" stackId="a" fill="var(--chart-3)" />
              <ChartTooltip content={<ChartTooltipContent />} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* LINE – DURAÇÃO MÉDIA */}
      <Card>
        <CardHeader>
          <CardTitle>Duração Média</CardTitle>
          <CardDescription>Por workflow (horas)</CardDescription>
        </CardHeader>

        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart data={lineData}>
              <XAxis dataKey="workflow" />
              <Line dataKey="total" stroke="var(--chart-4)" strokeWidth={2} />
              <ChartTooltip content={<ChartTooltipContent />} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* DONUT – ESTADOS GLOBAIS */}
      <Card>
        <CardHeader className="items-center pb-0">
          <CardTitle>Estados dos Processos</CardTitle>
          <CardDescription>Visão global</CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center">
          <ChartContainer config={chartConfig} className="w-[220px] h-[220px]">
            <PieChart>
              <Pie
                data={donutData}
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                paddingAngle={5}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* RADAR – TOP UNIDADES */}
      <Card className="md:col-span-2 xl:col-span-1">
        <CardHeader>
          <CardTitle>Unidades Mais Ativas</CardTitle>
          <CardDescription>Total de processos</CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center">
          <ChartContainer config={chartConfig} className="w-[220px] h-[220px]">
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="unit" />
              <PolarRadiusAxis />
              <Radar
                dataKey="processos"
                stroke="var(--chart-3)"
                fill="var(--chart-3)"
                fillOpacity={0.6}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
