import React, { useState, useEffect } from 'react';
import { CircuitBreakerGraph } from './CircuitBreakerGraph';
import { ServiceHealthGrid } from './ServiceHealthGrid';
import { StateTransitionLog } from './StateTransitionLog';
import { ServiceHealth, StateTransition } from '../types/circuitBreaker';
import { RefreshCw } from 'lucide-react';

// Simulated API call to fetch service health data
const fetchServiceHealth = (): Promise<ServiceHealth[]> => {
  return new Promise((resolve) => {
    const services: ServiceHealth[] = [
      {
        id: 'auth-service',
        name: 'Authentication Service',
        state: Math.random() > 0.8 ? 'OPEN' : 'CLOSED',
        errorRate: Math.random() * 15,
        latency: Math.floor(Math.random() * 200 + 30),
        throughput: Math.floor(Math.random() * 300 + 100),
        lastStateChange: new Date().toISOString(),
        failureThreshold: 50,
        successfulCalls: Math.floor(Math.random() * 1000 + 8000),
        failedCalls: Math.floor(Math.random() * 500)
      },
      {
        id: 'payment-service',
        name: 'Payment Service',
        state: Math.random() > 0.7 ? 'HALF_OPEN' : 'CLOSED',
        errorRate: Math.random() * 20,
        latency: Math.floor(Math.random() * 2500 + 100),
        throughput: Math.floor(Math.random() * 100 + 20),
        lastStateChange: new Date().toISOString(),
        failureThreshold: 50,
        successfulCalls: Math.floor(Math.random() * 1000 + 7000),
        failedCalls: Math.floor(Math.random() * 1000)
      },
      {
        id: 'order-service',
        name: 'Order Service',
        state: Math.random() > 0.9 ? 'OPEN' : 'CLOSED',
        errorRate: Math.random() * 10,
        latency: Math.floor(Math.random() * 300 + 50),
        throughput: Math.floor(Math.random() * 200 + 50),
        lastStateChange: new Date().toISOString(),
        failureThreshold: 50,
        successfulCalls: Math.floor(Math.random() * 1000 + 8500),
        failedCalls: Math.floor(Math.random() * 300)
      }
    ];
    resolve(services);
  });
};

// Simulated API call to fetch transition history
const fetchTransitions = (services: ServiceHealth[]): StateTransition[] => {
  return services
    .filter(service => service.state !== 'CLOSED')
    .map(service => ({
      timestamp: service.lastStateChange,
      serviceId: service.id,
      fromState: 'CLOSED',
      toState: service.state,
      reason: service.state === 'OPEN' 
        ? `Error rate exceeded threshold (${service.errorRate.toFixed(1)}% > 10%)`
        : 'Cool-down period elapsed, testing service health'
    }));
};

export const CircuitBreakerDashboard: React.FC = () => {
  const [services, setServices] = useState<ServiceHealth[]>([]);
  const [transitions, setTransitions] = useState<StateTransition[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);

  const updateData = async () => {
    setLoading(true);
    try {
      const newServices = await fetchServiceHealth();
      setServices(newServices);
      setTransitions(fetchTransitions(newServices));
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to fetch circuit breaker data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    updateData();
    const interval = setInterval(updateData, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Circuit Breaker Status</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </span>
            <button 
              onClick={updateData}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <div className="grid grid-cols-3 gap-4">
                {services.map(service => (
                  <div 
                    key={service.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      service.state === 'CLOSED' ? 'border-l-green-500 bg-green-50' :
                      service.state === 'OPEN' ? 'border-l-red-500 bg-red-50' :
                      'border-l-yellow-500 bg-yellow-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{service.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        service.state === 'CLOSED' ? 'bg-green-200 text-green-800' :
                        service.state === 'OPEN' ? 'bg-red-200 text-red-800' :
                        'bg-yellow-200 text-yellow-800'
                      }`}>
                        {service.state}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Error Rate:</span>
                        <span className={`ml-2 font-medium ${
                          service.errorRate > 10 ? 'text-red-600' :
                          service.errorRate > 5 ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {service.errorRate.toFixed(1)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Latency:</span>
                        <span className="ml-2 font-medium">{service.latency}ms</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <CircuitBreakerGraph services={services} />
          <ServiceHealthGrid services={services} />
        </div>
        <StateTransitionLog transitions={transitions} />
      </div>
    </div>
  );
};