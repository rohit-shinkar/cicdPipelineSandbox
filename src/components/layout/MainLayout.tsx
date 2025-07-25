import React from 'react';
import { SideNavigation } from './SideNavigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <SideNavigation />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};