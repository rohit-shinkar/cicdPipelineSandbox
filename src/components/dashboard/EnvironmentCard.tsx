import React from 'react';
import { StageCard } from './StageCard';
import { EnvironmentMetrics } from './EnvironmentMetrics';
import { Environment } from '../../types/environment';
import { Tag, ChevronDown, ChevronUp } from 'lucide-react';

interface EnvironmentCardProps {
  environment: Environment;
}

export const EnvironmentCard: React.FC<EnvironmentCardProps> = ({ environment }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const getOverallStatus = () => {
    if (environment.stages.some(stage => stage.status === 'failure')) return 'failure';
    if (environment.stages.some(stage => stage.status === 'running')) return 'running';
    if (environment.stages.every(stage => stage.status === 'success')) return 'success';
    return 'pending';
  };

  const getStatusColor = () => {
    switch (getOverallStatus()) {
      case 'success':
        return 'border-green-500';
      case 'failure':
        return 'border-red-500';
      case 'running':
        return 'border-blue-500';
      default:
        return 'border-yellow-500';
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border-t-4 ${getStatusColor()}`}>
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">{environment.name}</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Tag className="w-4 h-4" />
              <span>{environment.releaseTag}</span>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {environment.stages.map((stage) => (
          <StageCard key={stage.name} stage={stage} />
        ))}
      </div>

      {isExpanded && (
        <div className="p-4 border-t border-gray-100">
          <EnvironmentMetrics environment={environment} />
        </div>
      )}
    </div>
  );
};