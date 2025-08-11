'use client'

import * as React from 'react'
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  MoreHorizontal,
  Edit,
  Trash,
  Copy,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Filter,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { Checkbox } from './checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from './context-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './popover'
import { Tooltip } from './tooltip'

export interface Column<T> {
  id: string
  header: string | React.ReactNode
  accessor?: keyof T | ((row: T) => any)
  cell?: (row: T, value: any) => React.ReactNode
  sortable?: boolean
  filterable?: boolean
  width?: string | number
  align?: 'left' | 'center' | 'right'
  truncate?: boolean
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  pageSize?: number
  selectable?: boolean
  searchable?: boolean
  filterable?: boolean
  onRowClick?: (row: T) => void
  onRowEdit?: (row: T) => void
  onRowDelete?: (row: T) => void
  onSelectionChange?: (selectedRows: T[]) => void
  className?: string
  striped?: boolean
  hoverable?: boolean
  bordered?: boolean
  compact?: boolean
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  pageSize = 10,
  selectable = true,
  searchable = true,
  filterable = true,
  onRowClick,
  onRowEdit,
  onRowDelete,
  onSelectionChange,
  className,
  striped = true,
  hoverable = true,
  bordered = true,
  compact = false,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = React.useState<Set<number>>(new Set())
  const [sortConfig, setSortConfig] = React.useState<{
    key: string
    direction: 'asc' | 'desc'
  } | null>(null)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [columnFilters, setColumnFilters] = React.useState<Record<string, string>>({})
  const [editingCell, setEditingCell] = React.useState<{
    rowIndex: number
    columnId: string
  } | null>(null)
  const [editValue, setEditValue] = React.useState('')

