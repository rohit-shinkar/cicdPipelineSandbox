import React from 'react';

interface SelectionButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export const SelectionButton: React.FC<SelectionButtonProps> = ({
  selected,
  onClick,
  children,
  disabled = false
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      px-6 py-4 rounded-lg border-2 transition-all
      ${selected
        ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
        : 'border-gray-200 hover:border-blue-200 text-gray-700'
      }
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}
      font-medium text-lg
    `}
  >
    {children}
  </button>
);