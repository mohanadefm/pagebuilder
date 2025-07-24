"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface LoadingAnimationProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ 
  size = 'md',
  color = '#3b82f6',
  className = ""
}) => {
  const sizeMap = {
    sm: 16,
    md: 24,
    lg: 32,
  };

  const circleVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  const dotVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  if (size === 'sm') {
    return (
      <motion.div
        className={`inline-block ${className}`}
        variants={circleVariants}
        animate="animate"
      >
        <svg
          width={sizeMap[size]}
          height={sizeMap[size]}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="31.416"
            strokeDashoffset="31.416"
            variants={{
              animate: {
                strokeDashoffset: 0,
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  ease: 'linear',
                },
              },
            }}
            animate="animate"
          />
        </svg>
      </motion.div>
    );
  }

  return (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
          variants={dotVariants}
          animate="animate"
          transition={{ delay: index * 0.2 }}
        />
      ))}
    </div>
  );
};

export default LoadingAnimation; 