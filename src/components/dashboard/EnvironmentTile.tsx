import React from 'react';
import { Environment } from '../../types/environment';
import { Tag } from 'lucide-react';
import { EnvironmentChart } from './charts/EnvironmentChart';
import { StageIndicator } from './StageIndicator';

interface EnvironmentTileProps {
  environment: Environment;
}

export const EnvironmentTile: React.FC<EnvironmentTileProps> = ({ environment }) => {
  const getOverallStatus = () => {
    if (environment.stages.some(stage => stage.status === 'failure')) return 'failure';
    if (environment.stages.some(stage => stage.status === 'running')) return 'running';
    if (environment.stages.every(stage => stage.status === 'success')) return 'success';
    return 'pending';
  };

  const getStatusColor = () => {
    switch (getOverallStatus()) {
      case 'success':
        return 'border-green-500 bg-green-50/30';
      case 'failure':
        return 'border-red-500 bg-red-50/30';
      case 'running':
        return 'border-blue-500 bg-blue-50/30';
      default:
        return 'border-yellow-500 bg-yellow-50/30';
    }
  };

  return (
    <div className={`rounded-xl shadow-sm border-l-4 ${getStatusColor()} transition-all hover:shadow-md`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-medium text-gray-900">{environment.name}</h2>
          <div className="flex items-center space-x-2 text-sm bg-white px-2.5 py-1.5 rounded-md shadow-sm">
            <Tag className="w-4 h-4" />
            <span className="text-base font-medium text-gray-700">{environment.releaseTag}</span>
          </div>
        </div>

        <div className="mb-4">
          <EnvironmentChart stages={environment.stages} />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {environment.stages.map((stage) => (
            <StageIndicator key={stage.name} stage={stage} />
          ))}
        </div>
      </div>
    </div>
  );
};