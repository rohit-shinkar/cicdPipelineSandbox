import { EnvironmentStatus } from '../types/environment';

export const pollEnvironmentStatus = async (): Promise<EnvironmentStatus[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        // DNPKUB Cluster
        {
          name: 'PRODVIR',
          isHibernated: false,
          lastChecked: new Date().toISOString(),
          healthStatus: 'healthy',
          images: {
            kernel: {
              type: 'kernel',
              version: '1.2.345',
              buildNumber: 'BUILD-789',
              timestamp: new Date().toISOString()
            },
            worldview: {
              type: 'worldview',
              version: '2.3.456',
              buildNumber: 'BUILD-790',
              timestamp: new Date().toISOString()
            }
          }
        },
        {
          name: 'PRODFKT',
          isHibernated: false,
          healthStatus: 'healthy',
          lastChecked: new Date().toISOString(),
          images: {
            kernel: {
              type: 'kernel',
              version: '1.2.345',
              buildNumber: 'BUILD-789',
              timestamp: new Date().toISOString()
            },
            worldview: {
              type: 'worldview',
              version: '2.3.456',
              buildNumber: 'BUILD-790',
              timestamp: new Date().toISOString()
            }
          }
        },
        // QUALKUB Cluster
        {
          name: 'QUAL01',
          isHibernated: false,
          healthStatus: 'degraded',
          lastChecked: new Date().toISOString(),
          images: {
            kernel: {
              type: 'kernel',
              version: '1.2.346',
              buildNumber: 'BUILD-791',
              timestamp: new Date().toISOString()
            },
            worldview: {
              type: 'worldview',
              version: '2.3.457',
              buildNumber: 'BUILD-792',
              timestamp: new Date().toISOString()
            }
          }
        },
        // Add more environments for each cluster...
      ]);
    }, 1000);
  });
};