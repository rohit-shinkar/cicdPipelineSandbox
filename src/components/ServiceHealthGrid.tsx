import React from 'react';
import { ServiceHealth } from '../types/circuitBreaker';
import { AlertTriangle, CheckCircle, MinusCircle } from 'lucide-react';

interface Props {
  services: ServiceHealth[];
}

const StateIcon: React.FC<{ state: string }> = ({ state }) => {
  switch (state) {
    case 'CLOSED':
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    case 'OPEN':
      return <AlertTriangle className="w-6 h-6 text-red-500" />;
    case 'HALF_OPEN':
      return <MinusCircle className="w-6 h-6 text-yellow-500" />;
    default:
      return null;
  }
};

export const ServiceHealthGrid: React.FC<Props> = ({ services }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Service Health Status</h2>
        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <StateIcon state={service.state} />
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-sm text-gray-500">
                      State changed {new Date(service.lastStateChange).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  service.state === 'CLOSED' ? 'bg-green-100 text-green-800' :
                  service.state === 'OPEN' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {service.state}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-500">Error Rate</p>
                  <p className={`text-lg font-semibold ${
                    service.errorRate > 10 ? 'text-red-600' :
                    service.errorRate > 5 ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {service.errorRate.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Latency</p>
                  <p className="text-lg font-semibold">
                    {service.latency}ms
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Throughput</p>
                  <p className="text-lg font-semibold">
                    {service.throughput}/s
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};