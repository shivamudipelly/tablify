import React from "react";
import {
  Search,
  EyeOff,
  ArrowUpDown,
  Filter,
  Grid3X3,
  Upload,
  Download,
  Share2,
  Plus,
  Bell,
  User,
} from "lucide-react";

export function Toolbar() {
  const handleAction = (action: string) => {
    console.log(`${action} clicked`);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Navigation and title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Workspace</span>
            <span className="text-gray-300">/</span>
            <span className="text-sm text-gray-500">Folder 2</span>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-medium text-gray-900">
              Spreadsheet 3
            </span>
          </div>
        </div>

        {/* Right side - User info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search within sheet..."
              className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Bell className="w-5 h-5 text-gray-400" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">JO</span>
            </div>
            <span className="text-sm text-gray-700">John Doe</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 mt-4">
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500">Tool bar</span>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
        </div>

        <button
          onClick={() => handleAction("Hide Fields")}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          <EyeOff className="w-4 h-4" />
          Hide Fields
        </button>

        <button
          onClick={() => handleAction("Sort")}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ArrowUpDown className="w-4 h-4" />
          Sort
        </button>

        <button
          onClick={() => handleAction("Filter")}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          <Filter className="w-4 h-4" />
          Filter
        </button>

        <button
          onClick={() => handleAction("Cell view")}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          <Grid3X3 className="w-4 h-4" />
          Cell view
        </button>

        <div className="w-px h-6 bg-gray-300"></div>

        <button
          onClick={() => handleAction("Import")}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          <Upload className="w-4 h-4" />
          Import
        </button>

        <button
          onClick={() => handleAction("Export")}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          <Download className="w-4 h-4" />
          Export
        </button>

        <button
          onClick={() => handleAction("Share")}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>

        <button
          onClick={() => handleAction("New Action")}
          className="flex items-center gap-2 px-4 py-1.5 text-sm text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors ml-auto"
        >
          <Plus className="w-4 h-4" />
          New Action
        </button>
      </div>
    </div>
  );
}
