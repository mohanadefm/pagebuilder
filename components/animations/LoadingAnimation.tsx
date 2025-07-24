"use client";

import React, { useMemo } from 'react';
import { motion, Variants } from 'framer-motion';

interface LoadingAnimationProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  color?: string;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ 
  size = 'md', 
  className = '',
  color = '#3b82f6'
}) => {
  const sizeMap = useMemo(() => ({
    sm: 20,
    md: 40,
    lg: 60,
  }), []);

  const circleVariants: Variants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const dotVariants: Variants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut" as const,
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
            r="8"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="32"
            strokeDashoffset="32"
            animate={{
              strokeDashoffset: [32, 0, 32],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut" as const,
            }}
          />
        </svg>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`flex items-center justify-center space-x-1 ${className}`}
      variants={dotVariants}
      animate="animate"
    >
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="rounded-full"
          style={{
            backgroundColor: color,
            width: sizeMap[size] / 4,
            height: sizeMap[size] / 4,
          }}
          animate={{
            y: [-2, -8, -2],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut" as const,
          }}
        />
      ))}
    </motion.div>
  );
};

export default LoadingAnimation; 