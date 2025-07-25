import React, { useState } from 'react';
import { 
  Database, 
  ArrowLeft, 
  Search, 
  Filter,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  MessageSquare,
  XCircle,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  BarChart2,
  X,
  Layers,
  PieChart,
  Eye,
  Edit3,
  MoreHorizontal
} from 'lucide-react';
import { format, subHours } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TimeSeriesData {
  timestamp: string;
  newErrors: number;
  resolved: number;
  retried: number;
}

interface DLQMessage {
  id: string;
  environment: string;
  application: string;
  topic: string;
  errorType: string;
  count: number;
  timestamp: string;
  status: 'new' | 'acknowledged' | 'resolved';
  lastMessage?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const generateTimeSeriesData = (): TimeSeriesData[] => {
  return Array.from({ length: 24 }, (_, i) => ({
    timestamp: subHours(new Date(), 23 - i).toISOString(),
    newErrors: Math.floor(Math.random() * 100) + 20,
    resolved: Math.floor(Math.random() * 80),
    retried: Math.floor(Math.random() * 60)
  }));
};

const mockMessages: DLQMessage[] = [
  {
    id: 'DEVTEST03',
    environment: 'DEVTEST03',
    application: 'datamesh-pipeline-manager',
    topic: 'environment-manager.devtest03-dead-letter-topic',
    errorType: 'KeyNotFoundException',
    count: 5982,
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    status: 'acknowledged',
    severity: 'critical',
    lastMessage: 'Key not found in MESSAGE_ROUTING_TABLE'
  },
  {
    id: 'PRODVIR001',
    environment: 'PRODVIR',
    application: 'order-processor',
    topic: 'order-events-dlq',
    errorType: 'ValidationException',
    count: 234,
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    status: 'new',
    severity: 'high',
    lastMessage: 'Invalid order format detected'
  },
  {
    id: 'QUAL01002',
    environment: 'QUAL01',
    application: 'auth-service',
    topic: 'auth-events-dlq',
    errorType: 'TimeoutException',
    count: 156,
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    status: 'resolved',
    severity: 'medium',
    lastMessage: 'Authentication service timeout'
  }
];

const timeSeriesData = generateTimeSeriesData();

interface MetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MetricsModal: React.FC<MetricsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Detailed Metrics</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Error Trend</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeSeriesData}>
                  <defs>
                    <linearGradient id="newErrors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
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
                    dataKey="newErrors" 
                    stroke="#ef4444" 
                    fillOpacity={1}
                    fill="url(#newErrors)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resolution Metrics</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData}>
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
                  <Line 
                    type="monotone" 
                    dataKey="resolved" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="retried" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, trend, icon, color, onClick, showGraph, className = '' }) => (
  <div 
    className={`bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:border-blue-200 transition-all ${
      onClick ? 'cursor-pointer' : ''
    } ${className}`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between mb-2">
      <div className={`p-2 ${color} rounded-lg`}>
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
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-xl font-bold mt-1">{value}</p>
    </div>
    {showGraph && (
      <div className="h-24 mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={timeSeriesData.slice(-8)}>
            <Line 
              type="monotone" 
              dataKey="retried" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="resolved" 
              stroke="#22c55e" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )}
  </div>
);

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'high':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'new':
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    case 'acknowledged':
      return <Clock className="w-4 h-4 text-blue-500" />;
    case 'resolved':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    default:
      return <XCircle className="w-4 h-4 text-gray-500" />;
  }
};

export const DLQDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedMessage, setExpandedMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMetricsModal, setShowMetricsModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const filteredMessages = mockMessages.filter(message => {
    const matchesSearch = message.application.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.environment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.errorType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || message.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-3">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">DLQ Management System</h1>
              <p className="text-sm text-gray-500">Monitor and manage dead letter queue messages</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-5 gap-6 mb-8">
          {/* Status Group */}
          <div className="col-span-3 bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Status Overview</h3>
            <div className="grid grid-cols-3 gap-4">
              <StatCard
                label="Total Messages"
                value="10,123"
                trend={5.2}
                icon={<Layers className="w-4 h-4 text-blue-600" />}
                color="bg-blue-50"
              />
              <StatCard
                label="New Errors"
                value="892"
                trend={-2.4}
                icon={<AlertTriangle className="w-4 h-4 text-red-600" />}
                color="bg-red-50"
              />
              <StatCard
                label="Resolved Today"
                value="234"
                trend={12.5}
                icon={<CheckCircle className="w-4 h-4 text-green-600" />}
                color="bg-green-50"
              />
            </div>
          </div>

          {/* Analytics Card */}
          <div className="col-span-2">
            <StatCard
              label="Queue Analytics"
              value="94.5% Processing Rate"
              icon={<PieChart className="w-5 h-5 text-purple-600" />}
              color="bg-purple-50"
              onClick={() => setShowMetricsModal(true)}
              showGraph={true}
              className="h-full"
            />
          </div>
        </div>

        {/* Message List */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search messages..."
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
                    className="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="acknowledged">Acknowledged</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>
              <button
                onClick={handleRefresh}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredMessages.map((message) => (
              <div key={message.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(message.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{message.id}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(message.severity)}`}>
                          {message.severity.toUpperCase()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Environment:</span> {message.environment}
                        </div>
                        <div>
                          <span className="font-medium">Application:</span> {message.application}
                        </div>
                        <div>
                          <span className="font-medium">Error Type:</span> {message.errorType}
                        </div>
                        <div>
                          <span className="font-medium">Count:</span> {message.count.toLocaleString()}
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        {format(new Date(message.timestamp), 'MMM d, yyyy HH:mm')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => navigate(`/dlq/error/${message.id}`)}
                      className="inline-flex items-center space-x-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MetricsModal isOpen={showMetricsModal} onClose={() => setShowMetricsModal(false)} />
    </div>
  );
};