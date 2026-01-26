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

export const categoryDescriptions: Record<string, { title: string, description: string }> = {
  'sales-ops': {
    title: 'Sales Operations AI Blueprints',
    description: 'Automate lead routing, quota tracking, and sales performance audits. These blueprints turn AI agents into your primary Sales Ops analysts.'
  },
  'marketing-ops': {
    title: 'Marketing Operations Automation',
    description: 'Scale your marketing infrastructure with automated attribution, campaign audits, and data hygiene workflows.'
  },
  'seo': {
    title: 'AI SEO Blueprints & Workflows',
    description: 'Move beyond keyword research. Automate internal linking, technical audits, and content clustering with agentic SEO blueprints.'
  },
  'lead-gen': {
    title: 'AI Lead Generation Workflows',
    description: 'Stop manual prospecting. Use AI to build boolean searches, personalized DMs, and high-intent lead magnets.'
  }
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
  archetype?: 'Processor' | 'Researcher' | 'Hybrid';
  publish_date?: string;
  image?: string;
  source_url?: string;
  sampleData?: {
    filename: string;
    content: string;
  };
  sampleOutput?: string;
}