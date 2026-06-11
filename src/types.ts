export interface Project {
  id: string;
  title: string;
  description: string;
  detailedText: string;
  tags: string[];
  color: 'yellow' | 'pink' | 'green' | 'blue' | 'purple' | 'orange';
  link: string;
  demoUrl?: string;
  stats: { label: string; value: string }[];
}

export interface Sticker {
  id: string;
  text: string;
  icon: string;
  color: string;
  defaultX: number; // Percent relative
  defaultY: number; // Percent relative
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  emoji: string;
  timestamp: string;
  color: string;
  rotation: number; // degrees
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'design' | 'tools';
  level: number; // 1-10
  color: string;
  description: string;
}
