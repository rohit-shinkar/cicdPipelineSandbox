export interface TestResult {
  buildId: string;
  timestamp: string;
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  status: 'success' | 'failure' | 'running';
}

export interface TestSuite {
  name: string;
  passed: number;
  failed: number;
  duration: number;
}

export interface BuildDetails {
  buildId: string;
  branch: string;
  commit: string;
  author: string;
  timestamp: string;
  status: 'success' | 'failure' | 'running';
  suites: TestSuite[];
}