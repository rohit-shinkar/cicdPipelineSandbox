import React from 'react';
import { Power } from 'lucide-react';

interface StatusBadgeProps {
  isHibernated: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ isHibernated }) => (
  <div className="flex items-center space-x-1.5">
    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
      isHibernated 
        ? 'bg-gray-200 text-gray-700'
        : 'bg-green-200 text-green-700'
    }`}>
      {isHibernated ? 'Hibernated' : 'Active'}
    </span>
    <Power className={`w-3 h-3 ${
      isHibernated ? 'text-gray-400' : 'text-green-500'
    }`} />
  </div>
);