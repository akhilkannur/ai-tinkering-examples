import {
  Users, Zap, Globe, Search, BarChart,
  PenTool, Share2, Mail, Database, Target,
  Briefcase, TrendingUp, ShieldCheck, PieChart,
  HeartHandshake, MessageSquare, ShoppingCart, 
  Settings, Repeat, Cpu, FileText
} from 'lucide-react';

export type Category =
  | 'Lead Gen'
  | 'Sales Ops'
  | 'Marketing Ops'
  | 'Content Ops'
  | 'SEO'
  | 'Competitive Intel'
  | 'CRO'
  | 'Paid Media'
  | 'Customer Success'
  | 'Retention'
  | 'E-commerce'
  | 'Strategic Ops'
  | 'Product Ops'
  | 'SEO Ops'
  | 'Dev Tools'
  | 'Brand'
  | 'Social Media'
  | 'Agent Documentation';

export const categoryIcons: Record<Category, any> = {
  'Lead Gen': Users,
  'Sales Ops': Briefcase,
  'Marketing Ops': Settings,
  'Content Ops': PenTool,
  'SEO': Search,
  'Competitive Intel': BarChart,
  'CRO': Zap,
  'Paid Media': Target,
  'Customer Success': HeartHandshake,
  'Retention': Repeat,
  'E-commerce': ShoppingCart,
  'Strategic Ops': ShieldCheck,
  'Product Ops': Database,
  'SEO Ops': Globe,
  'Dev Tools': Cpu,
  'Agent Documentation': FileText
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
  archetype?: 'Processor' | 'Researcher' | 'Hybrid';
  publish_date?: string;
  image?: string;
  source_url?: string;
  sampleData?: {
    filename: string;
    content: string;
  };
  sampleOutput?: string;
  inputs?: string[];
  outputs?: string[];
  verifiedRun?: {
    date: string;
    agent: string;
    log: { text: string; type: 'input' | 'system' | 'success' | 'report' }[];
    outputFile?: {
      name: string;
      url: string;
      preview: string;
    };
  };
}