import React from 'react';
import { Resource } from '../../types/circuitBreaker';
import { Database, Cloud, Server } from 'lucide-react';
import { format } from 'date-fns';

interface ResourcePanelProps {
  resources: Resource[];
}

export const ResourcePanel: React.FC<ResourcePanelProps> = ({ resources }) => {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'TLDB':
      case 'REDIS':
        return <Database className="w-5 h-5" />;
      case 'WV':
      case 'OPA':
        return <Cloud className="w-5 h-5" />;
      default:
        return <Server className="w-5 h-5" />;
    }
  };

  const nonClosedResources = resources.filter(r => r.state !== 'CLOSED');

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nonClosedResources.map((resource) => (
          <div
            key={resource.name}
            className={`p-4 rounded-lg border-l-4 ${
              resource.state === 'OPEN' ? 'border-l-red-500 bg-red-50' : 'border-l-yellow-500 bg-yellow-50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className={`${
                  resource.state === 'OPEN' ? 'text-red-500' : 'text-yellow-500'
                }`}>
                  {getResourceIcon(resource.name)}
                </div>
                <h3 className="font-medium">{resource.name}</h3>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                resource.state === 'OPEN' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'
              }`}>
                {resource.state}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Connections</span>
                <span className="font-medium">{resource.connectionCount}</span>
              </div>
              {resource.lastError && (
                <div className="text-red-600 text-xs">{resource.lastError}</div>
              )}
              <div className="text-gray-500 text-xs">
                Last change: {format(new Date(resource.lastStateChange), 'HH:mm:ss')}
              </div>
            </div>
          </div>
        ))}
        {nonClosedResources.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-500">
            All resources are in closed state
          </div>
        )}
      </div>
    </div>
  );
};