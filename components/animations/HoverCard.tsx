"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
  duration?: number;
}

const HoverCard: React.FC<HoverCardProps> = ({ 
  children, 
  className = "",
  scale = 1.05,
  duration = 0.2
}) => {
  return (
    <motion.div
      whileHover={{ 
        scale,
        transition: { duration }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default HoverCard; 