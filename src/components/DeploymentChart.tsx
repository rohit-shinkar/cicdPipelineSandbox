import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface DeploymentData {
  date: string;
  version: string;
  successRate: number;
  performanceScore: number;
  testCoverage: number;
}

const data: DeploymentData[] = [
  { date: '2024-03-01', version: 'v1.0.0', successRate: 98, performanceScore: 92, testCoverage: 87 },
  { date: '2024-03-02', version: 'v1.0.1', successRate: 95, performanceScore: 88, testCoverage: 89 },
  { date: '2024-03-03', version: 'v1.1.0', successRate: 92, performanceScore: 95, testCoverage: 91 },
  { date: '2024-03-04', version: 'v1.1.1', successRate: 97, performanceScore: 91, testCoverage: 88 },
  { date: '2024-03-05', version: 'v1.2.0', successRate: 99, performanceScore: 94, testCoverage: 92 },
];

export const DeploymentChart: React.FC = () => {
  return (
    <div className="w-full h-[400px] bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Deployment Metrics Over Time</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date) => format(new Date(date), 'MMM d')}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(date) => format(new Date(date as string), 'MMM d, yyyy')}
            formatter={(value, name) => [`${value}%`, name]}
          />
          <Legend />
          <Line type="monotone" dataKey="successRate" name="Success Rate" stroke="#2563eb" strokeWidth={2} />
          <Line type="monotone" dataKey="performanceScore" name="Performance" stroke="#16a34a" strokeWidth={2} />
          <Line type="monotone" dataKey="testCoverage" name="Test Coverage" stroke="#9333ea" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};