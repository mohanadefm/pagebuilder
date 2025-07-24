"use client";

import React, { useState, useCallback } from 'react';
import { BuilderProvider } from '../contexts/BuilderContext';
import Toolbar from './Toolbar';
import SectionLibrary from './SectionLibrary';
import PreviewArea from './PreviewArea';
import EditPanel from './EditPanel';
import { useBuilder } from '../contexts/BuilderContext';
import { Menu, X } from 'lucide-react';
import HydrationProvider from './HydrationProvider';
import { PageTransition } from './animations';
import SafeComponent from './SafeComponent';
import LoadingManager from './LoadingManager';

const BuilderContent: React.FC = React.memo(() => {
  const { state } = useBuilder();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen]);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <PageTransition>
      <div className="h-screen flex flex-col bg-gray-100">
        <SafeComponent>
          <Toolbar />
        </SafeComponent>
        
        {/* Mobile Sidebar Toggle */}
        {!state.isPreviewMode && (
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-2 flex-shrink-0">
            <button
              onClick={toggleSidebar}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isSidebarOpen ? <X size={16} /> : <Menu size={16} />}
              <span>Section Library</span>
            </button>
          </div>
        )}

        <div className="flex-1 flex overflow-hidden min-h-0">
          {/* Section Library Sidebar */}
          {!state.isPreviewMode && (
            <>
              {/* Mobile Sidebar */}
              <div className={`
                lg:hidden fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              `}>
                <div className="p-4 border-b border-gray-200 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">Section Library</h2>
                    <button
                      onClick={closeSidebar}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X size={20} className="text-gray-500" />
                    </button>
                  </div>
                </div>
                <div className="overflow-y-auto h-full">
                  <SafeComponent>
                    <SectionLibrary />
                  </SafeComponent>
                </div>
              </div>

              {/* Desktop Sidebar */}
              <div className="hidden lg:block w-80 bg-white border-r border-gray-200 shadow-sm flex-shrink-0">
                <SafeComponent>
                  <SectionLibrary />
                </SafeComponent>
              </div>

              {/* Mobile Overlay */}
              {isSidebarOpen && (
                <div 
                  className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={closeSidebar}
                />
              )}
            </>
          )}

          {/* Preview Area */}
          <div className="flex-1 relative min-w-0">
            <SafeComponent>
              <PreviewArea />
            </SafeComponent>
          </div>

          {/* Edit Panel */}
          {state.isEditPanelOpen && !state.isPreviewMode && (
            <>
              {/* Mobile Edit Panel */}
              <div className="lg:hidden fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white border-l border-gray-200 shadow-lg">
                <SafeComponent>
                  <EditPanel />
                </SafeComponent>
              </div>

              {/* Desktop Edit Panel */}
              <div className="hidden lg:block flex-shrink-0">
                <SafeComponent>
                  <EditPanel />
                </SafeComponent>
              </div>
            </>
          )}
        </div>
      </div>
    </PageTransition>
  );
});

BuilderContent.displayName = 'BuilderContent';

const ClientBuilder: React.FC = () => {
  return (
    <LoadingManager minLoadingTime={600}>
      <HydrationProvider>
        <BuilderProvider>
          <BuilderContent />
        </BuilderProvider>
      </HydrationProvider>
    </LoadingManager>
  );
};

export default ClientBuilder; 