import React from "react";
import { Plus } from "lucide-react";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: string[];
}

export function TabNavigation({
  activeTab,
  onTabChange,
  tabs,
}: TabNavigationProps) {
  const handleAddTab = () => {
    console.log("Add new tab clicked");
  };

  return (
    <div className="bg-white border-t border-gray-200 px-6 py-2">
      <div className="flex items-center gap-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${
              activeTab === tab
                ? "bg-blue-50 text-blue-700 border-b-2 border-blue-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
        <button
          onClick={handleAddTab}
          className="ml-2 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
