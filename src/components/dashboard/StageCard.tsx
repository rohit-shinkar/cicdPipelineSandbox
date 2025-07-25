import React from 'react';
import { CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';
import { Stage } from '../../types/environment';
import { format } from 'date-fns';

interface StageCardProps {
  stage: Stage;
}

export const StageCard: React.FC<StageCardProps> = ({ stage }) => {
  const getStatusIcon = () => {
    switch (stage.status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'failure':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'running':
        return <Clock className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (stage.status) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'failure':
        return 'bg-red-50 border-red-200';
      case 'running':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-yellow-50 border-yellow-200';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getStatusColor()} transition-all hover:shadow-md`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <h3 className="font-medium text-gray-900">{stage.name}</h3>
        </div>
        <span className="text-sm text-gray-500">
          {format(new Date(stage.lastUpdated), 'HH:mm')}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Pass Rate</span>
          <span className={`font-medium ${
            stage.passRate >= 90 ? 'text-green-600' :
            stage.passRate >= 70 ? 'text-yellow-600' :
            'text-red-600'
          }`}>
            {stage.passRate}%
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div>
            <div className="text-gray-600">Total</div>
            <div className="font-medium">{stage.testsTotal}</div>
          </div>
          <div>
            <div className="text-green-600">Passed</div>
            <div className="font-medium">{stage.testsPassed}</div>
          </div>
          <div>
            <div className="text-red-600">Failed</div>
            <div className="font-medium">{stage.testsFailed}</div>
          </div>
        </div>
      </div>
    </div>
  );
};