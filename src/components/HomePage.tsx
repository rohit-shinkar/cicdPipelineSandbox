import React from 'react';
import { ValidationCard } from './home/ValidationCard';
import { RegressionCard } from './home/RegressionCard';
import { PerformanceCard } from './home/PerformanceCard';
import { QualityGatesCard } from './home/QualityGatesCard';
import { CircuitBreakerCard } from './home/CircuitBreakerCard';
import { ProdHealthCheck } from './home/ProdHealthCheck';
import { EnvironmentStatusCard } from './home/EnvironmentStatusCard';
import { LSCRegressionCard } from './home/LSCRegressionCard';
import { DLQManagerAlertsCard } from './home/DLQManagerAlertsCard';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-full mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </div>

        {/* Main Status Row - Critical Monitoring */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-full">
            <ProdHealthCheck />
          </div>
          <div className="h-full">
            <CircuitBreakerCard />
          </div>
          <div className="h-full">
            <DLQManagerAlertsCard />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <RegressionCard />
          </div>
          <div className="md:col-span-2">
            <PerformanceCard />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <ValidationCard />
          </div>
          <div className="h-full">
            <LSCRegressionCard />
          </div>
        </div>

        {/* Quality Gates Row - Full Width */}
        <div className="w-full">
          <QualityGatesCard />
        </div>

        {/* Bottom Section - Environment Status */}
        <div>
          <EnvironmentStatusCard />
        </div>
      </div>
    </div>
  );
};