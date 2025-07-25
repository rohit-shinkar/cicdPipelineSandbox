import React from 'react';
import { Activity } from 'lucide-react';
import { HealthStatus } from '../../../types/environment';

interface HealthBadgeProps {
  status: HealthStatus;
}

export const HealthBadge: React.FC<HealthBadgeProps> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'healthy':
        return 'text-green-500';
      case 'degraded':
        return 'text-yellow-500';
      case 'unhealthy':
        return 'text-red-500';
    }
  };

  return (
    <Activity className={`w-3.5 h-3.5 ${getStatusColor()}`} />
  );
};