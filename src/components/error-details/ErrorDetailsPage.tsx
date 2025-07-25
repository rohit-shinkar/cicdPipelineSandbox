import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  User, 
  Server, 
  MessageSquare, 
  Copy, 
  ExternalLink,
  FileText,
  Database,
  Settings,
  Activity,
  Zap,
  Shield,
  Eye,
  Edit3,
  Download,
  RefreshCw,
  ChevronRight,
  Info,
  Bug,
  Code,
  Hash,
  Users,
  ChevronDown
} from 'lucide-react';
import { format } from 'date-fns';

interface ErrorDetails {
  id: string;
  environment: string;
  state: 'acknowledged' | 'new' | 'resolved' | 'escalated';
  acknowledgedBy?: string;
  escalations: number;
  status: string;
  occurrences: number;
  failedAt: string;
  publishingApp: string;
  exception: string;
  errorMessage: string;
  acknowledgementNotes?: string;
  messageClass: string;
  messageService: string;
  messageType: string;
  topicName: string;
  timestamp: string;
}

interface TimelineEvent {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  details: string;
  type: 'error' | 'acknowledgement' | 'escalation' | 'resolution';
}

interface RelatedError {
  id: string;
  environment: string;
  errorType: string;
  occurrences: number;
  timestamp: string;
  similarity: number;
}

const mockErrorData: ErrorDetails = {
  id: 'DEVTEST03',
  environment: 'DEVTEST03',
  state: 'acknowledged',
  acknowledgedBy: 'rasingh@tracelink.com',
  escalations: 1,
  status: 'NEW',
  occurrences: 5982,
  failedAt: 's3qa-test',
  publishingApp: 'datamesh-test',
  exception: 'com.tracelink.dnp.adminutils.redis.exception.KeyNotFoundException',
  errorMessage: 'Key not found [ MESSAGE_ROUTING_TABLE:00000000-0000-0000-0000-000000000000:s3qa-test:00000000-0000-0000-0000-000000000000:s3qa-test:s3qa-test-service:datamesh-pipeline-manager:datamesh-fact-messageType-subType:v1 ]',
  acknowledgementNotes: 'N/A',
  messageClass: 'FACT',
  messageService: 'unknown',
  messageType: 'datamesh-pipeline-manager:datamesh-fact-messageType-subType:v1',
  topicName: 'environment-manager.devtest03-dead-letter-topic',
  timestamp: new Date().toISOString()
};

const mockTimelineEvents: TimelineEvent[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    action: 'Error Acknowledged',
    user: 'rasingh@tracelink.com',
    details: 'Error acknowledged and assigned to development team',
    type: 'acknowledgement'
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    action: 'Error Escalated',
    user: 'system',
    details: 'Automatically escalated due to high occurrence count',
    type: 'escalation'
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    action: 'First Occurrence',
    user: 'system',
    details: 'Initial error detected in datamesh-pipeline-manager',
    type: 'error'
  }
];

const mockRelatedErrors: RelatedError[] = [
  {
    id: 'DEVTEST04',
    environment: 'DEVTEST04',
    errorType: 'KeyNotFoundException',
    occurrences: 234,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    similarity: 95
  },
  {
    id: 'QUAL01',
    environment: 'QUAL01',
    errorType: 'KeyNotFoundException',
    occurrences: 156,
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    similarity: 87
  },
  {
    id: 'DEVTEST02',
    environment: 'DEVTEST02',
    errorType: 'ValidationException',
    occurrences: 89,
    timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    similarity: 72
  }
];

const responsibleTeams = [
  'DataMesh Team',
  'Platform Engineering',
  'DevOps Team',
  'QA Team',
  'Security Team',
  'Infrastructure Team'
];

