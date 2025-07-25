import React from 'react';
import { Server } from 'lucide-react';
import { EnvironmentStatus } from '../../../types/environment';
import { EnvironmentTile } from './EnvironmentTile';

interface ClusterCardProps {
  environments: EnvironmentStatus[];
  clusterName: string;
}

export const ClusterCard: React.FC<ClusterCardProps> = ({ environments, clusterName }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Server className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold">{clusterName} Cluster</h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {environments.map((status) => (
          <EnvironmentTile key={status.name} status={status} />
        ))}
      </div>
    </div>
  );
};