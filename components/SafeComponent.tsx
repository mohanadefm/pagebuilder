"use client";

import React, { useState, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';

interface SafeComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error) => void;
}

const SafeComponent: React.FC<SafeComponentProps> = ({ 
  children, 
  fallback,
  onError 
}) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('SafeComponent caught error:', event.error);
      setError(event.error);
      setHasError(true);
      
      if (onError) {
        onError(event.error);
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('SafeComponent caught unhandled rejection:', event.reason);
      const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
      setError(error);
      setHasError(true);
      
      if (onError) {
        onError(error);
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [onError]);

  const handleReset = () => {
    setHasError(false);
    setError(null);
  };

  if (hasError) {
    return fallback || (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-red-500">⚠️</span>
          <span className="text-sm font-medium text-red-800">Component Error</span>
        </div>
        <p className="text-sm text-red-700 mb-3">
          This component encountered an error and couldn't render properly.
        </p>
        <button
          onClick={handleReset}
          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
        {process.env.NODE_ENV === 'development' && error && (
          <details className="mt-2">
            <summary className="cursor-pointer text-xs text-red-600">Error Details</summary>
            <pre className="mt-1 text-xs text-red-600 bg-red-100 p-2 rounded overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={fallback} onError={onError}>
      {children}
    </ErrorBoundary>
  );
};

export default SafeComponent; 