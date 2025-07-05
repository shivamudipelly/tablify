import React, { useState, useMemo, useCallback } from "react";
import { Toolbar } from "./Toolbar";
import { TabNavigation } from "./TabNavigation";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import { FileText, Plus } from "lucide-react";

type Status = "In-progress" | "Complete" | "Blocked" | "Need to start" | "";
type Priority = "High" | "Medium" | "Low" | "";

interface CellData {
  value: string | number;
  type: "text" | "number" | "status" | "priority" | "date";
}

interface SpreadsheetData {
  [key: string]: CellData;
}

const initialColumns = [
  { id: "A", header: "Q3 Financial Overview", type: "text", width: 280 },
  { id: "B", header: "Submitted", type: "date", width: 120 },
  { id: "C", header: "Status", type: "status", width: 130 },
  { id: "D", header: "Requester", type: "text", width: 120 },
  { id: "E", header: "URL", type: "text", width: 150 },
  { id: "F", header: "Assigned", type: "text", width: 120 },
  { id: "G", header: "Priority", type: "priority", width: 100 },
  { id: "H", header: "Due Date", type: "date", width: 120 },
  { id: "I", header: "Amount", type: "number", width: 120 },
];

const initialData: SpreadsheetData[] = [
  {
    A: { value: "Launch new marketing campaign for pro...", type: "text" },
    B: { value: "08-10-2024", type: "date" },
    C: { value: "In-progress", type: "status" },
    D: { value: "Irfan Khan", type: "text" },
    E: { value: "www.irfankhan...", type: "text" },
    F: { value: "Sophie Anthony", type: "text" },
    G: { value: "Medium", type: "priority" },
    H: { value: "29-11-2024", type: "date" },
    I: { value: 250000, type: "number" },
  },
  {
    A: { value: "Job Request", type: "text" },
    B: { value: "08-10-2024", type: "date" },
    C: { value: "Need to start", type: "status" },
    D: { value: "Irfan Khan", type: "text" },
    E: { value: "www.irfankhan...", type: "text" },
    F: { value: "Tope Pandey", type: "text" },
    G: { value: "High", type: "priority" },
    H: { value: "30-10-2024", type: "date" },
    I: { value: 950000, type: "number" },
  },
  {
    A: { value: "Finalize user testing feedback for spe...", type: "text" },
    B: { value: "08-12-2024", type: "date" },
    C: { value: "In-progress", type: "status" },
    D: { value: "Mark Johnson", type: "text" },
    E: { value: "www.markjohnson...", type: "text" },
    F: { value: "Rachel Lee", type: "text" },
    G: { value: "Medium", type: "priority" },
    H: { value: "15-12-2024", type: "date" },
    I: { value: 470000, type: "number" },
  },
  {
    A: { value: "Design new features for the website", type: "text" },
    B: { value: "08-09-2024", type: "date" },
    C: { value: "Complete", type: "status" },
    D: { value: "Emily Green", type: "text" },
    E: { value: "www.emilygreen...", type: "text" },
    F: { value: "Tom Wright", type: "text" },
    G: { value: "Low", type: "priority" },
    H: { value: "10-10-2024", type: "date" },
    I: { value: 300000, type: "number" },
  },
  {
    A: { value: "Prepare financial report for Q4", type: "text" },
    B: { value: "25-09-2024", type: "date" },
    C: { value: "Blocked", type: "status" },
    D: { value: "Jessica Brown", type: "text" },
    E: { value: "www.jessicab...", type: "text" },
    F: { value: "Kevin Smith", type: "text" },
    G: { value: "Low", type: "priority" },
    H: { value: "30-10-2024", type: "date" },
    I: { value: 800000, type: "number" },
  },
];

// Generate empty rows to fill up to row 50
const generateEmptyRows = (startIndex: number, count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const row: SpreadsheetData = {};
    initialColumns.forEach((col) => {
      row[col.id] = { value: "", type: col.type as any };
    });
    return row;
  });
};

