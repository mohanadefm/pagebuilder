"use client";

import React from 'react';
import { FooterProperties } from '../../types/builder';

interface FooterSectionProps {
  properties: FooterProperties;
  isSelected: boolean;
  onClick: () => void;
}

const FooterSection: React.FC<FooterSectionProps> = ({ properties, isSelected, onClick }) => {
  return (
    <footer
      className={`relative py-8 cursor-pointer transition-all duration-300 ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      }`}
      style={{ backgroundColor: properties.backgroundColor, color: properties.textColor }}
      onClick={onClick}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold">{properties.companyName}</p>
            <p className="text-sm opacity-80">© 2024 All rights reserved.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {properties.links.map((link, index) => (
              <a
                key={index}
                href="#"
                className="hover:opacity-80 transition-opacity duration-200"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
      {isSelected && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-10 pointer-events-none" />
      )}
    </footer>
  );
};

export default FooterSection;