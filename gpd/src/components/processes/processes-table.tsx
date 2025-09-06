// components/ProcessesTable.tsx
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
import { StatusBadge, type Status } from "./StatusBadge";
import { ProcessFlow, type Node, type Edge } from "./ProcessFlow";

export type Process = {
  id: string;
  createdAt: string;
  createdBy: string;
  at: string;
  workflows: string;
  status: Status;
  nodes: Node[];
  edges: Edge[];
};

interface ProcessesTableProps {
  data: Process[];
}

export function ProcessesTable({ data }: ProcessesTableProps) {
  const [expandedRow, setExpandedRow] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState("");
  const [appFilter, setAppFilter] = React.useState("all");
  const [dateFilter, setDateFilter] = React.useState("all");
  const [page, setPage] = React.useState(0);
  const pageSize = 10;

  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        search === "" ||
        item.id.includes(search) ||
        item.createdBy.toLowerCase().includes(search.toLowerCase()) ||
        item.workflows.toLowerCase().includes(search.toLowerCase());

      const matchesApp = appFilter === "all" || item.at === appFilter;

      const matchesDate =
        dateFilter === "all" ||
        (dateFilter === "last7" &&
          new Date(item.createdAt) >= new Date(Date.now() - 7 * 86400000)) ||
        (dateFilter === "last30" &&
          new Date(item.createdAt) >= new Date(Date.now() - 30 * 86400000));

      return matchesSearch && matchesApp && matchesDate;
    });
  }, [data, search, appFilter, dateFilter]);

  const paginatedData = React.useMemo(() => {
    const start = page * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const columns: ColumnDef<Process>[] = [
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
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        );
      },
    },
    { accessorKey: "id", header: "ID" },
    { accessorKey: "createdAt", header: "Created At" },
    { accessorKey: "createdBy", header: "Created By" },
    { accessorKey: "at", header: "At" },
    { accessorKey: "workflows", header: "Workflows" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
  ];

  const table = useReactTable({
    data: paginatedData,
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
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          className="max-w-xs"
        />
        <Select
          value={appFilter}
          onValueChange={(v) => {
            setAppFilter(v);
            setPage(0);
          }}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Aplicação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="App-1">App-1</SelectItem>
            <SelectItem value="App-2">App-2</SelectItem>
            <SelectItem value="App-3">App-3</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={dateFilter}
          onValueChange={(v) => {
            setDateFilter(v);
            setPage(0);
          }}
        >
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

      {/* Table */}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="font-semibold">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
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
                          <p className="text-sm text-muted-foreground">
                            Fluxo detalhado do processo {process.id}
                          </p>
                          <div className="mt-2 h-80 border rounded-md bg-background">
                            <ProcessFlow nodes={process.nodes} edges={process.edges} />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
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

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-muted-foreground">
          Página {page + 1} de {totalPages || 1}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
}