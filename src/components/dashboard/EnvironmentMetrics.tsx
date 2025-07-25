import React from 'react';
import { StatusPieChart } from './charts/StatusPieChart';
import { TestResultsBarChart } from './charts/TestResultsBarChart';
import { Environment } from '../../types/environment';

interface EnvironmentMetricsProps {
  environment: Environment;
}

export const EnvironmentMetrics: React.FC<EnvironmentMetricsProps> = ({ environment }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Status Distribution</h3>
        <StatusPieChart stages={environment.stages} />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Results</h3>
        <TestResultsBarChart stages={environment.stages} />
      </div>
    </div>
  );
};