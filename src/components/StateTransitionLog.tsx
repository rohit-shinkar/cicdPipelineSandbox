import React from 'react';
import { StateTransition } from '../types/circuitBreaker';
import { ArrowRight } from 'lucide-react';

interface Props {
  transitions: StateTransition[];
}

export const StateTransitionLog: React.FC<Props> = ({ transitions }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4">State Transition History</h2>
      <div className="space-y-4">
        {transitions.map((transition, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50">
            <div className="text-sm text-gray-500">
              {new Date(transition.timestamp).toLocaleTimeString()}
            </div>
            <div className="flex-1">
              <p className="font-medium">{transition.serviceId}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 rounded text-sm ${
                  transition.fromState === 'CLOSED' ? 'bg-green-100 text-green-800' :
                  transition.fromState === 'OPEN' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {transition.fromState}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <span className={`px-2 py-1 rounded text-sm ${
                  transition.toState === 'CLOSED' ? 'bg-green-100 text-green-800' :
                  transition.toState === 'OPEN' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {transition.toState}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {transition.reason}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};