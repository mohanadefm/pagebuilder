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
      className={`relative py-16 cursor-pointer transition-all duration-300 ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      }`}
      style={{ backgroundColor: properties.backgroundColor, color: properties.textColor }}
      onClick={onClick}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">{properties.title}</h2>
          <p className="text-lg leading-relaxed">{properties.content}</p>
        </div>
      </div>
      {isSelected && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-10 pointer-events-none" />
      )}
    </section>
  );
};

export default AboutSection;