  // Filter data based on search and column filters
  const filteredData = React.useMemo(() => {
    let filtered = [...data]

    // Global search
    if (searchTerm) {
      filtered = filtered.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // Column filters
    Object.entries(columnFilters).forEach(([columnId, filterValue]) => {
      if (filterValue) {
        const column = columns.find((col) => col.id === columnId)
        if (column) {
          filtered = filtered.filter((row) => {
            const value = column.accessor
              ? typeof column.accessor === 'function'
                ? column.accessor(row)
                : row[column.accessor as keyof T]
              : row[columnId]
            return String(value).toLowerCase().includes(filterValue.toLowerCase())
          })
        }
      }
    })

    return filtered
  }, [data, searchTerm, columnFilters, columns])

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return filteredData

    const sorted = [...filteredData].sort((a, b) => {
      const column = columns.find((col) => col.id === sortConfig.key)
      if (!column) return 0

      const aValue = column.accessor
        ? typeof column.accessor === 'function'
          ? column.accessor(a)
          : a[column.accessor as keyof T]
        : a[sortConfig.key]
      const bValue = column.accessor
        ? typeof column.accessor === 'function'
          ? column.accessor(b)
          : b[column.accessor as keyof T]
        : b[sortConfig.key]

      if (aValue === null || aValue === undefined) return 1
      if (bValue === null || bValue === undefined) return -1

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })

    return sorted
  }, [filteredData, sortConfig, columns])

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / pageSize)
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  // Handle sorting
  const handleSort = (columnId: string) => {
    setSortConfig((current) => {
      if (current?.key === columnId) {
        if (current.direction === 'asc') {
          return { key: columnId, direction: 'desc' }
        } else if (current.direction === 'desc') {
          return null
        }
      }
      return { key: columnId, direction: 'asc' }
    })
  }

  // Handle selection
  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(paginatedData.map((_, index) => index)))
    }
  }

  const handleSelectRow = (index: number) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(index)) {
      newSelected.delete(index)
    } else {
      newSelected.add(index)
    }
    setSelectedRows(newSelected)
    
    if (onSelectionChange) {
      const selectedData = paginatedData.filter((_, i) => newSelected.has(i))
      onSelectionChange(selectedData)
    }
  }

  // Handle cell editing
  const handleCellEdit = (rowIndex: number, columnId: string, value: any) => {
    setEditingCell({ rowIndex, columnId })
    setEditValue(String(value))
  }

  const handleCellSave = () => {
    // Here you would typically update the data
    setEditingCell(null)
    setEditValue('')
  }

  const getCellValue = (row: T, column: Column<T>) => {
    if (column.accessor) {
      return typeof column.accessor === 'function'
        ? column.accessor(row)
        : row[column.accessor as keyof T]
    }
    return row[column.id]
  }

  const renderCell = (row: T, column: Column<T>, rowIndex: number) => {
    const value = getCellValue(row, column)
    const isEditing = editingCell?.rowIndex === rowIndex && editingCell?.columnId === column.id

    if (isEditing) {
      return (
        <input
          className="w-full px-2 py-1 text-sm border rounded"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleCellSave}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCellSave()
            if (e.key === 'Escape') setEditingCell(null)
          }}
          autoFocus
        />
      )
    }

    if (column.cell) {
      return column.cell(row, value)
    }

    const content = String(value ?? '')
    
    if (column.truncate && content.length > 30) {
      return (
        <Tooltip content={content}>
          <span className="truncate block">{content}</span>
        </Tooltip>
      )
    }

    return content
  }

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Search and Filter Bar */}
      {(searchable || filterable) && (
        <div className="flex items-center justify-between gap-4">
          {searchable && (
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                className="w-full pl-9 pr-9 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setSearchTerm('')}
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
          )}
          {filterable && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  {Object.values(columnFilters).some(Boolean) && (
                    <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                      {Object.values(columnFilters).filter(Boolean).length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Column Filters</h4>
                  {columns
                    .filter((col) => col.filterable !== false)
                    .map((column) => (
                      <div key={column.id} className="space-y-2">
                        <label className="text-sm font-medium">
                          {typeof column.header === 'string' ? column.header : column.id}
                        </label>
                        <input
                          className="w-full px-3 py-1 text-sm border rounded-md"
                          placeholder={`Filter ${typeof column.header === 'string' ? column.header : column.id}...`}
                          value={columnFilters[column.id] || ''}
                          onChange={(e) =>
                            setColumnFilters((prev) => ({
                              ...prev,
                              [column.id]: e.target.value,
                            }))
                          }
                        />
                      </div>
                    ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setColumnFilters({})}
                  >
                    Clear Filters
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      )}

      {/* Table */}
      <div className={cn("rounded-md", bordered && "border")}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                {selectable && (
                  <th className={cn("w-12", compact ? "p-2" : "p-3")}>
                    <Checkbox
                      checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                      indeterminate={selectedRows.size > 0 && selectedRows.size < paginatedData.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.id}
                    className={cn(
                      "font-medium text-left",
                      compact ? "p-2 text-xs" : "p-3 text-sm",
                      column.align === 'center' && "text-center",
                      column.align === 'right' && "text-right",
                      column.sortable !== false && "cursor-pointer select-none hover:bg-muted/50"
                    )}
                    style={{ width: column.width }}
                    onClick={() => column.sortable !== false && handleSort(column.id)}
                  >
                    <div className="flex items-center gap-2">
                      {typeof column.header === 'string' ? column.header : column.header}
                      {column.sortable !== false && (
                        <span className="ml-auto">
                          {sortConfig?.key === column.id ? (
                            sortConfig.direction === 'asc' ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )
                          ) : (
                            <ChevronsUpDown className="h-4 w-4 opacity-50" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                <th className={cn("w-12", compact ? "p-2" : "p-3")}></th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, rowIndex) => (
                <ContextMenu key={rowIndex}>
                  <ContextMenuTrigger asChild>
                    <tr
                      className={cn(
                        "border-b transition-colors",
                        striped && rowIndex % 2 === 1 && "bg-muted/30",
                        hoverable && "hover:bg-muted/50",
                        onRowClick && "cursor-pointer",
                        selectedRows.has(rowIndex) && "bg-primary/10"
                      )}
                      onClick={() => onRowClick?.(row)}
                    >
                      {selectable && (
                        <td className={cn("w-12", compact ? "p-2" : "p-3")}>
                          <Checkbox
                            checked={selectedRows.has(rowIndex)}
                            onCheckedChange={() => handleSelectRow(rowIndex)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </td>
                      )}
                      {columns.map((column) => (
                        <td
                          key={column.id}
                          className={cn(
                            compact ? "p-2 text-xs" : "p-3 text-sm",
                            column.align === 'center' && "text-center",
                            column.align === 'right' && "text-right"
                          )}
                          onDoubleClick={() => handleCellEdit(rowIndex, column.id, getCellValue(row, column))}
                        >
                          {renderCell(row, column, rowIndex)}
                        </td>
                      ))}
                      <td className={cn("w-12", compact ? "p-2" : "p-3")}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onRowEdit?.(row)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Export
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => onRowDelete?.(row)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuLabel>Row Actions</ContextMenuLabel>
                    <ContextMenuSeparator />
                    <ContextMenuItem onClick={() => onRowEdit?.(row)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Row
                    </ContextMenuItem>
                    <ContextMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Row
                    </ContextMenuItem>
                    <ContextMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem
                      className="text-destructive"
                      onClick={() => onRowDelete?.(row)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Row
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {((currentPage - 1) * pageSize) + 1} to{' '}
          {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} results
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber
              if (totalPages <= 5) {
                pageNumber = i + 1
              } else if (currentPage <= 3) {
                pageNumber = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i
              } else {
                pageNumber = currentPage - 2 + i
              }
              
              return (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              )
            })}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}