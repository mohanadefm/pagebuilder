"use client";

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { HeaderProperties } from '../../types/builder';

interface HeaderSectionProps {
  properties: HeaderProperties;
  isSelected: boolean;
  onClick: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ properties, isSelected, onClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`relative cursor-pointer transition-all duration-300 ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      }`}
      style={{ 
        backgroundColor: properties.backgroundColor, 
        color: properties.textColor,
        height: properties.height || '80px',
        minHeight: properties.height || '80px',
      }}
      onClick={onClick}
    >
      <div className="container mx-auto px-4 py-4 h-full flex items-center">
        <div className="flex items-center justify-between w-full">
          {/* Logo/Title */}
          <h1 className="text-xl sm:text-2xl font-bold truncate">{properties.title}</h1>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 lg:space-x-6">
            {properties.navigationItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="hover:opacity-80 transition-opacity duration-200 text-sm lg:text-base"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-black hover:bg-opacity-10 rounded-lg transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              toggleMobileMenu();
            }}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="px-4 py-2">
            {properties.navigationItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="block py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}
      
      {isSelected && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-10 pointer-events-none" />
      )}
    </header>
  );
};

export default HeaderSection;