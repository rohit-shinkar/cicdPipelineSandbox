import React, { useState } from 'react';
import { Bell, ExternalLink, Filter, Database, Clock, CheckCircle, AlertTriangle, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

interface DLQAlert {
  id: string;
  application: string;
  topic: string;
  count: number;
  timestamp: string;
  status: 'new' | 'acknowledged' | 'resolved';
  lastMessage?: string;
}

// Simulated API call to fetch DLQ alerts
const mockAlerts: DLQAlert[] = [
  {
    id: 'dlq-001',
    application: 'US Compliance',
    topic: 'compliance-events',
    count: 24,
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    status: 'new',
    lastMessage: 'Failed to process compliance event: Invalid payload format'
  },
  {
    id: 'dlq-002',
    application: 'DataMesh',
    topic: 'data-sync',
    count: 156,
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    status: 'acknowledged',
    lastMessage: 'Connection timeout while processing data sync message'
  },
  {
    id: 'dlq-003',
    application: 'MPC',
    topic: 'product-updates',
    count: 7,
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    status: 'new',
    lastMessage: 'Schema validation error: Missing required field "productId"'
  },
  {
    id: 'dlq-004',
    application: 'TracePortal',
    topic: 'user-events',
    count: 42,
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    status: 'resolved',
    lastMessage: 'Failed to deserialize message payload'
  },
  {
    id: 'dlq-005',
    application: 'AuthService',
    topic: 'auth-events',
    count: 18,
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    status: 'new',
    lastMessage: 'Invalid token format in authentication request'
  }
];

export const DLQManagerAlertsCard: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'new' | 'acknowledged' | 'resolved'>('all');
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);

  const filteredAlerts = mockAlerts.filter(alert => {
    if (filter === 'all') return true;
    return alert.status === filter;
  });

  const newAlertsCount = mockAlerts.filter(alert => alert.status === 'new').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return (
          <span className="flex items-center space-x-1 px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs font-medium">
            <AlertTriangle className="w-3 h-3" />
            <span>New</span>
          </span>
        );
      case 'acknowledged':
        return (
          <span className="flex items-center space-x-1 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            <Clock className="w-3 h-3" />
            <span>Ack</span>
          </span>
        );
      case 'resolved':
        return (
          <span className="flex items-center space-x-1 px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            <CheckCircle className="w-3 h-3" />
            <span>Resolved</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-3 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Database className={`w-4 h-4 ${newAlertsCount > 0 ? 'text-red-500' : 'text-blue-500'}`} />
          <h2 className="text-base font-semibold">DLQ Manager</h2>
          {newAlertsCount > 0 && (
            <span className="px-1.5 py-0.5 bg-red-100 text-red-800 rounded-full text-xs font-medium">
              {newAlertsCount} new
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Filter className="w-3.5 h-3.5" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="bg-transparent border-none focus:ring-0 text-xs py-1 pl-1 pr-6"
            >
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          <a 
            href="/dlq-manager" 
            className="text-blue-600 hover:text-blue-800 text-xs flex items-center space-x-1"
          >
            <span>View All</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
        {filteredAlerts.length === 0 ? (
          <div className="col-span-3 p-4 text-center text-gray-500 text-sm">
            No alerts matching the selected filter
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`p-3 rounded-lg border ${
                alert.status === 'new' ? 'border-red-200 bg-red-50/30' : 
                alert.status === 'acknowledged' ? 'border-blue-200 bg-blue-50/30' : 
                'border-green-200 bg-green-50/30'
              } hover:shadow-sm transition-all`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <MessageSquare className={`w-4 h-4 ${
                    alert.status === 'new' ? 'text-red-500' : 
                    alert.status === 'acknowledged' ? 'text-blue-500' : 
                    'text-green-500'
                  }`} />
                  <h3 className="font-medium text-sm truncate">{alert.application}</h3>
                </div>
                {getStatusBadge(alert.status)}
              </div>
              
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-gray-500 truncate">Topic: {alert.topic}</span>
                <span className="font-medium">{alert.count} msgs</span>
              </div>
              
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{format(new Date(alert.timestamp), 'HH:mm')}</span>
                {alert.lastMessage && (
                  <button 
                    onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {expandedAlert === alert.id ? 'Hide' : 'Details'}
                  </button>
                )}
              </div>
              
              {expandedAlert === alert.id && (
                <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-700 border border-gray-100">
                  <div className="text-red-600 mb-1">{alert.lastMessage}</div>
                  <div className="flex justify-end space-x-1">
                    <button className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200">
                      Ack
                    </button>
                    <button className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200">
                      Resolve
                    </button>
                    <button className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200">
                      Replay
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};