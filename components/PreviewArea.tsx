"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useBuilder } from '../contexts/BuilderContext';
import { Section } from '../types/builder';
import HeaderSection from './sections/HeaderSection';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import FeaturesSection from './sections/FeaturesSection';
import ContactSection from './sections/ContactSection';
import FooterSection from './sections/FooterSection';
import { GripVertical, Trash2, X } from 'lucide-react';

interface SortableSectionProps {
  section: Section;
  isSelected: boolean;
  isPreviewMode: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

const SortableSection: React.FC<SortableSectionProps> = React.memo(({
  section,
  isSelected,
  isPreviewMode,
  onSelect,
  onDelete,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const renderSection = React.useCallback(() => {
    const commonProps = {
      isSelected,
      onClick: onSelect,
    };

    switch (section.type) {
      case 'header':
        return <HeaderSection properties={section.properties as any} {...commonProps} />;
      case 'hero':
        return <HeroSection properties={section.properties as any} {...commonProps} />;
      case 'about':
        return <AboutSection properties={section.properties as any} {...commonProps} />;
      case 'features':
        return <FeaturesSection properties={section.properties as any} {...commonProps} />;
      case 'contact':
        return <ContactSection properties={section.properties as any} {...commonProps} />;
      case 'footer':
        return <FooterSection properties={section.properties as any} {...commonProps} />;
      default:
        return null;
    }
  }, [section, isSelected, onSelect]);

  const handleDelete = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  }, [onDelete]);

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      {renderSection()}
      {!isPreviewMode && isSelected && (
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            {...attributes}
            {...listeners}
            className="p-1.5 lg:p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors cursor-grab active:cursor-grabbing"
          >
            <GripVertical size={14} className="text-gray-600 lg:w-4 lg:h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 lg:p-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-colors"
          >
            <Trash2 size={14} className="lg:w-4 lg:h-4" />
          </button>
        </div>
      )}
    </div>
  );
});

SortableSection.displayName = 'SortableSection';

