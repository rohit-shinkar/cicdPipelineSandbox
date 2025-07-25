import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => (
  <div className="flex items-center space-x-4 mb-8">
    {Array.from({ length: totalSteps }).map((_, index) => (
      <React.Fragment key={index}>
        <div className="flex items-center">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center
            ${index < currentStep
              ? 'bg-blue-500 text-white'
              : index === currentStep
                ? 'bg-blue-100 text-blue-500 border-2 border-blue-500'
                : 'bg-gray-100 text-gray-400'
            }
          `}>
            {index < currentStep ? (
              <Check className="w-5 h-5" />
            ) : (
              <span className="font-medium">{index + 1}</span>
            )}
          </div>
        </div>
        {index < totalSteps - 1 && (
          <div className={`flex-1 h-0.5 ${
            index < currentStep ? 'bg-blue-500' : 'bg-gray-200'
          }`} />
        )}
      </React.Fragment>
    ))}
  </div>
);