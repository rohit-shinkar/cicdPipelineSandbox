import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { CheckCircle2, XCircle, AlertTriangle, ChevronDown, ChevronUp, Clock } from 'lucide-react';

interface TestResult {
  name: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: string;
  errorMessage?: string;
}

interface AppCategory {
  name: string;
  tests: TestResult[];
  passRate: number;
}

interface StageData {
  name: string;
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  inProgress: number;
  categories: AppCategory[];
}

const stages: StageData[] = [
  {
    name: 'API/GQL',
    totalTests: 450,
    passed: 425,
    failed: 15,
    skipped: 5,
    inProgress: 5,
    categories: [
      {
        name: 'Authentication',
        passRate: 98,
        tests: [
          { name: 'User Login', status: 'passed', duration: '1.2s' },
          { name: 'Token Validation', status: 'passed', duration: '0.8s' },
          { name: 'Password Reset', status: 'failed', duration: '1.5s', errorMessage: 'Timeout waiting for email service' }
        ]
      },
      {
        name: 'Order Processing',
        passRate: 95,
        tests: [
          { name: 'Create Order', status: 'passed', duration: '2.1s' },
          { name: 'Update Order Status', status: 'passed', duration: '1.7s' },
          { name: 'Cancel Order', status: 'skipped', duration: '0s' }
        ]
      }
    ]
  },
  {
    name: 'FT UI',
    totalTests: 380,
    passed: 350,
    failed: 20,
    skipped: 5,
    inProgress: 5,
    categories: [
      {
        name: 'Dashboard',
        passRate: 92,
        tests: [
          { name: 'Load Dashboard', status: 'passed', duration: '3.2s' },
          { name: 'Filter Data', status: 'passed', duration: '2.8s' },
          { name: 'Export Report', status: 'failed', duration: '4.5s', errorMessage: 'Element not clickable' }
        ]
      },
      {
        name: 'User Profile',
        passRate: 96,
        tests: [
          { name: 'Edit Profile', status: 'passed', duration: '2.1s' },
          { name: 'Change Avatar', status: 'passed', duration: '1.9s' },
          { name: 'Update Settings', status: 'passed', duration: '1.5s' }
        ]
      }
    ]
  },
  {
    name: 'UAT',
    totalTests: 250,
    passed: 235,
    failed: 10,
    skipped: 2,
    inProgress: 3,
    categories: [
      {
        name: 'End-to-End Flows',
        passRate: 94,
        tests: [
          { name: 'Complete Purchase', status: 'passed', duration: '15.2s' },
          { name: 'Return Process', status: 'passed', duration: '12.8s' },
          { name: 'Account Creation', status: 'failed', duration: '8.5s', errorMessage: 'Validation error' }
        ]
      },
      {
        name: 'Integration Tests',
        passRate: 97,
        tests: [
          { name: 'Payment Gateway', status: 'passed', duration: '5.1s' },
          { name: 'Inventory Sync', status: 'passed', duration: '4.9s' },
          { name: 'Email Service', status: 'passed', duration: '3.5s' }
        ]
      }
    ]
  }
];

const StageHeader: React.FC<{ stage: StageData }> = ({ stage }) => {
  const data = [
    { name: 'Passed', value: stage.passed, color: '#22c55e' },
    { name: 'Failed', value: stage.failed, color: '#ef4444' },
    { name: 'Skipped', value: stage.skipped, color: '#f59e0b' },
    { name: 'In Progress', value: stage.inProgress, color: '#3b82f6' }
  ];

  const passRate = ((stage.passed / stage.totalTests) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h2 className="text-xl font-bold">{stage.name}</h2>
          <div className="flex items-center space-x-4">
            <div className="text-3xl font-bold text-green-600">{passRate}%</div>
            <div className="text-sm text-gray-500">
              {stage.passed} / {stage.totalTests} tests passed
            </div>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${passRate}%` }}
            />
          </div>
        </div>
        <div className="w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={40}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {data.map((item) => (
          <div key={item.name} className="text-center">
            <div className="text-lg font-semibold" style={{ color: item.color }}>
              {item.value}
            </div>
            <div className="text-sm text-gray-500">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TestResultRow: React.FC<{ test: TestResult }> = ({ test }) => {
  const [expanded, setExpanded] = useState(false);

  const getStatusIcon = () => {
    switch (test.status) {
      case 'passed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'skipped':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className={`
      border-l-4 rounded-lg mb-2 transition-all
      ${test.status === 'passed' ? 'border-l-green-500 bg-green-50' :
        test.status === 'failed' ? 'border-l-red-500 bg-red-50' :
        'border-l-yellow-500 bg-yellow-50'}
    `}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getStatusIcon()}
            <span className="font-medium">{test.name}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{test.duration}</span>
            </div>
            {test.errorMessage && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-gray-500 hover:text-gray-700"
              >
                {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
        {expanded && test.errorMessage && (
          <div className="mt-3 text-sm text-red-600 bg-red-100 p-3 rounded">
            {test.errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

const CategorySection: React.FC<{ category: AppCategory }> = ({ category }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold">{category.name}</h3>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">Pass Rate:</span>
        <span className="font-semibold text-green-600">{category.passRate}%</span>
      </div>
    </div>
    <div className="space-y-2">
      {category.tests.map((test, index) => (
        <TestResultRow key={index} test={test} />
      ))}
    </div>
  </div>
);

export const TestStagesPage: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<StageData>(stages[0]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex space-x-4 mb-6">
          {stages.map((stage) => (
            <button
              key={stage.name}
              onClick={() => setSelectedStage(stage)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedStage.name === stage.name
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {stage.name}
            </button>
          ))}
        </div>

        <StageHeader stage={selectedStage} />

        <div className="space-y-6">
          {selectedStage.categories.map((category, index) => (
            <CategorySection key={index} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};