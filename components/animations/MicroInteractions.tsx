"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface MicroInteractionsProps {
  children: React.ReactNode;
  type?: 'pulse' | 'bounce' | 'shake' | 'wiggle';
  className?: string;
  delay?: number;
  duration?: number;
}

const MicroInteractions: React.FC<MicroInteractionsProps> = ({ 
  children, 
  type = 'pulse',
  className = "",
  delay = 0,
  duration = 0.6
}) => {
  const getVariants = () => {
    switch (type) {
      case 'pulse':
        return {
          animate: {
            scale: [1, 1.05, 1],
            transition: {
              duration,
              delay,
              repeat: Infinity,
              repeatDelay: 2,
            },
          },
        };
      case 'bounce':
        return {
          animate: {
            y: [0, -10, 0],
            transition: {
              duration,
              delay,
              repeat: Infinity,
              repeatDelay: 1,
            },
          },
        };
      case 'shake':
        return {
          animate: {
            x: [0, -5, 5, -5, 0],
            transition: {
              duration,
              delay,
              repeat: Infinity,
              repeatDelay: 3,
            },
          },
        };
      case 'wiggle':
        return {
          animate: {
            rotate: [0, -5, 5, -5, 0],
            transition: {
              duration,
              delay,
              repeat: Infinity,
              repeatDelay: 2,
            },
          },
        };
      default:
        return {
          animate: {
            scale: [1, 1.05, 1],
            transition: {
              duration,
              delay,
              repeat: Infinity,
              repeatDelay: 2,
            },
          },
        };
    }
  };

  return (
    <motion.div
      variants={getVariants()}
      animate="animate"
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MicroInteractions; 