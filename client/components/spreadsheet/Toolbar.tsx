import React, { useState } from "react";
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
  Eye,
  SortAsc,
  SortDesc,
  Filter as FilterIcon,
  Grid,
  List,
  ChevronRight,
  ChevronsRight,
  Menu,
  X,
} from "lucide-react";

interface ToolbarProps {
  onAddRow: () => void;
  onAddColumn: () => void;
  onHideFields?: () => void;
  onSort?: (columnId: string, direction: 'asc' | 'desc') => void;
  onFilter?: (filters: any) => void;
  onToggleView?: (view: 'grid' | 'list') => void;
  onImport?: (file: File) => void;
  onExport?: (format: 'csv' | 'excel' | 'json') => void;
  onShare?: () => void;
  onNewAction?: () => void;
  onSearch?: (query: string) => void;
  isFieldsHidden?: boolean;
  currentView?: 'grid' | 'list';
  selectedColumns?: string[];
}

export function Toolbar({
  onAddRow,
  onAddColumn,
  onHideFields,
  onSort,
  onFilter,
  onToggleView,
  onImport,
  onExport,
  onShare,
  onNewAction,
  onSearch,
  isFieldsHidden = false,
  currentView = 'list',
  selectedColumns = []
}: ToolbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showViewMenu, setShowViewMenu] = useState(false);
  const [showImportMenu, setShowImportMenu] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleHideFields = () => {
    onHideFields?.();
  };

  const handleSort = (direction: 'asc' | 'desc') => {
    // For now, sort by the first column. In a real implementation, you'd let user select column
    onSort?.('A', direction);
    setShowSortMenu(false);
  };

  const handleFilter = () => {
    onFilter?.({});
    setShowFilterMenu(false);
  };

  const handleToggleView = (view: 'grid' | 'list') => {
    onToggleView?.(view);
    setShowViewMenu(false);
  };

  const handleImport = (format: 'csv' | 'excel' | 'json') => {
    // Create a file input for import
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = format === 'csv' ? '.csv' : format === 'excel' ? '.xlsx,.xls' : '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        onImport?.(file);
      }
    };
    input.click();
    setShowImportMenu(false);
  };

  const handleExport = (format: 'csv' | 'excel' | 'json') => {
    onExport?.(format);
    setShowExportMenu(false);
  };

  const handleShare = () => {
    onShare?.();
  };

  const handleNewAction = () => {
    onNewAction?.();
  };

  return (
    <div className="bg-white">
      {/* Top row - Mobile friendly */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-gray-200">
        {/* Left side - Navigation and title */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-1 md:gap-2">
            <span className="text-xs md:text-sm text-gray-500">Workspace</span>
            <span className="text-gray-300  sm:inline">/</span>
            <span className="text-xs md:text-sm text-gray-500">Folder 2</span>
            <span className="text-gray-300  sm:inline">/</span>
            <span className="text-xs md:text-sm font-medium text-gray-900">
              Spreadsheet 3
            </span>
          </div>
        </div>

        {/* Right side - Menu and search */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile/Tablet menu button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search within sheet..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 hidden sm:block" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">JO</span>
            </div>
            <span className="text-sm text-gray-700 hidden sm:block">John Doe</span>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet search bar */}
      {showMobileMenu && (
        <div className="px-4 py-3 border-b border-gray-200 lg:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search within sheet..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Action buttons - Scrollable on mobile */}
      <div className="px-4 md:px-6 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between gap-2 overflow-x-auto hide-scrollbar">
          {/* Left side actions */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="text-xs text-gray-500 pr-2 flex justify-center items-center whitespace-nowrap">Tool bar <ChevronsRight className="pl-2" /></div>
              <div className="h-8 border-2 border-gray-200" />
            </div>

            <div className="relative">
              <button
                onClick={handleHideFields}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors whitespace-nowrap"
              >
                {isFieldsHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                {isFieldsHidden ? "Show Fields" : "Hide Fields"}
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors whitespace-nowrap"
              >
                <ArrowUpDown className="w-4 h-4" />
                Sort
              </button>
              {showSortMenu && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-32">
                  <button
                    onClick={() => handleSort('asc')}
                    className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 flex items-center gap-2"
                  >
                    <SortAsc className="w-4 h-4" />
                    Sort A-Z
                  </button>
                  <button
                    onClick={() => handleSort('desc')}
                    className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 flex items-center gap-2"
                  >
                    <SortDesc className="w-4 h-4" />
                    Sort Z-A
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors whitespace-nowrap"
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>
              {showFilterMenu && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-40 p-3">
                  <div className="text-sm font-medium mb-2">Filter Options</div>
                  <button
                    onClick={handleFilter}
                    className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Apply Filter
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowViewMenu(!showViewMenu)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors whitespace-nowrap"
              >
                {currentView === 'grid' ? <Grid className="w-4 h-4" /> : <List className="w-4 h-4" />}
                {currentView === 'grid' ? 'Grid View' : 'List View'}
              </button>
              {showViewMenu && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-32">
                  <button
                    onClick={() => handleToggleView('list')}
                    className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 flex items-center gap-2"
                  >
                    <List className="w-4 h-4" />
                    List View
                  </button>
                  <button
                    onClick={() => handleToggleView('grid')}
                    className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Grid className="w-4 h-4" />
                    Grid View
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setShowImportMenu(!showImportMenu)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors border border-gray-200 whitespace-nowrap"
              >
                <Upload className="w-4 h-4" />
                Import
              </button>
              {showImportMenu && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-32">
                  <button
                    onClick={() => handleImport('csv')}
                    className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                  >
                    Import CSV
                  </button>
                  <button
                    onClick={() => handleImport('excel')}
                    className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                  >
                    Import Excel
                  </button>
                  <button
                    onClick={() => handleImport('json')}
                    className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                  >
                    Import JSON
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors border border-gray-200 whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              {showExportMenu && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-32">
                  <button
                    onClick={() => handleExport('csv')}
                    className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                  >
                    Export CSV
                  </button>
                  <button
                    onClick={() => handleExport('excel')}
                    className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                  >
                    Export Excel
                  </button>
                  <button
                    onClick={() => handleExport('json')}
                    className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                  >
                    Export JSON
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors border border-gray-200 whitespace-nowrap"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>

            <button
              onClick={handleNewAction}
              className="flex items-center gap-2 px-4 py-1.5 text-sm text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              New Action
            </button>
          </div>
        </div>
      </div>

      {/* Close dropdowns when clicking outside */}
      {(showSortMenu || showFilterMenu || showViewMenu || showImportMenu || showExportMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowSortMenu(false);
            setShowFilterMenu(false);
            setShowViewMenu(false);
            setShowImportMenu(false);
            setShowExportMenu(false);
          }}
        />
      )}
    </div>
  );
}

