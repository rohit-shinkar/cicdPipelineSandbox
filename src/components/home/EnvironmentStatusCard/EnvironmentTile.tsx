import React from 'react';
import { format } from 'date-fns';
import { ImageBadge } from './ImageBadge';
import { StatusBadge } from './StatusBadge';
import { HealthBadge } from './HealthBadge';
import { EnvironmentStatus } from '../../../types/environment';

interface EnvironmentTileProps {
  status: EnvironmentStatus;
}

export const EnvironmentTile: React.FC<EnvironmentTileProps> = ({ status }) => (
  <div className={`p-3 rounded-lg ${
    status.isHibernated ? 'bg-gray-50' : 
    status.healthStatus === 'healthy' ? 'bg-green-50/30' :
    status.healthStatus === 'degraded' ? 'bg-yellow-50/30' :
    'bg-red-50/30'
  }`}>
    <div className="flex items-center justify-between mb-2">
      <div>
        <span className="font-medium text-sm">{status.name}</span>
      </div>
      <div className="flex items-center space-x-2">
        <HealthBadge status={status.healthStatus} />
        <StatusBadge isHibernated={status.isHibernated} />
      </div>
    </div>
    <div className="space-y-1">
      <ImageBadge image={status.images.kernel} />
      <ImageBadge image={status.images.worldview} />
    </div>
    <div className="text-[10px] text-gray-500 mt-1.5">
      Updated {format(new Date(status.lastChecked), 'HH:mm:ss')}
    </div>
    {status.components && (
      <div className="mt-2 pt-2 border-t border-gray-200">
        <div className="grid grid-cols-5 gap-1">
          {Object.entries(status.components).map(([key, component]) => (
            <div
              key={key}
              className={`text-[10px] px-1.5 py-0.5 rounded ${
                component.status === 'passed' ? 'bg-green-100 text-green-700' :
                component.status === 'failed' ? 'bg-red-100 text-red-700' :
                'bg-yellow-100 text-yellow-700'
              }`}
            >
              {key}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);