"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { HeroProperties } from '../../types/builder';
import { FadeInUp, StaggerContainer } from '../animations';

interface HeroSectionProps {
  properties: HeroProperties;
  isSelected: boolean;
  onClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ properties, isSelected, onClick }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.section
      className={`relative flex items-center justify-center cursor-pointer transition-all duration-300 ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      }`}
      style={{
        backgroundColor: properties.backgroundColor,
        color: properties.textColor,
        backgroundImage: properties.backgroundImage ? `url(${properties.backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: properties.height || '600px',
        minHeight: properties.height || '600px',
      }}
      onClick={onClick}
      whileHover={{ scale: isSelected ? 1 : 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 leading-tight"
          variants={itemVariants}
        >
          {properties.title}
        </motion.h1>
        
        <motion.p 
          className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-xs sm:max-w-md md:max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          {properties.subtitle}
        </motion.p>
        
        <motion.button 
          className="bg-white text-gray-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base lg:text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto"
          variants={buttonVariants}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          {properties.buttonText}
        </motion.button>
      </motion.div>
      
      {properties.backgroundImage && (
        <motion.div 
          className="absolute inset-0 bg-black bg-opacity-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.8 }}
        />
      )}
      
      {isSelected && (
        <motion.div 
          className="absolute inset-0 bg-blue-500 bg-opacity-10 pointer-events-none z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.section>
  );
};

export default HeroSection;