import React, { useState } from 'react';
import { 
  BarChart2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Filter,
  Search,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { format } from 'date-fns';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, ComposedChart } from 'recharts';

interface TestMetric {
  name: string;
  passRate: number;
  trend: number;
  tests: number;
  failures: number;
  skipped: number;
  duration: number;
}

interface TimeSeriesData {
  timestamp: string;
  passRate: number;
  failures: number;
  totalTests: number;
}

const mockMetrics: TestMetric[] = [
  {
    name: 'Authorization Manager',
    passRate: 98.72,
    trend: 0.5,
    tests: 6283,
    failures: 12,
    skipped: 3,
    duration: 345
  },
  {
    name: 'B2B Transaction Processor',
    passRate: 96.45,
    trend: -1.2,
    tests: 5072,
    failures: 28,
    skipped: 8,
    duration: 567
  },
  {
    name: 'MetaData Manager',
    passRate: 99.1,
    trend: 1.8,
    tests: 8565,
    failures: 4,
    skipped: 1,
    duration: 234
  }
];

// Generate time series data
const generateTimeSeriesData = (): TimeSeriesData[] => {
  return Array.from({ length: 30 }, (_, i) => ({
    timestamp: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
    passRate: 95 + Math.random() * 5,
    failures: Math.floor(Math.random() * 50),
    totalTests: 8000 + Math.floor(Math.random() * 1000)
  }));
};

const StatCard: React.FC<{
  label: string;
  value: string;
  trend?: number;
  icon: React.ReactNode;
  color: string;
}> = ({ label, value, trend, icon, color }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:border-blue-200 transition-all">
    <div className="flex items-center justify-between mb-3">
      <div className={`p-3 ${color} rounded-xl`}>
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
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export const TestDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);

  const timeSeriesData = generateTimeSeriesData();
  const overallPassRate = 98.72;
  const totalTests = mockMetrics.reduce((sum, metric) => sum + metric.tests, 0);
  const totalFailures = mockMetrics.reduce((sum, metric) => sum + metric.failures, 0);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Test Results Dashboard</h1>
            <p className="text-gray-500">Monitor test execution and quality metrics</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button
              onClick={handleRefresh}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-6">
          <StatCard
            label="Overall Pass Rate"
            value={`${overallPassRate}%`}
            trend={0.5}
            icon={<CheckCircle className="w-5 h-5 text-green-600" />}
            color="bg-green-50"
          />
          <StatCard
            label="Total Tests"
            value={totalTests.toLocaleString()}
            icon={<BarChart2 className="w-5 h-5 text-blue-600" />}
            color="bg-blue-50"
          />
          <StatCard
            label="Failed Tests"
            value={totalFailures.toLocaleString()}
            trend={-1.2}
            icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
            color="bg-red-50"
          />
          <StatCard
            label="Avg Duration"
            value="382s"
            trend={1.8}
            icon={<Clock className="w-5 h-5 text-purple-600" />}
            color="bg-purple-50"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Pass Rate Trend</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeSeriesData}>
                  <defs>
                    <linearGradient id="passRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="timestamp"
                    tickFormatter={(time) => format(new Date(time), 'MMM d')}
                    stroke="#9ca3af"
                  />
                  <YAxis 
                    domain={[90, 100]}
                    stroke="#9ca3af"
                  />
                  <Tooltip
                    labelFormatter={(time) => format(new Date(time as string), 'MMM d, yyyy')}
                    formatter={(value: number) => [`${value.toFixed(2)}%`, 'Pass Rate']}
                  />
                  <Area
                    type="monotone"
                    dataKey="passRate"
                    stroke="#22c55e"
                    fillOpacity={1}
                    fill="url(#passRate)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Test Execution Metrics</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(time) => format(new Date(time), 'MMM d')}
                    stroke="#9ca3af"
                  />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    labelFormatter={(time) => format(new Date(time as string), 'MMM d, yyyy')}
                  />
                  <Bar dataKey="totalTests" fill="#3b82f6" />
                  <Line
                    type="monotone"
                    dataKey="failures"
                    stroke="#ef4444"
                    strokeWidth={2}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Test Metrics Table */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Test Metrics by Component</h3>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search components..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select className="border border-gray-200 rounded-lg px-3 py-2">
                    <option>All Components</option>
                    <option>Failed Only</option>
                    <option>Passed Only</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {mockMetrics.map((metric) => (
              <div key={metric.name} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${
                      metric.passRate >= 98 ? 'bg-green-50 text-green-600' :
                      metric.passRate >= 95 ? 'bg-yellow-50 text-yellow-600' :
                      'bg-red-50 text-red-600'
                    }`}>
                      {metric.passRate >= 98 ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : metric.passRate >= 95 ? (
                        <AlertTriangle className="w-5 h-5" />
                      ) : (
                        <XCircle className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{metric.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{metric.tests.toLocaleString()} tests</span>
                        <span>•</span>
                        <span>{metric.duration}s</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold">{metric.passRate}%</span>
                        <div className={`flex items-center ${
                          metric.trend >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {metric.trend >= 0 ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                          <span className="text-sm">{Math.abs(metric.trend)}%</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">Pass Rate</p>
                    </div>
                    <button
                      onClick={() => setExpandedMetric(expandedMetric === metric.name ? null : metric.name)}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      {expandedMetric === metric.name ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                {expandedMetric === metric.name && (
                  <div className="mt-4 pl-14">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500">Failed Tests</p>
                        <p className="text-xl font-semibold text-red-600">
                          {metric.failures}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500">Skipped Tests</p>
                        <p className="text-xl font-semibold text-yellow-600">
                          {metric.skipped}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500">Average Duration</p>
                        <p className="text-xl font-semibold text-blue-600">
                          {metric.duration}s
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-3">
                      <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                        View Details
                      </button>
                      <button className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                        Run Tests
                      </button>
                      <button className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                        Export Report
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};