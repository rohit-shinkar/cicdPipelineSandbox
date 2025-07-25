import React from 'react';
import { Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CircuitStatus {
  environment: string;
  openCircuits: number;
  totalCircuits: number;
}

const statuses: CircuitStatus[] = [
  { environment: 'PRODVIR', openCircuits: 2, totalCircuits: 12 },
  { environment: 'PRODFKT', openCircuits: 1, totalCircuits: 12 },
  { environment: 'VALVIR', openCircuits: 0, totalCircuits: 12 },
  { environment: 'VALFKT', openCircuits: 0, totalCircuits: 12 }
];

export const CircuitBreakerCard: React.FC = () => {
  const totalOpen = statuses.reduce((sum, status) => sum + status.openCircuits, 0);
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Activity className="w-6 h-6 text-blue-500" />
          <h2 className="text-lg font-semibold">Circuit Breaker Status</h2>
        </div>
        <Link
          to="/circuit-breaker"
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
        >
          <span className="text-sm">View Details</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {statuses.map((status) => (
          <div
            key={status.environment}
            className={`p-3 rounded-lg ${
              status.openCircuits > 0 ? 'bg-red-50' : 'bg-green-50'
            }`}
          >
            <div className="text-sm font-medium mb-1">{status.environment}</div>
            <div className={`text-lg font-semibold ${
              status.openCircuits > 0 ? 'text-red-600' : 'text-green-600'
            }`}>
              {status.openCircuits} / {status.totalCircuits}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};