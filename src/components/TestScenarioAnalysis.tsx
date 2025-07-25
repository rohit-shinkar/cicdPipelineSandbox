import React, { useState } from 'react';
import { Calendar, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface TestResult {
  id: string;
  name: string;
  duration: number;
  status: 'passed' | 'failed' | 'skipped';
  timestamp: string;
  errorMessage?: string;
}

interface DailyTestData {
  date: string;
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  avgDuration: number;
}

// Generate mock data for the past 7 days
const generateWeeklyData = (): DailyTestData[] => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i);
    const totalTests = 150;
    const passed = Math.floor(totalTests * (0.90 + Math.random() * 0.08));
    const failed = Math.floor((totalTests - passed) * (0.6 + Math.random() * 0.4));
    const skipped = totalTests - passed - failed;
    
    return {
      date: format(date, 'yyyy-MM-dd'),
      totalTests,
      passed,
      failed,
      skipped,
      avgDuration: Math.round(120 + Math.random() * 60)
    };
  }).reverse();
};

// Generate mock data for individual test results
const generateTestHistory = (testId: string): TestResult[] => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i);
    const status = Math.random() > 0.15 ? 'passed' : 'failed';
    
    return {
      id: `${testId}-${i}`,
      name: `Test Scenario ${testId}`,
      duration: Math.round(80 + Math.random() * 40),
      status,
      timestamp: date.toISOString(),
      ...(status === 'failed' ? {
        errorMessage: 'Assertion failed: Expected value did not match actual value'
      } : {})
    };
  }).reverse();
};

const weeklyData = generateWeeklyData();
const testScenarios = [
  { id: 'TS001', name: 'User Authentication Flow' },
  { id: 'TS002', name: 'Payment Processing' },
  { id: 'TS003', name: 'Order Submission' },
  { id: 'TS004', name: 'Product Search' },
  { id: 'TS005', name: 'User Profile Update' },
].map(scenario => ({
  ...scenario,
  history: generateTestHistory(scenario.id)
}));

export const TestScenarioAnalysis: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState(testScenarios[0]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Test Scenario Analysis</h1>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-500">Last 7 Days</span>
          </div>
        </div>

        {/* Weekly Overview Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Weekly Test Results Overview</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => format(new Date(date), 'MMM d')}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(date) => format(new Date(date as string), 'MMM d, yyyy')}
                  formatter={(value, name) => [value, name.replace(/([A-Z])/g, ' $1').trim()]}
                />
                <Legend />
                <Line type="monotone" dataKey="passed" name="Passed" stroke="#16a34a" strokeWidth={2} />
                <Line type="monotone" dataKey="failed" name="Failed" stroke="#dc2626" strokeWidth={2} />
                <Line type="monotone" dataKey="skipped" name="Skipped" stroke="#ca8a04" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Test Scenarios List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Test Scenarios</h2>
            <div className="space-y-2">
              {testScenarios.map((scenario) => {
                const lastRun = scenario.history[scenario.history.length - 1];
                return (
                  <button
                    key={scenario.id}
                    onClick={() => setSelectedScenario(scenario)}
                    className={`w-full p-4 rounded-lg text-left transition-colors ${
                      selectedScenario.id === scenario.id
                        ? 'bg-blue-50 border-2 border-blue-500'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{scenario.name}</h3>
                        <p className="text-sm text-gray-500">{scenario.id}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-sm ${
                        lastRun.status === 'passed' ? 'bg-green-100 text-green-800' :
                        lastRun.status === 'failed' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {lastRun.status}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Scenario Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-semibold">{selectedScenario.name}</h2>
                  <p className="text-sm text-gray-500">Scenario ID: {selectedScenario.id}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-500">
                      Avg. Duration: {
                        Math.round(
                          selectedScenario.history.reduce((acc, curr) => acc + curr.duration, 0) / 
                          selectedScenario.history.length
                        )
                      }ms
                    </span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-500">
                      Success Rate: {
                        Math.round(
                          (selectedScenario.history.filter(h => h.status === 'passed').length / 
                          selectedScenario.history.length) * 100
                        )
                      }%
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {selectedScenario.history.map((result) => (
                  <div
                    key={result.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      result.status === 'passed' ? 'border-l-green-500 bg-green-50' :
                      result.status === 'failed' ? 'border-l-red-500 bg-red-50' :
                      'border-l-yellow-500 bg-yellow-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">
                            {format(new Date(result.timestamp), 'MMM d, yyyy HH:mm')}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            result.status === 'passed' ? 'bg-green-200 text-green-800' :
                            result.status === 'failed' ? 'bg-red-200 text-red-800' :
                            'bg-yellow-200 text-yellow-800'
                          }`}>
                            {result.status}
                          </span>
                        </div>
                        {result.status === 'failed' && (
                          <div className="mt-2 flex items-start space-x-2">
                            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
                            <p className="text-sm text-red-700">{result.errorMessage}</p>
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        Duration: {result.duration}ms
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};