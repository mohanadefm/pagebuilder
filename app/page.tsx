import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';

// Lazy load the ClientBuilder component
const ClientBuilder = dynamic(() => import('../components/ClientBuilder'), {
  loading: () => <LoadingSpinner />,
  ssr: false, // Disable SSR for the builder since it's client-side only
});

export default function Home() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <ClientBuilder />
      </Suspense>
    </ErrorBoundary>
  );
}