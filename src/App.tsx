import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { HomePage } from './components/HomePage';
import { CircuitBreakerDashboard } from './components/circuitbreaker/CircuitBreakerDashboard';
import { ReleaseMenu } from './components/release/ReleaseMenu';
import { EnvironmentDashboard } from './components/dashboard/EnvironmentDashboard';
import { TestStagesPage } from './components/stages/TestStagesPage';
import { LSCRegressionDetails } from './components/lsc/LSCRegressionDetails';
import { DLQDashboard } from './components/dlq/DLQDashboard';
import { TestDashboard } from './components/test-monitoring/TestDashboard';
import { ErrorDetailsPage } from './components/error-details/ErrorDetailsPage';
import { CICDDashboard } from './components/cicd/CICDDashboard';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/circuit-breaker" element={<CircuitBreakerDashboard />} />
        <Route path="/release" element={<ReleaseMenu />} />
        <Route path="/environments" element={<EnvironmentDashboard />} />
        <Route path="/environments/:environmentId" element={<EnvironmentDashboard />} />
        <Route path="/stages" element={<TestStagesPage />} />
        <Route path="/lsc-regression/:environment" element={<LSCRegressionDetails />} />
        <Route path="/dlq" element={<DLQDashboard />} />
        <Route path="/dlq/error/:errorId" element={<ErrorDetailsPage />} />
        <Route path="/test-monitoring" element={<TestDashboard />} />
        <Route path="/cicd" element={<CICDDashboard />} />
      </Routes>
    </MainLayout>
  );
}

export default App;