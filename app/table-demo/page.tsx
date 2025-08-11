'use client'

import React from 'react'
import { DataTable, Column } from '@/components/ui/primitives/data-table'
import { Button } from '@/components/ui/primitives/button'
import { Badge } from '@/components/ui/primitives/button'
import { 
  User, 
  Mail, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Activity
} from 'lucide-react'

// Sample data types
interface Employee {
  id: number
  name: string
  email: string
  role: string
  department: string
  status: 'active' | 'inactive' | 'pending'
  salary: number
  performance: number
  joinDate: string
  lastActive: string
  projects: number
  avatar: string
}

// Generate sample data
const generateEmployees = (count: number): Employee[] => {
  const departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations']
  const roles = ['Manager', 'Senior Developer', 'Developer', 'Designer', 'Analyst', 'Consultant']
  const statuses: ('active' | 'inactive' | 'pending')[] = ['active', 'inactive', 'pending']
  const firstNames = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana', 'Eve', 'Frank']
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis']
  
  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    return {
      id: i + 1,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      role: roles[Math.floor(Math.random() * roles.length)],
      department: departments[Math.floor(Math.random() * departments.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      salary: Math.floor(Math.random() * 100000) + 50000,
      performance: Math.floor(Math.random() * 100),
      joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      lastActive: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      projects: Math.floor(Math.random() * 10) + 1,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${lastName}`
    }
  })
}

export default function TableDemoPage() {
  const [employees] = React.useState(generateEmployees(50))
  const [selectedEmployees, setSelectedEmployees] = React.useState<Employee[]>([])

  // Define table columns
  const columns: Column<Employee>[] = [
    {
      id: 'avatar',
      header: '',
      accessor: 'avatar',
      width: 50,
      sortable: false,
      filterable: false,
      cell: (row, value) => (
        <img
          src={value}
          alt={row.name}
          className="h-8 w-8 rounded-full"
        />
      ),
    },
    {
      id: 'name',
      header: (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Name
        </div>
      ),
      accessor: 'name',
      sortable: true,
      filterable: true,
      cell: (row) => (
        <div className="font-medium">{row.name}</div>
      ),
    },
    {
      id: 'email',
      header: (
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Email
        </div>
      ),
      accessor: 'email',
      sortable: true,
      filterable: true,
      truncate: true,
    },
    {
      id: 'role',
      header: 'Role',
      accessor: 'role',
      sortable: true,
      filterable: true,
      cell: (row) => (
        <div className="text-sm">
          <div className="font-medium">{row.role}</div>
          <div className="text-muted-foreground">{row.department}</div>
        </div>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessor: 'status',
      sortable: true,
      filterable: true,
      align: 'center',
      cell: (row) => {
        const statusConfig = {
          active: { label: 'Active', icon: CheckCircle, color: 'text-green-500 bg-green-50 border-green-200' },
          inactive: { label: 'Inactive', icon: XCircle, color: 'text-gray-500 bg-gray-50 border-gray-200' },
          pending: { label: 'Pending', icon: Clock, color: 'text-yellow-500 bg-yellow-50 border-yellow-200' },
        }
        const config = statusConfig[row.status]
        const Icon = config.icon
        return (
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
            <Icon className="h-3 w-3" />
            {config.label}
          </span>
        )
      },
    },
    {
      id: 'salary',
      header: (
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          Salary
        </div>
      ),
      accessor: 'salary',
      sortable: true,
      filterable: true,
      align: 'right',
      cell: (row, value) => (
        <span className="font-medium">
          ${value.toLocaleString()}
        </span>
      ),
    },
    {
      id: 'performance',
      header: (
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Performance
        </div>
      ),
      accessor: 'performance',
      sortable: true,
      filterable: true,
      align: 'center',
      cell: (row, value) => {
        const color = value >= 80 ? 'bg-green-500' : value >= 60 ? 'bg-yellow-500' : 'bg-red-500'
        return (
          <div className="flex items-center gap-2">
            <div className="w-20 bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${color}`}
                style={{ width: `${value}%` }}
              />
            </div>
            <span className="text-xs font-medium">{value}%</span>
          </div>
        )
      },
    },
    {
      id: 'projects',
      header: 'Projects',
      accessor: 'projects',
      sortable: true,
      align: 'center',
      cell: (row, value) => (
        <div className="flex items-center justify-center gap-1">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      id: 'joinDate',
      header: (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Join Date
        </div>
      ),
      accessor: 'joinDate',
      sortable: true,
      filterable: true,
      cell: (row, value) => {
        const date = new Date(value)
        return date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        })
      },
    },
  ]

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Data Table Component</h1>
        <p className="text-muted-foreground">
          A comprehensive data table with sorting, filtering, pagination, selection, and actions
        </p>
      </div>

      {/* Selected Employees Info */}
      {selectedEmployees.length > 0 && (
        <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                {selectedEmployees.length} employee{selectedEmployees.length > 1 ? 's' : ''} selected
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Total salary: ${selectedEmployees.reduce((sum, emp) => sum + emp.salary, 0).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </Button>
              <Button size="sm" variant="outline">
                Export Selected
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Basic Table */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Full Featured Table</h2>
          <p className="text-sm text-muted-foreground">
            All features enabled: sorting, filtering, search, selection, actions, and pagination
          </p>
        </div>
        
        <DataTable
          data={employees}
          columns={columns}
          pageSize={10}
          selectable={true}
          searchable={true}
          filterable={true}
          striped={true}
          hoverable={true}
          bordered={true}
          onSelectionChange={setSelectedEmployees}
          onRowEdit={(row) => {
            alert(`Edit employee: ${row.name}`)
          }}
          onRowDelete={(row) => {
            if (confirm(`Delete employee: ${row.name}?`)) {
              console.log('Deleting:', row)
            }
          }}
        />
      </section>

      {/* Compact Table */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Compact Table</h2>
          <p className="text-sm text-muted-foreground">
            Compact mode with reduced padding for dense data display
          </p>
        </div>
        
        <DataTable
          data={employees.slice(0, 5)}
          columns={columns.slice(0, 5)}
          pageSize={5}
          selectable={false}
          searchable={false}
          filterable={false}
          striped={false}
          hoverable={true}
          bordered={true}
          compact={true}
        />
      </section>

      {/* Minimal Table */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Minimal Table</h2>
          <p className="text-sm text-muted-foreground">
            Borderless design with minimal features
          </p>
        </div>
        
        <DataTable
          data={employees.slice(0, 5)}
          columns={[
            columns[1], // name
            columns[2], // email
            columns[4], // status
            columns[5], // salary
          ]}
          pageSize={5}
          selectable={false}
          searchable={false}
          filterable={false}
          striped={false}
          hoverable={false}
          bordered={false}
        />
      </section>

      {/* Features Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <h3 className="font-semibold">Row Selection</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Select individual rows or all rows with checkboxes
            </p>
          </div>
          
          <div className="p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold">Column Sorting</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Click column headers to sort ascending, descending, or reset
            </p>
          </div>
          
          <div className="p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-5 w-5 text-purple-500" />
              <h3 className="font-semibold">Filtering</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Global search and per-column filtering
            </p>
          </div>
          
          <div className="p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              <h3 className="font-semibold">Context Menu</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Right-click rows for contextual actions
            </p>
          </div>
          
          <div className="p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-indigo-500" />
              <h3 className="font-semibold">Pagination</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Navigate through large datasets with pagination controls
            </p>
          </div>
          
          <div className="p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-orange-500" />
              <h3 className="font-semibold">Cell Editing</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Double-click cells to edit inline (demo only)
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}