export function SpreadsheetView() {
  const [data, setData] = useState<SpreadsheetData[]>(() => [
    ...initialData,
    ...generateEmptyRows(initialData.length, 45), // Total 50 rows
  ]);
  const [columns, setColumns] = useState(initialColumns);
  const [editingCell, setEditingCell] = useState<{
    rowIndex: number;
    columnId: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState("All Orders");

  const updateCellValue = useCallback(
    (rowIndex: number, columnId: string, value: string | number) => {
      setData((prevData) => {
        const newData = [...prevData];
        const column = columns.find((col) => col.id === columnId);
        if (column) {
          newData[rowIndex] = {
            ...newData[rowIndex],
            [columnId]: {
              value,
              type: column.type as any,
            },
          };
        }
        return newData;
      });
    },
    [columns],
  );

  const addRow = useCallback(() => {
    const newRow: SpreadsheetData = {};
    columns.forEach((col) => {
      newRow[col.id] = { value: "", type: col.type as any };
    });
    setData((prevData) => [...prevData, newRow]);
  }, [columns]);

  const addColumn = useCallback(() => {
    const newColumnId = String.fromCharCode(65 + columns.length); // A, B, C, etc.
    const newColumn = {
      id: newColumnId,
      header: `Column ${newColumnId}`,
      type: "text",
      width: 120,
    };
    setColumns((prevColumns) => [...prevColumns, newColumn]);
    setData((prevData) =>
      prevData.map((row) => ({
        ...row,
        [newColumnId]: { value: "", type: "text" },
      })),
    );
  }, [columns]);

  const renderCell = (rowIndex: number, column: any, cellData: CellData) => {
    const isEditing =
      editingCell?.rowIndex === rowIndex && editingCell?.columnId === column.id;

    if (isEditing) {
      return (
        <input
          className="w-full h-full px-2 py-1 border-2 border-blue-500 bg-white text-sm outline-none"
          value={cellData.value as string}
          onChange={(e) => {
            const value =
              column.type === "number"
                ? parseFloat(e.target.value) || 0
                : e.target.value;
            updateCellValue(rowIndex, column.id, value);
          }}
          onBlur={() => setEditingCell(null)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Tab") {
              setEditingCell(null);
            }
          }}
          autoFocus
        />
      );
    }

    const handleCellClick = () => {
      setEditingCell({ rowIndex, columnId: column.id });
    };

    // Render based on column type
    switch (column.type) {
      case "status":
        if (cellData.value && cellData.value !== "") {
          return (
            <div onClick={handleCellClick} className="cursor-text">
              <StatusBadge status={cellData.value as Status} />
            </div>
          );
        }
        return (
          <div
            onClick={handleCellClick}
            className="cursor-text text-sm text-gray-400 px-2 py-1 h-full"
          >
            Click to edit
          </div>
        );

      case "priority":
        if (cellData.value && cellData.value !== "") {
          return (
            <div onClick={handleCellClick} className="cursor-text">
              <PriorityBadge priority={cellData.value as Priority} />
            </div>
          );
        }
        return (
          <div
            onClick={handleCellClick}
            className="cursor-text text-sm text-gray-400 px-2 py-1 h-full"
          >
            Click to edit
          </div>
        );

      case "number":
        return (
          <div
            onClick={handleCellClick}
            className="cursor-text text-sm text-gray-900 px-2 py-1 h-full font-medium"
          >
            {cellData.value
              ? `$${(cellData.value as number).toLocaleString()}`
              : ""}
          </div>
        );

      default:
        // text, date
        if (column.id === "A" && cellData.value) {
          return (
            <div
              onClick={handleCellClick}
              className="flex items-center gap-2 cursor-text px-2 py-1 h-full"
            >
              <div className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                <FileText className="w-3 h-3 text-blue-600" />
              </div>
              <span className="text-sm text-gray-900 truncate">
                {cellData.value}
              </span>
            </div>
          );
        }

        return (
          <div
            onClick={handleCellClick}
            className="cursor-text text-sm text-gray-900 px-2 py-1 h-full"
          >
            {cellData.value || ""}
          </div>
        );
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      <Toolbar onAddRow={addRow} onAddColumn={addColumn} />

      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto">
          <table className="border-collapse">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                {/* Row number header */}
                <th className="w-12 px-2 py-3 text-xs font-medium text-gray-500 border-b border-r border-gray-200 bg-gray-50">
                  #
                </th>
                {columns.map((column) => (
                  <th
                    key={column.id}
                    style={{ width: column.width }}
                    className="px-0 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-r border-gray-200 bg-gray-50"
                  >
                    <div className="px-4">{column.header}</div>
                  </th>
                ))}
                {/* Add column button */}
                <th className="w-12 px-2 py-3 border-b border-gray-200 bg-gray-50">
                  <button
                    onClick={addColumn}
                    className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                    title="Add Column"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50 group">
                  {/* Row number */}
                  <td className="w-12 px-2 py-0 text-xs text-gray-500 border-b border-r border-gray-100 bg-gray-50 text-center">
                    {rowIndex + 1}
                  </td>
                  {columns.map((column) => (
                    <td
                      key={column.id}
                      style={{ width: column.width }}
                      className="border-b border-r border-gray-100 h-10 p-0"
                    >
                      {renderCell(rowIndex, column, row[column.id])}
                    </td>
                  ))}
                  {/* Add column cell */}
                  <td className="w-12 border-b border-gray-100"></td>
                </tr>
              ))}
              {/* Add row button */}
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="border-b border-gray-100 p-2"
                >
                  <button
                    onClick={addRow}
                    className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Row
                  </button>
                </td>
              </tr>
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
