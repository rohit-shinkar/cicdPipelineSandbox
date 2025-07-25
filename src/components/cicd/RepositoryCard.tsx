import React from 'react';
import { 
  GitBranch, 
  Code, 
  Users, 
  Calendar,
  Activity,
  Settings,
  ExternalLink,
  Play
} from 'lucide-react';
import { format } from 'date-fns';
import { Repository } from '../../types/cicd';

interface RepositoryCardProps {
  repository: Repository;
}

const getLanguageColor = (language: string) => {
  switch (language.toLowerCase()) {
    case 'typescript':
      return 'bg-blue-100 text-blue-800';
    case 'javascript':
      return 'bg-yellow-100 text-yellow-800';
    case 'java':
      return 'bg-red-100 text-red-800';
    case 'python':
      return 'bg-green-100 text-green-800';
    case 'go':
      return 'bg-cyan-100 text-cyan-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'archived':
      return 'bg-gray-100 text-gray-800';
    case 'maintenance':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const RepositoryCard: React.FC<RepositoryCardProps> = ({ repository }) => {
  const totalCommits = repository.developers.reduce((sum, dev) => sum + dev.commitsThisWeek, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <GitBranch className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{repository.name}</h3>
              <p className="text-sm text-gray-500">{repository.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLanguageColor(repository.language)}`}>
              {repository.language}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(repository.status)}`}>
              {repository.status}
            </span>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <Code className="w-4 h-4" />
              <span>Branch:</span>
            </div>
            <span className="font-medium">{repository.branch}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Last Commit:</span>
            </div>
            <span className="font-medium">{format(new Date(repository.lastCommit), 'MMM d, HH:mm')}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <Activity className="w-4 h-4" />
              <span>Commits This Week:</span>
            </div>
            <span className="font-medium">{totalCommits}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Contributors</span>
          </div>
          <div className="flex -space-x-2">
            {repository.developers.slice(0, 4).map((developer) => (
              <img
                key={developer.id}
                src={developer.avatar}
                alt={developer.name}
                className="w-8 h-8 rounded-full border-2 border-white"
                title={developer.name}
              />
            ))}
            {repository.developers.length > 4 && (
              <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  +{repository.developers.length - 4}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
            <Play className="w-4 h-4" />
            <span>Run Pipeline</span>
          </button>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Settings className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};