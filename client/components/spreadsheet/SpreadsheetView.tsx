import React, { useState, useCallback, useRef, useEffect } from "react";
import { Toolbar } from "./Toolbar";
import { TabNavigation } from "./TabNavigation";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import { FileText, Plus, ChevronDown, SplitIcon, Search } from "lucide-react";

type Status = "In-progress" | "Complete" | "Blocked" | "Need to start";
type Priority = "High" | "Medium" | "Low";

interface CellData {
  value: string | number;
  type: "text" | "number" | "status" | "priority" | "date";
}

interface SpreadsheetData {
  [key: string]: CellData;
}

const initialColumns = [
  { id: "A", header: "Q3 Financial Overview", type: "text" as const, width: 260 },
  { id: "B", header: "Submitted", type: "date" as const, width: 110 },
  { id: "C", header: "Status", type: "status" as const, width: 110 },
  { id: "D", header: "Requester", type: "text" as const, width: 120 },
  { id: "E", header: "URL", type: "text" as const, width: 180 },
  { id: "F", header: "Assigned", type: "text" as const, width: 120 },
  { id: "G", header: "Priority", type: "priority" as const, width: 90 },
  { id: "H", header: "Due Date", type: "date" as const, width: 110 },
  { id: "I", header: "Amount", type: "number" as const, width: 120 },
];

/*
const initialData: SpreadsheetData[] = [
  {
    A: { value: "Launch new marketing campaign for pro...", type: "text" as const },
    B: { value: "08-10-2024", type: "date" as const },
    C: { value: "In-progress", type: "status" as const },
    D: { value: "Irfan Khan", type: "text" as const },
    E: { value: "www.irfankhan...", type: "text" as const },
    F: { value: "Sophie Anthony", type: "text" as const },
    G: { value: "Medium", type: "priority" as const },
    H: { value: "29-11-2024", type: "date" as const },
    I: { value: 250000, type: "number" as const },
  },
  {
    A: { value: "Job Request", type: "text" as const },
    B: { value: "08-10-2024", type: "date" as const },
    C: { value: "Need to start", type: "status" as const },
    D: { value: "Irfan Khan", type: "text" as const },
    E: { value: "www.irfankhan...", type: "text" as const },
    F: { value: "Tope Pandey", type: "text" as const },
    G: { value: "High", type: "priority" as const },
    H: { value: "30-10-2024", type: "date" as const },
    I: { value: 950000, type: "number" as const },
  },
  {
    A: { value: "Finalize user testing feedback for spe...", type: "text" as const },
    B: { value: "08-12-2024", type: "date" as const },
    C: { value: "In-progress", type: "status" as const },
    D: { value: "Mark Johnson", type: "text" as const },
    E: { value: "www.markjohnson...", type: "text" as const },
    F: { value: "Rachel Lee", type: "text" as const },
    G: { value: "Medium", type: "priority" as const },
    H: { value: "15-12-2024", type: "date" as const },
    I: { value: 470000, type: "number" as const },
  },
  {
    A: { value: "Design new features for the website", type: "text" as const },
    B: { value: "08-09-2024", type: "date" as const },
    C: { value: "Complete", type: "status" as const },
    D: { value: "Emily Green", type: "text" as const },
    E: { value: "www.emilygreen...", type: "text" as const },
    F: { value: "Tom Wright", type: "text" as const },
    G: { value: "Low", type: "priority" as const },
    H: { value: "10-10-2024", type: "date" as const },
    I: { value: 300000, type: "number" as const },
  },
  {
    A: { value: "Prepare financial report for Q4", type: "text" as const },
    B: { value: "25-09-2024", type: "date" as const },
    C: { value: "Blocked", type: "status" as const },
    D: { value: "Jessica Brown", type: "text" as const },
    E: { value: "www.jessicab...", type: "text" as const },
    F: { value: "Kevin Smith", type: "text" as const },
    G: { value: "Low", type: "priority" as const },
    H: { value: "30-10-2024", type: "date" as const },
    I: { value: 800000, type: "number" as const },
  },
];
*/

// Generate empty rows to fill up to row 50
// const generateEmptyRows = (startIndex: number, count: number) => {
//   return Array.from({ length: count }, (_, i) => {
//     const row: SpreadsheetData = {};
//     initialColumns.forEach((col) => {
//       row[col.id] = { value: "", type: col.type as any };
//     });
//     return row;
//   });
// };

