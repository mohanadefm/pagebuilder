"use client";

import React from 'react';
import { HeaderProperties } from '../../types/builder';

interface HeaderSectionProps {
  properties: HeaderProperties;
  isSelected: boolean;
  onClick: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ properties, isSelected, onClick }) => {
  return (
    <header
      className={`relative cursor-pointer transition-all duration-300 ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      }`}
      style={{ backgroundColor: properties.backgroundColor, color: properties.textColor }}
      onClick={onClick}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{properties.title}</h1>
          <nav className="hidden md:flex space-x-6">
            {properties.navigationItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="hover:opacity-80 transition-opacity duration-200"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>
      {isSelected && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-10 pointer-events-none" />
      )}
    </header>
  );
};

export default HeaderSection;