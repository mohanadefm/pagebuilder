"use client";

import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LoadingManagerProps {
  children: React.ReactNode;
  minLoadingTime?: number;
}

const LoadingManager: React.FC<LoadingManagerProps> = ({ 
  children, 
  minLoadingTime = 800 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const checkLoadingTime = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minLoadingTime - elapsed);
      
      if (remaining > 0) {
        setTimeout(() => setIsLoading(false), remaining);
      } else {
        setIsLoading(false);
      }
    };

    // Check if we've already waited long enough
    checkLoadingTime();
  }, [startTime, minLoadingTime]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};

export default LoadingManager; 