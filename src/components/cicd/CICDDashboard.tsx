import React, { useState, useEffect } from 'react';
import { 
  GitBranch, 
  Play, 
  Pause, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Users, 
  Code, 
  Zap,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Filter,
  Search,
  Plus,
  Settings,
  Activity,
  AlertTriangle,
  Calendar,
  Download
} from 'lucide-react';
import { format } from 'date-fns';
import { Repository, PipelineRun, Developer, DeploymentEnvironment } from '../../types/cicd';
import { PipelineRunCard } from './PipelineRunCard';
import { RepositoryCard } from './RepositoryCard';
import { DeploymentCard } from './DeploymentCard';
import { PipelineMetrics } from './PipelineMetrics';

// Mock data
const mockRepositories: Repository[] = [
  {
    id: 'repo-1',
    name: 'user-service',
    description: 'Microservice for user management and authentication',
    language: 'TypeScript',
    lastCommit: '2024-01-12T10:30:00Z',
    branch: 'main',
    status: 'active',
    developers: [
      {
        id: 'dev-1',
        name: 'Sarah Chen',
        email: 'sarah.chen@company.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        role: 'senior',
        lastActivity: '2024-01-12T09:15:00Z',
        commitsThisWeek: 12
      },
      {
        id: 'dev-2',
        name: 'Mike Johnson',
        email: 'mike.johnson@company.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        role: 'mid',
        lastActivity: '2024-01-12T08:45:00Z',
        commitsThisWeek: 8
      }
    ],
    pipelineConfig: {
      id: 'pipeline-1',
      name: 'User Service CI/CD',
      trigger: 'push',
      stages: [],
      environment: 'production',
      notifications: []
    }
  },
  {
    id: 'repo-2',
    name: 'payment-gateway',
    description: 'Payment processing and transaction management',
    language: 'Java',
    lastCommit: '2024-01-12T11:15:00Z',
    branch: 'develop',
    status: 'active',
    developers: [
      {
        id: 'dev-3',
        name: 'Alex Rodriguez',
        email: 'alex.rodriguez@company.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        role: 'lead',
        lastActivity: '2024-01-12T11:00:00Z',
        commitsThisWeek: 15
      }
    ],
    pipelineConfig: {
      id: 'pipeline-2',
      name: 'Payment Gateway CI/CD',
      trigger: 'pull_request',
      stages: [],
      environment: 'staging',
      notifications: []
    }
  },
  {
    id: 'repo-3',
    name: 'frontend-app',
    description: 'React-based customer portal application',
    language: 'JavaScript',
    lastCommit: '2024-01-12T09:45:00Z',
    branch: 'feature/new-dashboard',
    status: 'active',
    developers: [
      {
        id: 'dev-4',
        name: 'Emma Wilson',
        email: 'emma.wilson@company.com',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        role: 'senior',
        lastActivity: '2024-01-12T09:30:00Z',
        commitsThisWeek: 10
      },
      {
        id: 'dev-5',
        name: 'David Kim',
        email: 'david.kim@company.com',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        role: 'junior',
        lastActivity: '2024-01-12T08:20:00Z',
        commitsThisWeek: 6
      }
    ],
    pipelineConfig: {
      id: 'pipeline-3',
      name: 'Frontend App CI/CD',
      trigger: 'push',
      stages: [],
      environment: 'development',
      notifications: []
    }
  }
];

