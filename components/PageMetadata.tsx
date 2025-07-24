import React from 'react';
import Head from 'next/head';

interface PageMetadataProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

const PageMetadata: React.FC<PageMetadataProps> = ({
  title = 'PageBuilder Hub - Create Beautiful Websites',
  description = 'A powerful, intuitive website builder with drag-and-drop functionality, real-time preview, and JSON import/export capabilities.',
  keywords = 'website builder, drag and drop, page builder, web design, responsive design',
  ogImage = '/og-image.png',
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  );
};

export default PageMetadata; 