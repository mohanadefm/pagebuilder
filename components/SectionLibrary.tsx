"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBuilder } from '../contexts/BuilderContext';
import { Section } from '../types/builder';
import { HoverCard, StaggerContainer } from './animations';

const SectionLibrary: React.FC = React.memo(() => {
  const { addSection } = useBuilder();

  const sections = [
    {
      id: 'header',
      name: 'Header',
      description: 'Navigation header with logo and menu',
      icon: '🏠',
      color: 'bg-blue-500',
    },
    {
      id: 'hero',
      name: 'Hero',
      description: 'Main banner section with call-to-action',
      icon: '⭐',
      color: 'bg-yellow-500',
    },
    {
      id: 'about',
      name: 'About',
      description: 'Information about your company or project',
      icon: 'ℹ️',
      color: 'bg-green-500',
    },
    {
      id: 'features',
      name: 'Features',
      description: 'Highlight key features or services',
      icon: '✨',
      color: 'bg-purple-500',
    },
    {
      id: 'contact',
      name: 'Contact',
      description: 'Contact form and information',
      icon: '📧',
      color: 'bg-red-500',
    },
    {
      id: 'footer',
      name: 'Footer',
      description: 'Footer with links and copyright',
      icon: '📄',
      color: 'bg-gray-500',
    },
  ];

  const handleAddSection = React.useCallback((sectionType: string) => {
    const newSection: Section = {
      id: `${sectionType}-${Date.now()}`,
      type: sectionType as any,
      properties: getDefaultProperties(sectionType),
      order: 0,
    };
    addSection(newSection);
  }, [addSection]);

  const getDefaultProperties = (sectionType: string) => {
    switch (sectionType) {
      case 'header':
        return {
          title: 'Your Brand',
          navigationItems: ['Home', 'About', 'Services', 'Contact'],
          backgroundColor: '#ffffff',
          textColor: '#1f2937',
          height: '80px',
        };
      case 'hero':
        return {
          title: 'Welcome to Our Website',
          subtitle: 'Create amazing experiences with our tools',
          buttonText: 'Get Started',
          backgroundImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
          backgroundColor: '#3b82f6',
          textColor: '#ffffff',
          height: '600px',
        };
      case 'about':
        return {
          title: 'About Us',
          content: 'We are passionate about creating amazing digital experiences that help businesses grow and connect with their customers.',
          backgroundColor: '#f8fafc',
          textColor: '#1f2937',
          height: '400px',
        };
      case 'features':
        return {
          title: 'Our Features',
          features: [
            {
              title: 'Fast Performance',
              description: 'Optimized for speed and performance',
              icon: 'zap',
            },
            {
              title: 'Secure',
              description: 'Built with security in mind',
              icon: 'shield',
            },
            {
              title: 'User Friendly',
              description: 'Intuitive and easy to use',
              icon: 'heart',
            },
          ],
          backgroundColor: '#1f2937',
          textColor: '#ffffff',
          height: '500px',
        };
      case 'contact':
        return {
          title: 'Contact Us',
          subtitle: 'We are here to answer your questions',
          email: 'info@example.com',
          phone: '+1 (555) 123-4567',
          address: '123 Main Street, New York, NY 10001',
          showContactForm: true,
          backgroundColor: '#ffffff',
          textColor: '#1f2937',
          height: '600px',
        };
      case 'footer':
        return {
          companyName: 'Your Company',
          links: ['Privacy Policy', 'Terms of Service', 'Contact Us', 'Support'],
          backgroundColor: '#111827',
          textColor: '#ffffff',
          height: '200px',
        };
      default:
        return {};
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        {/* <h2 className="text-lg font-semibold text-gray-800 mb-2">Section Library</h2> */}
        <p className="text-sm text-gray-600">Click to add sections to your website</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-3"
        >
          <AnimatePresence>
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
              >
                <HoverCard>
                  <button
                    onClick={() => handleAddSection(section.id)}
                    className="w-full p-4 text-left bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg ${section.color} flex items-center justify-center text-white text-lg shadow-sm group-hover:shadow-md transition-shadow duration-200`}>
                        {section.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                          {section.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {section.description}
                        </p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </HoverCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
});

SectionLibrary.displayName = 'SectionLibrary';

export default SectionLibrary;