import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, Activity, CheckCircle2 } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon }) => {
  const getTrendIcon = () => {
    if (change > 0) return <ArrowUpRight className="w-4 h-4 text-green-500" />;
    if (change < 0) return <ArrowDownRight className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          {icon}
        </div>
        {getTrendIcon()}
      </div>
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold">{value}%</p>
        <span className={`ml-2 text-sm ${change > 0 ? 'text-green-500' : change < 0 ? 'text-red-500' : 'text-gray-500'}`}>
          {change > 0 ? '+' : ''}{change}%
        </span>
      </div>
    </div>
  );
};

export const QualityMetrics: React.FC = () => {
  const metrics = [
    { title: 'Test Success Rate', value: 98, change: 2.5, icon: <CheckCircle2 className="w-5 h-5 text-blue-600" /> },
    { title: 'System Stability', value: 92, change: 0, icon: <Activity className="w-5 h-5 text-blue-600" /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>
  );
};