const mockPipelineRuns: PipelineRun[] = [
  {
    id: 'run-1',
    repositoryId: 'repo-1',
    pipelineConfigId: 'pipeline-1',
    triggerType: 'push',
    triggeredBy: mockRepositories[0].developers[0],
    branch: 'main',
    commit: {
      hash: 'a1b2c3d',
      message: 'feat: add user profile validation',
      author: mockRepositories[0].developers[0],
      timestamp: '2024-01-12T10:30:00Z'
    },
    status: 'running',
    stages: [
      {
        id: 'stage-1',
        name: 'Build',
        type: 'build',
        status: 'success',
        duration: 120,
        startTime: '2024-01-12T10:31:00Z',
        endTime: '2024-01-12T10:33:00Z',
        dependencies: []
      },
      {
        id: 'stage-2',
        name: 'Unit Tests',
        type: 'test',
        status: 'success',
        duration: 180,
        startTime: '2024-01-12T10:33:00Z',
        endTime: '2024-01-12T10:36:00Z',
        dependencies: ['stage-1']
      },
      {
        id: 'stage-3',
        name: 'Security Scan',
        type: 'security',
        status: 'running',
        duration: 0,
        startTime: '2024-01-12T10:36:00Z',
        dependencies: ['stage-2']
      },
      {
        id: 'stage-4',
        name: 'Deploy to Staging',
        type: 'deploy',
        status: 'pending',
        duration: 0,
        dependencies: ['stage-3']
      }
    ],
    startTime: '2024-01-12T10:31:00Z'
  },
  {
    id: 'run-2',
    repositoryId: 'repo-2',
    pipelineConfigId: 'pipeline-2',
    triggerType: 'pull_request',
    triggeredBy: mockRepositories[1].developers[0],
    branch: 'feature/payment-refactor',
    commit: {
      hash: 'e4f5g6h',
      message: 'refactor: improve payment processing logic',
      author: mockRepositories[1].developers[0],
      timestamp: '2024-01-12T11:15:00Z'
    },
    status: 'success',
    stages: [
      {
        id: 'stage-5',
        name: 'Build',
        type: 'build',
        status: 'success',
        duration: 150,
        startTime: '2024-01-12T11:16:00Z',
        endTime: '2024-01-12T11:18:30Z',
        dependencies: []
      },
      {
        id: 'stage-6',
        name: 'Integration Tests',
        type: 'test',
        status: 'success',
        duration: 300,
        startTime: '2024-01-12T11:18:30Z',
        endTime: '2024-01-12T11:23:30Z',
        dependencies: ['stage-5']
      }
    ],
    startTime: '2024-01-12T11:16:00Z',
    endTime: '2024-01-12T11:23:30Z',
    totalDuration: 450
  },
  {
    id: 'run-3',
    repositoryId: 'repo-3',
    pipelineConfigId: 'pipeline-3',
    triggerType: 'push',
    triggeredBy: mockRepositories[2].developers[0],
    branch: 'feature/new-dashboard',
    commit: {
      hash: 'i7j8k9l',
      message: 'feat: add new dashboard components',
      author: mockRepositories[2].developers[0],
      timestamp: '2024-01-12T09:45:00Z'
    },
    status: 'failed',
    stages: [
      {
        id: 'stage-7',
        name: 'Build',
        type: 'build',
        status: 'success',
        duration: 90,
        startTime: '2024-01-12T09:46:00Z',
        endTime: '2024-01-12T09:47:30Z',
        dependencies: []
      },
      {
        id: 'stage-8',
        name: 'Unit Tests',
        type: 'test',
        status: 'failed',
        duration: 45,
        startTime: '2024-01-12T09:47:30Z',
        endTime: '2024-01-12T09:48:15Z',
        dependencies: ['stage-7']
      }
    ],
    startTime: '2024-01-12T09:46:00Z',
    endTime: '2024-01-12T09:48:15Z',
    totalDuration: 135
  }
];