const PreviewArea: React.FC = React.memo(() => {
  const { state, selectSection, deleteSection, reorderSections, setPreviewDevice } = useBuilder();
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = React.useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = state.sections.findIndex((item) => item.id === active.id);
      const newIndex = state.sections.findIndex((item) => item.id === over.id);
      const reorderedSections = arrayMove(state.sections, oldIndex, newIndex);
      reorderSections(reorderedSections);
    }
  }, [state.sections, reorderSections]);

  const handleSelectSection = React.useCallback((id: string) => {
    selectSection(id);
  }, [selectSection]);

  const handleDeleteSection = React.useCallback((id: string) => {
    deleteSection(id);
  }, [deleteSection]);

  // Memoized sections array to prevent unnecessary re-renders
  const sectionsArray = React.useMemo(() => state.sections.map(s => s.id), [state.sections]);

  if (state.sections.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 lg:w-24 lg:h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl lg:text-4xl text-gray-400">+</span>
          </div>
          <h3 className="text-lg lg:text-xl font-semibold text-gray-600 mb-2">Start Building</h3>
          <p className="text-sm lg:text-base text-gray-500">Add sections from the library to begin creating your website</p>
        </div>
      </div>
    );
  }

  // Get preview container classes based on device type
  const getPreviewContainerClasses = () => {
    if (!state.isPreviewMode || !state.previewDevice) {
      return "h-full overflow-y-auto bg-white";
    }

    const baseClasses = "h-full overflow-y-auto bg-gray-100 flex items-center justify-center p-4";
    
    switch (state.previewDevice) {
      case 'mobile':
        return `${baseClasses}`;
      case 'tablet':
        return `${baseClasses}`;
      case 'desktop':
        return `${baseClasses}`;
      default:
        return "h-full overflow-y-auto bg-white";
    }
  };

  // Get preview frame classes based on device type
  const getPreviewFrameClasses = () => {
    if (!state.isPreviewMode || !state.previewDevice) {
      return "w-full h-full";
    }

    const baseClasses = "bg-white shadow-lg rounded-lg transition-all duration-300";
    
    switch (state.previewDevice) {
      case 'mobile':
        return `${baseClasses} w-80 h-[600px] max-h-[80vh] overflow-y-auto`;
      case 'tablet':
        return `${baseClasses} w-96 h-[700px] max-h-[85vh] overflow-y-auto`;
      case 'desktop':
        return `${baseClasses} w-full max-w-4xl h-[800px] max-h-[90vh] overflow-y-auto`;
      default:
        return "w-full h-full";
    }
  };

  return (
    <div className={getPreviewContainerClasses()}>
      {/* Exit Preview Button */}
      {state.isPreviewMode && (
        <button
          onClick={() => setPreviewDevice(null)}
          className="absolute top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
        >
          <X size={20} className="text-gray-600" />
        </button>
      )}
      
      <div className={getPreviewFrameClasses()}>
        {/* Add device-specific styles when in preview mode */}
        {state.isPreviewMode && (state.previewDevice === 'mobile' || state.previewDevice === 'tablet') && (
          <style dangerouslySetInnerHTML={{
            __html: `
              .mobile-preview .grid,
              .mobile-preview [class*="grid-cols"],
              .tablet-preview .grid,
              .tablet-preview [class*="grid-cols"] {
                display: flex !important;
                flex-direction: column !important;
                gap: 1rem !important;
                width: 100% !important;
              }
              .mobile-preview .grid > *,
              .mobile-preview [class*="grid-cols"] > *,
              .tablet-preview .grid > *,
              .tablet-preview [class*="grid-cols"] > * {
                width: 100% !important;
                max-width: 100% !important;
                margin: 0 !important;
              }
              .mobile-preview .space-y-4 > *:not(:first-child),
              .tablet-preview .space-y-4 > *:not(:first-child) {
                margin-top: 1rem !important;
              }
              .mobile-preview .space-y-6 > *:not(:first-child),
              .tablet-preview .space-y-6 > *:not(:first-child) {
                margin-top: 1.5rem !important;
              }
              /* تحسين النصوص للعرض المحمول */
              .mobile-preview {
                font-size: 14px !important;
              }
              .mobile-preview h2 {
                font-size: 1.5rem !important;
                line-height: 1.3 !important;
              }
              .mobile-preview h3 {
                font-size: 1.1rem !important;
                line-height: 1.4 !important;
              }
              .mobile-preview p {
                font-size: 0.9rem !important;
                line-height: 1.5 !important;
              }
              /* تحسين الحشو والهوامش */
              .mobile-preview .p-4,
              .mobile-preview .p-6 {
                padding: 1rem !important;
              }
              .mobile-preview .px-4,
              .mobile-preview .px-6,
              .mobile-preview .px-8 {
                padding-left: 1rem !important;
                padding-right: 1rem !important;
              }
              /* إصلاح مشكلة القطع في النصوص */
              .mobile-preview section {
                height: auto !important;
                min-height: auto !important;
                padding: 2rem 1rem !important;
                display: block !important;
              }
              .mobile-preview .container {
                height: auto !important;
              }
              .mobile-preview .flex.items-center {
                align-items: flex-start !important;
                min-height: auto !important;
                display: block !important;
              }
              /* تحسين المسافات في العرض المحمول */
              .mobile-preview .mb-6,
              .mobile-preview .mb-8 {
                margin-bottom: 1.5rem !important;
              }
              .mobile-preview .mb-3,
              .mobile-preview .mb-4 {
                margin-bottom: 0.75rem !important;
              }
              .mobile-preview .mb-2 {
                margin-bottom: 0.5rem !important;
              }
              /* تحسين البطاقات في العرض المحمول */
              .mobile-preview .rounded-lg {
                padding: 1.25rem !important;
                margin-bottom: 1rem !important;
              }
              .mobile-preview .bg-opacity-10 {
                background-color: rgba(255, 255, 255, 0.15) !important;
              }
              /* إصلاح مشكلة overflow */
              .mobile-preview {
                overflow: visible !important;
              }
              .mobile-preview section {
                overflow: visible !important;
              }
            `
          }} />
        )}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sectionsArray}
            strategy={verticalListSortingStrategy}
          >
            <div className={`min-h-full ${state.isPreviewMode && state.previewDevice === 'mobile' ? 'mobile-preview' : state.isPreviewMode && state.previewDevice === 'tablet' ? 'tablet-preview' : ''}`}>
              <AnimatePresence>
                {state.sections.map((section) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SortableSection
                      section={section}
                      isSelected={state.selectedSection === section.id}
                      isPreviewMode={state.isPreviewMode}
                      onSelect={() => handleSelectSection(section.id)}
                      onDelete={() => handleDeleteSection(section.id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
});

PreviewArea.displayName = 'PreviewArea';

export default PreviewArea;