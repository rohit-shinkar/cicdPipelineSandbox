import React from 'react';
import { Package, Box } from 'lucide-react';
import { format } from 'date-fns';

interface ImageVersion {
  type: 'kernel' | 'worldview';
  version: string;
  buildNumber: string;
  timestamp: string;
}

export const ImageVersionsCard: React.FC = () => {
  const [versions, setVersions] = React.useState<ImageVersion[]>([
    {
      type: 'kernel',
      version: '1.2.345',
      buildNumber: 'BUILD-789',
      timestamp: new Date().toISOString()
    },
    {
      type: 'worldview',
      version: '2.3.456',
      buildNumber: 'BUILD-790',
      timestamp: new Date().toISOString()
    }
  ]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Latest Images</h2>
      <div className="space-y-4">
        {versions.map((image) => (
          <div
            key={image.type}
            className="p-4 rounded-lg bg-gray-50 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {image.type === 'kernel' ? (
                  <Package className="w-5 h-5 text-purple-500" />
                ) : (
                  <Box className="w-5 h-5 text-blue-500" />
                )}
                <span className="font-medium capitalize">{image.type}</span>
              </div>
              <span className="text-sm text-gray-500">{image.buildNumber}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-lg font-semibold">{image.version}</span>
              <span className="text-xs text-gray-500">
                {format(new Date(image.timestamp), 'MMM d, HH:mm')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};