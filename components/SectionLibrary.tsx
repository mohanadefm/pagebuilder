"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useBuilder } from '../contexts/BuilderContext';
import { Section } from '../types/builder';
import { Layout, Image, Users, Star, Layers } from 'lucide-react';

const sectionTemplates = [
  {
    type: 'header' as const,
    name: 'Header',
    icon: Layout,
    description: 'Navigation and branding',
    defaultProperties: {
      title: 'Your Brand',
      navigationItems: ['Home', 'About', 'Services', 'Contact'],
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
    },
  },
  {
    type: 'hero' as const,
    name: 'Hero',
    icon: Image,
    description: 'Main banner section',
    defaultProperties: {
      title: 'Welcome to Our Website',
      subtitle: 'Create amazing experiences with our tools',
      buttonText: 'Get Started',
      backgroundImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
      backgroundColor: '#3b82f6',
      textColor: '#ffffff',
    },
  },
  {
    type: 'about' as const,
    name: 'About',
    icon: Users,
    description: 'Tell your story',
    defaultProperties: {
      title: 'About Us',
      content: 'We are passionate about creating amazing digital experiences that help businesses grow and connect with their customers.',
      backgroundColor: '#f8fafc',
      textColor: '#1f2937',
    },
  },
  {
    type: 'features' as const,
    name: 'Features',
    icon: Star,
    description: 'Highlight key features',
    defaultProperties: {
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
    },
  },
  {
    type: 'footer' as const,
    name: 'Footer',
    icon: Layers,
    description: 'Site footer with links',
    defaultProperties: {
      companyName: 'Your Company',
      links: ['Privacy Policy', 'Terms of Service', 'Contact Us', 'Support'],
      backgroundColor: '#111827',
      textColor: '#ffffff',
    },
  },
];

const SectionLibrary: React.FC = () => {
  const { addSection, state } = useBuilder();

  const handleAddSection = (template: typeof sectionTemplates[0]) => {
    const newSection: Section = {
      id: `${template.type}-${Date.now()}`,
      type: template.type,
      properties: template.defaultProperties,
      order: state.sections.length,
    };
    addSection(newSection);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Section Library</h2>
      <div className="space-y-3">
        {sectionTemplates.map((template, index) => (
          <motion.div
            key={template.type}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <button
              onClick={() => handleAddSection(template)}
              className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left group-hover:bg-blue-50"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <template.icon size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-500">{template.description}</p>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SectionLibrary;