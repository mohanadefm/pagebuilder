import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl text-gray-500">404</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Page not found</h2>
        <p className="text-gray-500 mb-4">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link
          href="/"
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
} 