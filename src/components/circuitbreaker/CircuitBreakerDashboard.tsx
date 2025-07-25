import React, { useState } from 'react';
import { EnvironmentSelector } from './EnvironmentSelector';
import { StatusHeader } from './StatusHeader';
import { ModuleHealthPanel } from './ModuleHealthPanel';
import { ResourcePanel } from './ResourcePanel';
import { ModuleStartPanel } from './ModuleStartPanel';
import { CategorySelector, CategoryType } from './CategorySelector';
import { EnvironmentStatus, EnvironmentType } from '../../types/circuitBreaker';

const mockEnvironments: EnvironmentStatus[] = [
  {
    name: 'PRODVIR',
    moduleHealth: [
      {
        moduleName: 'UserService',
        state: 'OPEN',
        errorRate: 15.5,
        failureCount: 45,
        lastStateChange: new Date().toISOString()
      },
      {
        moduleName: 'PaymentService',
        state: 'HALF_OPEN',
        errorRate: 8.2,
        failureCount: 23,
        lastStateChange: new Date().toISOString()
      }
    ],
    resources: [
      {
        name: 'TLDB',
        state: 'OPEN',
        connectionCount: 5,
        lastError: 'Connection timeout',
        lastStateChange: new Date().toISOString()
      },
      {
        name: 'REDIS',
        state: 'HALF_OPEN',
        connectionCount: 3,
        lastStateChange: new Date().toISOString()
      }
    ],
    moduleStarts: [
      {
        moduleName: 'AuthService',
        startTime: new Date().toISOString(),
        state: 'OPEN',
        dependencies: ['TLDB', 'REDIS']
      }
    ],
    totalOpen: 2,
    totalClosed: 8,
    totalHalfOpen: 2
  },
  {
    name: 'PRODFKT',
    moduleHealth: [
      {
        moduleName: 'OrderService',
        state: 'HALF_OPEN',
        errorRate: 6.8,
        failureCount: 18,
        lastStateChange: new Date().toISOString()
      }
    ],
    resources: [
      {
        name: 'WV',
        state: 'OPEN',
        connectionCount: 2,
        lastError: 'Service unavailable',
        lastStateChange: new Date().toISOString()
      }
    ],
    moduleStarts: [],
    totalOpen: 1,
    totalClosed: 10,
    totalHalfOpen: 1
  },
  {
    name: 'VALVIR',
    moduleHealth: [],
    resources: [
      {
        name: 'OPA',
        state: 'HALF_OPEN',
        connectionCount: 1,
        lastStateChange: new Date().toISOString()
      }
    ],
    moduleStarts: [],
    totalOpen: 0,
    totalClosed: 11,
    totalHalfOpen: 1
  },
  {
    name: 'VALFKT',
    moduleHealth: [],
    resources: [],
    moduleStarts: [],
    totalOpen: 0,
    totalClosed: 12,
    totalHalfOpen: 0
  }
];

export const CircuitBreakerDashboard: React.FC = () => {
  const [selectedEnv, setSelectedEnv] = useState<EnvironmentType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('Module Health');

  const selectedEnvironment = mockEnvironments.find(env => env.name === selectedEnv);

  const renderCategoryContent = () => {
    if (!selectedEnvironment) return null;

    switch (selectedCategory) {
      case 'Module Health':
        return <ModuleHealthPanel modules={selectedEnvironment.moduleHealth} />;
      case 'Module Start':
        return <ModuleStartPanel modules={selectedEnvironment.moduleStarts} />;
      case 'Resources':
        return <ResourcePanel resources={selectedEnvironment.resources} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Circuit Breaker Status</h1>
        </div>

        <StatusHeader environments={mockEnvironments} />
        
        <div className="mb-6">
          <EnvironmentSelector
            selectedEnv={selectedEnv}
            onSelect={setSelectedEnv}
          />
        </div>

        {selectedEnvironment && (
          <div className="flex gap-6">
            <div className="w-72 shrink-0">
              <div className="sticky top-6">
                <CategorySelector
                  selectedCategory={selectedCategory}
                  onSelect={setSelectedCategory}
                />
              </div>
            </div>
            <div className="flex-1">
              {renderCategoryContent()}
            </div>
          </div>
        )}

        {!selectedEnvironment && (
          <div className="text-center py-12 text-gray-500">
            Select an environment to view details
          </div>
        )}
      </div>
    </div>
  );
};