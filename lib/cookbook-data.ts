import {
  Users, Zap, Globe, Search, BarChart,
  PenTool, Share2, Mail, Database, Target,
  Briefcase, TrendingUp, ShieldCheck, PieChart,
  HeartHandshake, MessageSquare
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
  | 'Outreach'
  | 'Sales Ops'
  | 'Marketing Ops'
  | 'RevOps'
  | 'PLG Sales'
  | 'Field Marketing'
  | 'Social Selling'
  | 'Advanced RevOps'
  | 'Customer Advocacy'
  | 'E-commerce Growth'
  | 'AI Setup'
  | 'Customer Success';

export const categoryIcons: Record<Category, any> = {
  'Lead Gen': Users,
  'Enrichment': Database,
  'Content Ops': PenTool,
  'SEO': Search,
  'Competitor Intel': BarChart,
  'CRO': Zap,
  'CRM Ops': Target,
  'Social Automation': Share2,
  'Outreach': Mail,
  'Sales Ops': Briefcase,
  'Marketing Ops': TrendingUp,
  'RevOps': ShieldCheck,
  'PLG Sales': Zap,
  'Field Marketing': Globe,
  'Social Selling': MessageSquare,
  'Advanced RevOps': PieChart,
  'Customer Advocacy': HeartHandshake,
  'E-commerce Growth': TrendingUp,
  'AI Setup': Zap,
  'Customer Success': HeartHandshake
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
  'revops': {
    title: 'Revenue Operations (RevOps) Agents',
    description: 'The unified layer for Sales and Marketing. Automate contract renewals, pricing audits, and expansion propensity scoring.'
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
  sampleData?: {
    filename: string;
    content: string;
  };
  sampleOutput?: string;
}

