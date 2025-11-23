export interface AiTool {
  name: string;
  description: string;
  url: string;
  category: 'Copywriting' | 'Image Generation' | 'Code Assistance' | 'Productivity' | 'Video & Audio' | 'Marketing' | 'Design';
  tags: {
    useCase: ('Marketing' | 'Development' | 'Design' | 'Business' | 'Personal' | 'SEO' | 'Social Media' | 'Copywriting' | 'Debugging' | 'Documentation' | 'Code Completion' | 'Video Editing' | 'Audio Production' | 'Blog Writing' | 'Image Editing')[];
    price: 'Free' | 'Freemium' | 'Paid';
    skill: 'Beginner' | 'Intermediate' | 'Advanced';
  };
  image: string;
}

export const aiTools: AiTool[] = [
  // For Developers
  {
    name: 'GitHub Copilot',
    description: 'Your AI pair programmer. Get suggestions for whole lines or entire functions right in your editor.',
    url: 'https://github.com/features/copilot',
    category: 'Code Assistance',
    tags: { useCase: ['Development', 'Code Completion', 'Debugging'], price: 'Paid', skill: 'Intermediate' },
    image: 'https://placehold.co/750x500/1E293B/FFFFFF/png?text=GitHub+Copilot'
  },
  {
    name: 'Tabnine',
    description: 'AI assistant for software developers. Code completion that works in your favorite IDE.',
    url: 'https://www.tabnine.com/',
    category: 'Code Assistance',
    tags: { useCase: ['Development', 'Code Completion'], price: 'Freemium', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/1E293B/FFFFFF/png?text=Tabnine'
  },
  {
    name: 'Replit Ghostwriter',
    description: 'An AI-powered coding assistant that helps you write better code, faster, inside the Replit IDE.',
    url: 'https://replit.com/ghostwriter',
    category: 'Code Assistance',
    tags: { useCase: ['Development', 'Code Completion', 'Debugging'], price: 'Freemium', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/1E293B/FFFFFF/png?text=Ghostwriter'
  },
  {
    name: 'Mintlify',
    description: 'AI-powered documentation writer. Generate documentation from your code instantly.',
    url: 'https://mintlify.com/',
    category: 'Code Assistance',
    tags: { useCase: ['Development', 'Documentation'], price: 'Freemium', skill: 'Intermediate' },
    image: 'https://placehold.co/750x500/1E293B/FFFFFF/png?text=Mintlify'
  },

  // For Marketers
  {
    name: 'Jasper',
    description: 'The AI Content Platform that helps you and your team break through creative blocks to create amazing, original content 10X faster.',
    url: 'https://www.jasper.ai/',
    category: 'Copywriting',
    tags: { useCase: ['Marketing', 'Copywriting', 'Blog Writing', 'Social Media'], price: 'Paid', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/6366F1/FFFFFF/png?text=Jasper'
  },
  {
    name: 'Copy.ai',
    description: 'Generate high-quality marketing copy and content in seconds, from product descriptions to ad copy.',
    url: 'https://www.copy.ai/',
    category: 'Copywriting',
    tags: { useCase: ['Marketing', 'Copywriting', 'Social Media'], price: 'Freemium', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/6366F1/FFFFFF/png?text=Copy.ai'
  },
  {
    name: 'Semrush',
    description: 'AI-powered tools to help you with SEO, content marketing, competitor research, PPC, and social media marketing.',
    url: 'https://www.semrush.com/',
    category: 'Marketing',
    tags: { useCase: ['Marketing', 'SEO', 'Social Media'], price: 'Paid', skill: 'Intermediate' },
    image: 'https://placehold.co/750x500/6366F1/FFFFFF/png?text=Semrush'
  },

  // For Content Creators
  {
    name: 'Descript',
    description: 'All-in-one audio and video editor that makes editing as easy as a word doc. AI-powered features like transcription and voice cloning.',
    url: 'https://www.descript.com/',
    category: 'Video & Audio',
    tags: { useCase: ['Video Editing', 'Audio Production', 'Blog Writing'], price: 'Freemium', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/EC4899/FFFFFF/png?text=Descript'
  },
  {
    name: 'RunwayML',
    description: 'A suite of AI magic tools for video and content creation, from text-to-video to automatic background removal.',
    url: 'https://runwayml.com/',
    category: 'Video & Audio',
    tags: { useCase: ['Video Editing', 'Image Editing', 'Design'], price: 'Freemium', skill: 'Intermediate' },
    image: 'https://placehold.co/750x500/EC4899/FFFFFF/png?text=RunwayML'
  },
  {
    name: 'Canva',
    description: 'Design anything. Magic Studio brings you a suite of AI tools to help you create stunning images, videos, and designs.',
    url: 'https://www.canva.com/magic-studio/',
    category: 'Design',
    tags: { useCase: ['Design', 'Image Editing', 'Social Media', 'Marketing'], price: 'Freemium', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/EC4899/FFFFFF/png?text=Canva'
  },
  {
    name: 'ElevenLabs',
    description: 'Generate lifelike speech in any language and voice. Prime AI-powered text-to-speech and voice cloning.',
    url: 'https://elevenlabs.io/',
    category: 'Video & Audio',
    tags: { useCase: ['Audio Production', 'Video Editing'], price: 'Freemium', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/EC4899/FFFFFF/png?text=ElevenLabs'
  },
  {
    name: 'CapCut',
    description: 'A free all-in-one video editor with a suite of AI-powered features for easy and creative video production.',
    url: 'https://www.capcut.com/',
    category: 'Video & Audio',
    tags: { useCase: ['Video Editing', 'Social Media'], price: 'Free', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/EC4899/FFFFFF/png?text=CapCut'
  },

  // General Purpose & Latest Models
  {
    name: 'ChatGPT',
    description: 'OpenAI\'s conversational AI that can generate human-like text for a wide range of applications, powered by GPT-4o.',
    url: 'https://chat.openai.com/',
    category: 'Productivity',
    tags: { useCase: ['Business', 'Personal', 'Copywriting', 'Code Completion'], price: 'Freemium', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/22C55E/FFFFFF/png?text=ChatGPT'
  },
  {
    name: 'Claude 3',
    description: 'Anthropic\'s latest family of models (Haiku, Sonnet, Opus) offering a new standard in intelligence and speed.',
    url: 'https://www.anthropic.com/claude',
    category: 'Productivity',
    tags: { useCase: ['Business', 'Personal', 'Copywriting', 'Code Completion'], price: 'Freemium', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/22C55E/FFFFFF/png?text=Claude+3'
  },
  {
    name: 'Notion AI',
    description: 'Integrated AI assistant within Notion to help you write, brainstorm, edit, summarize, and more.',
    url: 'https://www.notion.so/product/ai',
    category: 'Productivity',
    tags: { useCase: ['Business', 'Personal', 'Blog Writing'], price: 'Paid', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/22C55E/FFFFFF/png?text=Notion+AI'
  },
  
  // Image Generation
  {
    name: 'Midjourney',
    description: 'A leading AI image generator known for its artistic and high-quality image outputs. Now on V6.',
    url: 'https://www.midjourney.com/',
    category: 'Image Generation',
    tags: { useCase: ['Design', 'Image Editing'], price: 'Paid', skill: 'Intermediate' },
    image: 'https://placehold.co/750x500/F59E0B/FFFFFF/png?text=Midjourney'
  },
  {
    name: 'DALL-E 3',
    description: 'An AI system from OpenAI that can create realistic images and art from a description in natural language.',
    url: 'https://openai.com/dall-e-3',
    category: 'Image Generation',
    tags: { useCase: ['Design', 'Image Editing'], price: 'Freemium', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/F59E0B/FFFFFF/png?text=DALL-E+3'
  },
  {
    name: 'ImageFX',
    description: 'Google\'s generative AI image tool, powered by the Imagen 2 model, for creating high-quality images from text.',
    url: 'https://aistudio.google.com/app/imagefx',
    category: 'Image Generation',
    tags: { useCase: ['Design', 'Image Editing'], price: 'Free', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/F59E0B/FFFFFF/png?text=ImageFX'
  },
  {
    name: 'Leonardo.Ai',
    description: 'A generative AI art platform with a suite of tools for creating stunning visual assets, with a generous free tier.',
    url: 'https://leonardo.ai/',
    category: 'Image Generation',
    tags: { useCase: ['Design', 'Image Editing'], price: 'Freemium', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/F59E0B/FFFFFF/png?text=Leonardo.Ai'
  },
  {
    name: 'Stable Diffusion 3',
    description: 'The latest open-source model from Stability AI for text-to-image generation, with improved prompt following.',
    url: 'https://stability.ai/stablediffusion3',
    category: 'Image Generation',
    tags: { useCase: ['Design', 'Image Editing', 'Development'], price: 'Freemium', skill: 'Advanced' },
    image: 'https://placehold.co/750x500/F59E0B/FFFFFF/png?text=Stable+Diffusion+3'
  }
];