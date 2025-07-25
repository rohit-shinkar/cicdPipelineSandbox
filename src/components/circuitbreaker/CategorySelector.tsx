import React from 'react';
import { Activity, Power, Database } from 'lucide-react';

export type CategoryType = 'Module Health' | 'Module Start' | 'Resources';

interface CategorySelectorProps {
  selectedCategory: CategoryType;
  onSelect: (category: CategoryType) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onSelect,
}) => {
  const categories: { type: CategoryType; icon: React.ReactNode; description: string }[] = [
    { 
      type: 'Module Health',
      icon: <Activity className="w-5 h-5" />,
      description: 'Monitor module health status and error rates'
    },
    { 
      type: 'Module Start',
      icon: <Power className="w-5 h-5" />,
      description: 'Track module startup and dependencies'
    },
    { 
      type: 'Resources',
      icon: <Database className="w-5 h-5" />,
      description: 'View resource connection status'
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
      </div>
      <div className="p-2">
        {categories.map(({ type, icon, description }) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={`w-full text-left p-4 rounded-lg transition-all ${
              selectedCategory === type
                ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-500/20'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3 mb-1">
              <div className={`p-2 rounded-lg ${
                selectedCategory === type 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {icon}
              </div>
              <span className="font-medium">{type}</span>
            </div>
            <p className={`text-xs pl-12 ${
              selectedCategory === type ? 'text-blue-600' : 'text-gray-500'
            }`}>
              {description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};