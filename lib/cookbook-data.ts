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
    title: 'Sales Ops on Steroids',
    description: 'Stop wasting your best reps on manual lead routing and boring CRM audits. These blueprints turn AI agents into your primary Sales Ops team so you can focus on closing deals.'
  },
  'marketing-ops': {
    title: 'Marketing Ops for Builders',
    description: 'Scale your marketing infrastructure without the massive headcount. Automated attribution, campaign audits, and data hygiene workflows that actually work while you sleep.'
  },
  'seo': {
    title: 'Agentic SEO (The Good Stuff)',
    description: 'Move beyond basic keyword research. We’re talking automated internal linking, technical audits, and content clustering that would take a human weeks to finish.'
  },
  'lead-gen': {
    title: 'High-Intent Lead Gen',
    description: 'Stop manual prospecting. It’s a waste of time. Use AI to build boolean searches, personalized DMs, and high-intent lead magnets that actually convert.'
  },
  'content-ops': {
    title: 'Content Ops for People Who Hate Fluff',
    description: 'Turn one piece of content into fifty. Automate the boring parts of editing, distribution, and formatting so you can get back to the creative work.'
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