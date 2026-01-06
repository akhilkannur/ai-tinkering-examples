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
  sampleData?: {
    filename: string;
    content: string;
  };
}

export const recipes: Recipe[] = [
  // --- LEAD GENERATION ---
  {
    id: 'autonomous-sales-sniper',
    category: 'Lead Gen',
    title: "The Sales Sniper",
    tagline: "Autonomous B2B Prospecting Agent.",
    difficulty: 'Advanced',
    time: 'Runs Continuously',
    description: "A highly sophisticated agent that builds its own pipeline. It searches for companies, filters out agencies, identifies decision-makers, and drafts personalized outreach, maintaining a persistent CSV database of its work.",
    blueprint: `# Agent Configuration: The Sales Sniper

## Role
You are an advanced **Autonomous Sales Engineering Agent**. You do not just