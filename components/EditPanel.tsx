"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useBuilder } from '../contexts/BuilderContext';
import { HexColorPicker } from 'react-colorful';
import { X, Palette, Type, Image } from 'lucide-react';

const EditPanel: React.FC = () => {
  const { state, updateSection, selectSection } = useBuilder();
  
  const selectedSection = state.sections.find(s => s.id === state.selectedSection);

  if (!selectedSection || !state.isEditPanelOpen) return null;

  const handlePropertyUpdate = (property: string, value: any) => {
    updateSection(selectedSection.id, { [property]: value });
  };

  const handleNestedPropertyUpdate = (parentProperty: string, index: number, property: string, value: any) => {
    const currentArray = selectedSection.properties[parentProperty] || [];
    const updatedArray = [...currentArray];
    updatedArray[index] = { ...updatedArray[index], [property]: value };
    updateSection(selectedSection.id, { [parentProperty]: updatedArray });
  };

  const renderColorPicker = (label: string, property: string, value: string) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <Palette size={16} className="inline mr-2" />
        {label}
      </label>
      <div className="space-y-2">
        <HexColorPicker
          color={value}
          onChange={(color) => handlePropertyUpdate(property, color)}
          className="w-full"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => handlePropertyUpdate(property, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderTextInput = (label: string, property: string, value: string, isTextarea = false) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <Type size={16} className="inline mr-2" />
        {label}
      </label>
      {isTextarea ? (
        <textarea
          value={value}
          onChange={(e) => handlePropertyUpdate(property, e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => handlePropertyUpdate(property, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      )}
    </div>
  );

  const renderImageInput = (label: string, property: string, value: string) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <Image size={16} className="inline mr-2" />
        {label}
      </label>
      <input
        type="url"
        value={value}
        onChange={(e) => handlePropertyUpdate(property, e.target.value)}
        placeholder="https://example.com/image.jpg"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {value && (
        <div className="mt-2">
          <img src={value} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
        </div>
      )}
    </div>
  );

  const renderSectionEditor = () => {
    const { properties } = selectedSection;

    switch (selectedSection.type) {
      case 'header':
        return (
          <div>
            {renderTextInput('Title', 'title', properties.title)}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Navigation Items</label>
              {properties.navigationItems.map((item: string, index: number) => (
                <input
                  key={index}
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newItems = [...properties.navigationItems];
                    newItems[index] = e.target.value;
                    handlePropertyUpdate('navigationItems', newItems);
                  }}
                  className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ))}
            </div>
            {renderColorPicker('Background Color', 'backgroundColor', properties.backgroundColor)}
            {renderColorPicker('Text Color', 'textColor', properties.textColor)}
          </div>
        );

      case 'hero':
        return (
          <div>
            {renderTextInput('Title', 'title', properties.title)}
            {renderTextInput('Subtitle', 'subtitle', properties.subtitle, true)}
            {renderTextInput('Button Text', 'buttonText', properties.buttonText)}
            {renderImageInput('Background Image', 'backgroundImage', properties.backgroundImage)}
            {renderColorPicker('Background Color', 'backgroundColor', properties.backgroundColor)}
            {renderColorPicker('Text Color', 'textColor', properties.textColor)}
          </div>
        );

      case 'about':
        return (
          <div>
            {renderTextInput('Title', 'title', properties.title)}
            {renderTextInput('Content', 'content', properties.content, true)}
            {renderColorPicker('Background Color', 'backgroundColor', properties.backgroundColor)}
            {renderColorPicker('Text Color', 'textColor', properties.textColor)}
          </div>
        );

      case 'features':
        return (
          <div>
            {renderTextInput('Title', 'title', properties.title)}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
              {properties.features.map((feature: any, index: number) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg mb-4">
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => handleNestedPropertyUpdate('features', index, 'title', e.target.value)}
                    placeholder="Feature title"
                    className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <textarea
                    value={feature.description}
                    onChange={(e) => handleNestedPropertyUpdate('features', index, 'description', e.target.value)}
                    placeholder="Feature description"
                    rows={2}
                    className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <select
                    value={feature.icon}
                    onChange={(e) => handleNestedPropertyUpdate('features', index, 'icon', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="star">Star</option>
                    <option value="zap">Zap</option>
                    <option value="shield">Shield</option>
                    <option value="heart">Heart</option>
                  </select>
                </div>
              ))}
            </div>
            {renderColorPicker('Background Color', 'backgroundColor', properties.backgroundColor)}
            {renderColorPicker('Text Color', 'textColor', properties.textColor)}
          </div>
        );

      case 'footer':
        return (
          <div>
            {renderTextInput('Company Name', 'companyName', properties.companyName)}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Links</label>
              {properties.links.map((link: string, index: number) => (
                <input
                  key={index}
                  type="text"
                  value={link}
                  onChange={(e) => {
                    const newLinks = [...properties.links];
                    newLinks[index] = e.target.value;
                    handlePropertyUpdate('links', newLinks);
                  }}
                  className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ))}
            </div>
            {renderColorPicker('Background Color', 'backgroundColor', properties.backgroundColor)}
            {renderColorPicker('Text Color', 'textColor', properties.textColor)}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      exit={{ x: 400 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      className="w-80 bg-white border-l border-gray-200 shadow-lg overflow-y-auto"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Edit {selectedSection.type.charAt(0).toUpperCase() + selectedSection.type.slice(1)}
          </h2>
          <button
            onClick={() => selectSection(null)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        {renderSectionEditor()}
      </div>
    </motion.div>
  );
};

export default EditPanel;