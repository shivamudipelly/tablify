import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { Toolbar } from "./Toolbar";
import { TabNavigation } from "./TabNavigation";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import { FileText, Clock, CheckCircle, XCircle, Play } from "lucide-react";

type Status = "In-progress" | "Complete" | "Blocked" | "Need to start";
type Priority = "High" | "Medium" | "Low";

interface SpreadsheetData {
  id: string;
  financialOverview: string;
  submitted: string;
  status: Status;
  requester: string;
  url: string;
  assigned: string;
  priority: Priority;
  dueDate: string;
  amount: number;
}

const mockData: SpreadsheetData[] = [
  {
    id: "1",
    financialOverview: "Launch new marketing campaign for pro...",
    submitted: "08-10-2024",
    status: "In-progress",
    requester: "Irfan Khan",
    url: "www.irfankhan...",
    assigned: "Sophie Anthony",
    priority: "Medium",
    dueDate: "29-11-2024",
    amount: 250000,
  },
  {
    id: "2",
    financialOverview: "Job Request",
    submitted: "08-10-2024",
    status: "Need to start",
    requester: "Irfan Khan",
    url: "www.irfankhan...",
    assigned: "Tope Pandey",
    priority: "High",
    dueDate: "30-10-2024",
    amount: 950000,
  },
  {
    id: "3",
    financialOverview: "Finalize user testing feedback for spe...",
    submitted: "08-12-2024",
    status: "In-progress",
    requester: "Mark Johnson",
    url: "www.markjohnson...",
    assigned: "Rachel Lee",
    priority: "Medium",
    dueDate: "15-12-2024",
    amount: 470000,
  },
  {
    id: "4",
    financialOverview: "Design new features for the website",
    submitted: "08-09-2024",
    status: "Complete",
    requester: "Emily Green",
    url: "www.emilygreen...",
    assigned: "Tom Wright",
    priority: "Low",
    dueDate: "10-10-2024",
    amount: 300000,
  },
  {
    id: "5",
    financialOverview: "Prepare financial report for Q4",
    submitted: "25-09-2024",
    status: "Blocked",
    requester: "Jessica Brown",
    url: "www.jessicab...",
    assigned: "Kevin Smith",
    priority: "Low",
    dueDate: "30-10-2024",
    amount: 800000,
  },
];

const columnHelper = createColumnHelper<SpreadsheetData>();

export function SpreadsheetView() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [activeTab, setActiveTab] = useState("All Orders");

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case "In-progress":
        return <Play className="w-3 h-3" />;
      case "Complete":
        return <CheckCircle className="w-3 h-3" />;
      case "Blocked":
        return <XCircle className="w-3 h-3" />;
      case "Need to start":
        return <Clock className="w-3 h-3" />;
      default:
        return <FileText className="w-3 h-3" />;
    }
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("financialOverview", {
        header: "Q3 Financial Overview",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 min-w-[280px]">
            <div className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center">
              <FileText className="w-3 h-3 text-blue-600" />
            </div>
            <span className="text-sm text-gray-900 truncate">
              {row.original.financialOverview}
            </span>
          </div>
        ),
      }),
      columnHelper.accessor("submitted", {
        header: "Submitted",
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-900">{getValue()}</span>
        ),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: ({ getValue }) => <StatusBadge status={getValue()} />,
      }),
      columnHelper.accessor("requester", {
        header: "Requester",
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-900">{getValue()}</span>
        ),
      }),
      columnHelper.accessor("url", {
        header: "URL",
        cell: ({ getValue }) => (
          <span className="text-sm text-blue-600 underline truncate max-w-[120px] block">
            {getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("assigned", {
        header: "Assigned",
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-900">{getValue()}</span>
        ),
      }),
      columnHelper.accessor("priority", {
        header: "Priority",
        cell: ({ getValue }) => <PriorityBadge priority={getValue()} />,
      }),
      columnHelper.accessor("dueDate", {
        header: "Due Date",
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-900">{getValue()}</span>
        ),
      }),
      columnHelper.accessor("amount", {
        header: "Amount",
        cell: ({ getValue }) => (
          <span className="text-sm font-medium text-gray-900">
            ${getValue().toLocaleString()}
          </span>
        ),
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: mockData,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="h-screen bg-white flex flex-col">
      <Toolbar />

      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 bg-gray-50"
                    >
                      <div
                        className={`flex items-center gap-1 ${
                          header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: " ↑",
                          desc: " ↓",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 whitespace-nowrap border-b border-gray-100"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={["All Orders", "Pending", "Reviewed", "Arrived"]}
      />
    </div>
  );
}
