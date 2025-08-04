import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Server,
  Database,
  Lock,
  Eye,
  Zap,
  RefreshCw,
  Download,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
  Cpu,
  HardDrive,
  Network,
  Shield,
  Users,
  Calendar
} from 'lucide-react';
import { format, subHours, subDays } from 'date-fns';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { SystemHealth } from '../../types/prodReadiness';

interface SystemDetailViewProps {
  system: SystemHealth;
  onBack: () => void;
}

// Generate detailed metrics data
const generateDetailedMetrics = (systemId: string) => {
  const last24Hours = Array.from({ length: 24 }, (_, i) => {
    const timestamp = subHours(new Date(), 23 - i);
    return {
      timestamp: timestamp.toISOString(),
      availability: 95 + Math.random() * 5,
      responseTime: 100 + Math.random() * 200,
      throughput: 1000 + Math.random() * 2000,
      errorRate: Math.random() * 5,
      cpuUsage: 20 + Math.random() * 60,
      memoryUsage: 30 + Math.random() * 50,
      diskUsage: 40 + Math.random() * 40
    };
  });

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const timestamp = subDays(new Date(), 6 - i);
    return {
      timestamp: timestamp.toISOString(),
      incidents: Math.floor(Math.random() * 5),
      deployments: Math.floor(Math.random() * 3) + 1,
      uptime: 95 + Math.random() * 5
    };
  });

  return { last24Hours, last7Days };
};

const MetricCard: React.FC<{
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, change, icon, color }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-3">
      <div className={`p-3 ${color} rounded-xl`}>
        {icon}
      </div>
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
    </div>
    <div>
      <p className="text-sm text-gray-600 mb-1">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const AlertCard: React.FC<{ alert: any }> = ({ alert }) => (
  <div className={`p-4 rounded-lg border-l-4 ${
    alert.severity === 'critical' ? 'border-l-red-500 bg-red-50' :
    alert.severity === 'high' ? 'border-l-orange-500 bg-orange-50' :
    alert.severity === 'medium' ? 'border-l-yellow-500 bg-yellow-50' :
    'border-l-blue-500 bg-blue-50'
  }`}>
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-2">
          <AlertTriangle className={`w-4 h-4 ${
            alert.severity === 'critical' ? 'text-red-500' :
            alert.severity === 'high' ? 'text-orange-500' :
            alert.severity === 'medium' ? 'text-yellow-500' :
            'text-blue-500'
          }`} />
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
            alert.severity === 'high' ? 'bg-orange-100 text-orange-800' :
            alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {alert.severity.toUpperCase()}
          </span>
        </div>
        <p className="font-medium text-gray-900 mb-1">{alert.message}</p>
        <p className="text-sm text-gray-500">
          {format(new Date(alert.timestamp), 'MMM d, yyyy HH:mm')}
        </p>
      </div>
      <div className="flex space-x-2">
        <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
          Acknowledge
        </button>
        <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200">
          Resolve
        </button>
      </div>
    </div>
  </div>
);

export const SystemDetailView: React.FC<SystemDetailViewProps> = ({ system, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'metrics' | 'alerts' | 'dependencies'>('overview');
  const { last24Hours, last7Days } = generateDetailedMetrics(system.id);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Activity className="w-4 h-4" /> },
    { id: 'metrics', label: 'Metrics', icon: <BarChart className="w-4 h-4" /> },
    { id: 'alerts', label: 'Alerts', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'dependencies', label: 'Dependencies', icon: <Network className="w-4 h-4" /> }
  ];

  const resourceUsageData = [
    { name: 'CPU', usage: 45, color: '#3b82f6' },
    { name: 'Memory', usage: 62, color: '#10b981' },
    { name: 'Disk', usage: 38, color: '#f59e0b' },
    { name: 'Network', usage: 28, color: '#8b5cf6' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-500" />
              </button>
              <div>
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl font-bold text-gray-900">{system.name}</h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    system.status === 'healthy' ? 'bg-green-100 text-green-800' :
                    system.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {system.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-500 mt-1">
                  {system.category.charAt(0).toUpperCase() + system.category.slice(1)} • 
                  Last checked {format(new Date(system.lastChecked), 'MMM d, HH:mm')}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
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
            {/* Key Metrics */}
            <div className="grid grid-cols-4 gap-6">
              <MetricCard
                title="Availability"
                value={`${system.metrics.availability}%`}
                change={0.5}
                icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}
                color="bg-green-50"
              />
              <MetricCard
                title="Performance Score"
                value={`${system.metrics.performance}%`}
                change={-2.1}
                icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
                color="bg-blue-50"
              />
              <MetricCard
                title="Error Rate"
                value={`${system.metrics.errorRate}%`}
                change={-15.3}
                icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
                color="bg-red-50"
              />
              <MetricCard
                title="Response Time"
                value={`${system.metrics.responseTime}ms`}
                change={8.2}
                icon={<Clock className="w-5 h-5 text-purple-600" />}
                color="bg-purple-50"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-6">
              {/* Performance Trend */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold mb-4">Performance Trend (24h)</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={last24Hours}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="timestamp"
                        tickFormatter={(time) => format(new Date(time), 'HH:mm')}
                        stroke="#9ca3af"
                      />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        labelFormatter={(time) => format(new Date(time as string), 'MMM d, HH:mm')}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="availability" 
                        stroke="#22c55e" 
                        strokeWidth={2}
                        name="Availability %"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="responseTime" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Response Time (ms)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Resource Usage */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold mb-4">Resource Usage</h3>
                <div className="space-y-4">
                  {resourceUsageData.map((resource) => (
                    <div key={resource.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{resource.name}</span>
                        <span>{resource.usage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{ 
                            width: `${resource.usage}%`,
                            backgroundColor: resource.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Throughput Chart */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold mb-4">Throughput (24h)</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={last24Hours}>
                      <defs>
                        <linearGradient id="throughputGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="timestamp"
                        tickFormatter={(time) => format(new Date(time), 'HH:mm')}
                        stroke="#9ca3af"
                      />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        labelFormatter={(time) => format(new Date(time as string), 'MMM d, HH:mm')}
                      />
                      <Area
                        type="monotone"
                        dataKey="throughput"
                        stroke="#8b5cf6"
                        fillOpacity={1}
                        fill="url(#throughputGradient)"
                        name="Requests/sec"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Error Rate Chart */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold mb-4">Error Rate (24h)</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={last24Hours}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="timestamp"
                        tickFormatter={(time) => format(new Date(time), 'HH:mm')}
                        stroke="#9ca3af"
                      />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        labelFormatter={(time) => format(new Date(time as string), 'MMM d, HH:mm')}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="errorRate" 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        name="Error Rate %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4">Active Alerts</h3>
              <div className="space-y-4">
                {system.alerts.length > 0 ? (
                  system.alerts.map((alert) => (
                    <AlertCard key={alert.id} alert={alert} />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-green-500" />
                    <p>No active alerts for this system</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dependencies' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4">System Dependencies</h3>
              <div className="space-y-4">
                {system.dependencies.map((dep, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Server className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium">{dep}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600">Healthy</span>
                    </div>
                  </div>
                ))}
                {system.dependencies.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Network className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p>No dependencies configured for this system</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};