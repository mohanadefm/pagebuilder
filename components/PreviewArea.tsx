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
import FooterSection from './sections/FooterSection';
import { GripVertical, Trash2 } from 'lucide-react';

interface SortableSectionProps {
  section: Section;
  isSelected: boolean;
  isPreviewMode: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

const SortableSection: React.FC<SortableSectionProps> = ({
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

  const renderSection = () => {
    const commonProps = {
      isSelected,
      onClick: onSelect,
    };

    switch (section.type) {
      case 'header':
        return <HeaderSection properties={section.properties} {...commonProps} />;
      case 'hero':
        return <HeroSection properties={section.properties} {...commonProps} />;
      case 'about':
        return <AboutSection properties={section.properties} {...commonProps} />;
      case 'features':
        return <FeaturesSection properties={section.properties} {...commonProps} />;
      case 'footer':
        return <FooterSection properties={section.properties} {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      {renderSection()}
      {!isPreviewMode && isSelected && (
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            {...attributes}
            {...listeners}
            className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors cursor-grab active:cursor-grabbing"
          >
            <GripVertical size={16} className="text-gray-600" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

const PreviewArea: React.FC = () => {
  const { state, selectSection, deleteSection, reorderSections } = useBuilder();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = state.sections.findIndex((item) => item.id === active.id);
      const newIndex = state.sections.findIndex((item) => item.id === over.id);
      const reorderedSections = arrayMove(state.sections, oldIndex, newIndex);
      reorderSections(reorderedSections);
    }
  };

  if (state.sections.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-4xl text-gray-400">+</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Start Building</h3>
          <p className="text-gray-500">Add sections from the library to begin creating your website</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-white">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={state.sections.map(s => s.id)}
          strategy={verticalListSortingStrategy}
        >
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
                  onSelect={() => selectSection(section.id)}
                  onDelete={() => deleteSection(section.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default PreviewArea;