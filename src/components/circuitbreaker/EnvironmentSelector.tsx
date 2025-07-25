import React from 'react';
import { EnvironmentType } from '../../types/circuitBreaker';
import { Server } from 'lucide-react';

interface EnvironmentSelectorProps {
  selectedEnv: EnvironmentType | null;
  onSelect: (env: EnvironmentType) => void;
}

export const EnvironmentSelector: React.FC<EnvironmentSelectorProps> = ({
  selectedEnv,
  onSelect,
}) => {
  const environments: EnvironmentType[] = ['PRODVIR', 'PRODFKT', 'VALVIR', 'VALFKT'];

  return (
    <div className="flex flex-wrap gap-3">
      {environments.map((env) => (
        <button
          key={env}
          onClick={() => onSelect(env)}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
            selectedEnv === env
              ? 'bg-blue-50 text-blue-700 ring-2 ring-blue-500 shadow-sm'
              : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-blue-600 border border-gray-200'
          }`}
        >
          <Server className={`w-4 h-4 ${selectedEnv === env ? 'text-blue-500' : 'text-gray-400'}`} />
          <span>{env}</span>
        </button>
      ))}
    </div>
  );
};