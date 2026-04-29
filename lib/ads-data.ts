export interface AdSpot {
  id: string;
  type: 'billboard' | 'inline' | 'featured';
  title: string;
  description: string;
  link: string;
  image?: string;
  logo?: string;
  ctaText?: string;
  active: boolean;
  isPlaceholder?: boolean;
  position?: number; 
}

export const adSpots: AdSpot[] = [
  {
    id: 'hero-billboard',
    type: 'billboard',
    title: 'ProductPhoto.pro — Premium AI Product Renders',
    description: 'Stop paying for expensive studio shoots. Access a curated library of 100+ professional prompts for studio-quality lighting, textures, and environments. Designed for DTC founders and creative directors using Midjourney.',
    link: 'https://productphoto.pro',
    logo: 'https://www.google.com/s2/favicons?domain=productphoto.pro&sz=128',
    ctaText: 'Browse Prompts',
    active: true
  },
  {
    id: 'inline-1',
    type: 'inline',
    title: 'Build Agentic Sales Machines with SalesTools.club',
    description: 'The LEGO blocks for your AI GTM strategy. Get direct access to Sales APIs, MCP servers, and pre-configured skills to automate lead scoring, enrichment, and outreach.',
    link: 'https://salestools.club',
    logo: 'https://www.google.com/s2/favicons?domain=salestools.club&sz=128',
    ctaText: 'Get the APIs',
    active: true,
    position: 0 
  },
  {
    id: 'inline-placeholder',
    type: 'inline',
    title: 'Your Tool Featured Here',
    description: 'Reach 10,000+ AI operators, RevOps leads, and developers building the future of work. High-visibility native placement.',
    link: 'https://checkout.dodopayments.com/buy/pdt_0NdjTsAfiPncaaDKhzJ79?quantity=1',
    ctaText: 'View Sponsorships',
    active: true,
    isPlaceholder: true,
    position: 2 
  }
];

export const featuredPlaceholders: AdSpot[] = [
  {
    id: 'feat-1',
    type: 'featured',
    title: 'SalesTools.club',
    description: 'Curated infrastructure for AI sales agents: APIs, MCP servers, and Skills for automated GTM.',
    link: 'https://salestools.club',
    logo: 'https://www.google.com/s2/favicons?domain=salestools.club&sz=128',
    active: true
  },
  {
    id: 'feat-2',
    type: 'featured',
    title: 'Featured Placement',
    description: 'Pin your product to the top of the directory and dominate the feed for 30 days.',
    link: 'https://checkout.dodopayments.com/buy/pdt_0NdjTKBElEJQkFQ9aBiwh?quantity=1',
    active: true,
    isPlaceholder: true
  },
  {
    id: 'feat-3',
    type: 'featured',
    title: 'Featured Placement',
    description: 'Capture maximum attention from high-intent AI builders and creative directors.',
    link: 'https://checkout.dodopayments.com/buy/pdt_0NdjTKBElEJQkFQ9aBiwh?quantity=1',
    active: true,
    isPlaceholder: true
  },
  {
    id: 'feat-4',
    type: 'featured',
    title: 'Featured Placement',
    description: 'Join the most curated list of real-world AI tools. High-authority dofollow link included.',
    link: 'https://checkout.dodopayments.com/buy/pdt_0NdjTKBElEJQkFQ9aBiwh?quantity=1',
    active: true,
    isPlaceholder: true
  }
];
