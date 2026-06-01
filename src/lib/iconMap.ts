import {
    Code2,
    Server,
    FileType2,
    Network,
    BookOpen,
    Brain,
    Globe,
    Database,
    Layout,
    Terminal,
    GitBranch,
    Cpu,
    type LucideIcon,
  } from 'lucide-react';
  
  export const iconMap: Record<string, LucideIcon> = {
    Code2,
    Server,
    FileType2,
    Network,
    BookOpen,
    Brain,
    Globe,
    Database,
    Layout,
    Terminal,
    GitBranch,
    Cpu,
  };
  
  export function getIcon(name: string): LucideIcon {
    return iconMap[name] ?? Code2;
  }