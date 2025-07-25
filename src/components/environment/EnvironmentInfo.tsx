import React, { useState } from 'react';
import { 
  Server, 
  Copy, 
  CheckCircle2, 
  XCircle,
  ExternalLink,
  Search,
  ChevronDown,
  Clock,
  Package,
  AlertCircle,
  Filter,
  BarChart2
} from 'lucide-react';

interface ManifestDetails {
  name: string;
  id: string;
  projectId: string;
  deploymentId: string;
  modules: {
    name: string;
    buildName: string;
  }[];
}

interface ApplicationInfo {
  name: string;
  kernelVersion: string;
  deploymentName: string;
  manifests: string[];
}

const EnvironmentInfo: React.FC = () => {
  const [selectedManifest, setSelectedManifest] = useState<ManifestDetails | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Add toast notification here
  };

  const mockApplications: ApplicationInfo[] = [
    {
      name: 'agile-process-teams',
      kernelVersion: 'RELEASE-4.51.2',
      deploymentName: 'aptbundle',
      manifests: [
        'agile-process-teams_integration-APT2025.3.0 integration-APT2025.3.0 #2025-06-02',
        'dev-kpatil integration-dev-kpatil #2025-05-28',
        'integration-dev-klavate integration-dev-klavate #2025-06-02'
      ]
    },
    // Add more mock data as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Environment Header */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Server className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">PLATTEST02</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-500">Environment ID:</span>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">d0737391-66ac-4b29-b2b2-7570e13a29c7</code>
                  <button 
                    onClick={() => copyToClipboard('d0737391-66ac-4b29-b2b2-7570e13a29c7')}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div>
                <div className="text-sm text-gray-500 mb-1">Cluster</div>
                <div className="font-medium">qualkubvir</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Node Affinity</div>
                <div className="flex items-center space-x-1">
                  <BarChart2 className="w-4 h-4 text-green-500" />
                  <span className="font-medium">98% Spot Instances</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Monitoring</div>
                <div className="flex items-center space-x-3">
                  <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                    <span>Grafana</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                    <span>Kafka UI</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                    <span>OpenSearch</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Checks Grid */}
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 lg:col-span-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                    <h3 className="font-semibold">KERNEL</h3>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">Healthy</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Response Time</span>
                    <span className="font-medium">45ms</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Success Rate</span>
                    <span className="font-medium text-green-600">99.9%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Package className="w-5 h-5 text-green-500" />
                    </div>
                    <h3 className="font-semibold">MPF</h3>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">Healthy</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Processing Rate</span>
                    <span className="font-medium">2.3k/s</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Queue Size</span>
                    <span className="font-medium">142</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                    <h3 className="font-semibold">SECURE</h3>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">Healthy</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">SSL Status</span>
                    <span className="font-medium text-green-600">Valid</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Last Check</span>
                    <span className="font-medium">2m ago</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <XCircle className="w-5 h-5 text-red-500" />
                    </div>
                    <h3 className="font-semibold">TLDB</h3>
                  </div>
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-sm">Issues</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Connections</span>
                    <span className="font-medium text-red-600">Limited</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Response Time</span>
                    <span className="font-medium">235ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">System Health</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Details
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Uptime</span>
                  </div>
                  <span className="font-medium">15d 4h 23m</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Active Alerts</span>
                  </div>
                  <span className="font-medium text-yellow-600">2</span>
                </div>
                <div className="h-40">
                  {/* Add health metrics chart here */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Applications Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Applications Information</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search apps..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2"
                  >
                    <option value="all">All Deployments</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    App Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kernel Version
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deployment Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Manifests
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockApplications.map((app, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Package className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{app.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {app.kernelVersion}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {app.deploymentName}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {app.manifests.map((manifest, i) => (
                          <div key={i} className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 truncate">{manifest}</span>
                            <button
                              onClick={() => {/* Show manifest details */}}
                              className="ml-2 text-blue-600 hover:text-blue-700"
                            >
                              Details
                            </button>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Manifest Details Modal */}
      {selectedManifest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Manifest Details</h3>
              <button
                onClick={() => setSelectedManifest(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Manifest Name</label>
                <p className="mt-1">{selectedManifest.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Manifest ID</label>
                <p className="mt-1">{selectedManifest.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Modules</label>
                <div className="mt-2 space-y-2">
                  {selectedManifest.modules.map((module, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium">{module.name}</p>
                      <p className="text-sm text-gray-500">{module.buildName}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnvironmentInfo;