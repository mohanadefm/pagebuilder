"use client";

import React, { createContext, useContext, useReducer, ReactNode, useMemo, useCallback } from 'react';
import { Section, SiteData } from '../types/builder';

interface BuilderState {
  sections: Section[];
  selectedSection: string | null;
  isPreviewMode: boolean;
  isEditPanelOpen: boolean;
  previewDevice: 'desktop' | 'tablet' | 'mobile' | null;
}

type BuilderAction =
  | { type: 'ADD_SECTION'; payload: Section }
  | { type: 'UPDATE_SECTION'; payload: { id: string; properties: any } }
  | { type: 'DELETE_SECTION'; payload: string }
  | { type: 'REORDER_SECTIONS'; payload: Section[] }
  | { type: 'SELECT_SECTION'; payload: string | null }
  | { type: 'TOGGLE_PREVIEW_MODE' }
  | { type: 'SET_PREVIEW_DEVICE'; payload: 'desktop' | 'tablet' | 'mobile' | null }
  | { type: 'TOGGLE_EDIT_PANEL' }
  | { type: 'LOAD_SITE_DATA'; payload: Section[] };

const initialState: BuilderState = {
  sections: [],
  selectedSection: null,
  isPreviewMode: false,
  isEditPanelOpen: false,
  previewDevice: null,
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
        previewDevice: !state.isPreviewMode ? state.previewDevice : null,
      };
    case 'SET_PREVIEW_DEVICE':
      return {
        ...state,
        previewDevice: action.payload,
        isPreviewMode: action.payload !== null,
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
  setPreviewDevice: (device: 'desktop' | 'tablet' | 'mobile' | null) => void;
  toggleEditPanel: () => void;
  exportSiteData: () => string;
  exportAsHTML: () => string;
  importSiteData: (jsonData: string) => boolean;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(builderReducer, initialState);

  // Memoized callbacks to prevent unnecessary re-renders
  const addSection = useCallback((section: Section) => {
    dispatch({ type: 'ADD_SECTION', payload: section });
  }, []);

  const updateSection = useCallback((id: string, properties: any) => {
    dispatch({ type: 'UPDATE_SECTION', payload: { id, properties } });
  }, []);

  const deleteSection = useCallback((id: string) => {
    dispatch({ type: 'DELETE_SECTION', payload: id });
  }, []);

  const reorderSections = useCallback((sections: Section[]) => {
    dispatch({ type: 'REORDER_SECTIONS', payload: sections });
  }, []);

  const selectSection = useCallback((id: string | null) => {
    dispatch({ type: 'SELECT_SECTION', payload: id });
  }, []);

  const togglePreviewMode = useCallback(() => {
    dispatch({ type: 'TOGGLE_PREVIEW_MODE' });
  }, []);

  const toggleEditPanel = useCallback(() => {
    dispatch({ type: 'TOGGLE_EDIT_PANEL' });
  }, []);

  const setPreviewDevice = useCallback((device: 'desktop' | 'tablet' | 'mobile' | null) => {
    dispatch({ type: 'SET_PREVIEW_DEVICE', payload: device });
  }, []);

  // Memoized export functions
  const exportSiteData = useCallback((): string => {
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
  }, [state.sections]);

  const exportAsHTML = useCallback((): string => {
    const generateSectionHTML = (section: Section): string => {
      const { type, properties } = section;
      
      switch (type) {
        case 'header':
          return `
            <header style="background-color: ${properties.backgroundColor || '#ffffff'}; color: ${properties.textColor || '#000000'}; height: ${properties.height || '80px'}; display: flex; align-items: center;">
              <div style="max-width: 1200px; margin: 0 auto; width: 100%; padding: 0 1rem; display: flex; align-items: center; justify-content: space-between;">
                <h1 style="font-size: 1.5rem; font-weight: bold;">${properties.title || 'Website Title'}</h1>
                <nav style="display: flex; gap: 1.5rem;">
                  ${(properties.navigationItems || []).map((item: string) => `<a href="#" style="color: inherit; text-decoration: none; transition: opacity 0.2s;">${item}</a>`).join('')}
                </nav>
              </div>
            </header>
          `;
        
        case 'hero':
          return `
            <section style="background-color: ${properties.backgroundColor || '#f8f9fa'}; color: ${properties.textColor || '#000000'}; height: ${properties.height || '600px'}; display: flex; align-items: center; justify-content: center; text-align: center; background-image: ${properties.backgroundImage ? `url('${properties.backgroundImage}')` : 'none'}; background-size: cover; background-position: center; position: relative;">
              ${properties.backgroundImage ? `<div style="position: absolute; inset: 0; background: rgba(0, 0, 0, 0.4);"></div>` : ''}
              <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem; position: relative; z-index: 10;">
                <h1 style="font-size: 3rem; font-weight: bold; margin-bottom: 1rem;">${properties.title || 'Welcome'}</h1>
                <p style="font-size: 1.25rem; margin-bottom: 2rem; max-width: 32rem; margin-left: auto; margin-right: auto;">${properties.subtitle || 'Your subtitle here'}</p>
                <button style="background-color: white; color: #1f2937; border: none; padding: 0.75rem 2rem; font-size: 1.125rem; border-radius: 8px; cursor: pointer; font-weight: 600;">${properties.buttonText || 'Get Started'}</button>
              </div>
            </section>
          `;
        
        case 'about':
          return `
            <section style="background-color: ${properties.backgroundColor || '#ffffff'}; color: ${properties.textColor || '#000000'}; height: ${properties.height || '400px'}; display: flex; align-items: center;">
              <div style="max-width: 1200px; margin: 0 auto; width: 100%; padding: 0 1rem;">
                <div style="max-width: 64rem; margin: 0 auto; text-align: center;">
                  <h2 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 2rem;">${properties.title || 'About Us'}</h2>
                  <p style="font-size: 1.125rem; line-height: 1.75;">${properties.content || 'Your about content here'}</p>
                </div>
              </div>
            </section>
          `;
        
        case 'features':
          const iconMap: { [key: string]: string } = {
            star: '⭐',
            zap: '⚡',
            shield: '🛡️',
            heart: '❤️'
          };
          
          return `
            <section style="background-color: ${properties.backgroundColor || '#f8f9fa'}; color: ${properties.textColor || '#000000'}; height: ${properties.height || '500px'}; display: flex; align-items: center;">
              <div style="max-width: 1200px; margin: 0 auto; width: 100%; padding: 0 1rem;">
                <div style="text-align: center; margin-bottom: 2rem;">
                  <h2 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem;">${properties.title || 'Our Features'}</h2>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;" class="features-grid">
                  ${(properties.features || []).map((feature: any) => `
                    <div class="feature-card" style="text-align: center; padding: 1rem; background: rgba(255, 255, 255, 0.1); border-radius: 8px; backdrop-filter: blur(10px);">
                      <div style="display: flex; justify-content: center; margin-bottom: 0.75rem;">
                        <div style="font-size: 2.5rem; color: #60a5fa;">${iconMap[feature.icon] || '🚀'}</div>
                      </div>
                      <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">${feature.title || 'Feature'}</h3>
                      <p style="font-size: 0.875rem; opacity: 0.8;">${feature.description || 'Feature description'}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            </section>
          `;
        
        case 'contact':
          return `
            <section style="background-color: ${properties.backgroundColor || '#ffffff'}; color: ${properties.textColor || '#000000'}; height: ${properties.height || '600px'}; display: flex; align-items: center;">
              <div style="max-width: 1200px; margin: 0 auto; width: 100%; padding: 0 1rem;">
                <div style="text-align: center; margin-bottom: 3rem;">
                  <h2 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem;">${properties.title || 'Contact Us'}</h2>
                  <p style="font-size: 1.125rem; opacity: 0.8;">${properties.subtitle || 'Get in touch with us'}</p>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start;" class="contact-grid">
                  <div style="space-y: 1.5rem;">
                    <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1.5rem;">Contact Information</h3>
                    
                    <div style="display: flex; align-items: start; gap: 1rem;">
                      <div style="width: 40px; height: 40px; background: #dbeafe; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <div style="font-size: 1.25rem; color: #2563eb;">📧</div>
                      </div>
                      <div>
                        <h4 style="font-weight: 500; margin-bottom: 0.25rem;">Email</h4>
                        <p style="opacity: 0.8;">${properties.email || 'contact@example.com'}</p>
                      </div>
                    </div>
                    
                    <div style="display: flex; align-items: start; gap: 1rem;">
                      <div style="width: 40px; height: 40px; background: #dcfce7; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <div style="font-size: 1.25rem; color: #16a34a;">📞</div>
                      </div>
                      <div>
                        <h4 style="font-weight: 500; margin-bottom: 0.25rem;">Phone</h4>
                        <p style="opacity: 0.8;">${properties.phone || '+1 234 567 890'}</p>
                      </div>
                    </div>
                    
                    <div style="display: flex; align-items: start; gap: 1rem;">
                      <div style="width: 40px; height: 40px; background: #f3e8ff; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <div style="font-size: 1.25rem; color: #9333ea;">📍</div>
                      </div>
                      <div>
                        <h4 style="font-weight: 500; margin-bottom: 0.25rem;">Address</h4>
                        <p style="opacity: 0.8;">${properties.address || '123 Main St, City, Country'}</p>
                      </div>
                    </div>
                  </div>
                  
                  ${properties.showContactForm ? `
                    <div style="background: #f9fafb; padding: 1.5rem; border-radius: 8px; border: 1px solid #e5e7eb;">
                      <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1.5rem;">Send us a message</h3>
                      <form style="display: flex; flex-direction: column; gap: 1rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                          <input type="text" placeholder="Full Name" style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; background: white; font-size: 0.875rem;">
                          <input type="email" placeholder="Email Address" style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; background: white; font-size: 0.875rem;">
                        </div>
                        <input type="text" placeholder="Subject" style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; background: white; font-size: 0.875rem;">
                        <textarea placeholder="Your message..." style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; background: white; height: 100px; resize: vertical; font-size: 0.875rem; font-family: inherit;"></textarea>
                        <button type="submit" style="background-color: #2563eb; color: white; border: none; padding: 0.75rem 1.5rem; font-size: 0.875rem; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-weight: 500;">
                          📤 Send Message
                        </button>
                      </form>
                    </div>
                  ` : ''}
                </div>
              </div>
            </section>
          `;
        
        case 'footer':
          return `
            <footer style="background-color: ${properties.backgroundColor || '#333333'}; color: ${properties.textColor || '#ffffff'}; height: ${properties.height || '200px'}; display: flex; align-items: center;">
              <div style="max-width: 1200px; margin: 0 auto; width: 100%; padding: 0 1rem; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem;">
                <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
                  <h3 style="font-size: 1.125rem; font-weight: 600;">${properties.companyName || 'Company Name'}</h3>
                  <p style="font-size: 0.875rem; opacity: 0.8;">© 2024 All rights reserved.</p>
                </div>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
                  ${(properties.links || []).map((link: string) => `<a href="#" style="color: inherit; text-decoration: none; transition: opacity 0.2s;">${link}</a>`).join('')}
                </div>
              </div>
            </footer>
          `;
        
        default:
          return '';
      }
    };

    const sectionsHTML = state.sections
      .sort((a, b) => a.order - b.order)
      .map(section => generateSectionHTML(section))
      .join('\n');

    const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        
        button {
            transition: all 0.3s ease;
        }
        
        button:hover {
            opacity: 0.9;
            transform: translateY(-1px);
        }
        
        a {
            transition: all 0.3s ease;
        }
        
        a:hover {
            text-decoration: underline;
            opacity: 0.8;
        }
        
        input, textarea {
            transition: border-color 0.3s ease;
        }
        
        input:focus, textarea:focus {
            outline: none;
            border-color: #007bff !important;
            box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }
        
        .feature-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.15) !important;
        }
        
        @media (max-width: 768px) {
            header {
                padding: 0 1rem !important;
            }
            
            header nav ul {
                gap: 1rem !important;
                flex-direction: column !important;
            }
            
            section {
                padding: 2rem 1rem !important;
            }
            
            .contact-grid {
                grid-template-columns: 1fr !important;
                gap: 2rem !important;
            }
            
            .features-grid {
                grid-template-columns: 1fr !important;
            }
        }
    </style>
</head>
<body>
    ${sectionsHTML}
</body>
</html>`;

    return htmlTemplate;
  }, [state.sections]);

  const importSiteData = useCallback((jsonData: string): boolean => {
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
  }, []);

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    state,
    addSection,
    updateSection,
    deleteSection,
    reorderSections,
    selectSection,
    togglePreviewMode,
    setPreviewDevice,
    toggleEditPanel,
    exportSiteData,
    exportAsHTML,
    importSiteData,
  }), [
    state,
    addSection,
    updateSection,
    deleteSection,
    reorderSections,
    selectSection,
    togglePreviewMode,
    setPreviewDevice,
    toggleEditPanel,
    exportSiteData,
    exportAsHTML,
    importSiteData,
  ]);

  return (
    <BuilderContext.Provider value={contextValue}>
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