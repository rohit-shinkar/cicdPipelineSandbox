import React from 'react';
import { Activity, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface HealthCheck {
  environment: string;
  timestamp: string;
  status: 'passed' | 'failed';
  responseTime: number;
  availability: number;
}

const generateHealthChecks = (): HealthCheck[] => {
  const environments = ['PRODVIR', 'PRODFKT'];
  return environments.map(env => ({
    environment: env,
    timestamp: new Date().toISOString(),
    status: Math.random() > 0.1 ? 'passed' : 'failed',
    responseTime: Math.round(Math.random() * 100 + 150),
    availability: Math.round((Math.random() * 2 + 98) * 10) / 10
  }));
};

export const ProdHealthCheck: React.FC = () => {
  const [healthChecks, setHealthChecks] = React.useState<HealthCheck[]>(generateHealthChecks());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setHealthChecks(generateHealthChecks());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold">Prod Health Check</h2>
        </div>
        <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
          <span className="text-sm">View Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {healthChecks.map((check) => (
          <div
            key={check.environment}
            className={`p-3 rounded-lg ${
              check.status === 'passed' ? 'bg-green-50' : 'bg-red-50'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">{check.environment}</span>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                check.status === 'passed' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {check.status.toUpperCase()}
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Response Time</span>
                <span className="font-medium">{check.responseTime}ms</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Availability</span>
                <span className="font-medium">{check.availability}%</span>
              </div>
              <div className="text-xs text-gray-500">
                Last check: {format(new Date(check.timestamp), 'HH:mm:ss')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};