const defaultSheet = () => ({
  name: `Sheet ${Math.floor(Math.random() * 10000)}`,
  columns: [
    { id: "A", header: "Job Request", type: "text" as const, width: 260 },
    { id: "B", header: "Submitted", type: "date" as const, width: 110 },
    { id: "C", header: "Status", type: "status" as const, width: 110 },
    { id: "D", header: "Submitter", type: "text" as const, width: 120 },
    { id: "E", header: "URL", type: "text" as const, width: 180 },
    { id: "F", header: "Assigned", type: "text" as const, width: 120 },
    { id: "G", header: "Priority", type: "priority" as const, width: 90 },
    { id: "H", header: "Due Date", type: "date" as const, width: 110 },
    { id: "I", header: "Est. Value", type: "number" as const, width: 120 },
  ],
  data: Array.from({ length: 50 }, (_, i) => {
    const row: SpreadsheetData = {};
    [
      "A", "B", "C", "D", "E", "F", "G", "H", "I"
    ].forEach((col, idx) => {
      row[col] = { value: "", type: ["text", "date", "status", "text", "text", "text", "priority", "date", "number"][idx] as CellData["type"] };
    });
    return row;
  }),
});

const initialSheets = [
  {
    name: "All Orders",
    columns: [
      { id: "A", header: "Job Request", type: "text" as const, width: 260 },
      { id: "B", header: "Submitted", type: "date" as const, width: 110 },
      { id: "C", header: "Status", type: "status" as const, width: 110 },
      { id: "D", header: "Submitter", type: "text" as const, width: 120 },
      { id: "E", header: "URL", type: "text" as const, width: 180 },
      { id: "F", header: "Assigned", type: "text" as const, width: 120 },
      { id: "G", header: "Priority", type: "priority" as const, width: 90 },
      { id: "H", header: "Due Date", type: "date" as const, width: 110 },
      { id: "I", header: "Est. Value", type: "number" as const, width: 120 },
    ],
    data: [
      {
        A: { value: "Launch social media campaign for product", type: "text" as const },
        B: { value: "15-11-2024", type: "date" as const },
        C: { value: "In-process", type: "status" as const },
        D: { value: "Aisha Patel", type: "text" as const },
        E: { value: "www.aishapatel...", type: "text" as const },
        F: { value: "Sophie Choudhury", type: "text" as const },
        G: { value: "Medium", type: "priority" as const },
        H: { value: "20-11-2024", type: "date" as const },
        I: { value: 6200000, type: "number" as const },
      },
      {
        A: { value: "Update press kit for company redesign", type: "text" as const },
        B: { value: "28-10-2024", type: "date" as const },
        C: { value: "Need to start", type: "status" as const },
        D: { value: "Irfan Khan", type: "text" as const },
        E: { value: "www.irfankhanp...", type: "text" as const },
        F: { value: "Tejas Pandey", type: "text" as const },
        G: { value: "High", type: "priority" as const },
        H: { value: "30-10-2024", type: "date" as const },
        I: { value: 3500000, type: "number" as const },
      },
      {
        A: { value: "Finalize user testing feedback for app", type: "text" as const },
        B: { value: "05-12-2024", type: "date" as const },
        C: { value: "In-process", type: "status" as const },
        D: { value: "Mark Johnson", type: "text" as const },
        E: { value: "www.markjohnson...", type: "text" as const },
        F: { value: "Rachel Lee", type: "text" as const },
        G: { value: "Medium", type: "priority" as const },
        H: { value: "10-12-2024", type: "date" as const },
        I: { value: 4750000, type: "number" as const },
      },
      {
        A: { value: "Design new features for the website", type: "text" as const },
        B: { value: "10-01-2025", type: "date" as const },
        C: { value: "Complete", type: "status" as const },
        D: { value: "Emily Green", type: "text" as const },
        E: { value: "www.emilygreen...", type: "text" as const },
        F: { value: "Tom Wright", type: "text" as const },
        G: { value: "Low", type: "priority" as const },
        H: { value: "15-01-2025", type: "date" as const },
        I: { value: 5900000, type: "number" as const },
      },
      {
        A: { value: "Prepare financial report for Q4", type: "text" as const },
        B: { value: "25-01-2025", type: "date" as const },
        C: { value: "Blocked", type: "status" as const },
        D: { value: "Jessica Brown", type: "text" as const },
        E: { value: "www.jessicabrow...", type: "text" as const },
        F: { value: "Kevin Smith", type: "text" as const },
        G: { value: "Low", type: "priority" as const },
        H: { value: "30-01-2025", type: "date" as const },
        I: { value: 2800000, type: "number" as const },
      },
      // Fill up to 50 rows
      ...Array.from({ length: 45 }, () => {
        const row: SpreadsheetData = {};
        [
          "A", "B", "C", "D", "E", "F", "G", "H", "I"
        ].forEach((col, idx) => {
          row[col] = { value: "", type: ["text", "date", "status", "text", "text", "text", "priority", "date", "number"][idx] as CellData["type"] };
        });
        return row;
      }),
    ],
  },
];

const DATA_TYPES = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
  { value: "status", label: "Status" },
  { value: "priority", label: "Priority" },
] as const;

const STATUS_OPTIONS = ["In-progress", "Complete", "Blocked", "Need to start", ""] as const;
const PRIORITY_OPTIONS = ["High", "Medium", "Low", ""] as const;

