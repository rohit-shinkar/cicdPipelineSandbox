import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { SelectionButton } from './SelectionButton';
import { VersionInput } from './VersionInput';
import { StepIndicator } from './StepIndicator';

type Environment = 'EP' | 'Release';
type Category = 'Platform' | 'App';

export const ReleaseMenu: React.FC = () => {
  const [environment, setEnvironment] = useState<Environment | ''>('');
  const [category, setCategory] = useState<Category | ''>('');
  const [version, setVersion] = useState('');
  const [error, setError] = useState('');

  const validateVersion = (value: string) => {
    const regex = /^202[0-9]\.(0[1-9]|1[0-2])\.[0-9]+$/;
    if (!regex.test(value)) {
      setError('Version must be in format YYYY.MM.X (e.g., 2024.10.1)');
      return false;
    }
    setError('');
    return true;
  };

  const handleVersionChange = (value: string) => {
    setVersion(value);
    if (value) validateVersion(value);
  };

  const getCurrentStep = () => {
    if (!environment) return 0;
    if (!category) return 1;
    if (!version || error) return 2;
    return 3;
  };

  const handleSubmit = () => {
    if (!validateVersion(version)) return;
    console.log('Release configuration:', { environment, category, version });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Release Configuration</h2>
          <p className="text-gray-500 mb-6">Configure your release settings</p>

          <StepIndicator currentStep={getCurrentStep()} totalSteps={3} />
          
          <div className="space-y-8">
            {/* Environment Selection */}
            <div className="space-y-3">
              <label className="block text-lg font-medium text-gray-900">
                Environment
              </label>
              <div className="grid grid-cols-2 gap-4">
                {['EP', 'Release'].map((env) => (
                  <SelectionButton
                    key={env}
                    selected={environment === env}
                    onClick={() => setEnvironment(env as Environment)}
                  >
                    {env}
                  </SelectionButton>
                ))}
              </div>
            </div>

            {/* Category Selection */}
            <div className="space-y-3">
              <label className="block text-lg font-medium text-gray-900">
                Category
              </label>
              <div className="grid grid-cols-2 gap-4">
                {['Platform', 'App'].map((cat) => (
                  <SelectionButton
                    key={cat}
                    selected={category === cat}
                    onClick={() => setCategory(cat as Category)}
                    disabled={!environment}
                  >
                    {cat}
                  </SelectionButton>
                ))}
              </div>
            </div>

            {/* Version Input */}
            <div className="space-y-3">
              <label className="block text-lg font-medium text-gray-900">
                Version
              </label>
              <VersionInput
                value={version}
                onChange={handleVersionChange}
                error={error}
                disabled={!category}
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!environment || !category || !version || !!error}
              className={`
                w-full px-6 py-4 rounded-lg flex items-center justify-center
                space-x-2 text-white text-lg font-medium transition-all
                ${environment && category && version && !error
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 cursor-not-allowed'
                }
              `}
            >
              <span>Create Release</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};