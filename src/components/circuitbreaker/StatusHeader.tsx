import React from 'react';
import { CheckCircle2, AlertTriangle, MinusCircle } from 'lucide-react';
import { EnvironmentStatus, CircuitState } from '../../types/circuitBreaker';

interface StatusHeaderProps {
  environments: EnvironmentStatus[];
}

const StateCount: React.FC<{ state: CircuitState; count: number }> = ({ state, count }) => {
  const getIcon = () => {
    switch (state) {
      case 'CLOSED':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'OPEN':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'HALF_OPEN':
        return <MinusCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <div className="flex items-center space-x-1.5">
      {getIcon()}
      <span className="text-sm font-medium">{count}</span>
    </div>
  );
};

export const StatusHeader: React.FC<StatusHeaderProps> = ({ environments }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Environment Status</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {environments.map((env) => {
          const hasIssues = env.totalOpen > 0 || env.totalHalfOpen > 0;
          return (
            <div
              key={env.name}
              className={`p-4 rounded-lg border-l-4 ${
                hasIssues 
                  ? env.totalOpen > 0 
                    ? 'border-l-red-500 bg-red-50/50' 
                    : 'border-l-yellow-500 bg-yellow-50/50'
                  : 'border-l-green-500 bg-green-50/50'
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-semibold text-gray-900">{env.name}</h3>
              </div>
              <div className="flex space-x-4">
                <StateCount state="CLOSED" count={env.totalClosed} />
                <StateCount state="OPEN" count={env.totalOpen} />
                <StateCount state="HALF_OPEN" count={env.totalHalfOpen} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};