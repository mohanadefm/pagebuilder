import React from 'react';
import { LoadingAnimation } from './animations';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading PageBuilder Hub</h2>
        <p className="text-gray-500">Initializing your website builder...</p>
        <LoadingAnimation size="lg" className="mx-auto mt-4 justify-center" />
      </div>
    </div>
  );
};

export default LoadingSpinner; 