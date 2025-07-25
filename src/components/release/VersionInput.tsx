import React from 'react';
import { Calendar } from 'lucide-react';

interface VersionInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export const VersionInput: React.FC<VersionInputProps> = ({
  value,
  onChange,
  error,
  disabled = false
}) => (
  <div className={`space-y-2 ${disabled ? 'opacity-50' : ''}`}>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Calendar className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="2024.10.1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="pl-12 w-full rounded-lg border-2 border-gray-200 py-3.5 text-lg
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          disabled:bg-gray-50 disabled:cursor-not-allowed"
      />
    </div>
    {error && (
      <p className="text-sm text-red-600 ml-1">{error}</p>
    )}
  </div>
);