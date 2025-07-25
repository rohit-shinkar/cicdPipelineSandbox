import React from 'react';
import { useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle2, XCircle, Clock, AlertTriangle } from 'lucide-react';

interface TestSuite {
  name: string;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
}

interface TestRun {
  id: string;
  timestamp: string;
  suites: TestSuite[];
  status: 'success' | 'failure' | 'running' | 'pending';
}

const mockData: Record<string, TestRun[]> = {
  theta: [
    {
      id: 'RUN-001',
      timestamp: '2024-03-10T15:30:00Z',
      status: 'success',
      suites: [
        { name: 'Authentication', passed: 45, failed: 0, skipped: 1, duration: 120 },
        { name: 'Order Processing', passed: 85, failed: 2, skipped: 0, duration: 240 },
        { name: 'Inventory', passed: 65, failed: 1, skipped: 1, duration: 180 }
      ]
    }
  ]
};

export const LSCRegressionDetails: React.FC = () => {
  const { environment } = useParams<{ environment: string }>();
  const runs = mockData[environment?.toLowerCase() || ''] || [];
  const latestRun = runs[0];

  if (!latestRun) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">No data available</h2>
          </div>
        </div>
      </div>
    );
  }

  const chartData = latestRun.suites.map(suite => ({
    name: suite.name,
    Passed: suite.passed,
    Failed: suite.failed,
    Skipped: suite.skipped
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            LSC Regression - {environment?.toUpperCase()}
          </h1>
          <div className="flex items-center space-x-2">
            {latestRun.status === 'success' && <CheckCircle2 className="w-6 h-6 text-green-500" />}
            {latestRun.status === 'failure' && <XCircle className="w-6 h-6 text-red-500" />}
            {latestRun.status === 'running' && <Clock className="w-6 h-6 text-blue-500 animate-spin" />}
            {latestRun.status === 'pending' && <AlertTriangle className="w-6 h-6 text-yellow-500" />}
            <span className={`text-sm font-medium ${
              latestRun.status === 'success' ? 'text-green-600' :
              latestRun.status === 'failure' ? 'text-red-600' :
              latestRun.status === 'running' ? 'text-blue-600' :
              'text-yellow-600'
            }`}>
              {latestRun.status.charAt(0).toUpperCase() + latestRun.status.slice(1)}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-6">Test Results Overview</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Passed" fill="#22c55e" stackId="stack" />
                <Bar dataKey="Failed" fill="#ef4444" stackId="stack" />
                <Bar dataKey="Skipped" fill="#f59e0b" stackId="stack" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Test Suites</h2>
          <div className="space-y-4">
            {latestRun.suites.map((suite, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">{suite.name}</h3>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{suite.duration}s</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Passed</div>
                    <div className="text-lg font-semibold text-green-600">{suite.passed}</div>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Failed</div>
                    <div className="text-lg font-semibold text-red-600">{suite.failed}</div>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Skipped</div>
                    <div className="text-lg font-semibold text-yellow-600">{suite.skipped}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};