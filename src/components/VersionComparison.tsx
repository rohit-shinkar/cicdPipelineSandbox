import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ComparisonMetric {
  name: string;
  previous: number;
  current: number;
}

const metrics: ComparisonMetric[] = [
  { name: 'Unit Tests Pass Rate', previous: 95, current: 98 },
  { name: 'Integration Tests Pass Rate', previous: 92, current: 94 },
  { name: 'E2E Tests Pass Rate', previous: 88, current: 91 },
  { name: 'Code Coverage', previous: 85, current: 89 },
  { name: 'Performance Score', previous: 90, current: 93 },
];

export const VersionComparison: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-6">Version Comparison (v1.1.0 → v1.2.0)</h3>
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="flex items-center">
            <div className="w-1/3">
              <p className="text-sm font-medium text-gray-600">{metric.name}</p>
            </div>
            <div className="flex-1 flex items-center space-x-4">
              <span className="text-lg font-semibold">{metric.previous}%</span>
              <ArrowRight className="w-5 h-5 text-gray-400" />
              <span className={`text-lg font-semibold ${
                metric.current > metric.previous ? 'text-green-500' : 'text-red-500'
              }`}>
                {metric.current}%
              </span>
              <span className={`text-sm ${
                metric.current > metric.previous ? 'text-green-500' : 'text-red-500'
              }`}>
                ({metric.current > metric.previous ? '+' : ''}
                {(metric.current - metric.previous).toFixed(1)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};