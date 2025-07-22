"use client";

import React from 'react';
import { HeroProperties } from '../../types/builder';

interface HeroSectionProps {
  properties: HeroProperties;
  isSelected: boolean;
  onClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ properties, isSelected, onClick }) => {
  return (
    <section
      className={`relative min-h-96 flex items-center justify-center cursor-pointer transition-all duration-300 ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      }`}
      style={{
        backgroundColor: properties.backgroundColor,
        color: properties.textColor,
        backgroundImage: properties.backgroundImage ? `url(${properties.backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={onClick}
    >
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{properties.title}</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">{properties.subtitle}</p>
        <button className="bg-white text-gray-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
          {properties.buttonText}
        </button>
      </div>
      {properties.backgroundImage && (
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      )}
      {isSelected && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-10 pointer-events-none z-20" />
      )}
    </section>
  );
};

export default HeroSection;