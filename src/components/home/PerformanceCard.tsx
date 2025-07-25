import React, { useState } from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip, CartesianGrid, XAxis, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { 
  Zap, 
  Clock, 
  TrendingUp, 
  Package,
  Database,
  Key,
  Search,
  Workflow,
  Layers,
  Radio,
  BarChart2,
  PieChartIcon,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight
} from 'lucide-react';
import { format } from 'date-fns';

interface AppMetrics {
  name: string;
  icon: React.ReactNode;
  kernelVersion: string;
  throughput: number;
  p95: number;
  p99: number;
  responseTime: number;
  successRate: number;
  trend: number;
  consistencyGrade: 'A' | 'B' | 'C' | 'D' | 'F';
  coverageGrade: 'A' | 'B' | 'C' | 'D' | 'F';
  status: 'critical' | 'warning' | 'good';
  degradation?: number;
}

const apps: AppMetrics[] = [
  {
    name: 'TLDB',
    icon: <Database className="w-4 h-4" />,
    kernelVersion: '1.2.345',
    throughput: 2500,
    p95: 180,
    p99: 250,
    responseTime: 120,
    successRate: 99.8,
    trend: 0.5,
    consistencyGrade: 'A',
    coverageGrade: 'B',
    status: 'good'
  },
  {
    name: 'MPF',
    icon: <Workflow className="w-4 h-4" />,
    kernelVersion: '1.2.345',
    throughput: 1800,
    p95: 150,
    p99: 220,
    responseTime: 95,
    successRate: 92.5,
    trend: -10.2,
    consistencyGrade: 'C',
    coverageGrade: 'B',
    status: 'critical',
    degradation: -10.00
  },
  {
    name: 'Product Track',
    icon: <Layers className="w-4 h-4" />,
    kernelVersion: '1.2.345',
    throughput: 3200,
    p95: 200,
    p99: 280,
    responseTime: 150,
    successRate: 99.9,
    trend: 0.8,
    consistencyGrade: 'A',
    coverageGrade: 'A',
    status: 'good'
  },
  {
    name: 'SSO',
    icon: <Key className="w-4 h-4" />,
    kernelVersion: '1.2.345',
    throughput: 5000,
    p95: 120,
    p99: 180,
    responseTime: 85,
    successRate: 95.5,
    trend: -44.51,
    consistencyGrade: 'D',
    coverageGrade: 'C',
    status: 'critical',
    degradation: -44.51
  },
  {
    name: 'AuthManager',
    icon: <Package className="w-4 h-4" />,
    kernelVersion: '1.2.345',
    throughput: 4200,
    p95: 130,
    p99: 190,
    responseTime: 90,
    successRate: 97.7,
    trend: -2.44,
    consistencyGrade: 'B',
    coverageGrade: 'B',
    status: 'warning',
    degradation: -2.44
  },
  {
    name: 'Event Gateway',
    icon: <Radio className="w-4 h-4" />,
    kernelVersion: '1.2.345',
    throughput: 8500,
    p95: 160,
    p99: 230,
    responseTime: 110,
    successRate: 96.6,
    trend: -0.3,
    consistencyGrade: 'C',
    coverageGrade: 'B',
    status: 'warning'
  },
  {
    name: 'Elastic Search',
    icon: <Search className="w-4 h-4" />,
    kernelVersion: '1.2.345',
    throughput: 1500,
    p95: 220,
    p99: 300,
    responseTime: 180,
    successRate: 98.4,
    trend: 0.4,
    consistencyGrade: 'B',
    coverageGrade: 'C',
    status: 'warning'
  }
];

const getGradeColor = (grade: string) => {
  switch (grade) {
    case 'A':
      return 'text-green-600 bg-green-50';
    case 'B':
      return 'text-blue-600 bg-blue-50';
    case 'C':
      return 'text-yellow-600 bg-yellow-50';
    case 'D':
      return 'text-orange-600 bg-orange-50';
    case 'F':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'critical':
      return 'bg-red-50 border-red-200 hover:border-red-300';
    case 'warning':
      return 'bg-yellow-50 border-yellow-200 hover:border-yellow-300';
    case 'good':
      return 'bg-green-50 border-green-200 hover:border-green-300';
    default:
      return 'bg-gray-50 border-gray-200 hover:border-gray-300';
  }
};

