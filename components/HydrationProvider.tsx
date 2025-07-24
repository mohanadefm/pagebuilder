"use client";

import React, { useEffect, useState } from 'react';

interface HydrationProviderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const HydrationProvider: React.FC<HydrationProviderProps> = ({ 
  children, 
  fallback = null
}) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Wait for hydration to complete
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 100); // Reduced back to 100ms since LoadingManager handles the main loading

    return () => clearTimeout(timer);
  }, []);

  if (!isHydrated) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
};

export default HydrationProvider; 