const StatusBadge: React.FC<{ state: string }> = ({ state }) => {
  const getStatusConfig = () => {
    switch (state) {
      case 'acknowledged':
        return { 
          color: 'bg-blue-100 text-blue-800 border-blue-200', 
          icon: <CheckCircle2 className="w-4 h-4" />,
          label: 'Acknowledged'
        };
      case 'new':
        return { 
          color: 'bg-red-100 text-red-800 border-red-200', 
          icon: <AlertTriangle className="w-4 h-4" />,
          label: 'New'
        };
      case 'resolved':
        return { 
          color: 'bg-green-100 text-green-800 border-green-200', 
          icon: <CheckCircle2 className="w-4 h-4" />,
          label: 'Resolved'
        };
      case 'escalated':
        return { 
          color: 'bg-orange-100 text-orange-800 border-orange-200', 
          icon: <Zap className="w-4 h-4" />,
          label: 'Escalated'
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800 border-gray-200', 
          icon: <Clock className="w-4 h-4" />,
          label: state
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg border font-medium text-sm ${config.color}`}>
      {config.icon}
      <span>{config.label}</span>
    </div>
  );
};

const InfoCard: React.FC<{ 
  title: string; 
  icon: React.ReactNode; 
  children: React.ReactNode;
  className?: string;
}> = ({ title, icon, children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all ${className}`}>
    <div className="p-4 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-t-xl">
      <div className="flex items-center space-x-2">
        <div className="p-2 bg-white/20 rounded-lg">
          {icon}
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
    </div>
    <div className="p-4">
      {children}
    </div>
  </div>
);

const CopyableField: React.FC<{ label: string; value: string; truncate?: boolean }> = ({ 
  label, 
  value, 
  truncate = false 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <div className="flex items-center space-x-2 group">
        <code className={`flex-1 text-sm bg-gray-50 px-3 py-2 rounded-lg border font-mono ${
          truncate ? 'truncate' : ''
        }`}>
          {value}
        </code>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-100 rounded-lg transition-all"
          title="Copy to clipboard"
        >
          {copied ? (
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-gray-500" />
          )}
        </button>
      </div>
    </div>
  );
};

const ActionButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  onClick: () => void;
}> = ({ icon, label, variant = 'secondary', onClick }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 text-white hover:bg-blue-700 border-blue-600';
      case 'danger':
        return 'bg-red-600 text-white hover:bg-red-700 border-red-600';
      default:
        return 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg border font-medium transition-all ${getVariantClasses()}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

const ResponsibleTeamDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('');

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg border border-purple-600 font-medium transition-all hover:bg-purple-700"
      >
        <Users className="w-4 h-4" />
        <span>{selectedTeam || 'Responsible Team'}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="py-2">
            {responsibleTeams.map((team) => (
              <button
                key={team}
                onClick={() => {
                  setSelectedTeam(team);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
              >
                {team}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const TimelineItem: React.FC<{ event: TimelineEvent }> = ({ event }) => {
  const getTypeColor = () => {
    switch (event.type) {
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'acknowledgement':
        return 'bg-blue-100 text-blue-800';
      case 'escalation':
        return 'bg-orange-100 text-orange-800';
      case 'resolution':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex space-x-4 p-4 border-l-4 border-l-blue-200 bg-blue-50/30 rounded-lg">
      <div className="flex-shrink-0">
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor()}`}>
          {event.type}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-medium text-gray-900">{event.action}</h4>
          <span className="text-sm text-gray-500">
            {format(new Date(event.timestamp), 'MMM d, HH:mm')}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-1">{event.details}</p>
        <p className="text-xs text-gray-500">by {event.user}</p>
      </div>
    </div>
  );
};

const RelatedErrorItem: React.FC<{ error: RelatedError }> = ({ error }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
    <div className="flex-1">
      <div className="flex items-center space-x-3 mb-2">
        <h4 className="font-medium text-gray-900">{error.id}</h4>
        <span className="text-sm text-gray-500">{error.environment}</span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          error.similarity >= 90 ? 'bg-red-100 text-red-800' :
          error.similarity >= 80 ? 'bg-orange-100 text-orange-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {error.similarity}% similar
        </span>
      </div>
      <div className="flex items-center space-x-4 text-sm text-gray-600">
        <span>{error.errorType}</span>
        <span>•</span>
        <span>{error.occurrences} occurrences</span>
        <span>•</span>
        <span>{format(new Date(error.timestamp), 'MMM d, HH:mm')}</span>
      </div>
    </div>
    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
      View Details
    </button>
  </div>
);

export const ErrorDetailsPage: React.FC = () => {
  const { errorId } = useParams<{ errorId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'details' | 'timeline' | 'related'>('details');

  const error = mockErrorData;

  const tabs = [
    { id: 'details', label: 'Error Details', icon: <Bug className="w-4 h-4" /> },
    { id: 'timeline', label: 'Timeline', icon: <Clock className="w-4 h-4" /> },
    { id: 'related', label: 'Related Errors', icon: <Activity className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dlq')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-500" />
              </button>
              <div>
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl font-bold text-gray-900">Error Details</h1>
                  <StatusBadge state={error.state} />
                </div>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Hash className="w-4 h-4" />
                    <span>{error.id}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Server className="w-4 h-4" />
                    <span>{error.environment}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{format(new Date(error.timestamp), 'MMM d, yyyy HH:mm')}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <ResponsibleTeamDropdown />
              <ActionButton
                icon={<RefreshCw className="w-4 h-4" />}
                label="Refresh"
                onClick={() => window.location.reload()}
              />
              <ActionButton
                icon={<Download className="w-4 h-4" />}
                label="Export"
                onClick={() => {}}
              />
              <ActionButton
                icon={<Edit3 className="w-4 h-4" />}
                label="Update Status"
                variant="primary"
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats - Uniform Group with Light Colors */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="bg-gradient-to-r from-slate-600 to-slate-700 text-white p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold">Error Overview</h2>
          </div>
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-red-50 rounded-xl p-6 border border-red-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">Occurrences</p>
                  <p className="text-3xl font-bold text-red-700">{error.occurrences.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-red-100 rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">Escalations</p>
                  <p className="text-3xl font-bold text-orange-700">{error.escalations}</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-xl">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Status</p>
                  <p className="text-3xl font-bold text-blue-700">{error.status}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Info className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-xl p-6 border border-green-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Acknowledged By</p>
                  <p className="text-lg font-semibold text-green-700 truncate">{error.acknowledgedBy || 'Unassigned'}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <User className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-slate-500 text-slate-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'details' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Application Information */}
                <InfoCard
                  title="Application Information"
                  icon={<Server className="w-5 h-5" />}
                >
                  <div className="space-y-4">
                    <CopyableField label="Failed At" value={error.failedAt} />
                    <CopyableField label="Publishing App" value={error.publishingApp} />
                    <CopyableField label="Exception Type" value={error.exception} />
                  </div>
                </InfoCard>

                {/* Message Information */}
                <InfoCard
                  title="Message Details"
                  icon={<MessageSquare className="w-5 h-5" />}
                >
                  <div className="space-y-4">
                    <CopyableField label="Message Class" value={error.messageClass} />
                    <CopyableField label="Message Service" value={error.messageService} />
                    <CopyableField label="Topic Name" value={error.topicName} truncate />
                  </div>
                </InfoCard>

                {/* Error Message */}
                <InfoCard
                  title="Error Message"
                  icon={<Bug className="w-5 h-5" />}
                  className="lg:col-span-2"
                >
                  <div className="space-y-4">
                    <CopyableField label="Message Type" value={error.messageType} />
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-600">Full Error Message</label>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <code className="text-sm text-red-800 font-mono break-all">
                          {error.errorMessage}
                        </code>
                      </div>
                    </div>
                  </div>
                </InfoCard>

                {/* Acknowledgement Notes */}
                <InfoCard
                  title="Acknowledgement Notes"
                  icon={<FileText className="w-5 h-5" />}
                  className="lg:col-span-2"
                >
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-600 italic">
                        {error.acknowledgementNotes || 'No acknowledgement notes available'}
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <ActionButton
                        icon={<Edit3 className="w-4 h-4" />}
                        label="Add Note"
                        onClick={() => {}}
                      />
                      <ActionButton
                        icon={<ExternalLink className="w-4 h-4" />}
                        label="Create JIRA"
                        onClick={() => {}}
                      />
                    </div>
                  </div>
                </InfoCard>
              </div>
            )}

            {activeTab === 'timeline' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-slate-600 to-slate-700 text-white p-4 rounded-lg">
                  <h3 className="text-lg font-semibold">Error Timeline</h3>
                </div>
                <div className="space-y-4">
                  {mockTimelineEvents.map((event) => (
                    <TimelineItem key={event.id} event={event} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'related' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-slate-600 to-slate-700 text-white p-4 rounded-lg">
                  <h3 className="text-lg font-semibold">Related Errors</h3>
                </div>
                <div className="space-y-4">
                  {mockRelatedErrors.map((relatedError) => (
                    <RelatedErrorItem key={relatedError.id} error={relatedError} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};