import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Play, 
  Pause,
  GitBranch,
  User,
  Calendar,
  Timer,
  ExternalLink
} from 'lucide-react';
import { format } from 'date-fns';
import { PipelineRun, Repository } from '../../types/cicd';

interface PipelineRunCardProps {
  run: PipelineRun;
  repository: Repository;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'success':
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case 'failed':
      return <XCircle className="w-5 h-5 text-red-500" />;
    case 'running':
      return <Play className="w-5 h-5 text-blue-500" />;
    case 'cancelled':
      return <Pause className="w-5 h-5 text-gray-500" />;
    default:
      return <Clock className="w-5 h-5 text-yellow-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'success':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'failed':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'running':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'cancelled':
      return 'bg-gray-50 text-gray-700 border-gray-200';
    default:
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
  }
};

const StageIndicator: React.FC<{ stage: any }> = ({ stage }) => (
  <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-sm ${getStatusColor(stage.status)}`}>
    {getStatusIcon(stage.status)}
    <span className="font-medium">{stage.name}</span>
    {stage.duration > 0 && (
      <span className="text-xs opacity-75">{Math.round(stage.duration / 60)}m</span>
    )}
  </div>
);

export const PipelineRunCard: React.FC<PipelineRunCardProps> = ({ run, repository }) => {
  const duration = run.totalDuration ? Math.round(run.totalDuration / 60) : null;

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            {getStatusIcon(run.status)}
          </div>
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <h3 className="text-lg font-semibold text-gray-900">#{run.id}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(run.status)}`}>
                {run.status.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <GitBranch className="w-4 h-4" />
                <span>{repository.name}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>•</span>
                <span>{run.branch}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>•</span>
                <span>{run.commit.hash}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>{run.triggeredBy.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{format(new Date(run.startTime), 'MMM d, HH:mm')}</span>
          </div>
          {duration && (
            <div className="flex items-center space-x-1">
              <Timer className="w-4 h-4" />
              <span>{duration}m</span>
            </div>
          )}
          <button className="text-blue-600 hover:text-blue-700">
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-700 font-medium mb-1">{run.commit.message}</p>
        <p className="text-sm text-gray-500">
          by {run.commit.author.name} • {format(new Date(run.commit.timestamp), 'MMM d, yyyy HH:mm')}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {run.stages.map((stage) => (
          <StageIndicator key={stage.id} stage={stage} />
        ))}
      </div>
    </div>
  );
};