const mockEnvironments: DeploymentEnvironment[] = [
  {
    id: 'env-1',
    name: 'Development',
    type: 'development',
    status: 'healthy',
    lastDeployment: {
      version: 'v1.2.3',
      deployedBy: mockRepositories[0].developers[0],
      timestamp: '2024-01-12T08:30:00Z',
      pipelineRunId: 'run-1'
    },
    approvers: [],
    autoPromote: true
  },
  {
    id: 'env-2',
    name: 'Staging',
    type: 'staging',
    status: 'healthy',
    lastDeployment: {
      version: 'v1.2.2',
      deployedBy: mockRepositories[1].developers[0],
      timestamp: '2024-01-12T07:15:00Z',
      pipelineRunId: 'run-2'
    },
    approvers: [mockRepositories[0].developers[0]],
    autoPromote: false
  },
  {
    id: 'env-3',
    name: 'Production',
    type: 'production',
    status: 'healthy',
    lastDeployment: {
      version: 'v1.2.1',
      deployedBy: mockRepositories[1].developers[0],
      timestamp: '2024-01-11T16:45:00Z',
      pipelineRunId: 'run-1'
    },
    approvers: [mockRepositories[1].developers[0], mockRepositories[0].developers[0]],
    autoPromote: false
  }
];

const StatCard: React.FC<{
  title: string;
  value: string;
  change?: number;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, change, icon, color }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
    <div className="flex items-center justify-between mb-3">
      <div className={`p-3 ${color} rounded-xl`}>
        {icon}
      </div>
      {change !== undefined && (
        <div className={`flex items-center space-x-1 ${
          change >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {change >= 0 ? (
            <ArrowUpRight className="w-4 h-4" />
          ) : (
            <ArrowDownRight className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">{Math.abs(change)}%</span>
        </div>
      )}
    </div>
    <div>
      <p className="text-sm text-gray-600 mb-1">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export const CICDDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'pipelines' | 'repositories' | 'environments'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Activity className="w-4 h-4" /> },
    { id: 'pipelines', label: 'Pipelines', icon: <Zap className="w-4 h-4" /> },
    { id: 'repositories', label: 'Repositories', icon: <GitBranch className="w-4 h-4" /> },
    { id: 'environments', label: 'Environments', icon: <Settings className="w-4 h-4" /> }
  ];

  const successRate = 85;
  const avgDuration = '4m 32s';
  const activeRuns = mockPipelineRuns.filter(run => run.status === 'running').length;
  const totalCommits = mockRepositories.reduce((sum, repo) => 
    sum + repo.developers.reduce((devSum, dev) => devSum + dev.commitsThisWeek, 0), 0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CI/CD Pipeline Management</h1>
              <p className="text-gray-500">Monitor and manage your continuous integration and deployment pipelines</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>New Pipeline</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-4 gap-6">
              <StatCard
                title="Success Rate"
                value={`${successRate}%`}
                change={2.5}
                icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}
                color="bg-green-50"
              />
              <StatCard
                title="Active Runs"
                value={activeRuns.toString()}
                icon={<Play className="w-5 h-5 text-blue-600" />}
                color="bg-blue-50"
              />
              <StatCard
                title="Avg Duration"
                value={avgDuration}
                change={-8.2}
                icon={<Clock className="w-5 h-5 text-purple-600" />}
                color="bg-purple-50"
              />
              <StatCard
                title="Commits This Week"
                value={totalCommits.toString()}
                change={15.3}
                icon={<Code className="w-5 h-5 text-orange-600" />}
                color="bg-orange-50"
              />
            </div>

            {/* Pipeline Metrics */}
            <PipelineMetrics runs={mockPipelineRuns} />

            {/* Recent Pipeline Runs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold">Recent Pipeline Runs</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {mockPipelineRuns.slice(0, 5).map((run) => (
                  <PipelineRunCard key={run.id} run={run} repository={mockRepositories.find(r => r.id === run.repositoryId)!} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pipelines' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search pipelines..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2"
                  >
                    <option value="all">All Status</option>
                    <option value="running">Running</option>
                    <option value="success">Success</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Pipeline Runs List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="divide-y divide-gray-100">
                {mockPipelineRuns.map((run) => (
                  <PipelineRunCard key={run.id} run={run} repository={mockRepositories.find(r => r.id === run.repositoryId)!} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'repositories' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockRepositories.map((repository) => (
              <RepositoryCard key={repository.id} repository={repository} />
            ))}
          </div>
        )}

        {activeTab === 'environments' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEnvironments.map((environment) => (
              <DeploymentCard key={environment.id} environment={environment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};