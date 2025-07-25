import React from 'react';
import { PlayCircle, GitBranch, Eye, Play, FileText, Activity, Database } from 'lucide-react';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
  >
    {icon}
    <span className="text-xs">{label}</span>
  </button>
);

interface EnvironmentTileProps {
  name: string;
  icon: React.ReactNode;
  status?: string;
  statusColor?: string;
  description?: string;
  isAction?: boolean;
}

const EnvironmentTile: React.FC<EnvironmentTileProps> = ({ 
  name, 
  icon, 
  status, 
  statusColor = "text-gray-600",
  description,
  isAction = false 
}) => (
  <div className={`p-3 rounded-lg ${
    isAction 
      ? 'border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 cursor-pointer' 
      : 'bg-white hover:shadow-sm'
  } transition-all`}>
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center space-x-2">
        <div className={isAction ? '' : 'p-1 bg-gray-50 rounded-md'}>
          {icon}
        </div>
        <span className="font-medium text-sm">{name}</span>
      </div>
      {status && (
        <span className={`text-xs font-medium ${statusColor}`}>
          {status}
        </span>
      )}
    </div>
    {description && (
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    )}
  </div>
);

export const ValidationCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg">
      <div className="p-3 border-b border-gray-100">
        <h2 className="text-lg font-semibold">Validation Options</h2>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-4 gap-3">
          <EnvironmentTile
            name="Release Validation"
            icon={<PlayCircle className="w-4 h-4 text-blue-500" />}
            description="Start validation"
            isAction
          />
          <EnvironmentTile
            name="Dry Run"
            icon={<GitBranch className="w-4 h-4 text-purple-500" />}
            description="Test deployment"
            isAction
          />
          <EnvironmentTile
            name="Opus LinkLab"
            icon={<Activity className="w-4 h-4 text-indigo-500" />}
            status="Active"
            statusColor="text-green-600"
          />
          <EnvironmentTile
            name="Developvir"
            icon={<Database className="w-4 h-4 text-amber-500" />}
            status="Running"
            statusColor="text-blue-600"
          />
        </div>
      </div>
    </div>
  );
};