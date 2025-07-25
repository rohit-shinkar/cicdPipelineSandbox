import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { pollEnvironmentStatus } from '../../../services/environmentService';
import { EnvironmentStatus } from '../../../types/environment';
import { ClusterCard } from './ClusterCard';

export const EnvironmentStatusCard: React.FC = () => {
  const [statuses, setStatuses] = useState<EnvironmentStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await pollEnvironmentStatus();
        setStatuses(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch environment status');
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const clusterEnvironments = {
    DNPKUB: statuses.filter(s => ['PRODVIR', 'PRODFKT', 'VALVIR', 'VALFKT'].includes(s.name)),
    QUALKUB: statuses.filter(s => ['QUAL01', 'QUAL02'].includes(s.name)),
    DEVKUB: statuses.filter(s => ['DEV01', 'DEV02'].includes(s.name)),
    STAGEKUB: statuses.filter(s => ['STAGE01', 'STAGE02'].includes(s.name))
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-3">
        <div className="h-5 bg-gray-200 rounded w-1/4"></div>
        <div className="grid grid-cols-2 gap-3">
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center space-x-2 text-red-600">
        <AlertCircle className="w-4 h-4" />
        <span className="text-sm">{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(clusterEnvironments).map(([cluster, envs]) => (
        <ClusterCard 
          key={cluster} 
          clusterName={cluster} 
          environments={envs}
        />
      ))}
    </div>
  );
};