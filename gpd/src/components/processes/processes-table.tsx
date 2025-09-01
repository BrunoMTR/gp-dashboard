"use client"

import * as React from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export type Process = {
  id: string
  createdAt: string
  createdBy: string
  at: string
  workflows: string
}

// 🔹 Função para simular carregamento de mais dados
function generateMoreData(start: number, count: number): Process[] {
  return Array.from({ length: count }, (_, i) => ({
    id: (start + i + 1).toString(),
    createdAt: new Date().toISOString(),
    createdBy: `User ${start + i + 1}`,
    at: `Server-${(start + i + 1).toString().padStart(2, "0")}`,
    workflows: `Workflow ${String.fromCharCode(65 + ((start + i) % 26))}`,
  }))
}

export const columns: ColumnDef<Process>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "createdAt", header: "Created At" },
  { accessorKey: "createdBy", header: "Created By" },
  { accessorKey: "at", header: "At" },
  { accessorKey: "workflows", header: "Workflows" },
  {
    id: "actions",
    cell: ({ row }) => {
      const process = row.original
      return (
        <Button
          variant="outline"
          size="sm"
          onClick={() => alert(`Visualizar processo ${process.id}`)}
        >
          View
        </Button>
      )
    },
  },
]

export function ProcessesTable() {
  const [data, setData] = React.useState<Process[]>(() => generateMoreData(0, 20))
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  // 🔹 Detecta scroll no container
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleScroll = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
        // Carregar mais dados quando chega perto do fundo
        setData((prev) => [...prev, ...generateMoreData(prev.length, 20)])
      }
    }

    el.addEventListener("scroll", handleScroll)
    return () => el.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full overflow-y-auto rounded-md border">
      <Table>
        {/* 🔹 Cabeçalho fixo */}
        <TableHeader className="sticky top-0  shadow z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        {/* 🔹 Corpo com scroll infinito */}
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
