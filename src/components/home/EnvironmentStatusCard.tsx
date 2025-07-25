import React, { useState, useEffect } from 'react';
import { Power, AlertCircle, Package, Box } from 'lucide-react';
import { format } from 'date-fns';
import { pollEnvironmentStatus } from '../../services/environmentService';
import { EnvironmentStatus, ImageVersion } from '../../types/environment';

const ImageVersionBadge: React.FC<{ image: ImageVersion }> = ({ image }) => (
  <div className="flex items-center space-x-2 text-xs bg-gray-100 rounded-lg p-2">
    {image.type === 'kernel' ? (
      <Package className="w-3.5 h-3.5 text-purple-500" />
    ) : (
      <Box className="w-3.5 h-3.5 text-blue-500" />
    )}
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <span className="font-medium capitalize">{image.type}</span>
        <span className="text-gray-500">{image.buildNumber}</span>
      </div>
      <div className="flex items-baseline justify-between mt-0.5">
        <span className="text-gray-700">{image.version}</span>
        <span className="text-gray-400 text-[10px]">
          {format(new Date(image.timestamp), 'MMM d, HH:mm')}
        </span>
      </div>
    </div>
  </div>
);

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
    const interval = setInterval(fetchStatus, 60000); // Poll every minute

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-2 text-red-600">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Environment Status</h2>
      <div className="grid grid-cols-2 gap-4">
        {statuses.map((status) => (
          <div
            key={status.name}
            className={`p-4 rounded-lg ${
              status.isHibernated ? 'bg-gray-50' : 'bg-green-50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">{status.name}</span>
              <div className="flex items-center space-x-2">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  status.isHibernated 
                    ? 'bg-gray-200 text-gray-700'
                    : 'bg-green-200 text-green-700'
                }`}>
                  {status.isHibernated ? 'Hibernated' : 'Active'}
                </span>
                <Power className={`w-4 h-4 ${
                  status.isHibernated ? 'text-gray-400' : 'text-green-500'
                }`} />
              </div>
            </div>
            <div className="space-y-2">
              <ImageVersionBadge image={status.images.kernel} />
              <ImageVersionBadge image={status.images.worldview} />
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Last checked: {format(new Date(status.lastChecked), 'HH:mm:ss')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};