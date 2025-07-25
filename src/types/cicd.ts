export interface Repository {
  id: string;
  name: string;
  description: string;
  language: string;
  lastCommit: string;
  branch: string;
  status: 'active' | 'archived' | 'maintenance';
  developers: Developer[];
  pipelineConfig: PipelineConfig;
}

export interface Developer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'senior' | 'mid' | 'junior' | 'lead';
  lastActivity: string;
  commitsThisWeek: number;
}

export interface PipelineConfig {
  id: string;
  name: string;
  trigger: 'push' | 'pull_request' | 'manual' | 'scheduled';
  stages: PipelineStage[];
  environment: string;
  notifications: NotificationConfig[];
}

export interface PipelineStage {
  id: string;
  name: string;
  type: 'build' | 'test' | 'security' | 'deploy' | 'approval';
  status: 'pending' | 'running' | 'success' | 'failed' | 'skipped' | 'cancelled';
  duration: number;
  startTime?: string;
  endTime?: string;
  logs?: string[];
  artifacts?: Artifact[];
  dependencies: string[];
}

export interface PipelineRun {
  id: string;
  repositoryId: string;
  pipelineConfigId: string;
  triggerType: 'push' | 'pull_request' | 'manual' | 'scheduled';
  triggeredBy: Developer;
  branch: string;
  commit: {
    hash: string;
    message: string;
    author: Developer;
    timestamp: string;
  };
  status: 'pending' | 'running' | 'success' | 'failed' | 'cancelled';
  stages: PipelineStage[];
  startTime: string;
  endTime?: string;
  totalDuration?: number;
}

export interface Artifact {
  id: string;
  name: string;
  type: 'binary' | 'report' | 'image' | 'package';
  size: number;
  downloadUrl: string;
  createdAt: string;
}

export interface NotificationConfig {
  type: 'email' | 'slack' | 'teams' | 'webhook';
  target: string;
  events: ('success' | 'failure' | 'start' | 'approval_required')[];
}

export interface DeploymentEnvironment {
  id: string;
  name: string;
  type: 'development' | 'staging' | 'production' | 'testing';
  status: 'healthy' | 'degraded' | 'down';
  lastDeployment?: {
    version: string;
    deployedBy: Developer;
    timestamp: string;
    pipelineRunId: string;
  };
  approvers: Developer[];
  autoPromote: boolean;
}