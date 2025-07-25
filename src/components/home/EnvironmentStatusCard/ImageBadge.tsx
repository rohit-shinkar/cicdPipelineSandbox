import React from 'react';
import { Package, Box } from 'lucide-react';
import { ImageVersion } from '../../../types/environment';

interface ImageBadgeProps {
  image: ImageVersion;
}

export const ImageBadge: React.FC<ImageBadgeProps> = ({ image }) => (
  <div className="flex items-center text-xs">
    {image.type === 'kernel' ? (
      <Package className="w-3 h-3 text-purple-500 mr-1.5" />
    ) : (
      <Box className="w-3 h-3 text-blue-500 mr-1.5" />
    )}
    <span className="font-medium">{image.version}</span>
    <span className="mx-1.5 text-gray-400">•</span>
    <span className="text-gray-500">{image.buildNumber}</span>
  </div>
);