import React, { useState } from 'react';
import { ModuleStart } from '../../types/circuitBreaker';
import { Power, Clock, Link, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';

interface ModuleStartPanelProps {
  modules: ModuleStart[];
}

export const ModuleStartPanel: React.FC<ModuleStartPanelProps> = ({ modules }) => {
  const [showAll, setShowAll] = useState(false);
  const nonClosedModules = modules.filter(m => m.state !== 'CLOSED');
  const previewCount = 6;
  const hasMore = nonClosedModules.length > previewCount;
  const displayModules = showAll ? nonClosedModules : nonClosedModules.slice(0, previewCount);

  const groupedModules = {
    open: displayModules.filter(m => m.state === 'OPEN'),
    halfOpen: displayModules.filter(m => m.state === 'HALF_OPEN')
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-6">Module Start Status</h2>
      <div className="space-y-8">
        {Object.entries(groupedModules).map(([state, modules]) => modules.length > 0 && (
          <div key={state} className="relative">
            <div className="mb-4 flex items-center">
              <div className="w-2 h-2 rounded-full mr-2 bg-blue-500" />
              <h3 className="text-sm font-medium text-gray-700">
                {state === 'open' ? 'Open' : 'Half-Open'} Modules
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.map((module) => (
                <div
                  key={module.moduleName}
                  className={`p-4 rounded-lg border-l-4 transition-all hover:shadow-md ${
                    module.state === 'OPEN' 
                      ? 'border-l-red-500 bg-red-50/70 hover:bg-red-50' 
                      : 'border-l-yellow-500 bg-yellow-50/70 hover:bg-yellow-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Power className={`w-4 h-4 ${
                        module.state === 'OPEN' ? 'text-red-500' : 'text-yellow-500'
                      }`} />
                      <span className="text-xs font-medium text-gray-600">{module.moduleName}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      module.state === 'OPEN' 
                        ? 'bg-red-200 text-red-800' 
                        : 'bg-yellow-200 text-yellow-800'
                    }`}>
                      {module.state}
                    </span>
                  </div>
                  <div className="space-y-2 mt-3">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      <span>{format(new Date(module.startTime), 'HH:mm:ss')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Link className="w-3.5 h-3.5 text-gray-400" />
                      <div className="flex flex-wrap gap-1">
                        {module.dependencies.map((dep) => (
                          <span
                            key={dep}
                            className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded"
                          >
                            {dep}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {!showAll && hasMore && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700"
            >
              <span className="text-sm">Show All Modules</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}

        {showAll && hasMore && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(false)}
              className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700"
            >
              <span className="text-sm">Show Less</span>
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        )}

        {nonClosedModules.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            All modules started successfully
          </div>
        )}
      </div>
    </div>
  );
};