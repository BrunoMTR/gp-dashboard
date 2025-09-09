import * as React from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "./StatusBadge";
import { Flow } from "./Flow";
import type { ProcessFlow } from "@/api/processes/types";


interface ProcessesTableProps {
  data: ProcessFlow[];
  search: string;
  setSearch: (v: string) => void;
  application: string;
  setApplication: (v: string) => void;
  dateFilter: string;
  setDateFilter: (v: string) => void;
  pageIndex: number;
  setPageIndex: (v: number) => void;
  pageSize: number;
}

export function ProcessesTable({
  data,
  search,
  setSearch,
  application,
  setApplication,
  dateFilter,
  setDateFilter,
  pageIndex,
  setPageIndex,
  pageSize,
}: ProcessesTableProps) {
  const [expandedRow, setExpandedRow] = React.useState<string | null>(null);

  // Lista de workflows únicos para o filtro de App
  const workflowOptions = React.useMemo(() => {
    const unique = new Set(data.map((d) => d.application.name));
    return Array.from(unique);
  }, [data]);

  // Total de páginas baseado no processCount
  const totalPages =
    data.length > 0 ? Math.ceil(data[0].processCount / pageSize) : 1;

  const columns: ColumnDef<ProcessFlow>[] = [
    {
      id: "expander",
      cell: ({ row }) => {
        const process = row.original;
        const isExpanded = expandedRow === process.id;
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpandedRow(isExpanded ? null : process.id)}
          >
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        );
      },
    },
    { accessorKey: "id", header: "Process" },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) =>
        new Date(row.original.createdAt).toLocaleString("pt-PT", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    { accessorKey: "createdBy", header: "Created By" },
    { accessorFn: (row) => row.unit.name, id: "unit", header: "At" },
    { accessorFn: (row) => row.application.name, id: "workflow", header: "Workflows" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full rounded-md border p-4 space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <Input
          placeholder="Pesquisar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select value={application} onValueChange={setApplication}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Aplicação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {workflowOptions.map((wf) => (
              <SelectItem key={wf} value={wf}>
                {wf}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Data" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as datas</SelectItem>
            <SelectItem value="last7">Últimos 7 dias</SelectItem>
            <SelectItem value="last30">Últimos 30 dias</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="max-h-[370px] overflow-y-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-semibold">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => {
                const process = row.original;
                const isExpanded = expandedRow === process.id;

                return (
                  <React.Fragment key={row.id}>
                    <TableRow>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                    {isExpanded && (
                      <TableRow>
                        <TableCell colSpan={columns.length}>
                          <div className="p-4 border rounded-md bg-muted/30">
                            <div className="flex justify-between items-center">
                              <p className="text-sm text-muted-foreground">
                                Fluxo detalhado do processo {process.id}
                              </p>
                              <div className="flex gap-4 text-xs">
                                <div className="flex items-center gap-1">
                                  <span className="w-3 h-3 rounded-sm bg-orange-500" />
                                  <span>CURRENT</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="w-3 h-3 rounded-sm bg-gray-400" />
                                  <span>APROVRD</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="w-3 h-3 rounded-sm bg-blue-500" />
                                  <span>TO APROVE</span>
                                </div>
                              
                            </div>
                          </div>
                          <div className="mt-2 h-80 border rounded-md bg-background">
                            <Flow nodes={process.nodes} edges={process.edges} />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                )
              }
                </React.Fragment>
          );
            })
          ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              Nenhum resultado encontrado.
            </TableCell>
          </TableRow>
          )}
        </TableBody>

      </Table>
    </div>
      {/* Pagination */ }
  <div className="flex items-center justify-between mt-4">
    <span className="text-sm text-muted-foreground">
      Página {pageIndex + 1} de {totalPages}
    </span>
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={pageIndex === 0}
        onClick={() => setPageIndex(Math.max(pageIndex - 1, 0))}
      >
        Anterior
      </Button>
      <Button
        variant="outline"
        size="sm"
        disabled={pageIndex >= totalPages - 1}
        onClick={() => setPageIndex(Math.min(pageIndex + 1, totalPages - 1))}
      >
        Próxima
      </Button>
    </div>
  </div>
    </div >
  );
}
