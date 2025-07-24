"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useBuilder } from '../contexts/BuilderContext';
import { HexColorPicker } from 'react-colorful';
import { X, Palette, Type, Image, Ruler } from 'lucide-react';

const EditPanel: React.FC = React.memo(() => {
  const { state, updateSection, selectSection } = useBuilder();
  
  const selectedSection = React.useMemo(() => 
    state.sections.find(s => s.id === state.selectedSection), 
    [state.sections, state.selectedSection]
  );

  const handlePropertyUpdate = React.useCallback((property: string, value: any) => {
    if (selectedSection) {
      updateSection(selectedSection.id, { [property]: value });
    }
  }, [updateSection, selectedSection]);

  const handleNestedPropertyUpdate = React.useCallback((parentProperty: string, index: number, property: string, value: any) => {
    if (selectedSection) {
      const currentArray = selectedSection.properties[parentProperty] || [];
      const updatedArray = [...currentArray];
      updatedArray[index] = { ...updatedArray[index], [property]: value };
      updateSection(selectedSection.id, { [parentProperty]: updatedArray });
    }
  }, [updateSection, selectedSection]);

  const renderColorPicker = React.useCallback((label: string, property: string, value: string) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <Palette size={16} className="inline mr-2" />
        {label}
      </label>
      <div className="space-y-2">
        <HexColorPicker
          color={value}
          onChange={(color) => handlePropertyUpdate(property, color)}
          className="w-full max-w-[200px]"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => handlePropertyUpdate(property, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  ), [handlePropertyUpdate]);

  const renderTextInput = React.useCallback((label: string, property: string, value: string, isTextarea = false) => (
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
  ), [handlePropertyUpdate]);

  const renderHeightInput = React.useCallback((label: string, property: string, value: string) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <Ruler size={16} className="inline mr-2" />
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => handlePropertyUpdate(property, e.target.value)}
        placeholder="e.g., 400px, 50vh, 100%"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
      />
      <select
        value={value.includes('px') ? 'px' : value.includes('vh') ? 'vh' : value.includes('%') ? '%' : 'px'}
        onChange={(e) => {
          const numericValue = value.replace(/[^\d]/g, '') || '400';
          handlePropertyUpdate(property, `${numericValue}${e.target.value}`);
        }}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="px">px</option>
        <option value="vh">vh</option>
        <option value="%">%</option>
      </select>
      <p className="text-xs text-gray-500 mt-1">
        Examples: 400px, 50vh, 100%
      </p>
    </div>
  ), [handlePropertyUpdate]);

  const renderImageInput = React.useCallback((label: string, property: string, value: string) => (
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
  ), [handlePropertyUpdate]);

  const handleClose = React.useCallback(() => {
    selectSection(null);
  }, [selectSection]);

  // Early return after all hooks are defined
  if (!selectedSection || !state.isEditPanelOpen) {
    return null;
  }

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
            {renderHeightInput('Section Height', 'height', properties.height || '80px')}
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
            {renderHeightInput('Section Height', 'height', properties.height || '600px')}
            {renderColorPicker('Background Color', 'backgroundColor', properties.backgroundColor)}
            {renderColorPicker('Text Color', 'textColor', properties.textColor)}
          </div>
        );

      case 'about':
        return (
          <div>
            {renderTextInput('Title', 'title', properties.title)}
            {renderTextInput('Content', 'content', properties.content, true)}
            {renderHeightInput('Section Height', 'height', properties.height || '400px')}
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
            {renderHeightInput('Section Height', 'height', properties.height || '500px')}
            {renderColorPicker('Background Color', 'backgroundColor', properties.backgroundColor)}
            {renderColorPicker('Text Color', 'textColor', properties.textColor)}
          </div>
        );

      case 'contact':
        return (
          <div>
            {renderTextInput('Title', 'title', properties.title)}
            {renderTextInput('Subtitle', 'subtitle', properties.subtitle)}
            {renderTextInput('Email', 'email', properties.email)}
            {renderTextInput('Phone', 'phone', properties.phone)}
            {renderTextInput('Address', 'address', properties.address, true)}
            <div className="mb-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={properties.showContactForm}
                  onChange={(e) => handlePropertyUpdate('showContactForm', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Show Contact Form</span>
              </label>
            </div>
            {renderHeightInput('Section Height', 'height', properties.height || '600px')}
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
            {renderHeightInput('Section Height', 'height', properties.height || '200px')}
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
      className="w-full lg:w-80 bg-white border-l border-gray-200 shadow-lg h-full flex flex-col"
    >
      <div className="p-4 lg:p-6 flex-shrink-0">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-800">
            Edit {selectedSection.type.charAt(0).toUpperCase() + selectedSection.type.slice(1)}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 lg:px-6 pb-4 lg:pb-6">
        <div className="space-y-4">
          {renderSectionEditor()}
        </div>
      </div>
    </motion.div>
  );
});

EditPanel.displayName = 'EditPanel';

export default EditPanel;