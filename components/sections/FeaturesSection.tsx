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
      className={`relative py-16 cursor-pointer transition-all duration-300 ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      }`}
      style={{ backgroundColor: properties.backgroundColor, color: properties.textColor }}
      onClick={onClick}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{properties.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.features.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap] || Star;
            return (
              <div key={index} className="text-center p-6 rounded-lg bg-white bg-opacity-10">
                <div className="flex justify-center mb-4">
                  <Icon size={48} className="text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-opacity-80">{feature.description}</p>
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