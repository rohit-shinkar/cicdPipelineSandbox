import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Stage } from '../../../types/environment';

interface TestResultsBarChartProps {
  stages: Stage[];
}

export const TestResultsBarChart: React.FC<TestResultsBarChartProps> = ({ stages }) => {
  const data = stages.map(stage => ({
    name: stage.name,
    Passed: stage.testsPassed,
    Failed: stage.testsFailed,
    'Pass Rate': stage.passRate
  }));

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="Passed" fill="#22c55e" />
          <Bar yAxisId="left" dataKey="Failed" fill="#ef4444" />
          <Bar yAxisId="right" dataKey="Pass Rate" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};