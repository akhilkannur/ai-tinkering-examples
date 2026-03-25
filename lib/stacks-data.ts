// AI Stack data types and seed data
// TrustMRR provides founder/revenue data; AI tools are community-curated

export interface AiToolEntry {
  name: string;
  slug: string;
  category: 'coding' | 'chat' | 'design' | 'research' | 'writing' | 'video' | 'image' | 'automation' | 'data';
  icon: string; // emoji fallback
}

export interface FounderStack {
  // From TrustMRR
  name: string;
  xHandle: string;
  xFollowerCount: number | null;
  startup: string;
  startupSlug: string;
  startupUrl: string;
  startupIcon: string | null;
  country: string | null;
  mrr: number; // in dollars
  totalRevenue: number;
  growth30d: number | null;
  category: string | null;
  // Curated AI tools layer
  aiTools: string[]; // slugs from AI_TOOLS
  monthlyAiSpend: number | null;
  hotTake: string;
  role: string;
}

// Master list of AI tools people can pick from
export const AI_TOOLS: AiToolEntry[] = [
  // Coding
  { name: 'Claude Code', slug: 'claude-code', category: 'coding', icon: '🟠' },
  { name: 'Cursor', slug: 'cursor', category: 'coding', icon: '⚡' },
  { name: 'GitHub Copilot', slug: 'github-copilot', category: 'coding', icon: '🐙' },
  { name: 'Windsurf', slug: 'windsurf', category: 'coding', icon: '🏄' },
  { name: 'Bolt', slug: 'bolt', category: 'coding', icon: '⚡' },
  { name: 'v0', slug: 'v0', category: 'coding', icon: '▲' },
  { name: 'Replit Agent', slug: 'replit-agent', category: 'coding', icon: '💻' },
  { name: 'Gemini CLI', slug: 'gemini-cli', category: 'coding', icon: '♊' },
  { name: 'Amp', slug: 'amp', category: 'coding', icon: '⚡' },
  
  // Chat / Reasoning
  { name: 'ChatGPT', slug: 'chatgpt', category: 'chat', icon: '💬' },
  { name: 'Claude', slug: 'claude', category: 'chat', icon: '🟠' },
  { name: 'Gemini', slug: 'gemini', category: 'chat', icon: '♊' },
  { name: 'Perplexity', slug: 'perplexity', category: 'chat', icon: '🔍' },
  { name: 'Grok', slug: 'grok', category: 'chat', icon: '🤖' },
  
  // Design
  { name: 'Midjourney', slug: 'midjourney', category: 'design', icon: '🎨' },
  { name: 'Figma AI', slug: 'figma-ai', category: 'design', icon: '🎨' },
  { name: 'Canva AI', slug: 'canva-ai', category: 'design', icon: '🖌️' },
  
  // Image
  { name: 'DALL-E', slug: 'dall-e', category: 'image', icon: '🖼️' },
  { name: 'Stable Diffusion', slug: 'stable-diffusion', category: 'image', icon: '🌀' },
  { name: 'Flux', slug: 'flux', category: 'image', icon: '🔥' },
  { name: 'Ideogram', slug: 'ideogram', category: 'image', icon: '✏️' },
  
  // Video
  { name: 'Runway', slug: 'runway', category: 'video', icon: '🎬' },
  { name: 'HeyGen', slug: 'heygen', category: 'video', icon: '🧑‍💼' },
  { name: 'Synthesia', slug: 'synthesia', category: 'video', icon: '🎥' },
  { name: 'Sora', slug: 'sora', category: 'video', icon: '🌊' },
  
  // Writing
  { name: 'Jasper', slug: 'jasper', category: 'writing', icon: '✍️' },
  { name: 'Copy.ai', slug: 'copy-ai', category: 'writing', icon: '📝' },
  { name: 'Notion AI', slug: 'notion-ai', category: 'writing', icon: '📓' },
  
  // Research
  { name: 'Elicit', slug: 'elicit', category: 'research', icon: '🔬' },
  { name: 'Consensus', slug: 'consensus', category: 'research', icon: '📊' },
  
  // Automation
  { name: 'Zapier AI', slug: 'zapier-ai', category: 'automation', icon: '⚡' },
  { name: 'Make AI', slug: 'make-ai', category: 'automation', icon: '🔧' },
  { name: 'n8n', slug: 'n8n', category: 'automation', icon: '🔗' },

  // Data
  { name: 'Julius AI', slug: 'julius-ai', category: 'data', icon: '📈' },
];

