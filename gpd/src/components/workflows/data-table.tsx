import * as React from "react"
import {
   type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Input } from "../ui/input"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
}

export function DataTable<TData, TValue>({ columns, data, isLoading, onRowClick }: DataTableProps<TData, TValue>& { onRowClick?: (row: TData) => void }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    }
  })

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-0"> 
        <ScrollArea className="h-115 w-90">
          <Table>
    
            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow 
                    key={row.id}
                    className="cursor-pointer"
                    onClick={() => onRowClick?.(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                 !isLoading && (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center py-10">
                      SEM RESULTADOS.
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      <div className="p-2 border-t">
        <Input
          placeholder="Filtrar workflow..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
          className="w-full"
          disabled={data.length === 0}
        />
      </div>
    </div>
  )
}

