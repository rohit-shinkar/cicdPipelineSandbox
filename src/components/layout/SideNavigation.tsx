import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  Activity, 
  Server, 
  Package, 
  Layers, 
  Settings, 
  HelpCircle,
  ExternalLink,
  AlertCircle,
  Clock,
  BarChart2,
  Database,
  Zap,
  Shield
} from 'lucide-react';

interface NavigationItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  badge?: {
    count: number;
    color: string;
  };
}

interface EnvironmentItem {
  name: string;
  status: 'healthy' | 'degraded' | 'unhealthy' | 'hibernated';
  path: string;
}

export const SideNavigation: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('environments');
  const location = useLocation();

  const navigationItems: NavigationItem[] = [
    { name: 'Dashboard', path: '/', icon: <Home className="w-5 h-5" /> },
    { 
      name: 'Circuit Breaker', 
      path: '/circuit-breaker', 
      icon: <Activity className="w-5 h-5" />,
      badge: { count: 3, color: 'bg-red-500' }
    },
    { name: 'Environments', path: '/environments', icon: <Server className="w-5 h-5" /> },
    { name: 'Releases', path: '/release', icon: <Package className="w-5 h-5" /> },
    { name: 'Test Stages', path: '/stages', icon: <Layers className="w-5 h-5" /> },
    { name: 'LSC Regression', path: '/lsc-regression/theta', icon: <BarChart2 className="w-5 h-5" /> },
    { name: 'DLQ Manager', path: '/dlq', icon: <Database className="w-5 h-5" /> },
    { name: 'CI/CD Pipeline', path: '/cicd', icon: <Zap className="w-5 h-5" /> },
    { name: 'Prod Readiness', path: '/prod-readiness', icon: <Shield className="w-5 h-5" /> },
  ];

  const environments: EnvironmentItem[] = [
    { name: 'PRODVIR', status: 'healthy', path: '/environments/prodvir' },
    { name: 'PRODFKT', status: 'healthy', path: '/environments/prodfkt' },
    { name: 'VALVIR', status: 'degraded', path: '/environments/valvir' },
    { name: 'VALFKT', status: 'healthy', path: '/environments/valfkt' },
    { name: 'QUAL01', status: 'unhealthy', path: '/environments/qual01' },
    { name: 'QUAL02', status: 'hibernated', path: '/environments/qual02' },
    { name: 'DEV01', status: 'healthy', path: '/environments/dev01' },
    { name: 'DEV02', status: 'hibernated', path: '/environments/dev02' },
  ];

  const quickLinks = [
    { name: 'Jenkins Pipeline', url: '#', icon: <Clock className="w-4 h-4" /> },
    { name: 'Grafana Dashboards', url: '#', icon: <BarChart2 className="w-4 h-4" /> },
    { name: 'Kibana Logs', url: '#', icon: <AlertCircle className="w-4 h-4" /> },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'degraded': return 'bg-yellow-500';
      case 'unhealthy': return 'bg-red-500';
      case 'hibernated': return 'bg-gray-400';
      default: return 'bg-gray-500';
    }
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div 
      className={`h-screen bg-gray-900 border-r border-gray-700 transition-all duration-300 flex flex-col ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <img
              src="https://www.tracelink.com/hubfs/raw_assets/public/TraceLink_January2021/images/tracelink-logo.svg"
              alt="TraceLink"
              className="h-6 invert"
            />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-gray-800 transition-colors text-gray-300"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto py-4 space-y-1">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center ${
              collapsed ? 'justify-center' : 'justify-between'
            } px-4 py-3 text-sm ${
              location.pathname === item.path
                ? 'bg-blue-900 text-blue-100 font-medium'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`${
                location.pathname === item.path ? 'text-blue-300' : 'text-gray-400'
              }`}>
                {item.icon}
              </div>
              {!collapsed && <span>{item.name}</span>}
            </div>
            {!collapsed && item.badge && (
              <span className={`px-2 py-1 rounded-full text-xs text-white ${item.badge.color}`}>
                {item.badge.count}
              </span>
            )}
          </Link>
        ))}

        {/* Environments Section */}
        <div className="pt-4">
          <div 
            className={`px-4 py-2 flex items-center ${collapsed ? 'justify-center' : 'justify-between'} cursor-pointer`}
            onClick={() => !collapsed && toggleSection('environments')}
          >
            {!collapsed && (
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Environments
              </span>
            )}
            {!collapsed && (
              <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform ${
                expandedSection === 'environments' ? 'transform rotate-90' : ''
              }`} />
            )}
          </div>
          
          {(!collapsed && expandedSection === 'environments') && (
            <div className="mt-1 space-y-1">
              {environments.map((env) => (
                <Link
                  key={env.name}
                  to={env.path}
                  className="flex items-center justify-between pl-8 pr-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                >
                  <span>{env.name}</span>
                  <span className={`w-2 h-2 rounded-full ${getStatusColor(env.status)}`}></span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links Section */}
        <div className="pt-2">
          <div 
            className={`px-4 py-2 flex items-center ${collapsed ? 'justify-center' : 'justify-between'} cursor-pointer`}
            onClick={() => !collapsed && toggleSection('quickLinks')}
          >
            {!collapsed && (
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Quick Links
              </span>
            )}
            {!collapsed && (
              <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform ${
                expandedSection === 'quickLinks' ? 'transform rotate-90' : ''
              }`} />
            )}
          </div>
          
          {(!collapsed && expandedSection === 'quickLinks') && (
            <div className="mt-1 space-y-1">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between pl-8 pr-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">{link.icon}</span>
                    <span>{link.name}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3">
          {!collapsed ? (
            <>
              <Link to="/settings\" className="p-2 rounded-md hover:bg-gray-800 text-gray-400">
                <Settings className="w-5 h-5" />
              </Link>
              <Link to="/help" className="p-2 rounded-md hover:bg-gray-800 text-gray-400">
                <HelpCircle className="w-5 h-5" />
              </Link>
            </>
          ) : (
            <Link to="/settings" className="p-2 rounded-md hover:bg-gray-800 text-gray-400">
              <Settings className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};