// Seed data: real founders from TrustMRR + curated AI tools
export const SEED_STACKS: FounderStack[] = [
  {
    name: 'Lewis Carhart',
    xHandle: 'lewiscarhart',
    xFollowerCount: null,
    startup: 'Comp AI',
    startupSlug: 'comp-ai',
    startupUrl: 'https://trustmrr.com/startup/comp-ai',
    startupIcon: 'https://d21oz30g4w22sz.cloudfront.net/logos/bubba-ai-inc-a7ead591-62f5-4479-b6e2-c90910068261.jpg',
    country: 'US',
    mrr: 97,
    totalRevenue: 18607,
    growth30d: 14.9,
    category: 'AI',
    aiTools: ['cursor', 'claude', 'chatgpt', 'v0'],
    monthlyAiSpend: 120,
    hotTake: 'Cursor + Claude is the only stack you need to ship fast',
    role: 'Solo Founder',
  },
  {
    name: 'John Rush',
    xHandle: 'johnrushx',
    xFollowerCount: 114237,
    startup: 'SEOBOT',
    startupSlug: 'seobot',
    startupUrl: 'https://trustmrr.com/startup/seobot',
    startupIcon: 'https://d21oz30g4w22sz.cloudfront.net/logos/seobot-864dbd07-3b67-48ee-99c4-4c40aa159438.jpg',
    country: 'TR',
    mrr: 839,
    totalRevenue: 14796,
    growth30d: -1.3,
    category: 'AI',
    aiTools: ['claude-code', 'chatgpt', 'perplexity', 'cursor'],
    monthlyAiSpend: 200,
    hotTake: 'Claude Code is like having a junior dev who never sleeps',
    role: 'Serial Builder',
  },
  {
    name: 'Priyam Raj',
    xHandle: 'priymrj',
    xFollowerCount: 9955,
    startup: 'Vid.AI',
    startupSlug: 'vidai-llc',
    startupUrl: 'https://trustmrr.com/startup/vidai-llc',
    startupIcon: null,
    country: 'US',
    mrr: 1071,
    totalRevenue: 11711,
    growth30d: 1.9,
    category: 'AI',
    aiTools: ['chatgpt', 'claude', 'runway', 'stable-diffusion', 'cursor'],
    monthlyAiSpend: 350,
    hotTake: 'If you\'re building AI video tools, you need to eat your own dogfood',
    role: 'Founder',
  },
  {
    name: 'Kitze',
    xHandle: 'thekitze',
    xFollowerCount: 88487,
    startup: 'Kitze',
    startupSlug: 'kitze',
    startupUrl: 'https://trustmrr.com/startup/kitze',
    startupIcon: null,
    country: null,
    mrr: 0,
    totalRevenue: 0,
    growth30d: null,
    category: 'Developer Tools',
    aiTools: ['cursor', 'claude', 'chatgpt', 'v0', 'midjourney'],
    monthlyAiSpend: 180,
    hotTake: 'I mass vibe-coded my way to freedom',
    role: 'Indie Hacker',
  },
  {
    name: 'Roman',
    xHandle: 'romanbuildsaas',
    xFollowerCount: null,
    startup: 'GojiberryAI',
    startupSlug: 'gojiberryai',
    startupUrl: 'https://trustmrr.com/startup/gojiberryai',
    startupIcon: 'https://d21oz30g4w22sz.cloudfront.net/logos/superfruits-f8bacc0c-62cc-4655-8746-293f0926bb80.png',
    country: 'PT',
    mrr: 1624,
    totalRevenue: 2934,
    growth30d: 110.4,
    category: 'Marketing',
    aiTools: ['claude-code', 'chatgpt', 'perplexity', 'n8n'],
    monthlyAiSpend: 150,
    hotTake: 'Claude Code + n8n is the ultimate automation combo',
    role: 'Founder',
  },
];

export function getToolBySlug(slug: string): AiToolEntry | undefined {
  return AI_TOOLS.find(t => t.slug === slug);
}

export function getToolsByCategory(category: AiToolEntry['category']): AiToolEntry[] {
  return AI_TOOLS.filter(t => t.category === category);
}

export function getPopularTools(stacks: FounderStack[]): { tool: AiToolEntry; count: number }[] {
  const counts: Record<string, number> = {};
  stacks.forEach(s => {
    s.aiTools.forEach(slug => {
      counts[slug] = (counts[slug] || 0) + 1;
    });
  });
  return Object.entries(counts)
    .map(([slug, count]) => ({ tool: getToolBySlug(slug)!, count }))
    .filter(e => e.tool)
    .sort((a, b) => b.count - a.count);
}

export const TOOL_CATEGORIES: { label: string; value: AiToolEntry['category'] }[] = [
  { label: '🖥️ Coding', value: 'coding' },
  { label: '💬 Chat', value: 'chat' },
  { label: '🎨 Design', value: 'design' },
  { label: '🖼️ Image', value: 'image' },
  { label: '🎬 Video', value: 'video' },
  { label: '✍️ Writing', value: 'writing' },
  { label: '🔬 Research', value: 'research' },
  { label: '⚡ Automation', value: 'automation' },
  { label: '📊 Data', value: 'data' },
];
