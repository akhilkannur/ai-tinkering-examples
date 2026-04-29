export interface AdSpot {
  id: string;
  type: 'billboard' | 'inline' | 'featured';
  title: string;
  description: string;
  link: string;
  image?: string;
  ctaText?: string;
  active: boolean;
  isPlaceholder?: boolean;
  position?: number; 
}

export const adSpots: AdSpot[] = [
  {
    id: 'hero-billboard',
    type: 'billboard',
    title: 'Featured: ProductPhoto.pro',
    description: 'Turn any product photo into a high-end marketing asset with AI. Trusted by 2,000+ e-commerce brands.',
    link: 'https://productphoto.pro',
    ctaText: 'Start Generating',
    active: true
  },
  {
    id: 'inline-1',
    type: 'inline',
    title: 'Scale your Sales with AI Agents',
    description: 'Join 5,000+ operators using SalesTools.club to automate their outbound workflows.',
    link: 'https://salestools.club',
    ctaText: 'Explore SalesTools',
    active: true,
    position: 0 
  },
  {
    id: 'inline-placeholder',
    type: 'inline',
    title: 'Your Tool Here',
    description: 'Put your tool in front of 10,000+ high-intent AI operators and decision-makers.',
    link: '/tools/badge',
    ctaText: 'View Sponsorships',
    active: true,
    isPlaceholder: true,
    position: 2 
  }
];

// 4 Pinned Featured Spots logic
export const featuredPlaceholders: AdSpot[] = [
  {
    id: 'feat-1',
    type: 'featured',
    title: 'SalesTools.club',
    description: 'The ultimate database for modern sales operators. Find and automate leads with ease.',
    link: 'https://salestools.club',
    active: true
  },
  {
    id: 'feat-2',
    type: 'featured',
    title: 'Your Tool Featured Here',
    description: 'Claim this spot to dominate the top of the directory for 2 weeks.',
    link: '/tools/badge',
    active: true,
    isPlaceholder: true
  },
  {
    id: 'feat-3',
    type: 'featured',
    title: 'Your Tool Featured Here',
    description: 'Maximum visibility for new launches. Pin your tool to the top.',
    link: '/tools/badge',
    active: true,
    isPlaceholder: true
  },
  {
    id: 'feat-4',
    type: 'featured',
    title: 'Your Tool Featured Here',
    description: 'The best way to get discovered by AI-native builders and marketers.',
    link: '/tools/badge',
    active: true,
    isPlaceholder: true
  }
];
