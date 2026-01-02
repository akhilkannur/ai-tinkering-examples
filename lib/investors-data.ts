export interface Investor {
  id: string;
  name: string;
  website: string;
  description: string;
  focus: string[];
  revenueRange: string;
  checkSize?: string;
  location: string;
  isVerified: boolean;
}

export const investors: Investor[] = [
  {
    id: '1',
    name: 'Tiny',
    website: 'https://www.tiny.com/',
    description: 'We buy wonderful internet businesses and hold them forever. We move fast and keep things simple.',
    focus: ['SaaS', 'Agencies', 'Communities', 'E-commerce'],
    revenueRange: '$500k - $30M+',
    location: 'Victoria, BC',
    isVerified: true
  },
  {
    id: '2',
    name: 'SureSwift Capital',
    website: 'https://www.sureswiftcapital.com/',
    description: 'We acquire SaaS businesses from independent founders and take them to the next level. Buy and hold strategy.',
    focus: ['SaaS', 'B2B', 'Remote Teams'],
    revenueRange: '$500k - $5M',
    location: 'Victoria, BC',
    isVerified: true
  },
  {
    id: '3',
    name: 'SaaS Group',
    website: 'https://saas-group.com/',
    description: 'A serial acquirer of B2B SaaS companies. We help founders find a permanent home for their products.',
    focus: ['B2B SaaS', 'Marketing Tech', 'Developer Tools'],
    revenueRange: '$1M - $10M',
    location: 'Global',
    isVerified: true
  },
  {
    id: '4',
    name: 'XO Capital',
    website: 'https://xo.capital/',
    description: 'We buy, build, and grow micro-SaaS companies. Fast closing, no games.',
    focus: ['Micro-SaaS', 'Chrome Extensions', 'B2B Tools'],
    revenueRange: '$10k - $500k',
    location: 'USA',
    isVerified: true
  },
  {
    id: '5',
    name: 'Horizen Capital',
    website: 'https://horizencapital.com/',
    description: 'Strategic M&A advisory and investment for B2B SaaS companies under $5M ARR.',
    focus: ['B2B SaaS', 'Growth Capital', 'M&A'],
    revenueRange: '$500k - $5M',
    location: 'Europe / Global',
    isVerified: true
  },
  {
    id: '6',
    name: 'Calm Company Fund',
    website: 'https://calmfund.com/',
    description: 'We invest in bootstrapped and profitable software businesses. Long-term focus.',
    focus: ['SaaS', 'Bootstrapped', 'Profitable'],
    revenueRange: '$100k - $2M',
    location: 'Remote',
    isVerified: true
  },
  {
    id: '7',
    name: 'Pocket Fund',
    website: 'https://www.pocketfund.com/',
    description: 'Led by Dev Shah. We invest in and acquire micro-SaaS businesses with high leverage.',
    focus: ['Micro-SaaS', 'AI Tools', 'Marketplaces'],
    revenueRange: '$100k - $2M',
    location: 'USA',
    isVerified: true
  },
  {
    id: '8',
    name: 'Camber Partners',
    website: 'https://www.camber.io/',
    description: 'Operations-focused private equity firm providing growth capital to B2B SaaS companies.',
    focus: ['B2B SaaS', 'Product-Led Growth'],
    revenueRange: '$3M - $15M',
    location: 'San Francisco, CA',
    isVerified: true
  },
  {
    id: '9',
    name: 'LTV.ai',
    website: 'https://ltv.ai/',
    description: 'We buy profitable Shopify Apps and SaaS businesses. Founded by experienced operators.',
    focus: ['Shopify Apps', 'SaaS', 'E-commerce Tools'],
    revenueRange: '$100k - $2M',
    location: 'USA',
    isVerified: true
  },
  {
    id: '10',
    name: 'WebStreet',
    website: 'https://webstreet.co/',
    description: 'The first investment platform dedicated to digital assets. We acquire and manage online businesses.',
    focus: ['SaaS', 'Content Sites', 'E-commerce'],
    revenueRange: '$100k - $5M',
    location: 'Global',
    isVerified: true
  },
  {
    id: '11',
    name: 'Polychrome',
    website: 'https://www.polychrome.com/',
    description: 'We acquire majority equity positions in early-stage B2B SaaS businesses. Hands-on operational support.',
    focus: ['B2B SaaS', 'Early Stage', 'Operational Growth'],
    revenueRange: '$500k - $5M',
    location: 'USA',
    isVerified: true
  },
  {
    id: '12',
    name: 'Valsoft',
    website: 'https://www.valsoftcorp.com/',
    description: 'Montreal-based holding company acquiring vertical market software businesses. Long-term hold.',
    focus: ['Vertical Software', 'B2B', 'Mission-Critical'],
    revenueRange: '$2M - $20M',
    location: 'Montreal, QC',
    isVerified: true
  },
  {
    id: '13',
    name: 'Constellation Software',
    website: 'https://www.csisoftware.com/',
    description: 'Acquires, manages, and builds vertical market software businesses. One of the largest buyers globally.',
    focus: ['VMS', 'Public Sector', 'Enterprise'],
    revenueRange: '$5M - $100M+',
    location: 'Toronto, ON',
    isVerified: true
  },
  {
    id: '14',
    name: 'Pacific Lake Partners',
    website: 'https://www.pacificlake.com/',
    description: 'The most experienced investor in Search Funds. Partnering with entrepreneurs to buy great companies.',
    focus: ['Search Funds', 'B2B Services', 'Software'],
    revenueRange: '$5M - $50M',
    location: 'USA',
    isVerified: true
  },
  {
    id: '15',
    name: 'Relay Investments',
    website: 'https://www.relayinvestments.com/',
    description: 'Investing in entrepreneurs who acquire growing businesses. Largest search fund portfolio.',
    focus: ['Search Funds', 'SME', 'Growth'],
    revenueRange: '$2M - $30M',
    location: 'Boston, MA',
    isVerified: true
  },
  {
    id: '16',
    name: 'Search Fund Accelerator',
    website: 'https://www.searchfundaccelerator.com/',
    description: 'Mentorship and capital for entrepreneurs seeking to acquire a company.',
    focus: ['Search Funds', 'Acquisition', 'Mentorship'],
    revenueRange: '$1M - $10M',
    location: 'New Orleans, LA',
    isVerified: true
  },
  {
    id: '17',
    name: 'Search Fund Partners',
    website: 'https://searchfundpartners.com/',
    description: 'Investing in micro-cap companies with stable cash flows and growth potential.',
    focus: ['Micro-Cap', 'B2B SaaS', 'Healthcare IT'],
    revenueRange: '$5M - $25M',
    location: 'Menlo Park, CA',
    isVerified: true
  },
  {
    id: '18',
    name: 'CapitalPad',
    website: 'https://capitalpad.com/',
    description: 'Connecting self-funded searchers with accredited investors.',
    focus: ['Self-Funded Search', 'SMB', 'Micro-PE'],
    revenueRange: '$500k - $5M',
    location: 'USA',
    isVerified: true
  },
  {
    id: '19',
    name: 'WSC & Company',
    website: 'https://wscandcompany.com/',
    description: 'Private investment firm focused on acquiring lower middle market businesses.',
    focus: ['Lower Middle Market', 'Family Business', 'SaaS'],
    revenueRange: '$2M - $20M',
    location: 'Charlotte, NC',
    isVerified: true
  },
  {
    id: '20',
    name: 'Miramar Equity Partners',
    website: 'https://miramarequity.com/',
    description: 'Investing in mid-sized businesses with sustainable market positions.',
    focus: ['Mid-Market', 'Software', 'Services'],
    revenueRange: '$5M - $50M',
    location: 'Dallas, TX',
    isVerified: true
  },
  {
    id: '21',
    name: 'Redbrick',
    website: 'https://rdbrck.com/',
    description: 'Acquiring and building digital companies. Parent company of Leadpages and others.',
    focus: ['Digital Products', 'SaaS', 'Marketing Tech'],
    revenueRange: '$5M - $50M',
    location: 'Victoria, BC',
    isVerified: true
  },
  {
    id: '22',
    name: 'Ionic Partners',
    website: 'https://www.ionicpartners.com/',
    description: 'Buying and building enterprise software companies. Focus on "Second Stanza" software.',
    focus: ['Enterprise Software', 'Turnaround', 'B2B'],
    revenueRange: '$10M - $100M',
    location: 'Austin, TX',
    isVerified: true
  },
  {
    id: '23',
    name: 'Embrace Software',
    website: 'https://www.embracesoftwareinc.com/',
    description: 'Acquiring and optimizing vertical software companies.',
    focus: ['Vertical SaaS', 'Industrial', 'Manufacturing'],
    revenueRange: '$2M - $20M',
    location: 'Tampa, FL',
    isVerified: true
  },
  {
    id: '24',
    name: 'EXA Capital',
    website: 'https://www.exacapital.co/',
    description: 'The long-term home for vertical market software. Software for life.',
    focus: ['Vertical Market', 'B2B', 'Infrastructure'],
    revenueRange: '$1M - $15M',
    location: 'Remote',
    isVerified: true
  },
  {
    id: '25',
    name: 'Turn/River Capital',
    website: 'https://www.turnriver.com/',
    description: 'Software investment firm. We help companies grow through data-driven operations.',
    focus: ['Spin-outs', 'Growth Equity', 'SaaS'],
    revenueRange: '$10M - $100M',
    location: 'San Francisco, CA',
    isVerified: true
  },
  {
    id: '26',
    name: 'Alpine Investors',
    website: 'https://alpineinvestors.com/',
    description: 'People-driven private equity. Investing in software and services.',
    focus: ['Software', 'Services', 'People-First'],
    revenueRange: '$10M - $100M+',
    location: 'San Francisco, CA',
    isVerified: true
  },
  {
    id: '27',
    name: 'Fulcrum Equity Partners',
    website: 'https://www.fulcrumep.com/',
    description: 'Growth equity for healthcare and technology companies.',
    focus: ['Healthcare IT', 'SaaS', 'Fintech'],
    revenueRange: '$5M - $50M',
    location: 'Atlanta, GA',
    isVerified: true
  },
  {
    id: '28',
    name: 'MCI Capital',
    website: 'https://mci.pl/en',
    description: 'One of the largest technology investment funds in Central Europe.',
    focus: ['Digital Economy', 'SaaS', 'E-commerce'],
    revenueRange: '$10M - $100M',
    location: 'Warsaw, Poland',
    isVerified: true
  },
  {
    id: '29',
    name: 'Partinc Capital',
    website: 'https://partinccapital.com/',
    description: 'B2B SaaS investors focusing on European growth companies.',
    focus: ['B2B SaaS', 'Europe', 'Growth'],
    revenueRange: '$1M - $10M',
    location: 'Stockholm, Sweden',
    isVerified: true
  },
  {
    id: '30',
    name: 'Zubr Capital',
    website: 'https://zubrcapital.com/',
    description: 'Private equity firm investing in TMT companies in emerging markets.',
    focus: ['TMT', 'SaaS', 'Fintech'],
    revenueRange: '$5M - $50M',
    location: 'Cyprus',
    isVerified: true
  },
  {
    id: '31',
    name: 'Main Street Capital',
    website: 'https://www.mainstcapital.com/',
    description: 'Providing long-term debt and equity capital to lower middle market companies.',
    focus: ['LMM', 'Diverse Industries', 'Software'],
    revenueRange: '$10M - $150M',
    location: 'Houston, TX',
    isVerified: true
  },
  {
    id: '32',
    name: 'H.I.G. Growth Partners',
    website: 'https://higgrowth.com/',
    description: 'Growth capital investment affiliate of H.I.G. Capital. Investing in high-growth companies.',
    focus: ['Growth Equity', 'SaaS', 'Consumer Internet'],
    revenueRange: '$10M - $100M',
    location: 'Global',
    isVerified: true
  },
  {
    id: '33',
    name: 'Silversmith Capital Partners',
    website: 'https://www.silversmith.com/',
    description: 'Growth equity firm focused on healthcare and technology.',
    focus: ['Healthcare IT', 'SaaS', 'Information Services'],
    revenueRange: '$20M - $200M',
    location: 'Boston, MA',
    isVerified: true
  },
  {
    id: '34',
    name: 'Lee Equity Partners',
    website: 'https://www.leeequity.com/',
    description: 'Middle market private equity firm. Investing in growth-oriented companies.',
    focus: ['Financial Services', 'Healthcare', 'Business Services'],
    revenueRange: '$50M - $500M',
    location: 'New York, NY',
    isVerified: true
  },
  {
    id: '35',
    name: 'THL Partners',
    website: 'https://www.thl.com/',
    description: 'Premier private equity firm investing in growth companies.',
    focus: ['Financial Tech', 'Healthcare', 'Technology'],
    revenueRange: '$100M+',
    location: 'Boston, MA',
    isVerified: true
  },
  {
    id: '36',
    name: 'Dura Software',
    website: 'https://www.dura.software/',
    description: 'Acquiring and operating hyper-niche software products. Long-term operational focus.',
    focus: ['Niche SaaS', 'B2B', 'Operational Excellence'],
    revenueRange: '$2M - $15M',
    location: 'San Antonio, TX',
    isVerified: true
  },
  {
    id: '37',
    name: 'Evergreen Services Group',
    website: 'https://www.evergreensg.com/',
    description: 'A family of leading managed services and software companies. Permanent capital.',
    focus: ['MSPs', 'Government Software', 'Financial Software'],
    revenueRange: '$5M - $50M',
    location: 'San Francisco, CA',
    isVerified: true
  },
  {
    id: '38',
    name: 'Banyan Software',
    website: 'https://www.banyansoftware.com/',
    description: 'Acquiring and growing great enterprise software businesses. Permanent home.',
    focus: ['Enterprise Software', 'Vertical Market', 'Recurring Revenue'],
    revenueRange: '$2M - $30M',
    location: 'Atlanta, GA',
    isVerified: true
  },
  {
    id: '39',
    name: 'Bloom Equity Partners',
    website: 'https://www.bloomequity.com/',
    description: 'Investing in lower middle market technology and software companies. Operationally focused.',
    focus: ['LMM', 'Software', 'Tech-Enabled Services'],
    revenueRange: '$5M - $50M',
    location: 'New York, NY',
    isVerified: true
  },
  {
    id: '40',
    name: 'Scaleworks',
    website: 'https://www.scaleworks.com/',
    description: 'A mix of venture equity and lending for B2B SaaS. We buy and build.',
    focus: ['B2B SaaS', 'Growth', 'Operational Support'],
    revenueRange: '$5M - $20M',
    location: 'San Antonio, TX',
    isVerified: true
  },
  {
    id: '41',
    name: 'Xenon Partners',
    website: 'https://xenon.io/',
    description: 'Acquiring and operating B2B SaaS companies. Deep operational expertise.',
    focus: ['B2B SaaS', 'Growth Marketing', 'Turnaround'],
    revenueRange: '$2M - $20M',
    location: 'San Francisco, CA',
    isVerified: true
  },
  {
    id: '42',
    name: 'ESW Capital',
    website: 'https://eswcapital.com/',
    description: 'Investment firm focused on buying, strengthening, and growing mature business software companies.',
    focus: ['Enterprise Software', 'Mature SaaS', 'Remote Work'],
    revenueRange: '$10M - $100M',
    location: 'Austin, TX',
    isVerified: true
  },
  {
    id: '43',
    name: 'Arcadea Group',
    website: 'https://arcadea.inc/',
    description: 'The only permanent-capital growth investor in software. Investing in founder-controlled companies.',
    focus: ['Vertical SaaS', 'Founder-Led', 'Long-Term'],
    revenueRange: '$5M - $50M',
    location: 'Toronto, ON',
    isVerified: true
  },
  {
    id: '44',
    name: 'Main Capital Partners',
    website: 'https://main.nl/',
    description: 'Strategic investor in the software industry in the Benelux, DACH and Nordics.',
    focus: ['B2B Software', 'Europe', 'Buy-and-Build'],
    revenueRange: '$5M - $50M',
    location: 'The Hague, Netherlands',
    isVerified: true
  },
  {
    id: '45',
    name: 'Nordic Capital',
    website: 'https://www.nordiccapital.com/',
    description: 'Leading private equity investor with a resolute commitment to creating stronger, sustainable businesses.',
    focus: ['Healthcare', 'Tech & Payments', 'Financial Services'],
    revenueRange: '$50M+',
    location: 'Stockholm, Sweden',
    isVerified: true
  },
  {
    id: '46',
    name: 'Serent Capital',
    website: 'https://serentcapital.com/',
    description: 'Investing in high-growth service and technology businesses. Partnering with founders.',
    focus: ['B2B SaaS', 'Healthcare', 'Education'],
    revenueRange: '$10M - $100M',
    location: 'San Francisco, CA',
    isVerified: true
  },
  {
    id: '47',
    name: 'Mainsail Partners',
    website: 'https://mainsailpartners.com/',
    description: 'Growth equity firm focused on bootstrapped B2B software companies.',
    focus: ['Bootstrapped', 'B2B SaaS', 'Vertical Software'],
    revenueRange: '$5M - $50M',
    location: 'San Francisco, CA',
    isVerified: true
  },
  {
    id: '48',
    name: 'Volaris Group',
    website: 'https://www.volarisgroup.com/',
    description: 'Acquires, strengthens, and grows vertical market technology companies. Part of Constellation.',
    focus: ['Vertical Market', 'Software', 'Long-Term'],
    revenueRange: '$5M - $100M',
    location: 'Toronto, ON',
    isVerified: true
  },
  {
    id: '49',
    name: 'Jonas Software',
    website: 'https://www.jonassoftware.com/',
    description: 'Acquires, manages, and builds vertical market software companies globally.',
    focus: ['VMS', 'Club Management', 'Construction'],
    revenueRange: '$2M - $50M',
    location: 'Markham, ON',
    isVerified: true
  },
  {
    id: '50',
    name: 'The Brydon Group',
    website: 'https://www.brydongroup.com/',
    description: 'Private equity firm partnering with mid-career executives to acquire small businesses.',
    focus: ['Search Funds', 'Small Business', 'Software'],
    revenueRange: '$2M - $20M',
    location: 'Washington, DC',
    isVerified: true
  }
];