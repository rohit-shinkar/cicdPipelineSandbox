import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { TestResult } from '../types/regression';

const data: TestResult[] = [
  { buildId: 'BUILD-123', timestamp: '2024-03-01T09:00:00', totalTests: 450, passed: 438, failed: 8, skipped: 4, duration: 892, status: 'success' },
  { buildId: 'BUILD-124', timestamp: '2024-03-02T09:15:00', totalTests: 450, passed: 442, failed: 6, skipped: 2, duration: 875, status: 'success' },
  { buildId: 'BUILD-125', timestamp: '2024-03-03T09:30:00', totalTests: 452, passed: 440, failed: 10, skipped: 2, duration: 901, status: 'failure' },
  { buildId: 'BUILD-126', timestamp: '2024-03-04T09:45:00', totalTests: 452, passed: 449, failed: 2, skipped: 1, duration: 888, status: 'success' },
  { buildId: 'BUILD-127', timestamp: '2024-03-05T10:00:00', totalTests: 455, passed: 451, failed: 3, skipped: 1, duration: 895, status: 'success' },
];

export const RegressionChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Daily Regression Test Results</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(time) => format(new Date(time), 'MMM d')}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(time) => format(new Date(time as string), 'MMM d, yyyy HH:mm')}
              formatter={(value, name) => [value, name === 'passed' ? 'Passed Tests' : name === 'failed' ? 'Failed Tests' : 'Skipped Tests']}
            />
            <Area type="monotone" dataKey="passed" stackId="1" stroke="#16a34a" fill="#86efac" />
            <Area type="monotone" dataKey="failed" stackId="1" stroke="#dc2626" fill="#fca5a5" />
            <Area type="monotone" dataKey="skipped" stackId="1" stroke="#ca8a04" fill="#fde047" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};