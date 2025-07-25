export type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';
export type EnvironmentType = 'PRODVIR' | 'PRODFKT' | 'VALVIR' | 'VALFKT';
export type ResourceType = 'TLDB' | 'APP' | 'REDIS' | 'WV' | 'OPA';

export interface ModuleHealth {
  moduleName: string;
  state: CircuitState;
  errorRate: number;
  failureCount: number;
  lastStateChange: string;
}

export interface Resource {
  name: ResourceType;
  state: CircuitState;
  connectionCount: number;
  lastError?: string;
  lastStateChange: string;
}

export interface ModuleStart {
  moduleName: string;
  startTime: string;
  state: CircuitState;
  dependencies: ResourceType[];
}

export interface EnvironmentStatus {
  name: EnvironmentType;
  moduleHealth: ModuleHealth[];
  resources: Resource[];
  moduleStarts: ModuleStart[];
  totalOpen: number;
  totalClosed: number;
  totalHalfOpen: number;
}