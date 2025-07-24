"use client";

import React from 'react';
import { AboutProperties } from '../../types/builder';

interface AboutSectionProps {
  properties: AboutProperties;
  isSelected: boolean;
  onClick: () => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ properties, isSelected, onClick }) => {
  return (
    <section
      className={`relative cursor-pointer transition-all duration-300 flex items-center ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      }`}
      style={{ 
        backgroundColor: properties.backgroundColor, 
        color: properties.textColor,
        height: properties.height || '400px',
        minHeight: properties.height || '400px',
      }}
      onClick={onClick}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight">
            {properties.title}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {properties.content}
          </p>
        </div>
      </div>
      {isSelected && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-10 pointer-events-none" />
      )}
    </section>
  );
};

export default AboutSection;