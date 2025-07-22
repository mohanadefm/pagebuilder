"use client";

import React from 'react';
import { BuilderProvider } from '../contexts/BuilderContext';
import Toolbar from '../components/Toolbar';
import SectionLibrary from '../components/SectionLibrary';
import PreviewArea from '../components/PreviewArea';
import EditPanel from '../components/EditPanel';
import { useBuilder } from '../contexts/BuilderContext';

const BuilderContent: React.FC = () => {
  const { state } = useBuilder();

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Toolbar />
      <div className="flex-1 flex overflow-hidden">
        {!state.isPreviewMode && (
          <div className="w-80 bg-white border-r border-gray-200 shadow-sm">
            <SectionLibrary />
          </div>
        )}
        <PreviewArea />
        {state.isEditPanelOpen && !state.isPreviewMode && <EditPanel />}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <BuilderProvider>
      <BuilderContent />
    </BuilderProvider>
  );
}