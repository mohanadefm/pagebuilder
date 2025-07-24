import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Optimize font loading
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'PageBuilder Hub - Create Beautiful Websites',
    template: '%s | PageBuilder Hub'
  },
  description: 'A powerful, intuitive website builder with drag-and-drop functionality, real-time preview, and JSON import/export capabilities.',
  keywords: ['website builder', 'drag and drop', 'page builder', 'web design', 'responsive design'],
  authors: [{ name: 'PageBuilder Hub Team' }],
  creator: 'PageBuilder Hub',
  publisher: 'PageBuilder Hub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pagebuilder-hub.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'PageBuilder Hub - Create Beautiful Websites',
    description: 'A powerful, intuitive website builder with drag-and-drop functionality, real-time preview, and JSON import/export capabilities.',
    url: 'https://pagebuilder-hub.com',
    siteName: 'PageBuilder Hub',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PageBuilder Hub - Website Builder',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PageBuilder Hub - Create Beautiful Websites',
    description: 'A powerful, intuitive website builder with drag-and-drop functionality, real-time preview, and JSON import/export capabilities.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}