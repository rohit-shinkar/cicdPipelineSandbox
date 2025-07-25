import React from 'react';
import { Activity, ArrowRight, GitBranch } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LSCStatus {
  environment: string;
  passedTests: number;
  totalTests: number;
  lastRun: string;
  status: 'success' | 'failure' | 'running' | 'pending';
  branches: {
    name: string;
    status: 'success' | 'failure' | 'running' | 'pending';
  }[];
}

const statuses: LSCStatus[] = [
  {
    environment: 'THETA',
    passedTests: 245,
    totalTests: 250,
    lastRun: '2024-03-10T15:30:00Z',
    status: 'success',
    branches: [
      { name: 'itest-master', status: 'success' },
      { name: 'beta-master', status: 'success' },
      { name: 'prod-master', status: 'success' }
    ]
  },
  {
    environment: 'RHO',
    passedTests: 238,
    totalTests: 250,
    lastRun: '2024-03-10T14:45:00Z',
    status: 'failure',
    branches: [
      { name: 'itest-master', status: 'success' },
      { name: 'beta-master', status: 'failure' },
      { name: 'prod-master', status: 'pending' }
    ]
  },
  {
    environment: 'TAU',
    passedTests: 242,
    totalTests: 250,
    lastRun: '2024-03-10T13:15:00Z',
    status: 'success',
    branches: [
      { name: 'itest-master', status: 'success' },
      { name: 'beta-master', status: 'success' },
      { name: 'prod-master', status: 'running' }
    ]
  },
  {
    environment: 'QE',
    passedTests: 248,
    totalTests: 250,
    lastRun: '2024-03-10T12:30:00Z',
    status: 'success',
    branches: [
      { name: 'itest-master', status: 'success' },
      { name: 'beta-master', status: 'success' },
      { name: 'prod-master', status: 'success' }
    ]
  },
  {
    environment: 'OMICRON',
    passedTests: 240,
    totalTests: 250,
    lastRun: '2024-03-10T11:45:00Z',
    status: 'running',
    branches: [
      { name: 'itest-master', status: 'success' },
      { name: 'beta-master', status: 'running' },
      { name: 'prod-master', status: 'pending' }
    ]
  },
  {
    environment: 'KAPPAVIR',
    passedTests: 235,
    totalTests: 250,
    lastRun: '2024-03-10T10:30:00Z',
    status: 'failure',
    branches: [
      { name: 'itest-master', status: 'success' },
      { name: 'beta-master', status: 'failure' },
      { name: 'prod-master', status: 'pending' }
    ]
  }
];

const BranchButton: React.FC<{ branch: { name: string; status: string } }> = ({ branch }) => (
  <button
    className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
      branch.status === 'success' ? 'bg-green-100 text-green-700 hover:bg-green-200' :
      branch.status === 'failure' ? 'bg-red-100 text-red-700 hover:bg-red-200' :
      branch.status === 'running' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
      'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
    }`}
  >
    <GitBranch className="w-3 h-3" />
    <span>{branch.name}</span>
  </button>
);

export const LSCRegressionCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Activity className="w-6 h-6 text-blue-500" />
          <h2 className="text-lg font-semibold">LSC Regression Status</h2>
        </div>
        <Link
          to="/lsc-regression"
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
        >
          <span className="text-sm">View Details</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {statuses.map((status) => (
          <Link
            key={status.environment}
            to={`/lsc-regression/${status.environment.toLowerCase()}`}
            className={`p-3 rounded-lg transition-all hover:shadow-md ${
              status.status === 'success' ? 'bg-green-50 hover:bg-green-100' :
              status.status === 'failure' ? 'bg-red-50 hover:bg-red-100' :
              status.status === 'running' ? 'bg-blue-50 hover:bg-blue-100' :
              'bg-yellow-50 hover:bg-yellow-100'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="font-medium">{status.environment}</div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                status.status === 'success' ? 'bg-green-200 text-green-800' :
                status.status === 'failure' ? 'bg-red-200 text-red-800' :
                status.status === 'running' ? 'bg-blue-200 text-blue-800' :
                'bg-yellow-200 text-yellow-800'
              }`}>
                {status.status.charAt(0).toUpperCase() + status.status.slice(1)}
              </span>
            </div>
            <div className="mb-2">
              <div className="text-sm font-semibold">
                {status.passedTests} / {status.totalTests}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                <div
                  className={`h-1.5 rounded-full ${
                    status.status === 'success' ? 'bg-green-500' :
                    status.status === 'failure' ? 'bg-red-500' :
                    status.status === 'running' ? 'bg-blue-500' :
                    'bg-yellow-500'
                  }`}
                  style={{ width: `${(status.passedTests / status.totalTests) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {status.branches.map((branch) => (
                <BranchButton key={branch.name} branch={branch} />
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};