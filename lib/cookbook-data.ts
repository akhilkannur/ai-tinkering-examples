import {
  Users, Zap, Globe, Search, BarChart,
  PenTool, Share2, Mail, Database, Target
} from 'lucide-react';

export type Category =
  | 'Lead Gen'
  | 'Enrichment'
  | 'Content Ops'
  | 'SEO'
  | 'Competitor Intel'
  | 'CRO'
  | 'CRM Ops'
  | 'Social Automation'
  | 'Outreach';

export const categoryIcons: Record<Category, any> = {
  'Lead Gen': Users,
  'Enrichment': Database,
  'Content Ops': PenTool,
  'SEO': Search,
  'Competitor Intel': BarChart,
  'CRO': Zap,
  'CRM Ops': Target,
  'Social Automation': Share2,
  'Outreach': Mail
};

export interface Recipe {
  id: string;
  category: Category;
  title: string;
  tagline: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  time: string;
  description: string;
  blueprint: string;
  isPremium?: boolean;
  sampleData?: {
    filename: string;
    content: string;
  };
}

