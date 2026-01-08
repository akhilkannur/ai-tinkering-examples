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

export const recipes: Recipe[] = [
  // --- PREMIUM LEAD GEN ---
  {
    id: 'autonomous-sales-sniper',
    category: 'Lead Gen',
    title: "The Sales Sniper",
    tagline: "Autonomous B2B Prospecting Agent.",
    difficulty: 'Advanced',
    time: 'Runs Continuously',
    isPremium: true,
    description: "A sophisticated agent that builds a pipeline using **public Google Search**. It identifies companies, filters out agencies via website text analysis, and drafts outreach. *Requires: Google Search Tool.*
    ",
    blueprint: `# Agent Configuration: The Sales Sniper

## Role
You are an advanced **Autonomous Sales Engineering Agent**. You execute targeted searches using Google Search operators to find prospects.

## Objective
Build a high-quality pipeline of B2B SaaS companies in a specific target market.

## Workflow
1. **Discovery:** Execute Google Searches (e.g., 
`