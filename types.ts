export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
  icon: any; // We'll handle icons in the component mapping
  description?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export enum Section {
  HOME = 'home',
  ABOUT = 'about',
  SKILLS = 'skills',
  WORK = 'work',
  CONTACT = 'contact'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}