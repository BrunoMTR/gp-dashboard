import * as React from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDownloadDoc } from '../../api/processes/queries';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import { FileText, FileSpreadsheet, User } from "lucide-react";

import type { Document } from "@/api/processes/types";
import type { Application } from "@/api/workflows/types";
import { Spinner } from "../ui/spinner";

interface DocsTableProps {
  data: Document[];
  search: string;
  setSearch: (v: string) => void;
  application: number;
  setApplication: (v: number) => void;
  dateFilter: string;
  setDateFilter: (v: string) => void;
  pageIndex: number;
  setPageIndex: (v: number) => void;
  pageSize: number;
  totalCount: number;
  workflows: Application[];
}

export function Docs({
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
  totalCount,
  workflows,
}: DocsTableProps) {
  const { mutate: downloadDoc } = useDownloadDoc();
  const columns = React.useMemo<ColumnDef<Document>[]>(() => [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <span>{row.getValue("id")}</span>,
    },
    {
      accessorKey: "fileName",
      header: "Ficheiro",
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("fileName")}</span>
      ),
    },
    {
      accessorKey: "fileType",
      header: "Tipo",
      cell: ({ row }) => {
        const type = row.getValue("fileType") as string;
        return (
          <div className="flex items-center gap-2">
            {type === "pdf" && <FileText className="h-4 w-4 text-red-600" />}
            {type === "excel" && (
              <FileSpreadsheet className="h-4 w-4 text-green-600" />
            )}
            <span className="capitalize">{type}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "uploadedBy",
      header: "Carregado por",
      cell: ({ row }) => {
        const name: string = row.getValue("uploadedBy");
        return (
          <div className="flex items-center gap-1">
            <User className="w-4 h-4 text-muted-foreground" />
            <span>{name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "uploadedAt",
      header: "Data upload",
      cell: ({ row }) => {
        const date = new Date(row.getValue("uploadedAt"));
        return <Badge variant="secondary">{date.toLocaleString()}</Badge>;
      },
    },
    {
      accessorKey: "processId",
      header: "Processo",
      cell: ({ row }) => <span>{row.getValue("processId")}</span>,
    },

    {
      id: "Actions",
      header: "Actions",
      cell: ({ row }) => {
        const document = row.original;
        const downloadMutation = useDownloadDoc();

        return (
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              downloadMutation.mutate({
                documentId: document.id,
                fileName: document.fileName,
                fileType: document.fileType,
              })
            }

          >

            Download

          </Button>
        );
      },
    }

  ], [downloadDoc]);

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const workflowOptions = React.useMemo(() => {
    if (!workflows) return [];
    return workflows.map((wf) => ({
      id: wf.id!,
      name: wf.name,
    }));
  }, [workflows]);

  const totalPages =
    totalCount > 0 ? Math.ceil(totalCount / pageSize) : 1;

  return (
    <div className="w-full rounded-md border p-4 space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Input
          placeholder="Pesquisar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />

        <Select
          value={application === 0 ? "all" : application.toString()}
          onValueChange={(v) => {
            setApplication(v === "all" ? 0 : Number(v));
            setPageIndex(0);
          }}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Aplicação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {workflowOptions.map((wf) => (
              <SelectItem key={wf.id} value={wf.id.toString()}>
                {wf.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filtro de data */}
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
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum documento encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

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
            onClick={() =>
              setPageIndex(Math.min(pageIndex + 1, totalPages - 1))
            }
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
}
