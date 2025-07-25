import React from 'react';
import { format } from 'date-fns';
import { CheckCircle2, Clock } from 'lucide-react';

interface Deployment {
  version: string;
  environment: string;
  status: 'completed' | 'in-progress';
  completedAt?: string;
  duration: string;
}

const deployments: Deployment[] = [
  {
    version: '2024.03.1',
    environment: 'PRODVIR',
    status: 'completed',
    completedAt: '2024-03-10T15:30:00Z',
    duration: '15m 30s'
  },
  {
    version: '2024.03.1',
    environment: 'PRODFKT',
    status: 'completed',
    completedAt: '2024-03-10T14:45:00Z',
    duration: '14m 45s'
  },
  {
    version: '2024.03.1',
    environment: 'TEST04',
    status: 'in-progress',
    duration: '10m 15s'
  }
];

export const DeploymentStatusCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Deployments</h2>
      <div className="space-y-4">
        {deployments.map((deployment, index) => (
          <div 
            key={`${deployment.version}-${deployment.environment}`}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              {deployment.status === 'completed' ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <Clock className="w-5 h-5 text-blue-500 animate-spin" />
              )}
              <div>
                <div className="font-medium">{deployment.version}</div>
                <div className="text-sm text-gray-500">{deployment.environment}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">
                {deployment.status === 'completed' 
                  ? format(new Date(deployment.completedAt!), 'HH:mm')
                  : 'In Progress'
                }
              </div>
              <div className="text-sm text-gray-500">{deployment.duration}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};