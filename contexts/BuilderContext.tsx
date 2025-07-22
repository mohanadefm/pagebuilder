"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Section, SiteData } from '../types/builder';

interface BuilderState {
  sections: Section[];
  selectedSection: string | null;
  isPreviewMode: boolean;
  isEditPanelOpen: boolean;
}

type BuilderAction =
  | { type: 'ADD_SECTION'; payload: Section }
  | { type: 'UPDATE_SECTION'; payload: { id: string; properties: any } }
  | { type: 'DELETE_SECTION'; payload: string }
  | { type: 'REORDER_SECTIONS'; payload: Section[] }
  | { type: 'SELECT_SECTION'; payload: string | null }
  | { type: 'TOGGLE_PREVIEW_MODE' }
  | { type: 'TOGGLE_EDIT_PANEL' }
  | { type: 'LOAD_SITE_DATA'; payload: Section[] };

const initialState: BuilderState = {
  sections: [],
  selectedSection: null,
  isPreviewMode: false,
  isEditPanelOpen: false,
};

const builderReducer = (state: BuilderState, action: BuilderAction): BuilderState => {
  switch (action.type) {
    case 'ADD_SECTION':
      return {
        ...state,
        sections: [...state.sections, action.payload],
        selectedSection: action.payload.id,
        isEditPanelOpen: true,
      };
    case 'UPDATE_SECTION':
      return {
        ...state,
        sections: state.sections.map(section =>
          section.id === action.payload.id
            ? { ...section, properties: { ...section.properties, ...action.payload.properties } }
            : section
        ),
      };
    case 'DELETE_SECTION':
      return {
        ...state,
        sections: state.sections.filter(section => section.id !== action.payload),
        selectedSection: state.selectedSection === action.payload ? null : state.selectedSection,
      };
    case 'REORDER_SECTIONS':
      return {
        ...state,
        sections: action.payload,
      };
    case 'SELECT_SECTION':
      return {
        ...state,
        selectedSection: action.payload,
        isEditPanelOpen: action.payload !== null,
      };
    case 'TOGGLE_PREVIEW_MODE':
      return {
        ...state,
        isPreviewMode: !state.isPreviewMode,
        selectedSection: null,
        isEditPanelOpen: false,
      };
    case 'TOGGLE_EDIT_PANEL':
      return {
        ...state,
        isEditPanelOpen: !state.isEditPanelOpen,
      };
    case 'LOAD_SITE_DATA':
      return {
        ...state,
        sections: action.payload,
        selectedSection: null,
        isEditPanelOpen: false,
      };
    default:
      return state;
  }
};

interface BuilderContextType {
  state: BuilderState;
  addSection: (section: Section) => void;
  updateSection: (id: string, properties: any) => void;
  deleteSection: (id: string) => void;
  reorderSections: (sections: Section[]) => void;
  selectSection: (id: string | null) => void;
  togglePreviewMode: () => void;
  toggleEditPanel: () => void;
  exportSiteData: () => string;
  importSiteData: (jsonData: string) => boolean;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(builderReducer, initialState);

  const addSection = (section: Section) => {
    dispatch({ type: 'ADD_SECTION', payload: section });
  };

  const updateSection = (id: string, properties: any) => {
    dispatch({ type: 'UPDATE_SECTION', payload: { id, properties } });
  };

  const deleteSection = (id: string) => {
    dispatch({ type: 'DELETE_SECTION', payload: id });
  };

  const reorderSections = (sections: Section[]) => {
    dispatch({ type: 'REORDER_SECTIONS', payload: sections });
  };

  const selectSection = (id: string | null) => {
    dispatch({ type: 'SELECT_SECTION', payload: id });
  };

  const togglePreviewMode = () => {
    dispatch({ type: 'TOGGLE_PREVIEW_MODE' });
  };

  const toggleEditPanel = () => {
    dispatch({ type: 'TOGGLE_EDIT_PANEL' });
  };

  const exportSiteData = (): string => {
    const siteData: SiteData = {
      sections: state.sections,
      metadata: {
        title: 'My Website',
        description: 'Created with PageBuilder Hub',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
    return JSON.stringify(siteData, null, 2);
  };

  const importSiteData = (jsonData: string): boolean => {
    try {
      const siteData: SiteData = JSON.parse(jsonData);
      if (siteData.sections && Array.isArray(siteData.sections)) {
        dispatch({ type: 'LOAD_SITE_DATA', payload: siteData.sections });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to import site data:', error);
      return false;
    }
  };

  return (
    <BuilderContext.Provider
      value={{
        state,
        addSection,
        updateSection,
        deleteSection,
        reorderSections,
        selectSection,
        togglePreviewMode,
        toggleEditPanel,
        exportSiteData,
        importSiteData,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
};