import { ReactNode } from 'react';

export type HealthStatus = 'healthy' | 'degraded' | 'unhealthy';

export interface ImageVersion {
  type: 'kernel' | 'worldview';
  version: string;
  buildNumber: string;
  timestamp: string;
}

export interface ComponentHealth {
  status: 'passed' | 'failed' | 'pending';
  metric: string;
  threshold: string;
  actual: string;
}

export interface EnvironmentStatus {
  name: string;
  isHibernated: boolean;
  healthStatus: HealthStatus;
  lastChecked: string;
  images: {
    kernel: ImageVersion;
    worldview: ImageVersion;
  };
  components?: {
    kernel: ComponentHealth;
    worldview: ComponentHealth;
    secureRuntime: ComponentHealth;
    tldb: ComponentHealth;
    mpf: ComponentHealth;
  };
}

export interface ClusterConfig {
  name: string;
  environments: string[];
  icon: ReactNode;
}