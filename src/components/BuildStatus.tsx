import React from 'react';
import { CheckCircle2, XCircle, Clock, GitCommit, GitBranch, User } from 'lucide-react';
import { BuildDetails } from '../types/regression';
import { format } from 'date-fns';

const builds: BuildDetails[] = [
  {
    buildId: 'BUILD-127',
    branch: 'main',
    commit: 'a1b2c3d',
    author: 'Jane Smith',
    timestamp: '2024-03-05T10:00:00',
    status: 'success',
    suites: [
      { name: 'API Tests', passed: 120, failed: 0, duration: 245 },
      { name: 'UI Tests', passed: 215, failed: 2, duration: 412 },
      { name: 'Integration Tests', passed: 116, failed: 1, duration: 238 }
    ]
  },
  {
    buildId: 'BUILD-126',
    branch: 'feature/auth',
    commit: 'e4f5g6h',
    author: 'John Doe',
    timestamp: '2024-03-04T09:45:00',
    status: 'success',
    suites: [
      { name: 'API Tests', passed: 118, failed: 1, duration: 251 },
      { name: 'UI Tests', passed: 216, failed: 0, duration: 398 },
      { name: 'Integration Tests', passed: 115, failed: 1, duration: 239 }
    ]
  }
];

const StatusIcon: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case 'success':
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case 'failure':
      return <XCircle className="w-5 h-5 text-red-500" />;
    default:
      return <Clock className="w-5 h-5 text-yellow-500" />;
  }
};

export const BuildStatus: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Recent Builds</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {builds.map((build) => (
          <div key={build.buildId} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <StatusIcon status={build.status} />
                <span className="font-medium">{build.buildId}</span>
                <span className="text-sm text-gray-500">
                  {format(new Date(build.timestamp), 'MMM d, HH:mm')}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <GitBranch className="w-4 h-4 mr-1" />
                  {build.branch}
                </div>
                <div className="flex items-center">
                  <GitCommit className="w-4 h-4 mr-1" />
                  {build.commit}
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {build.author}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {build.suites.map((suite) => (
                <div key={suite.name} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">{suite.name}</h4>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <div className="text-green-600">{suite.passed}</div>
                      <div className="text-gray-500">Passed</div>
                    </div>
                    <div>
                      <div className="text-red-600">{suite.failed}</div>
                      <div className="text-gray-500">Failed</div>
                    </div>
                    <div>
                      <div>{Math.round(suite.duration / 60)}m</div>
                      <div className="text-gray-500">Duration</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};