export interface SystemHealth {
  id: string;
  name: string;
  category: 'infrastructure' | 'application' | 'database' | 'security' | 'monitoring';
  status: 'healthy' | 'warning' | 'critical';
  score: number;
  lastChecked: string;
  metrics: {
    availability: number;
    performance: number;
    errorRate: number;
    responseTime: number;
  };
  dependencies: string[];
  alerts: Alert[];
}

export interface Alert {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  resolved: boolean;
}

export interface ReadinessCheck {
  id: string;
  name: string;
  category: string;
  status: 'passed' | 'failed' | 'warning';
  score: number;
  description: string;
  lastRun: string;
  requirements: Requirement[];
}

export interface Requirement {
  id: string;
  name: string;
  status: 'met' | 'not_met' | 'partial';
  value: string;
  threshold: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
}

export interface EnvironmentMetrics {
  overall_score: number;
  readiness_percentage: number;
  systems_healthy: number;
  systems_warning: number;
  systems_critical: number;
  total_systems: number;
  last_updated: string;
}

export interface TrendData {
  timestamp: string;
  overall_score: number;
  healthy_systems: number;
  warning_systems: number;
  critical_systems: number;
}