import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle2, XCircle, AlertCircle, Server, Database, Lock, Box, Cpu, MessageSquare, Link as LinkIcon } from 'lucide-react';

interface ComponentStatus {
  name: string;
  version: string;
  status: 'passed' | 'failed' | 'pending';
  metric: string;
  threshold: string;
  actual: string;
  timestamp: string;
  comment?: string;
  jiraId?: string;
}

interface EnvironmentGates {
  name: string;
  grade: 'A' | 'B' | 'C' | 'D';
  components: {
    kernel: ComponentStatus;
    worldview: ComponentStatus;
    secureRuntime: ComponentStatus;
    tldb: ComponentStatus;
    mpf: ComponentStatus;
  };
  overallHealth: 'healthy' | 'degraded' | 'unhealthy';
}

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  component: ComponentStatus;
  onSave: (comment: string, jiraId: string) => void;
}

const CommentModal: React.FC<CommentModalProps> = ({ isOpen, onClose, component, onSave }) => {
  const [comment, setComment] = useState(component.comment || '');
  const [jiraId, setJiraId] = useState(component.jiraId || '');
  const [linkJira, setLinkJira] = useState(!!component.jiraId);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Add Note - {component.name}</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add your notes here..."
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="linkJira"
              checked={linkJira}
              onChange={(e) => setLinkJira(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="linkJira" className="text-sm text-gray-700">
              Link JIRA Issue
            </label>
          </div>

          {linkJira && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                JIRA ID
              </label>
              <input
                type="text"
                value={jiraId}
                onChange={(e) => setJiraId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., PROJ-123"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(comment, linkJira ? jiraId : '');
              onClose();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'passed':
      return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    case 'failed':
      return <XCircle className="w-4 h-4 text-red-500" />;
    default:
      return <AlertCircle className="w-4 h-4 text-yellow-500" />;
  }
};

const getComponentIcon = (component: string) => {
  switch (component) {
    case 'kernel':
      return <Cpu className="w-4 h-4" />;
    case 'worldview':
      return <Box className="w-4 h-4" />;
    case 'secureRuntime':
      return <Lock className="w-4 h-4" />;
    case 'tldb':
      return <Database className="w-4 h-4" />;
    case 'mpf':
      return <Server className="w-4 h-4" />;
    default:
      return null;
  }
};

const mockEnvironments: EnvironmentGates[] = [
  {
    name: 'PLATTEST04',
    grade: 'A',
    overallHealth: 'healthy',
    components: {
      kernel: {
        name: 'Kernel',
        version: '1.2.345',
        status: 'passed',
        metric: 'Health Check',
        threshold: '100%',
        actual: '100%',
        timestamp: new Date().toISOString()
      },
      worldview: {
        name: 'WorldView',
        version: '2.3.456',
        status: 'passed',
        metric: 'Response Time',
        threshold: '200ms',
        actual: '150ms',
        timestamp: new Date().toISOString()
      },
      secureRuntime: {
        name: 'Secure Runtime',
        version: '1.1.123',
        status: 'passed',
        metric: 'Security Scan',
        threshold: '0',
        actual: '0',
        timestamp: new Date().toISOString()
      },
      tldb: {
        name: 'TLDB',
        version: '5.2.789',
        status: 'passed',
        metric: 'Connection Pool',
        threshold: '85%',
        actual: '75%',
        timestamp: new Date().toISOString()
      },
      mpf: {
        name: 'MPF',
        version: '3.4.567',
        status: 'passed',
        metric: 'Processing Rate',
        threshold: '1000/s',
        actual: '950/s',
        timestamp: new Date().toISOString()
      }
    }
  },
  {
    name: 'PLATTEST03',
    grade: 'B',
    overallHealth: 'degraded',
    components: {
      kernel: {
        name: 'Kernel',
        version: '1.2.344',
        status: 'passed',
        metric: 'Health Check',
        threshold: '100%',
        actual: '100%',
        timestamp: new Date().toISOString()
      },
      worldview: {
        name: 'WorldView',
        version: '2.3.455',
        status: 'failed',
        metric: 'Response Time',
        threshold: '200ms',
        actual: '350ms',
        timestamp: new Date().toISOString()
      },
      secureRuntime: {
        name: 'Secure Runtime',
        version: '1.1.122',
        status: 'passed',
        metric: 'Security Scan',
        threshold: '0',
        actual: '0',
        timestamp: new Date().toISOString()
      },
      tldb: {
        name: 'TLDB',
        version: '5.2.788',
        status: 'pending',
        metric: 'Connection Pool',
        threshold: '85%',
        actual: '82%',
        timestamp: new Date().toISOString()
      },
      mpf: {
        name: 'MPF',
        version: '3.4.566',
        status: 'passed',
        metric: 'Processing Rate',
        threshold: '1000/s',
        actual: '980/s',
        timestamp: new Date().toISOString()
      }
    }
  },
  {
    name: 'DEVTEST03',
    grade: 'C',
    overallHealth: 'unhealthy',
    components: {
      kernel: {
        name: 'Kernel',
        version: '1.2.343',
        status: 'failed',
        metric: 'Health Check',
        threshold: '100%',
        actual: '85%',
        timestamp: new Date().toISOString()
      },
      worldview: {
        name: 'WorldView',
        version: '2.3.454',
        status: 'failed',
        metric: 'Response Time',
        threshold: '200ms',
        actual: '500ms',
        timestamp: new Date().toISOString()
      },
      secureRuntime: {
        name: 'Secure Runtime',
        version: '1.1.121',
        status: 'passed',
        metric: 'Security Scan',
        threshold: '0',
        actual: '0',
        timestamp: new Date().toISOString()
      },
      tldb: {
        name: 'TLDB',
        version: '5.2.787',
        status: 'failed',
        metric: 'Connection Pool',
        threshold: '85%',
        actual: '95%',
        timestamp: new Date().toISOString()
      },
      mpf: {
        name: 'MPF',
        version: '3.4.565',
        status: 'pending',
        metric: 'Processing Rate',
        threshold: '1000/s',
        actual: '850/s',
        timestamp: new Date().toISOString()
      }
    }
  },
  {
    name: 'DEVTEST02',
    grade: 'D',
    overallHealth: 'unhealthy',
    components: {
      kernel: {
        name: 'Kernel',
        version: '1.2.343',
        status: 'failed',
        metric: 'Health Check',
        threshold: '100%',
        actual: '75%',
        timestamp: new Date().toISOString()
      },
      worldview: {
        name: 'WorldView',
        version: '2.3.454',
        status: 'failed',
        metric: 'Response Time',
        threshold: '200ms',
        actual: '750ms',
        timestamp: new Date().toISOString()
      },
      secureRuntime: {
        name: 'Secure Runtime',
        version: '1.1.121',
        status: 'failed',
        metric: 'Security Scan',
        threshold: '0',
        actual: '3',
        timestamp: new Date().toISOString()
      },
      tldb: {
        name: 'TLDB',
        version: '5.2.787',
        status: 'failed',
        metric: 'Connection Pool',
        threshold: '85%',
        actual: '98%',
        timestamp: new Date().toISOString()
      },
      mpf: {
        name: 'MPF',
        version: '3.4.565',
        status: 'failed',
        metric: 'Processing Rate',
        threshold: '1000/s',
        actual: '450/s',
        timestamp: new Date().toISOString()
      }
    }
  }
];

const ComponentCard: React.FC<{ 
  component: ComponentStatus; 
  type: string;
  onUpdateComponent: (updated: ComponentStatus) => void;
}> = ({ component, type, onUpdateComponent }) => {
  const [showModal, setShowModal] = useState(false);

  const handleSaveComment = (comment: string, jiraId: string) => {
    onUpdateComponent({
      ...component,
      comment,
      jiraId
    });
  };

  return (
    <>
      <div className={`p-3 rounded-lg ${
        component.status === 'passed' ? 'bg-green-50' :
        component.status === 'failed' ? 'bg-red-50' :
        'bg-yellow-50'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className={`${
              component.status === 'passed' ? 'text-green-500' :
              component.status === 'failed' ? 'text-red-500' :
              'text-yellow-500'
            }`}>
              {getComponentIcon(type)}
            </div>
            <span className="font-medium text-sm">{component.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusIcon(component.status)}
            <button
              onClick={() => setShowModal(true)}
              className="p-1 hover:bg-white rounded-full transition-colors relative"
            >
              <MessageSquare className="w-4 h-4 text-gray-500" />
              {(component.comment || component.jiraId) && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
              )}
            </button>
          </div>
        </div>
        <div className="text-xs space-y-1">
          <div className="flex justify-between text-gray-600">
            <span>Version:</span>
            <span className="font-medium">{component.version}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>{component.metric}:</span>
            <span className={`font-medium ${
              component.status === 'failed' ? 'text-red-600' :
              component.status === 'passed' ? 'text-green-600' :
              'text-yellow-600'
            }`}>
              {component.actual} / {component.threshold}
            </span>
          </div>
          {component.jiraId && (
            <div className="flex items-center space-x-1 text-blue-600">
              <LinkIcon className="w-3 h-3" />
              <span>{component.jiraId}</span>
            </div>
          )}
        </div>
      </div>

      <CommentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        component={component}
        onSave={handleSaveComment}
      />
    </>
  );
};

const getGradeColor = (grade: string) => {
  switch (grade) {
    case 'A':
      return 'bg-green-50/50 border-green-200';
    case 'B':
      return 'bg-yellow-50/50 border-yellow-200';
    case 'C':
      return 'bg-orange-50/50 border-orange-200';
    case 'D':
      return 'bg-red-50/50 border-red-200';
    default:
      return 'bg-gray-50 border-gray-200';
  }
};

const getGradeTextColor = (grade: string) => {
  switch (grade) {
    case 'A':
      return 'text-green-700';
    case 'B':
      return 'text-yellow-700';
    case 'C':
      return 'text-orange-700';
    case 'D':
      return 'text-red-700';
    default:
      return 'text-gray-700';
  }
};

export const QualityGatesCard: React.FC = () => {
  const [environments, setEnvironments] = useState<EnvironmentGates[]>([]);

  useEffect(() => {
    setEnvironments(mockEnvironments);
  }, []);

  const handleUpdateComponent = (envIndex: number, componentKey: string, updated: ComponentStatus) => {
    setEnvironments(prevEnvs => {
      const newEnvs = [...prevEnvs];
      newEnvs[envIndex].components[componentKey as keyof typeof newEnvs[0]["components"]] = updated;
      return newEnvs;
    });
  };

  const groupedEnvironments = environments.reduce((acc, env) => {
    if (!acc[env.grade]) {
      acc[env.grade] = [];
    }
    acc[env.grade].push(env);
    return acc;
  }, {} as Record<string, EnvironmentGates[]>);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Quality Gates</h2>
          <Shield className="w-6 h-6 text-indigo-500" />
        </div>
      </div>
      <div className="p-4 space-y-6">
        {Object.entries(groupedEnvironments)
          .sort(([gradeA], [gradeB]) => gradeA.localeCompare(gradeB))
          .map(([grade, envs]) => (
            <div key={grade} className={`rounded-lg border p-4 ${getGradeColor(grade)}`}>
              <div className="flex items-center space-x-2 mb-4">
                <h3 className={`text-lg font-semibold ${getGradeTextColor(grade)}`}>
                  Grade {grade}
                </h3>
              </div>
              <div className="space-y-6">
                {envs.map((env, envIndex) => (
                  <div key={env.name} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{env.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        env.overallHealth === 'healthy' ? 'bg-green-100 text-green-800' :
                        env.overallHealth === 'degraded' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {env.overallHealth}
                      </span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {Object.entries(env.components).map(([key, component]) => (
                        <ComponentCard
                          key={key}
                          component={component}
                          type={key}
                          onUpdateComponent={(updated) => handleUpdateComponent(envIndex, key, updated)}
                        />
                      ))}
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