const MetricBadge: React.FC<{ label: string; value: number; unit: string; trend?: number }> = ({ 
  label, 
  value, 
  unit,
  trend 
}) => (
  <div className="px-3 py-2 bg-gray-50 rounded-lg">
    <div className="text-xs text-gray-500 mb-1">{label}</div>
    <div className="flex items-baseline justify-between">
      <span className="text-sm font-semibold">
        {value.toLocaleString()} {unit}
      </span>
      {trend !== undefined && (
        <span className={`text-xs ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
  </div>
);

const GradesBadge: React.FC<{ consistencyGrade: string; coverageGrade: string }> = ({ 
  consistencyGrade, 
  coverageGrade 
}) => (
  <div className="flex flex-col space-y-1">
    <div className="flex items-center space-x-2">
      <span className="text-xs text-gray-500 w-20">Consistency:</span>
      <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${getGradeColor(consistencyGrade)}`}>
        Grade {consistencyGrade}
      </span>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-xs text-gray-500 w-20">Coverage:</span>
      <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${getGradeColor(coverageGrade)}`}>
        Grade {coverageGrade}
      </span>
    </div>
  </div>
);

const StatusSummary: React.FC<{ apps: AppMetrics[] }> = ({ apps }) => {
  const summary = {
    critical: apps.filter(app => app.status === 'critical').length,
    warning: apps.filter(app => app.status === 'warning').length,
    good: apps.filter(app => app.status === 'good').length,
  };

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-red-50 rounded-lg p-4 border border-red-200">
        <div className="text-sm text-red-600 font-medium mb-1">Critical</div>
        <div className="text-2xl font-bold text-red-700">{summary.critical}</div>
      </div>
      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <div className="text-sm text-yellow-600 font-medium mb-1">Warning</div>
        <div className="text-2xl font-bold text-yellow-700">{summary.warning}</div>
      </div>
      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
        <div className="text-sm text-green-600 font-medium mb-1">Good</div>
        <div className="text-2xl font-bold text-green-700">{summary.good}</div>
      </div>
    </div>
  );
};

const DegradationList: React.FC<{ apps: AppMetrics[] }> = ({ apps }) => {
  const degradedApps = apps
    .filter(app => app.degradation !== undefined)
    .sort((a, b) => (a.degradation || 0) - (b.degradation || 0));

  if (degradedApps.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-base font-semibold mb-3 flex items-center space-x-2">
        <AlertTriangle className="w-5 h-5 text-red-500" />
        <span>Top Performance Degradations</span>
      </h3>
      <div className="space-y-2">
        {degradedApps.map((app) => (
          <div key={app.name} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2">
              <ArrowDownRight className="w-4 h-4 text-red-500" />
              <span className="font-medium">{app.name}</span>
            </div>
            <span className="text-red-500 font-medium">{app.degradation}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PerformanceCard: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'successRate' | 'responseTime'>('successRate');
  const [expandedApp, setExpandedApp] = useState<string | null>(null);
  const [chartType, setChartType] = useState<'line' | 'bar' | 'pie'>('line');

  const historicalData = Array.from({ length: 24 }, (_, i) => {
    const date = new Date();
    date.setHours(date.getHours() - i);
    return {
      timestamp: date.toISOString(),
      ...apps.reduce((acc, app) => ({
        ...acc,
        [app.name]: Math.round(app.successRate + (Math.random() * 0.4 - 0.2))
      }), {})
    };
  }).reverse();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Zap className="w-6 h-6 text-blue-500" />
          <div>
            <h2 className="text-lg font-semibold">Performance Metrics</h2>
            <p className="text-sm text-gray-500">Real-time application performance overview</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setChartType('line')}
              className={`p-2 rounded-lg transition-colors ${
                chartType === 'line' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`p-2 rounded-lg transition-colors ${
                chartType === 'bar' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BarChart2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType('pie')}
              className={`p-2 rounded-lg transition-colors ${
                chartType === 'pie' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <PieChartIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedMetric('successRate')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                selectedMetric === 'successRate' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Success Rate
            </button>
            <button
              onClick={() => setSelectedMetric('responseTime')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                selectedMetric === 'responseTime' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Response Time
            </button>
          </div>
        </div>
      </div>

      <StatusSummary apps={apps} />
      <DegradationList apps={apps} />

      <div className="mb-6 h-[300px] bg-gray-50 p-4 rounded-lg border border-gray-200">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={(time) => format(new Date(time), 'HH:mm')}
                stroke="#9ca3af"
                fontSize={12}
              />
              <YAxis 
                domain={selectedMetric === 'successRate' ? [90, 100] : [0, 'auto']}
                stroke="#9ca3af"
                fontSize={12}
              />
              <Tooltip
                labelFormatter={(time) => format(new Date(time as string), 'HH:mm')}
                formatter={(value: number) => [
                  `${value}${selectedMetric === 'successRate' ? '%' : 'ms'}`,
                  ''
                ]}
              />
              {apps.map((app, index) => (
                <Line
                  key={app.name}
                  type="monotone"
                  dataKey={app.name}
                  stroke={`hsl(${index * 360 / apps.length}, 70%, 50%)`}
                  strokeWidth={2}
                  dot={false}
                  name={app.name}
                />
              ))}
            </LineChart>
          ) : chartType === 'bar' ? (
            <BarChart data={apps.map(app => ({
              name: app.name,
              value: selectedMetric === 'successRate' ? app.successRate : app.responseTime
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={apps.map(app => ({
                  name: app.name,
                  value: selectedMetric === 'successRate' ? app.successRate : app.responseTime
                }))}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {apps.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`hsl(${index * 360 / apps.length}, 70%, 50%)`}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {apps.map((app) => (
          <div 
            key={app.name}
            className={`p-4 rounded-lg border transition-all ${getStatusColor(app.status)}`}
            onClick={() => setExpandedApp(expandedApp === app.name ? null : app.name)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  {app.icon}
                </div>
                <div>
                  <h3 className="font-medium">{app.name}</h3>
                  <div className="text-xs text-gray-500">
                    Kernel v{app.kernelVersion}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  app.successRate >= 99 ? 'bg-green-100 text-green-800' :
                  app.successRate >= 95 ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {app.successRate}% Success
                </div>
                {app.trend !== 0 && (
                  app.trend > 0 ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )
                )}
              </div>
            </div>

            <div className="mt-2 mb-2">
              <GradesBadge 
                consistencyGrade={app.consistencyGrade} 
                coverageGrade={app.coverageGrade} 
              />
            </div>

            {expandedApp === app.name && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                <MetricBadge
                  label="Throughput"
                  value={app.throughput}
                  unit="req/s"
                  trend={app.trend}
                />
                <MetricBadge
                  label="Response Time"
                  value={app.responseTime}
                  unit="ms"
                />
                <MetricBadge
                  label="P95 Latency"
                  value={app.p95}
                  unit="ms"
                />
                <MetricBadge
                  label="P99 Latency"
                  value={app.p99}
                  unit="ms"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};