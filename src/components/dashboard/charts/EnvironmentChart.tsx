import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Stage } from '../../../types/environment';

interface EnvironmentChartProps {
  stages: Stage[];
}

export const EnvironmentChart: React.FC<EnvironmentChartProps> = ({ stages }) => {
  const data = stages.map(stage => ({
    name: stage.name,
    passed: stage.testsPassed,
    failed: stage.testsFailed
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow-lg rounded-lg border border-gray-100 text-sm">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-gray-600">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[180px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 25, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="passed" 
            name="Passed" 
            fill="#22c55e"
            radius={[4, 4, 0, 0]}
            barSize={20}
            stackId="tests" 
          />
          <Bar 
            dataKey="failed" 
            name="Failed" 
            fill="#ef4444"
            radius={[4, 4, 0, 0]}
            barSize={20}
            stackId="tests" 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};