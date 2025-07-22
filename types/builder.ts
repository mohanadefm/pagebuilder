export interface Section {
  id: string;
  type: 'header' | 'hero' | 'about' | 'features' | 'footer';
  properties: Record<string, any>;
  order: number;
}

export interface HeaderProperties {
  title: string;
  navigationItems: string[];
  backgroundColor: string;
  textColor: string;
}

export interface HeroProperties {
  title: string;
  subtitle: string;
  buttonText: string;
  backgroundImage: string;
  backgroundColor: string;
  textColor: string;
}

export interface AboutProperties {
  title: string;
  content: string;
  backgroundColor: string;
  textColor: string;
}

export interface FeaturesProperties {
  title: string;
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  backgroundColor: string;
  textColor: string;
}

export interface FooterProperties {
  companyName: string;
  links: string[];
  backgroundColor: string;
  textColor: string;
}

export interface SiteData {
  sections: Section[];
  metadata: {
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
}