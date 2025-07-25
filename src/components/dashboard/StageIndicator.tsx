import React from 'react';
import { CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';
import { Stage } from '../../types/environment';

interface StageIndicatorProps {
  stage: Stage;
}

export const StageIndicator: React.FC<StageIndicatorProps> = ({ stage }) => {
  const getStatusIcon = () => {
    switch (stage.status) {
      case 'success':
        return <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />;
      case 'failure':
        return <XCircle className="w-3.5 h-3.5 text-red-500" />;
      case 'running':
        return <Clock className="w-3.5 h-3.5 text-blue-500 animate-spin" />;
      default:
        return <AlertCircle className="w-3.5 h-3.5 text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (stage.status) {
      case 'success':
        return 'bg-green-50/50 text-green-700 border-green-100';
      case 'failure':
        return 'bg-red-50/50 text-red-700 border-red-100';
      case 'running':
        return 'bg-blue-50/50 text-blue-700 border-blue-100';
      default:
        return 'bg-yellow-50/50 text-yellow-700 border-yellow-100';
    }
  };

  return (
    <div className={`p-2 rounded-md border ${getStatusColor()} text-xs`}>
      <div className="flex items-center space-x-1.5">
        {getStatusIcon()}
        <span className="font-medium truncate">{stage.name}</span>
      </div>
      <div className="mt-1 font-medium">{stage.passRate}%</div>
    </div>
  );
};