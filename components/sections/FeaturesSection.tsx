"use client";

import React from 'react';
import { FeaturesProperties } from '../../types/builder';
import { Star, Zap, Shield, Heart } from 'lucide-react';

interface FeaturesSectionProps {
  properties: FeaturesProperties;
  isSelected: boolean;
  onClick: () => void;
}

const iconMap = {
  star: Star,
  zap: Zap,
  shield: Shield,
  heart: Heart,
};

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ properties, isSelected, onClick }) => {
  return (
    <section
      className={`relative cursor-pointer transition-all duration-300 flex items-center ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      }`}
      style={{ 
        backgroundColor: properties.backgroundColor, 
        color: properties.textColor,
        height: properties.height || '500px',
        minHeight: properties.height || '500px',
      }}
      onClick={onClick}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
            {properties.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {properties.features.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap] || Star;
            return (
              <div key={index} className="text-center p-4 sm:p-6 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-300">
                <div className="flex justify-center mb-3 sm:mb-4">
                  <Icon size={32} className="sm:w-10 sm:h-10 text-blue-400" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-opacity-80">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {isSelected && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-10 pointer-events-none" />
      )}
    </section>
  );
};

export default FeaturesSection;