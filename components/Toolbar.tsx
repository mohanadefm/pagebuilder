"use client";

import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBuilder } from '../contexts/BuilderContext';
import { Download, Upload, Eye, EyeOff, Menu, FileText, MoreVertical, Smartphone, Tablet, Monitor } from 'lucide-react';
import { HoverCard } from './animations';
import LoadingOverlay from './LoadingOverlay';

const Toolbar: React.FC = React.memo(() => {
  const { state, togglePreviewMode, setPreviewDevice, exportSiteData, exportAsHTML, importSiteData } = useBuilder();
  const [isExporting, setIsExporting] = useState(false);
  const [isExportingHTML, setIsExportingHTML] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPreviewMenuOpen, setIsPreviewMenuOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile' | null>(null);

  const handleExport = useCallback(async () => {
    setIsExporting(true);
    try {
      const data = exportSiteData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'website-data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  }, [exportSiteData]);

  const handleExportHTML = useCallback(async () => {
    setIsExportingHTML(true);
    try {
      const htmlData = exportAsHTML();
      const blob = new Blob([htmlData], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `website-${new Date().getTime()}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('HTML Export failed:', error);
    } finally {
      setIsExportingHTML(false);
    }
  }, [exportAsHTML]);

  const handleImport = useCallback(async () => {
    setIsImporting(true);
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      
      // Add timeout to handle cases where user cancels or doesn't select a file
      const timeoutId = setTimeout(() => {
        setIsImporting(false);
      }, 1000);

      input.onchange = (e) => {
        clearTimeout(timeoutId);
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const content = e.target?.result as string;
            if (content) {
              const success = importSiteData(content);
              if (!success) {
                alert('Invalid file format. Please select a valid JSON file.');
              }
            }
            setIsImporting(false);
          };
          reader.readAsText(file);
        } else {
          setIsImporting(false);
        }
      };

      input.click();
    } catch (error) {
      console.error('Import failed:', error);
      setIsImporting(false);
    }
  }, [importSiteData]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  const togglePreviewMenu = useCallback(() => {
    setIsPreviewMenuOpen(!isPreviewMenuOpen);
  }, [isPreviewMenuOpen]);

  const handlePreviewMode = useCallback((mode: 'desktop' | 'tablet' | 'mobile') => {
    setPreviewMode(mode);
    setIsPreviewMenuOpen(false);
    setPreviewDevice(mode);
  }, [setPreviewDevice]);

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <>
      <motion.div
        className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center space-x-2">
          <motion.h1 
            className="text-xl font-bold text-gray-800"
            variants={buttonVariants}
          >
            PageBuilder Hub
          </motion.h1>
        </div>

        <div className="flex items-center space-x-2">
          <AnimatePresence>
            {!state.isPreviewMode && (
              <>
                {/* Desktop Export Buttons */}
                <div className="hidden md:flex items-center space-x-2">
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <HoverCard>
                      <button
                        onClick={handleExport}
                        disabled={isExporting}
                        className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                       
                       <Upload size={16} />
                        <span>Export JSON</span>
                      </button>
                    </HoverCard>
                  </motion.div>

                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <HoverCard>
                      <button
                        onClick={handleExportHTML}
                        disabled={isExportingHTML}
                        className="flex items-center space-x-2 px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FileText size={16} />
                        <span>Export HTML</span>
                      </button>
                    </HoverCard>
                  </motion.div>

                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <HoverCard>
                      <button
                        onClick={handleImport}
                        disabled={isImporting}
                        className="flex items-center space-x-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        
                        <Download size={16} />
                        <span>Import JSON</span>
                      </button>
                    </HoverCard>
                  </motion.div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <HoverCard>
                      <button
                        onClick={toggleMobileMenu}
                        className="flex items-center space-x-2 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 shadow-sm hover:shadow-md"
                      >
                        <MoreVertical size={16} />
                        <span>Export</span>
                      </button>
                    </HoverCard>
                  </motion.div>
                </div>
              </>
            )}
          </AnimatePresence>

          {/* Desktop Preview Menu */}
          <div className="hidden md:block relative">
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <HoverCard>
                                  <button
                    onClick={state.isPreviewMode ? () => setPreviewDevice(null) : togglePreviewMenu}
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    {state.isPreviewMode ? <EyeOff size={16} /> : <Eye size={16} />}
                    <span className="hidden sm:inline">
                      {state.isPreviewMode ? 'Exit Preview' : 'Preview'}
                    </span>
                  </button>
              </HoverCard>
            </motion.div>

            {/* Desktop Preview Dropdown */}
            <AnimatePresence>
              {isPreviewMenuOpen && !state.isPreviewMode && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                >
                  <div className="py-2">
                    <button
                      onClick={() => handlePreviewMode('desktop')}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                    >
                      <Monitor size={16} className="text-gray-600" />
                      <span className="text-sm font-medium">Desktop</span>
                    </button>
                    <button
                      onClick={() => handlePreviewMode('tablet')}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                    >
                      <Tablet size={16} className="text-gray-600" />
                      <span className="text-sm font-medium">Tablet</span>
                    </button>
                    <button
                      onClick={() => handlePreviewMode('mobile')}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                    >
                      <Smartphone size={16} className="text-gray-600" />
                      <span className="text-sm font-medium">Mobile</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Preview Button */}
          <div className="md:hidden">
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <HoverCard>
                <button
                  onClick={state.isPreviewMode ? () => setPreviewDevice(null) : togglePreviewMenu}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  {state.isPreviewMode ? <EyeOff size={16} /> : <Eye size={16} />}
                  <span className="hidden sm:inline">
                    {state.isPreviewMode ? 'Exit' : 'Preview'}
                  </span>
                </button>
              </HoverCard>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Export Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && !state.isPreviewMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-b border-gray-200 px-4 py-3"
          >
            <div className="flex flex-col space-y-2">
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={16} />
                <span>{isExporting ? 'Exporting...' : 'Export JSON'}</span>
              </button>
              
              <button
                onClick={handleExportHTML}
                disabled={isExportingHTML}
                className="flex items-center space-x-2 px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FileText size={16} />
                <span>{isExportingHTML ? 'Exporting...' : 'Export HTML'}</span>
              </button>
              
              <button
                onClick={handleImport}
                disabled={isImporting}
                className="flex items-center space-x-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Upload size={16} />
                <span>{isImporting ? 'Importing...' : 'Import'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Preview Menu */}
      <AnimatePresence>
        {isPreviewMenuOpen && !state.isPreviewMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-b border-gray-200 px-4 py-3"
          >
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => handlePreviewMode('desktop')}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Monitor size={16} />
                <span>Desktop Preview</span>
              </button>
              
              <button
                onClick={() => handlePreviewMode('tablet')}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Tablet size={16} />
                <span>Tablet Preview</span>
              </button>
              
              <button
                onClick={() => handlePreviewMode('mobile')}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Smartphone size={16} />
                <span>Mobile Preview</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Overlays */}
      <LoadingOverlay 
        isVisible={isExporting} 
        message="Exporting website data..." 
        size="sm" 
      />
      <LoadingOverlay 
        isVisible={isExportingHTML} 
        message="Exporting HTML..." 
        size="sm" 
      />
      <LoadingOverlay 
        isVisible={isImporting} 
        message="Importing website data..." 
        size="sm" 
      />
    </>
  );
});

Toolbar.displayName = 'Toolbar';

export default Toolbar;