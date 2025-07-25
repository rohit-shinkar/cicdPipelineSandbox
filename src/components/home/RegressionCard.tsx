import React from 'react';
import { BarChart2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface TestStats {
  environment: string;
  core: {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
  };
  opus: {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
  };
}

const environments: TestStats[] = [
  {
    environment: 'TEST04',
    core: {
      total: 1248,
      passed: 1180,
      failed: 45,
      skipped: 23
    },
    opus: {
      total: 856,
      passed: 798,
      failed: 38,
      skipped: 20
    }
  },
  {
    environment: 'TEST02',
    core: {
      total: 1248,
      passed: 1195,
      failed: 35,
      skipped: 18
    },
    opus: {
      total: 856,
      passed: 812,
      failed: 29,
      skipped: 15
    }
  }
];

const EnvironmentResults: React.FC<{ stats: TestStats }> = ({ stats }) => {
  const corePieData = [
    { name: 'Passed', value: stats.core.passed, color: '#22c55e' },
    { name: 'Failed', value: stats.core.failed, color: '#ef4444' },
    { name: 'Skipped', value: stats.core.skipped, color: '#f59e0b' }
  ];

  const opusPieData = [
    { name: 'Passed', value: stats.opus.passed, color: '#22c55e' },
    { name: 'Failed', value: stats.opus.failed, color: '#ef4444' },
    { name: 'Skipped', value: stats.opus.skipped, color: '#f59e0b' }
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{stats.environment}</h3>
        <div className="flex space-x-4">
          <div className="text-sm">
            <span className="text-gray-500">Core: </span>
            <span className="font-medium text-green-600">{((stats.core.passed / stats.core.total) * 100).toFixed(1)}%</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">Opus: </span>
            <span className="font-medium text-green-600">{((stats.opus.passed / stats.opus.total) * 100).toFixed(1)}%</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Core Tests</span>
            <span className="font-medium">{stats.core.passed} / {stats.core.total}</span>
          </div>
          <div className="h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={corePieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={40}
                  paddingAngle={2}
                >
                  {corePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value} tests`, '']}
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    padding: '0.5rem'
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Opus Enterprise Suite</span>
            <span className="font-medium">{stats.opus.passed} / {stats.opus.total}</span>
          </div>
          <div className="h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={opusPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={40}
                  paddingAngle={2}
                >
                  {opusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value} tests`, '']}
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    padding: '0.5rem'
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-2 mt-4">
        <div className="col-span-3 grid grid-cols-3 gap-2">
          <div className="p-2 rounded bg-green-50">
            <div className="text-xs text-gray-600">Passed</div>
            <div className="text-sm font-semibold text-green-600">{stats.core.passed}</div>
          </div>
          <div className="p-2 rounded bg-red-50">
            <div className="text-xs text-gray-600">Failed</div>
            <div className="text-sm font-semibold text-red-600">{stats.core.failed}</div>
          </div>
          <div className="p-2 rounded bg-amber-50">
            <div className="text-xs text-gray-600">Skipped</div>
            <div className="text-sm font-semibold text-amber-600">{stats.core.skipped}</div>
          </div>
        </div>
        <div className="col-span-3 grid grid-cols-3 gap-2">
          <div className="p-2 rounded bg-green-50">
            <div className="text-xs text-gray-600">Passed</div>
            <div className="text-sm font-semibold text-green-600">{stats.opus.passed}</div>
          </div>
          <div className="p-2 rounded bg-red-50">
            <div className="text-xs text-gray-600">Failed</div>
            <div className="text-sm font-semibold text-red-600">{stats.opus.failed}</div>
          </div>
          <div className="p-2 rounded bg-amber-50">
            <div className="text-xs text-gray-600">Skipped</div>
            <div className="text-sm font-semibold text-amber-600">{stats.opus.skipped}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RegressionCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Regression Results</h2>
          <p className="text-sm text-gray-500 mt-1">Overall test execution status</p>
        </div>
        <BarChart2 className="w-7 h-7 text-blue-500" />
      </div>
      <div className="space-y-4">
        {environments.map((env) => (
          <EnvironmentResults key={env.environment} stats={env} />
        ))}
      </div>
    </div>
  );
};