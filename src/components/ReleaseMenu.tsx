import React, { useState } from 'react';
import { ChevronRight, Calendar } from 'lucide-react';

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

  const handleVersionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setVersion(value);
    if (value) validateVersion(value);
  };

  const handleSubmit = () => {
    if (!validateVersion(version)) return;
    console.log('Submitting:', { environment, category, version });
    // Add your submission logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Release Configuration</h2>
          
          <div className="space-y-6">
            {/* Environment Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Environment
              </label>
              <div className="grid grid-cols-2 gap-4">
                {['EP', 'Release'].map((env) => (
                  <button
                    key={env}
                    onClick={() => setEnvironment(env as Environment)}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      environment === env
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    {env}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Selection */}
            <div className={`transition-opacity ${!environment ? 'opacity-50 pointer-events-none' : ''}`}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div className="grid grid-cols-2 gap-4">
                {['Platform', 'App'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat as Category)}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      category === cat
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Version Input */}
            <div className={`transition-opacity ${!category ? 'opacity-50 pointer-events-none' : ''}`}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Version
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="2024.10.1"
                  value={version}
                  onChange={handleVersionChange}
                  className="pl-10 w-full rounded-lg border-2 border-gray-200 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!environment || !category || !version || !!error}
              className={`w-full mt-6 px-6 py-3 rounded-lg flex items-center justify-center space-x-2 text-white transition-all ${
                environment && category && version && !error
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};