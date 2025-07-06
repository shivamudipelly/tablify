import React, { useRef } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: string[];
  onAddTab?: () => void;
  editingTabIdx?: number | null;
  onEditTabIdx?: (idx: number | null) => void;
  onTabNameChange?: (idx: number, newName: string) => void;
}

export function TabNavigation({
  activeTab,
  onTabChange,
  tabs,
  onAddTab,
  editingTabIdx,
  onEditTabIdx,
  onTabNameChange,
}: TabNavigationProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 px-4 md:px-6 py-2">
      <div className="flex items-center gap-2">
        {/* Left scroll button */}
        <button
          onClick={scrollLeft}
          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
          title="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable tabs container */}
        <div 
          ref={scrollContainerRef}
          className="flex items-center gap-1 overflow-x-auto hide-scrollbar flex-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tabs.map((tab, idx) => (
            <div key={tab} className="relative flex items-center group flex-shrink-0">
              {editingTabIdx === idx ? (
                <input
                  ref={inputRef}
                  className="px-2 py-1 text-sm rounded border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 min-w-0"
                  value={tab}
                  onChange={e => onTabNameChange && onTabNameChange(idx, e.target.value)}
                  onBlur={() => onEditTabIdx && onEditTabIdx(null)}
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === "Escape") {
                      onEditTabIdx?.(null);
                    }
                  }}
                  autoFocus
                />
              ) : (
                <button
                  onClick={() => onTabChange(tab)}
                  className={`px-3 md:px-4 py-2 text-xs md:text-sm font-medium rounded-t-md transition-colors whitespace-nowrap min-w-0 max-w-32 truncate ${
                    activeTab === tab
                      ? "bg-blue-50 text-blue-700 border-b-2 border-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  onDoubleClick={() => onEditTabIdx && onEditTabIdx(idx)}
                  title={tab}
                >
                  {tab}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Right scroll button */}
        <button
          onClick={scrollRight}
          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
          title="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Add tab button */}
        <button
          onClick={onAddTab}
          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
          title="Add new sheet"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
