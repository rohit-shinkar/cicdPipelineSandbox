import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Environment } from '../../types/environment';
import { RefreshCw } from 'lucide-react';
import { EnvironmentTile } from './EnvironmentTile';

const environments: Environment[] = [
  {
    id: 'prodvir',
    name: 'PRODVIR',
    releaseTag: '2024.03.1',
    stages: [
      {
        name: 'API',
        status: 'success',
        passRate: 98,
        lastUpdated: new Date().toISOString(),
        testsTotal: 245,
        testsPassed: 240,
        testsFailed: 5
      },
      {
        name: 'Fasttrack UI',
        status: 'running',
        passRate: 92,
        lastUpdated: new Date().toISOString(),
        testsTotal: 180,
        testsPassed: 165,
        testsFailed: 15
      },
      {
        name: 'UAT',
        status: 'pending',
        passRate: 95,
        lastUpdated: new Date().toISOString(),
        testsTotal: 150,
        testsPassed: 142,
        testsFailed: 8
      }
    ]
  },
  {
    id: 'prodfkt',
    name: 'PRODFKT',
    releaseTag: '2024.03.1',
    stages: [
      {
        name: 'API',
        status: 'success',
        passRate: 99,
        lastUpdated: new Date().toISOString(),
        testsTotal: 245,
        testsPassed: 243,
        testsFailed: 2
      },
      {
        name: 'Fasttrack UI',
        status: 'success',
        passRate: 97,
        lastUpdated: new Date().toISOString(),
        testsTotal: 180,
        testsPassed: 175,
        testsFailed: 5
      },
      {
        name: 'UAT',
        status: 'running',
        passRate: 94,
        lastUpdated: new Date().toISOString(),
        testsTotal: 150,
        testsPassed: 141,
        testsFailed: 9
      }
    ]
  },
  {
    id: 'valvir',
    name: 'VALVIR',
    releaseTag: '2024.03.1',
    stages: [
      {
        name: 'API',
        status: 'failure',
        passRate: 85,
        lastUpdated: new Date().toISOString(),
        testsTotal: 245,
        testsPassed: 208,
        testsFailed: 37
      },
      {
        name: 'Fasttrack UI',
        status: 'pending',
        passRate: 90,
        lastUpdated: new Date().toISOString(),
        testsTotal: 180,
        testsPassed: 162,
        testsFailed: 18
      },
      {
        name: 'UAT',
        status: 'pending',
        passRate: 88,
        lastUpdated: new Date().toISOString(),
        testsTotal: 150,
        testsPassed: 132,
        testsFailed: 18
      }
    ]
  },
  {
    id: 'valfkt',
    name: 'VALFKT',
    releaseTag: '2024.03.1',
    stages: [
      {
        name: 'API',
        status: 'success',
        passRate: 96,
        lastUpdated: new Date().toISOString(),
        testsTotal: 245,
        testsPassed: 235,
        testsFailed: 10
      },
      {
        name: 'Fasttrack UI',
        status: 'success',
        passRate: 95,
        lastUpdated: new Date().toISOString(),
        testsTotal: 180,
        testsPassed: 171,
        testsFailed: 9
      },
      {
        name: 'UAT',
        status: 'success',
        passRate: 97,
        lastUpdated: new Date().toISOString(),
        testsTotal: 150,
        testsPassed: 145,
        testsFailed: 5
      }
    ]
  },
  {
    id: 'qual01',
    name: 'QUAL01',
    releaseTag: '2024.03.2-RC1',
    stages: [
      {
        name: 'API',
        status: 'failure',
        passRate: 82,
        lastUpdated: new Date().toISOString(),
        testsTotal: 245,
        testsPassed: 201,
        testsFailed: 44
      },
      {
        name: 'Fasttrack UI',
        status: 'running',
        passRate: 88,
        lastUpdated: new Date().toISOString(),
        testsTotal: 180,
        testsPassed: 158,
        testsFailed: 22
      },
      {
        name: 'UAT',
        status: 'pending',
        passRate: 90,
        lastUpdated: new Date().toISOString(),
        testsTotal: 150,
        testsPassed: 135,
        testsFailed: 15
      }
    ]
  },
  {
    id: 'qual02',
    name: 'QUAL02',
    releaseTag: '2024.03.2-RC2',
    stages: [
      {
        name: 'API',
        status: 'success',
        passRate: 94,
        lastUpdated: new Date().toISOString(),
        testsTotal: 245,
        testsPassed: 230,
        testsFailed: 15
      },
      {
        name: 'Fasttrack UI',
        status: 'success',
        passRate: 93,
        lastUpdated: new Date().toISOString(),
        testsTotal: 180,
        testsPassed: 167,
        testsFailed: 13
      },
      {
        name: 'UAT',
        status: 'running',
        passRate: 91,
        lastUpdated: new Date().toISOString(),
        testsTotal: 150,
        testsPassed: 136,
        testsFailed: 14
      }
    ]
  },
  {
    id: 'dev01',
    name: 'DEV01',
    releaseTag: '2024.04.0-DEV',
    stages: [
      {
        name: 'API',
        status: 'running',
        passRate: 80,
        lastUpdated: new Date().toISOString(),
        testsTotal: 245,
        testsPassed: 196,
        testsFailed: 49
      },
      {
        name: 'Fasttrack UI',
        status: 'failure',
        passRate: 75,
        lastUpdated: new Date().toISOString(),
        testsTotal: 180,
        testsPassed: 135,
        testsFailed: 45
      },
      {
        name: 'UAT',
        status: 'pending',
        passRate: 85,
        lastUpdated: new Date().toISOString(),
        testsTotal: 150,
        testsPassed: 127,
        testsFailed: 23
      }
    ]
  },
  {
    id: 'dev02',
    name: 'DEV02',
    releaseTag: '2024.04.1-DEV',
    stages: [
      {
        name: 'API',
        status: 'success',
        passRate: 92,
        lastUpdated: new Date().toISOString(),
        testsTotal: 245,
        testsPassed: 225,
        testsFailed: 20
      },
      {
        name: 'Fasttrack UI',
        status: 'running',
        passRate: 88,
        lastUpdated: new Date().toISOString(),
        testsTotal: 180,
        testsPassed: 158,
        testsFailed: 22
      },
      {
        name: 'UAT',
        status: 'pending',
        passRate: 90,
        lastUpdated: new Date().toISOString(),
        testsTotal: 150,
        testsPassed: 135,
        testsFailed: 15
      }
    ]
  }
];

export const EnvironmentDashboard: React.FC = () => {
  const { environmentId } = useParams<{ environmentId?: string }>();
  const [lastUpdate, setLastUpdate] = React.useState(new Date());
  const [loading, setLoading] = React.useState(false);
  const [filteredEnvironments, setFilteredEnvironments] = useState<Environment[]>(environments);

  useEffect(() => {
    if (environmentId) {
      const filtered = environments.filter(env => env.id === environmentId);
      setFilteredEnvironments(filtered.length > 0 ? filtered : environments);
    } else {
      setFilteredEnvironments(environments);
    }
  }, [environmentId]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLastUpdate(new Date());
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6">
      <div className="max-w-full mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">
            {environmentId 
              ? `Environment: ${filteredEnvironments[0]?.name || environmentId.toUpperCase()}`
              : 'Environment Status'
            }
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </span>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center space-x-2 px-3 py-1.5 bg-white border border-gray-200 
                text-gray-600 rounded-lg hover:bg-gray-50 transition-colors disabled:bg-gray-100
                text-sm shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {filteredEnvironments.map((env) => (
            <EnvironmentTile key={env.id} environment={env} />
          ))}
        </div>
      </div>
    </div>
  );
};