// Helper to get the correct type for a column
const getColumnType = (col: any): CellData["type"] => {
  if (
    col.type === "text" ||
    col.type === "number" ||
    col.type === "status" ||
    col.type === "priority" ||
    col.type === "date"
  ) {
    return col.type;
  }
  return "text";
};

export function SpreadsheetView() {
  const [sheets, setSheets] = useState(initialSheets);
  const [activeSheetIdx, setActiveSheetIdx] = useState(0);
  const [editingCell, setEditingCell] = useState<{
    rowIndex: number;
    columnId: string;
  } | null>(null);
  const [editingHeader, setEditingHeader] = useState<string | null>(null);
  const [editingSheetNameIdx, setEditingSheetNameIdx] = useState<number | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const [rowHeights, setRowHeights] = useState<{ [rowIdx: number]: number }>({});
  const MIN_ROW_HEIGHT = 24;
  const [typeDropdownOpen, setTypeDropdownOpen] = useState<string | null>(null);
  const typeDropdownRef = useRef<HTMLDivElement | null>(null);
  // const [questions, setQuestions] = useState([
  //   { id: 'Q1', text: 'Revenue Analysis' },
  //   { id: 'Q2', text: 'Expense Breakdown' },
  //   { id: 'Q3', text: 'Profit Margins' },
  //   { id: 'Q4', text: 'Growth Trends' }
  // ]);
  // const [isFetching, setIsFetching] = useState(false);
  
  // Toolbar state
  const [isFieldsHidden, setIsFieldsHidden] = useState(false);
  const [currentView, setCurrentView] = useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<any>({});
  const [filteredData, setFilteredData] = useState<SpreadsheetData[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    if (!typeDropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        typeDropdownRef.current &&
        !typeDropdownRef.current.contains(e.target as Node)
      ) {
        setTypeDropdownOpen(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [typeDropdownOpen]);

  // Sheet-specific state
  const columns = sheets[activeSheetIdx].columns;
  const data = sheets[activeSheetIdx].data;
  
  // Use filtered data when search is active, otherwise use original data
  const displayData = isSearchActive ? filteredData : data;

  const setColumns = (newColumns: typeof columns) => {
    setSheets((prev) => {
      const updated = [...prev];
      updated[activeSheetIdx] = {
        ...updated[activeSheetIdx],
        columns: newColumns,
      };
      return updated;
    });
  };

  const setData = (newData: typeof data) => {
    setSheets((prev) => {
      const updated = [...prev];
      updated[activeSheetIdx] = {
        ...updated[activeSheetIdx],
        data: newData,
      };
      return updated;
    });
  };

  const updateCellValue = useCallback(
    (rowIndex: number, columnId: string, value: string | number) => {
      const newData = [...data];
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
      setData(newData);
    },
    [columns, data],
  );

  const updateColumnHeader = useCallback((columnId: string, newHeader: string) => {
    setSheets((prevSheets) => {
      const updated = [...prevSheets];
      const sheet = { ...updated[activeSheetIdx] };
      sheet.columns = sheet.columns.map((col) =>
        col.id === columnId ? { ...col, header: newHeader } : col
      );
      updated[activeSheetIdx] = sheet;
      return updated;
    });
  }, [activeSheetIdx]);

  // Sheet name editing
  const updateSheetName = (idx: number, newName: string) => {
    setSheets((prevSheets) => {
      const updated = [...prevSheets];
      updated[idx] = { ...updated[idx], name: newName };
      return updated;
    });
  };

  // Add Row for active sheet
  const handleAddRow = useCallback(() => {
    const newRow: SpreadsheetData = {};
    columns.forEach((col) => {
      newRow[col.id] = { value: "", type: getColumnType(col) };
    });
    setData([...data, newRow]);
  }, [columns, data]);

  // Add Column for active sheet
  const handleAddColumn = useCallback(() => {
    const newColumnId = String.fromCharCode(65 + columns.length); // A, B, C, etc.
    const newColumn = {
      id: newColumnId,
      header: `Column ${newColumnId}`,
      type: "text" as CellData["type"],
      width: 120,
    };

    // Find the first empty column position (where header is empty or "Extra X")
    let insertIndex = columns.length;
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].header === "" || columns[i].header.startsWith("Extra")) {
        insertIndex = i;
        break;
      }
    }

    // Insert the new column at the found position
    const newColumns = [...columns];
    newColumns.splice(insertIndex, 0, newColumn);
    setColumns(newColumns);

    // Update data to include the new column
    setData(data.map((row) => {
      const newRow = { ...row };
      newRow[newColumnId] = { value: "", type: "text" as CellData["type"] };
      return newRow;
    }));
  }, [columns, data]);

  // Change column type and reset all cell values in that column
  const handleChangeColumnType = (columnId: string, newType: CellData["type"]) => {
    setSheets((prevSheets) => {
      const updated = [...prevSheets];
      const sheet = { ...updated[activeSheetIdx] };
      // Update column type
      sheet.columns = sheet.columns.map((col) =>
        col.id === columnId ? { ...col, type: newType } : col
      );
      // Reset all cell values in that column
      sheet.data = sheet.data.map((row) => ({
        ...row,
        [columnId]: { value: getDefaultValueForType(newType), type: newType },
      }));
      updated[activeSheetIdx] = sheet;
      return updated;
    });
  };

  function getDefaultValueForType(type: CellData["type"]): string | number {
    switch (type) {
      case "number": return 0;
      case "date": return "";
      case "status": return "";
      case "priority": return "";
      default: return "";
    }
  }

  const renderHeader = (column: any) => {
    const isEditing = editingHeader === column.id;
    const isTypeDropdownOpen = typeDropdownOpen === column.id;

    if (isEditing) {
      return (
        <input
          className="w-full px-2 py-1 border-2 border-blue-500 bg-white text-xs font-medium text-gray-900 outline-none rounded"
          value={column.header}
          onChange={(e) => updateColumnHeader(column.id, e.target.value)}
          onBlur={() => setEditingHeader(null)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Escape") {
              setEditingHeader(null);
            }
          }}
          autoFocus
        />
      );
    }

    return (
      <div className="flex items-center justify-between group gap-1 relative w-full">
        <span 
          className="text-xs font-medium text-gray-500 uppercase tracking-wider truncate cursor-pointer hover:bg-gray-100 px-1 py-0.5 rounded"
          onDoubleClick={() => setEditingHeader(column.id)}
          title="Double-click to edit"
        >
          {column.header}
        </span>
        {/* Data type dropdown trigger (arrow only, far right) */}
        <div className="relative ml-auto" ref={typeDropdownRef}>
          <button
            className="p-1 rounded hover:bg-gray-200 focus:outline-none absolute right-0 top-1/2 -translate-y-1/2"
            style={{ right: 0 }}
            onClick={e => {
              e.stopPropagation();
              setTypeDropdownOpen(typeDropdownOpen === column.id ? null : column.id);
            }}
            tabIndex={0}
            aria-label="Change column type"
          >
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>
          {isTypeDropdownOpen && (
            <div className="absolute right-0 mt-1 w-28 bg-white border border-gray-200 rounded shadow z-50">
              {DATA_TYPES.map(dt => (
                <button
                  key={dt.value}
                  className={`w-full text-left px-3 py-1 text-xs hover:bg-blue-50 ${column.type === dt.value ? 'font-bold text-blue-600' : ''}`}
                  onClick={() => {
                    handleChangeColumnType(column.id, dt.value);
                    setTypeDropdownOpen(null);
                  }}
                >
                  {dt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCell = (rowIndex: number, column: any, cellData: CellData) => {
    const isEditing =
      editingCell?.rowIndex === rowIndex && editingCell?.columnId === column.id;

    if (isEditing) {
      // Type-specific editing
      if (column.type === "date") {
        return (
          <input
            type="date"
            className="w-full h-full px-2 py-1 border-2 border-blue-500 bg-white text-sm outline-none text-center"
            value={cellData.value as string}
            onChange={e => updateCellValue(rowIndex, column.id, e.target.value)}
            onBlur={() => setEditingCell(null)}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === "Tab") setEditingCell(null);
              if (e.key === "Escape") setEditingCell(null);
            }}
            autoFocus
          />
        );
      }
      if (column.type === "number") {
        return (
          <input
            type="number"
            className="w-full h-full px-2 py-1 border-2 border-blue-500 bg-white text-sm outline-none text-center"
            value={cellData.value as number}
            onChange={e => updateCellValue(rowIndex, column.id, e.target.value === '' ? '' : parseFloat(e.target.value))}
            onBlur={() => setEditingCell(null)}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === "Tab") setEditingCell(null);
              if (e.key === "Escape") setEditingCell(null);
            }}
            autoFocus
          />
        );
      }
      if (column.type === "status") {
        return (
          <select
            className="w-full h-full px-2 py-1 border-2 border-blue-500 bg-white text-sm outline-none text-center"
            value={cellData.value as string}
            onChange={e => updateCellValue(rowIndex, column.id, e.target.value)}
            onBlur={() => setEditingCell(null)}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === "Tab") setEditingCell(null);
              if (e.key === "Escape") setEditingCell(null);
            }}
            autoFocus
          >
            {STATUS_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt || "Select status"}</option>
            ))}
          </select>
        );
      }
      if (column.type === "priority") {
        return (
          <select
            className="w-full h-full px-2 py-1 border-2 border-blue-500 bg-white text-sm outline-none text-center"
            value={cellData.value as string}
            onChange={e => updateCellValue(rowIndex, column.id, e.target.value)}
            onBlur={() => setEditingCell(null)}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === "Tab") setEditingCell(null);
              if (e.key === "Escape") setEditingCell(null);
            }}
            autoFocus
          >
            {PRIORITY_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt || "Select priority"}</option>
            ))}
          </select>
        );
      }
      // Default: text
      return (
        <input
          className="w-full h-full px-2 py-1 border-2 border-blue-500 bg-white text-sm outline-none"
          value={cellData.value as string}
          onChange={e => updateCellValue(rowIndex, column.id, e.target.value)}
          onBlur={() => setEditingCell(null)}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === "Tab") setEditingCell(null);
            if (e.key === "Escape") setEditingCell(null);
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
            <div onClick={handleCellClick} className="cursor-text flex justify-center items-center h-full">
              <StatusBadge status={cellData.value as Status} />
            </div>
          );
        }
        return (
          <div
            onClick={handleCellClick}
            className="cursor-text h-full flex justify-center items-center hover:bg-gray-50 transition-colors"
          >
            {/* No placeholder */}
          </div>
        );

      case "priority":
        if (cellData.value && cellData.value !== "") {
          return (
            <div onClick={handleCellClick} className="cursor-text flex justify-center items-center h-full">
              <PriorityBadge priority={cellData.value as Priority} />
            </div>
          );
        }
        return (
          <div
            onClick={handleCellClick}
            className="cursor-text h-full flex justify-center items-center hover:bg-gray-50 transition-colors"
          >
            {/* No placeholder */}
          </div>
        );

      case "number":
        return (
          <div
            onClick={handleCellClick}
            className="cursor-text text-sm text-gray-900 px-2 py-1 h-full font-medium flex justify-center items-center hover:bg-gray-50 transition-colors"
          >
            {cellData.value !== undefined && cellData.value !== ""
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
              className="flex items-center justify-center gap-2 cursor-text px-2 py-1 h-full hover:bg-gray-50 transition-colors"
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
            className="cursor-text text-sm text-gray-900 px-2 py-1 h-full flex justify-center items-center hover:bg-gray-50 transition-colors"
          >
            {cellData.value || ""}
          </div>
        );
    }
  };

  // Add new sheet
  const handleAddSheet = () => {
    setSheets((prev) => [
      ...prev,
      defaultSheet(),
    ]);
    setActiveSheetIdx(sheets.length); // Switch to new sheet
  };

  // Column resizing logic
  const handleColumnResize = (colIdx: number, startX: number, startWidth: number) => {
    const onMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - startX;
      const newColumns = [...columns];
      newColumns[colIdx] = { ...newColumns[colIdx], width: Math.max(60, startWidth + delta) };
      setColumns(newColumns);
    };
    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  // Auto-fit column width to largest content
  const handleAutoFitColumn = (colIdx: number) => {
    if (!tableRef.current) return;
    const colId = columns[colIdx].id;
    let maxWidth = 80; // Minimum width
    
    // Check header text
    const headerText = columns[colIdx].header;
    const headerWidth = measureTextWidth(headerText, "bold 14px Inter, sans-serif") + 40;
    maxWidth = Math.max(maxWidth, headerWidth);
    
    // Check all cells in the column
    for (let i = 0; i < data.length; i++) {
      const cell = data[i][colId];
      if (cell && cell.value !== undefined && cell.value !== null && cell.value !== "") {
        let cellText = String(cell.value);
        
        // Handle different cell types
        if (cell.type === "status") {
          cellText = cell.value as string; // Status badges have fixed width
          maxWidth = Math.max(maxWidth, 120); // Status columns need more space for badges
        } else if (cell.type === "priority") {
          cellText = cell.value as string; // Priority badges have fixed width
          maxWidth = Math.max(maxWidth, 100); // Priority columns need space for badges
        } else if (cell.type === "date") {
          cellText = cell.value as string;
          const dateWidth = measureTextWidth(cellText, "normal 14px Inter, sans-serif") + 40;
          maxWidth = Math.max(maxWidth, dateWidth);
        } else if (cell.type === "number") {
          cellText = cell.value.toString();
          const numWidth = measureTextWidth(cellText, "normal 14px Inter, sans-serif") + 40;
          maxWidth = Math.max(maxWidth, numWidth);
        } else {
          // Text type
          const textWidth = measureTextWidth(cellText, "normal 14px Inter, sans-serif") + 40;
          maxWidth = Math.max(maxWidth, textWidth);
        }
      }
    }
    
    // Set maximum width to prevent extremely wide columns
    maxWidth = Math.min(maxWidth, 400);
    
    const newColumns = [...columns];
    newColumns[colIdx] = { ...newColumns[colIdx], width: maxWidth };
    setColumns(newColumns);
  };

  // Auto-fit all columns
  const handleAutoFitAllColumns = () => {
    const newColumns = [...columns];
    
    newColumns.forEach((column, colIdx) => {
      const colId = column.id;
      let maxWidth = 80; // Minimum width
      
      // Check header text
      const headerText = column.header;
      const headerWidth = measureTextWidth(headerText, "bold 14px Inter, sans-serif") + 40;
      maxWidth = Math.max(maxWidth, headerWidth);
      
      // Check all cells in the column
      for (let i = 0; i < data.length; i++) {
        const cell = data[i][colId];
        if (cell && cell.value !== undefined && cell.value !== null && cell.value !== "") {
          let cellText = String(cell.value);
          
          // Handle different cell types
          if (cell.type === "status") {
            maxWidth = Math.max(maxWidth, 120); // Status columns need more space for badges
          } else if (cell.type === "priority") {
            maxWidth = Math.max(maxWidth, 100); // Priority columns need space for badges
          } else if (cell.type === "date") {
            const dateWidth = measureTextWidth(cellText, "normal 14px Inter, sans-serif") + 40;
            maxWidth = Math.max(maxWidth, dateWidth);
          } else if (cell.type === "number") {
            const numWidth = measureTextWidth(cellText, "normal 14px Inter, sans-serif") + 40;
            maxWidth = Math.max(maxWidth, numWidth);
          } else {
            // Text type
            const textWidth = measureTextWidth(cellText, "normal 14px Inter, sans-serif") + 40;
            maxWidth = Math.max(maxWidth, textWidth);
          }
        }
      }
      
      // Set maximum width to prevent extremely wide columns
      maxWidth = Math.min(maxWidth, 400);
      
      newColumns[colIdx] = { ...newColumns[colIdx], width: maxWidth };
    });
    
    setColumns(newColumns);
  };

  // Row resizing logic
  const handleRowResize = (rowIdx: number, startY: number, startHeight: number) => {
    const onMouseMove = (e: MouseEvent) => {
      const delta = e.clientY - startY;
      setRowHeights(prev => ({
        ...prev,
        [rowIdx]: Math.max(MIN_ROW_HEIGHT, startHeight + delta),
      }));
    };
    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  // Helper to measure text width
  function measureTextWidth(text: string, font: string) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return 80;
    ctx.font = font;
    return ctx.measureText(text).width;
  }

  // Function to adjust column widths
  const adjustColumnWidth = (columnId: string, newWidth: number) => {
    setColumns(prevColumns => 
      prevColumns.map(col => 
        col.id === columnId 
          ? { ...col, width: Math.max(60, newWidth) } // Minimum width of 60px
          : col
      )
    );
  };

  // Function to increase/decrease column width
  const changeColumnWidth = (columnId: string, delta: number) => {
    const currentColumn = columns.find(col => col.id === columnId);
    if (currentColumn) {
      adjustColumnWidth(columnId, currentColumn.width + delta);
    }
  };

  // Toolbar handlers
  const handleHideFields = () => {
    setIsFieldsHidden((prev) => !prev);
  };

  const handleSort = (columnId: string, direction: 'asc' | 'desc') => {
    // Use current display data for sorting
    const currentData = isSearchActive ? filteredData : data;
    
    // Separate rows with and without content in the sorted column
    const withContent = currentData.filter(row => {
      const val = row[columnId]?.value;
      return val !== undefined && val !== null && val !== '';
    });
    const withoutContent = currentData.filter(row => {
      const val = row[columnId]?.value;
      return val === undefined || val === null || val === '';
    });

    // Sort only rows with content
    const sortedWithContent = withContent.sort((a, b) => {
      const aValue = a[columnId]?.value ?? '';
      const bValue = b[columnId]?.value ?? '';
      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    // Concatenate sorted rows with empty-value rows at the end
    const sortedData = [...sortedWithContent, ...withoutContent];
    
    if (isSearchActive) {
      // Update filtered data when search is active
      setFilteredData(sortedData);
    } else {
      // Update original data when not searching
      setData(sortedData);
    }
  };

  const handleFilter = (filters: any) => {
    setFilters(filters);
    // You can implement actual filtering logic here
  };

  const handleToggleView = (view: 'grid' | 'list') => {
    setCurrentView(view);
  };

  const handleImport = (file: File) => {
    // Implement import logic here (parse file and update data)
    alert(`Importing file: ${file.name}`);
  };

  const handleExport = (format: 'csv' | 'excel' | 'json') => {
    // Implement export logic here (convert data to format and trigger download)
    alert(`Exporting as: ${format}`);
  };

  const handleShare = () => {
    // Implement share logic here
    alert('Share functionality coming soon!');
  };

  const handleNewAction = () => {
    // Implement new action logic here
    alert('New action triggered!');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredData([]);
      setIsSearchActive(false);
      return;
    }

    const searchTerm = query.toLowerCase().trim();
    const filtered = data.filter(row => {
      // Search across all columns
      return columns.some(column => {
        const cellValue = row[column.id]?.value;
        if (cellValue === undefined || cellValue === null) return false;
        
        // Convert to string and search
        const stringValue = String(cellValue).toLowerCase();
        return stringValue.includes(searchTerm);
      });
    });

    setFilteredData(filtered);
    setIsSearchActive(true);
  };

  // Auto-fit columns on data/columns change
  useEffect(() => {
    if (!columns || columns.length === 0) return;
    // Get font for measurement (should match table header/cell font)
    const font = '500 13px Inter, sans-serif';
    const padding = 32; // px, for cell padding and sort/filter icons
    const minWidth = 60;
    const newColumns = columns.map((col) => {
      // Measure header
      const headerWidth = measureTextWidth(col.header, font) + padding;
      // Measure all cell contents in this column
      const cellWidths = data.map(row => {
        const val = row[col.id]?.value ?? '';
        return measureTextWidth(String(val), font) + padding;
      });
      const maxCellWidth = cellWidths.length > 0 ? Math.max(...cellWidths) : 0;
      // Set width to max(header, max cell, minWidth)
      let newWidth = Math.max(headerWidth, maxCellWidth, minWidth);
      // Add 30px for all except Job Request (id 'A')
      if (col.id !== 'A') {
        newWidth += 30;
      }
      return { ...col, width: newWidth };
    });
    setColumns(newColumns);
    // eslint-disable-next-line
  }, [columns.length, data]);

  return (
    <div className="h-screen bg-white flex flex-col">
      <Toolbar
        onAddRow={handleAddRow}
        onAddColumn={handleAddColumn}
        onHideFields={handleHideFields}
        onSort={handleSort}
        onFilter={handleFilter}
        onToggleView={handleToggleView}
        onImport={handleImport}
        onExport={handleExport}
        onShare={handleShare}
        onNewAction={handleNewAction}
        onSearch={handleSearch}
        isFieldsHidden={isFieldsHidden}
        currentView={currentView}
      />

      {/* Search results indicator */}
      {isSearchActive && (
        <div className="px-4 md:px-6 py-2 bg-blue-50 border-b border-blue-200">
          <div className="flex items-center gap-2 text-sm text-blue-700">
            <Search className="w-4 h-4" />
            <span>
              Found {filteredData.length} result{filteredData.length !== 1 ? 's' : ''} for "{searchQuery}"
            </span>
            <button
              onClick={() => {
                setSearchQuery("");
                setIsSearchActive(false);
                setFilteredData([]);
              }}
              className="ml-2 text-blue-500 hover:text-blue-700 underline"
            >
              Clear search
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-hidden min-h-0">
        <div className="h-full overflow-auto hide-scrollbar scroll-smooth">
          <table className="border-collapse table-fixed" ref={tableRef} style={{ 
            tableLayout: 'fixed', 
            width: 40 + columns.reduce((total, col) => total + col.width, 0) + 80,
            minWidth: '100vw'
          }}>
            {/* Explicitly define column widths */}
            <colgroup>
              <col style={{ width: 40 }} />
              {columns.map((column) => (
                <col key={column.id} style={{ width: column.width }} />
              ))}
              <col style={{ width: 80 }} />
            </colgroup>
            <thead className="sticky top-0 z-10">
              {/* Group header row */}
              <tr style={{ height: 40 }}>
                <th style={{ width: 40 }} className="bg-gray-50 border-b border-r border-gray-200"></th>
                {/* Group headers */}
                <th colSpan={4} style={{ borderRight: 0, borderLeft: 0, borderTop: 0, borderBottom: 0, width: columns.slice(0, 4).reduce((t, c) => t + c.width, 0) }}
                  className="px-3 py-2 text-left text-xs font-bold uppercase tracking-wide bg-gradient-to-r from-blue-50 to-blue-100 border-b-2 border-blue-200 text-blue-800 rounded-l-md border border-blue-200"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-blue-900">Q3 Financial Overview</span>
                  </div>
                </th>
                <th style={{ width: columns[4].width }}
                  className="px-3 py-2 text-center text-xs font-bold uppercase tracking-wide bg-gradient-to-r from-green-50 to-green-100 border-b-2 border-green-200 text-green-800 border border-green-200"
                >
                  <div className="flex items-center justify-center gap-2">
                    <SplitIcon className="transform rotate-180 w-3 h-3" />
                    <span className="font-bold text-green-900">ABC</span>
                  </div>
                </th>
                <th colSpan={2} style={{ width: columns[5].width + columns[6].width }}
                  className="px-3 py-2 text-center text-xs font-bold uppercase tracking-wide bg-gradient-to-r from-purple-50 to-purple-100 border-b-2 border-purple-200 text-purple-800 border border-purple-200"
                >
                  <div className="flex items-center justify-center gap-2">
                    <SplitIcon className="transform rotate-180 w-3 h-3" />
                    <span className="font-bold text-purple-900">Answer a question</span>
                  </div>
                </th>
                <th colSpan={2} style={{ width: columns[7].width + columns[8].width }}
                  className="px-3 py-2 text-center text-xs font-bold uppercase tracking-wide bg-gradient-to-r from-orange-50 to-orange-100 border-b-2 border-orange-200 text-orange-800 rounded-r-md border border-orange-200"
                >
                  <div className="flex items-center justify-center gap-2">
                    <SplitIcon className="transform rotate-180 w-3 h-3" />
                    <span className="font-bold text-orange-900">Extract</span>
                  </div>
                </th>
                {/* Add Column group header cell for alignment */}
                <th className="bg-gray-50 border-b-2 border-gray-200" colSpan={100}></th>
              </tr>
              {/* Column header row */}
              <tr>
                <th className="w-12 px-2 py-3 text-xs font-medium text-gray-500 border-b border-r border-gray-200 bg-gray-50">#</th>
                {columns.map((column, colIdx) => {
                  let colorClass = "bg-gray-50 border-gray-200 text-gray-700";
                  let rounded = "";
                  if (colIdx === 0) { colorClass = "bg-blue-50 border-blue-200 text-blue-700"; rounded = "rounded-l-md"; }
                  else if (colIdx >= 1 && colIdx <= 4) colorClass = "bg-green-50 border-green-200 text-green-700";
                  else if (colIdx === 5 || colIdx === 6) colorClass = "bg-purple-50 border-purple-200 text-purple-700";
                  else if (colIdx === 7 || colIdx === 8) { colorClass = "bg-orange-50 border-orange-200 text-orange-700"; if (colIdx === 8) rounded = "rounded-r-md"; }
                  return (
                    <th
                      key={column.id}
                      style={{ width: column.width }}
                      className={`px-4 py-3 text-left border-b-2 border-r text-xs font-bold uppercase tracking-wide group relative ${colorClass} ${rounded}`}
                    >
                      <div className="flex items-center">
                        <div className="flex-1 min-w-0">{renderHeader(column)}</div>
                        {/* Resize handle */}
                        <div
                          className="w-2 h-6 cursor-col-resize absolute right-0 top-1/2 -translate-y-1/2 z-10 group-hover:bg-blue-100"
                          onMouseDown={e => {
                            e.preventDefault();
                            handleColumnResize(colIdx, e.clientX, column.width);
                          }}
                          onDoubleClick={e => {
                            e.preventDefault();
                            handleAutoFitColumn(colIdx);
                          }}
                          title="Drag to resize. Double-click to auto-fit."
                        />
                      </div>
                    </th>
                  );
                })}
                {/* Add Column Button */}
                <th className="border-b-2 border-gray-200 bg-gray-50 text-center align-middle p-0 w-full">
                  <div
                    onClick={handleAddColumn}
                    className="w-full h-full min-h-[44px] min-w-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 border-0 bg-transparent transition-colors"
                    title="Add Column"
                  >
                    <Plus className="w-5 h-5" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {displayData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-gray-50 group"
                  style={{ height: rowHeights[rowIndex] || 32 }}
                >
                  {/* Row number and row resize handle */}
                  <td className="w-12 px-2 py-0 text-xs text-gray-500 border-b border-r border-gray-100 bg-gray-50 text-center relative">
                    {rowIndex + 1}
                    <div
                      className="absolute left-0 right-0 bottom-0 h-2 cursor-row-resize group-hover:bg-blue-100"
                      style={{ zIndex: 10 }}
                      onMouseDown={e => {
                        e.preventDefault();
                        const startY = e.clientY;
                        const startHeight = rowHeights[rowIndex] || 32;
                        handleRowResize(rowIndex, startY, startHeight);
                      }}
                      title="Drag to resize row"
                    />
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
                </tr>
              ))}
              
              {/* Add Row Button */}
              <tr>
                <td className="w-12 px-2 py-0 text-xs text-gray-500 border-b border-r border-gray-100 bg-gray-50 text-center">
                  <div
                    onClick={handleAddRow}
                    className="w-full h-full min-h-[40px] flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 border-0 bg-transparent transition-colors cursor-pointer"
                    title="Add Row"
                  >
                    <Plus className="w-5 h-5" />
                  </div>
                </td>
                {columns.map((column) => (
                  <td
                    key={column.id}
                    style={{ width: column.width }}
                    className="border-b border-r border-gray-100 h-10 p-0"
                  >
                  </td>
                ))}
                {/* Empty cell for alignment */}
                <td className="border-b border-gray-100 bg-gray-50"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <TabNavigation
        activeTab={sheets[activeSheetIdx].name}
        onTabChange={(tab) => {
          const idx = sheets.findIndex((s) => s.name === tab);
          if (idx !== -1) setActiveSheetIdx(idx);
        }}
        tabs={sheets.map((s) => s.name)}
        onAddTab={handleAddSheet}
        editingTabIdx={editingSheetNameIdx}
        onEditTabIdx={setEditingSheetNameIdx}
        onTabNameChange={updateSheetName}
      />
    </div>
  );
}
