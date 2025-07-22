"use client";

import React, { useRef } from 'react';
import { useBuilder } from '../contexts/BuilderContext';
import { Eye, EyeOff, Download, Upload, Monitor, Smartphone } from 'lucide-react';

const Toolbar: React.FC = () => {
  const { state, togglePreviewMode, exportSiteData, importSiteData } = useBuilder();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const jsonData = exportSiteData();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `website-${new Date().getTime()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const success = importSiteData(content);
        if (!success) {
          alert('Failed to import file. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerImport = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <h1 className="text-2xl font-bold text-gray-800">PageBuilder Hub</h1>
          <div className="ml-6 flex items-center space-x-2">
            <Monitor size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600">Desktop View</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={togglePreviewMode}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              state.isPreviewMode
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {state.isPreviewMode ? <EyeOff size={16} /> : <Eye size={16} />}
            <span>{state.isPreviewMode ? 'Edit Mode' : 'Preview Mode'}</span>
          </button>

          <div className="w-px h-6 bg-gray-300" />

          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Download size={16} />
            <span>Export</span>
          </button>

          <button
            onClick={triggerImport}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <Upload size={16} />
            <span>Import</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;