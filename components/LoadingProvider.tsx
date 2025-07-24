"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  showLoading: () => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
  initialLoadingTime?: number;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ 
  children, 
  initialLoadingTime = 1000 
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial loading simulation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, initialLoadingTime);

    return () => clearTimeout(timer);
  }, [initialLoadingTime]);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  const value = {
    isLoading,
    setIsLoading,
    showLoading,
    hideLoading,
  };

  return (
    <LoadingContext.Provider value={value}>
      {isLoading ? <LoadingSpinner /> : children}
    </LoadingContext.Provider>
  );
}; 