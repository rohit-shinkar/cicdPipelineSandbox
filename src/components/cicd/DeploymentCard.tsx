import React from 'react';
import { 
  Server, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Calendar,
  User,
  Shield,
  Zap,
  ExternalLink
} from 'lucide-react';
import { format } from 'date-fns';
import { DeploymentEnvironment } from '../../types/cicd';

interface DeploymentCardProps {
  environment: DeploymentEnvironment;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'healthy':
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case 'degraded':
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    case 'down':
      return <XCircle className="w-5 h-5 text-red-500" />;
    default:
      return <CheckCircle2 className="w-5 h-5 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'healthy':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'degraded':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'down':
      return 'bg-red-50 text-red-700 border-red-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'production':
      return 'bg-red-100 text-red-800';
    case 'staging':
      return 'bg-yellow-100 text-yellow-800';
    case 'development':
      return 'bg-green-100 text-green-800';
    case 'testing':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const DeploymentCard: React.FC<DeploymentCardProps> = ({ environment }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Server className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{environment.name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(environment.type)}`}>
                  {environment.type}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(environment.status)}`}>
                  {environment.status}
                </span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            {getStatusIcon(environment.status)}
          </div>
        </div>

        {environment.lastDeployment && (
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <span>Version:</span>
              </div>
              <span className="font-medium font-mono">{environment.lastDeployment.version}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="w-4 h-4" />
                <span>Deployed by:</span>
              </div>
              <span className="font-medium">{environment.lastDeployment.deployedBy.name}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Last Deployment:</span>
              </div>
              <span className="font-medium">{format(new Date(environment.lastDeployment.timestamp), 'MMM d, HH:mm')}</span>
            </div>
          </div>
        )}

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <Shield className="w-4 h-4" />
              <span>Approvers:</span>
            </div>
            <span className="font-medium">{environment.approvers.length}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <Zap className="w-4 h-4" />
              <span>Auto Promote:</span>
            </div>
            <span className={`font-medium ${environment.autoPromote ? 'text-green-600' : 'text-gray-600'}`}>
              {environment.autoPromote ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>

        {environment.approvers.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Approvers</span>
            </div>
            <div className="flex -space-x-2">
              {environment.approvers.slice(0, 3).map((approver) => (
                <img
                  key={approver.id}
                  src={approver.avatar}
                  alt={approver.name}
                  className="w-8 h-8 rounded-full border-2 border-white"
                  title={approver.name}
                />
              ))}
              {environment.approvers.length > 3 && (
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    +{environment.approvers.length - 3}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
            <Zap className="w-4 h-4" />
            <span>Deploy</span>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};