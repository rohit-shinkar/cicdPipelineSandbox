import React, { useState, useEffect } from 'react';
import { 
  Shield, 
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
  Filter,
  Download,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import { format, subHours } from 'date-fns';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { SystemHealth, ReadinessCheck, EnvironmentMetrics, TrendData } from '../../types/prodReadiness';

// Mock data generation
const generateMockSystems = (): SystemHealth[] => [
  {
    id: 'api-gateway',
    name: 'API Gateway',
    category: 'infrastructure',
    status: 'healthy',
    score: 98,
    lastChecked: new Date().toISOString(),
    metrics: { availability: 99.9, performance: 95, errorRate: 0.1, responseTime: 120 },
    dependencies: ['load-balancer', 'auth-service'],
    alerts: []
  },
  {
    id: 'auth-service',
    name: 'Authentication Service',
    category: 'application',
    status: 'warning',
    score: 85,
    lastChecked: new Date().toISOString(),
    metrics: { availability: 99.5, performance: 82, errorRate: 2.1, responseTime: 250 },
    dependencies: ['database', 'redis'],
    alerts: [
      { id: '1', severity: 'medium', message: 'High response time detected', timestamp: new Date().toISOString(), resolved: false }
    ]
  },
  {
    id: 'database',
    name: 'Primary Database',
    category: 'database',
    status: 'healthy',
    score: 96,
    lastChecked: new Date().toISOString(),
    metrics: { availability: 99.8, performance: 94, errorRate: 0.2, responseTime: 45 },
    dependencies: [],
    alerts: []
  },
  {
    id: 'payment-service',
    name: 'Payment Service',
    category: 'application',
    status: 'critical',
    score: 65,
    lastChecked: new Date().toISOString(),
    metrics: { availability: 97.2, performance: 68, errorRate: 5.8, responseTime: 850 },
    dependencies: ['database', 'external-payment-api'],
    alerts: [
      { id: '2', severity: 'critical', message: 'Service degradation detected', timestamp: new Date().toISOString(), resolved: false },
      { id: '3', severity: 'high', message: 'Error rate exceeding threshold', timestamp: new Date().toISOString(), resolved: false }
    ]
  },
  {
    id: 'monitoring',
    name: 'Monitoring Stack',
    category: 'monitoring',
    status: 'healthy',
    score: 92,
    lastChecked: new Date().toISOString(),
    metrics: { availability: 99.7, performance: 90, errorRate: 0.3, responseTime: 180 },
    dependencies: [],
    alerts: []
  },
  {
    id: 'security-scanner',
    name: 'Security Scanner',
    category: 'security',
    status: 'warning',
    score: 78,
    lastChecked: new Date().toISOString(),
    metrics: { availability: 98.5, performance: 75, errorRate: 1.5, responseTime: 320 },
    dependencies: [],
    alerts: [
      { id: '4', severity: 'medium', message: 'Scan completion time increased', timestamp: new Date().toISOString(), resolved: false }
    ]
  }
];

const generateReadinessChecks = (): ReadinessCheck[] => [
  {
    id: 'performance-check',
    name: 'Performance Benchmarks',
    category: 'Performance',
    status: 'passed',
    score: 94,
    description: 'System performance meets production requirements',
    lastRun: new Date().toISOString(),
    requirements: [
      { id: '1', name: 'Response Time', status: 'met', value: '120ms', threshold: '<200ms', impact: 'high' },
      { id: '2', name: 'Throughput', status: 'met', value: '5000 req/s', threshold: '>3000 req/s', impact: 'high' }
    ]
  },
  {
    id: 'security-check',
    name: 'Security Compliance',
    category: 'Security',
    status: 'warning',
    score: 82,
    description: 'Some security requirements need attention',
    lastRun: new Date().toISOString(),
    requirements: [
      { id: '3', name: 'SSL Certificate', status: 'met', value: 'Valid', threshold: 'Valid', impact: 'critical' },
      { id: '4', name: 'Vulnerability Scan', status: 'partial', value: '2 Medium', threshold: '0 High/Critical', impact: 'medium' }
    ]
  },
  {
    id: 'availability-check',
    name: 'High Availability',
    category: 'Infrastructure',
    status: 'passed',
    score: 98,
    description: 'All availability requirements met',
    lastRun: new Date().toISOString(),
    requirements: [
      { id: '5', name: 'Uptime SLA', status: 'met', value: '99.9%', threshold: '>99.5%', impact: 'critical' },
      { id: '6', name: 'Failover Test', status: 'met', value: 'Passed', threshold: 'Passed', impact: 'high' }
    ]
  }
];

const generateTrendData = (): TrendData[] => {
  return Array.from({ length: 24 }, (_, i) => {
    const timestamp = subHours(new Date(), 23 - i);
    return {
      timestamp: timestamp.toISOString(),
      overall_score: 85 + Math.random() * 10,
      healthy_systems: 4 + Math.floor(Math.random() * 2),
      warning_systems: 1 + Math.floor(Math.random() * 2),
      critical_systems: Math.floor(Math.random() * 2)
    };
  });
};

const StatusCard: React.FC<{
  title: string;
  value: string | number;
  status: 'healthy' | 'warning' | 'critical';
  trend?: number;
  icon: React.ReactNode;
}> = ({ title, value, status, trend, icon }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'healthy': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'critical': return 'bg-red-50 border-red-200';
    }
  };

  const getIconColor = () => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
    }
  };

  return (
    <div className={`p-6 rounded-xl border ${getStatusColor()} hover:shadow-md transition-all`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${getIconColor()}`}>
          {icon}
        </div>
        {trend !== undefined && (
          <div className={`flex items-center space-x-1 ${
            trend >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend >= 0 ? (
              <ArrowUpRight className="w-4 h-4" />
            ) : (
              <ArrowDownRight className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

const SystemCard: React.FC<{ system: SystemHealth }> = ({ system }) => {
  const getStatusIcon = () => {
    switch (system.status) {
      case 'healthy': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'critical': return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (system.status) {
      case 'healthy': return 'bg-green-50 border-l-green-500';
      case 'warning': return 'bg-yellow-50 border-l-yellow-500';
      case 'critical': return 'bg-red-50 border-l-red-500';
    }
  };

  const getCategoryIcon = () => {
    switch (system.category) {
      case 'infrastructure': return <Server className="w-4 h-4" />;
      case 'application': return <Zap className="w-4 h-4" />;
      case 'database': return <Database className="w-4 h-4" />;
      case 'security': return <Lock className="w-4 h-4" />;
      case 'monitoring': return <Eye className="w-4 h-4" />;
    }
  };

  return (
    <div className={`p-4 rounded-lg border-l-4 ${getStatusColor()} hover:shadow-md transition-all`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {getCategoryIcon()}
            <h3 className="font-semibold text-gray-900">{system.name}</h3>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold">{system.score}</span>
          {getStatusIcon()}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="text-sm">
          <span className="text-gray-500">Availability:</span>
          <span className="ml-2 font-medium">{system.metrics.availability}%</span>
        </div>
        <div className="text-sm">
          <span className="text-gray-500">Performance:</span>
          <span className="ml-2 font-medium">{system.metrics.performance}%</span>
        </div>
        <div className="text-sm">
          <span className="text-gray-500">Error Rate:</span>
          <span className="ml-2 font-medium">{system.metrics.errorRate}%</span>
        </div>
        <div className="text-sm">
          <span className="text-gray-500">Response:</span>
          <span className="ml-2 font-medium">{system.metrics.responseTime}ms</span>
        </div>
      </div>

      {system.alerts.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-red-600">
            <AlertTriangle className="w-4 h-4" />
            <span>{system.alerts.length} active alert{system.alerts.length > 1 ? 's' : ''}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const ReadinessCheckCard: React.FC<{ check: ReadinessCheck }> = ({ check }) => {
  const getStatusIcon = () => {
    switch (check.status) {
      case 'passed': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'failed': return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (check.status) {
      case 'passed': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'failed': return 'bg-red-50 border-red-200';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getStatusColor()}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{check.name}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold">{check.score}</span>
          {getStatusIcon()}
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-3">{check.description}</p>
      <div className="space-y-2">
        {check.requirements.map((req) => (
          <div key={req.id} className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{req.name}:</span>
            <div className="flex items-center space-x-2">
              <span className="font-medium">{req.value}</span>
              <span className={`w-2 h-2 rounded-full ${
                req.status === 'met' ? 'bg-green-500' :
                req.status === 'partial' ? 'bg-yellow-500' :
                'bg-red-500'
              }`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProdReadinessDashboard: React.FC = () => {
  const [systems, setSystems] = useState<SystemHealth[]>([]);
  const [readinessChecks, setReadinessChecks] = useState<ReadinessCheck[]>([]);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    setSystems(generateMockSystems());
    setReadinessChecks(generateReadinessChecks());
    setTrendData(generateTrendData());
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setSystems(generateMockSystems());
      setReadinessChecks(generateReadinessChecks());
      setTrendData(generateTrendData());
      setLoading(false);
    }, 1000);
  };

  const metrics: EnvironmentMetrics = {
    overall_score: Math.round(systems.reduce((sum, s) => sum + s.score, 0) / systems.length),
    readiness_percentage: 87,
    systems_healthy: systems.filter(s => s.status === 'healthy').length,
    systems_warning: systems.filter(s => s.status === 'warning').length,
    systems_critical: systems.filter(s => s.status === 'critical').length,
    total_systems: systems.length,
    last_updated: new Date().toISOString()
  };

  const pieData = [
    { name: 'Healthy', value: metrics.systems_healthy, color: '#22c55e' },
    { name: 'Warning', value: metrics.systems_warning, color: '#eab308' },
    { name: 'Critical', value: metrics.systems_critical, color: '#ef4444' }
  ];

  const filteredSystems = selectedCategory === 'all' 
    ? systems 
    : systems.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Production Readiness Dashboard</h1>
              <p className="text-gray-500 mt-1">Monitor system health and deployment readiness</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2"
                >
                  <option value="all">All Categories</option>
                  <option value="infrastructure">Infrastructure</option>
                  <option value="application">Applications</option>
                  <option value="database">Databases</option>
                  <option value="security">Security</option>
                  <option value="monitoring">Monitoring</option>
                </select>
              </div>
              <button
                onClick={handleRefresh}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Overall Status Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatusCard
            title="Overall Score"
            value={`${metrics.overall_score}/100`}
            status={metrics.overall_score >= 90 ? 'healthy' : metrics.overall_score >= 70 ? 'warning' : 'critical'}
            trend={2.5}
            icon={<Shield className="w-6 h-6" />}
          />
          <StatusCard
            title="Readiness"
            value={`${metrics.readiness_percentage}%`}
            status={metrics.readiness_percentage >= 90 ? 'healthy' : metrics.readiness_percentage >= 70 ? 'warning' : 'critical'}
            trend={1.2}
            icon={<CheckCircle2 className="w-6 h-6" />}
          />
          <StatusCard
            title="Healthy Systems"
            value={`${metrics.systems_healthy}/${metrics.total_systems}`}
            status="healthy"
            icon={<Activity className="w-6 h-6" />}
          />
          <StatusCard
            title="Active Alerts"
            value={systems.reduce((sum, s) => sum + s.alerts.length, 0)}
            status={systems.some(s => s.alerts.some(a => a.severity === 'critical')) ? 'critical' : 'warning'}
            trend={-15.3}
            icon={<AlertTriangle className="w-6 h-6" />}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Trend Chart */}
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4">System Health Trend (24h)</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
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
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="overall_score"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#scoreGradient)"
                    name="Overall Score"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Status Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4">System Status Distribution</h3>
            <div className="h-[200px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Systems Grid */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="bg-gradient-to-r from-slate-600 to-slate-700 text-white p-4 rounded-lg mb-6">
              <h2 className="text-lg font-semibold">System Health Overview</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSystems.map((system) => (
                <SystemCard key={system.id} system={system} />
              ))}
            </div>
          </div>
        </div>

        {/* Readiness Checks */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="bg-gradient-to-r from-slate-600 to-slate-700 text-white p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold">Production Readiness Checks</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {readinessChecks.map((check) => (
              <ReadinessCheckCard key={check.id} check={check} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};