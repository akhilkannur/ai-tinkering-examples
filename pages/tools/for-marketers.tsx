import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { AiTool, aiTools } from '../../lib/ai-tools-data';
import Navbar from '../../components/Navbar';
import { Check, X } from 'lucide-react';

const marketingUseCases = ['Marketing', 'SEO', 'Social Media', 'Copywriting', 'Blog Writing'];

const ToolsForMarketers = () => {
  const marketerTools = aiTools.filter(tool =>
    tool.tags.useCase.some(useCase => marketingUseCases.includes(useCase))
  );

  const faqs = [
    {
      question: 'How can AI help with SEO?',
      answer: 'AI tools can revolutionize your SEO strategy by automating keyword research, generating topic ideas, optimizing content for search intent, and even creating entire articles. Tools like Semrush use AI to analyze competitors and identify ranking opportunities you might have missed.'
    },
    {
      question: 'Is AI-generated copy as good as human copy?',
      answer: 'AI has become incredibly sophisticated. For many tasks, like writing ad copy variations, social media posts, or product descriptions, AI can produce high-quality content instantly. For more nuanced, brand-defining content, it\'s best used as a powerful assistant to a human writer, helping to brainstorm ideas and draft initial versions.'
    },
    {
      question: 'What is the best AI tool for social media marketing?',
      answer: 'The "best" tool depends on your needs. If you need to write compelling post copy and ads, Jasper or Copy.ai are excellent choices. If you need to create stunning visuals and videos for your posts, Canva\'s AI Magic Studio is a fantastic all-in-one solution.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Head>
        <title>Best AI Tools for Marketers (2025) | SEO, Copywriting, Social Media</title>
        <meta
          name="description"
          content="An in-depth guide to the top AI-powered tools for marketers. Boost your SEO, automate social media, and write compelling copy with our curated list and analysis."
        />
      </Head>
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            An In-Depth Guide to AI Tools for Marketers
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Supercharge your marketing efforts with AI. This curated guide breaks down the best tools for SEO, content creation, and social media, with pros and cons for each.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Featured Internal Tool */}
          <div className="mb-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white shadow-xl transform hover:-translate-y-1 transition-transform duration-300">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <div className="inline-block bg-blue-500 bg-opacity-30 text-blue-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                  Free Utility
                </div>
                <h2 className="text-3xl font-bold mb-3">The 'Foolproof' UTM Builder</h2>
                <p className="text-blue-100 mb-6 text-lg">
                  Stop messing up your analytics data with inconsistent links. Generate perfect tracking URLs for your campaigns instantly.
                </p>
                <Link href="/tools/utm-builder" className="inline-flex items-center bg-white text-blue-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                  Build a Link Now
                  <Check className="w-5 h-5 ml-2" />
                </Link>
              </div>
              <div className="w-full md:w-1/3 bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
                 <div className="space-y-3 opacity-80">
                    <div className="h-2 w-3/4 bg-white/40 rounded"></div>
                    <div className="h-8 w-full bg-white/20 rounded"></div>
                    <div className="h-2 w-1/2 bg-white/40 rounded"></div>
                    <div className="h-8 w-full bg-white/20 rounded"></div>
                    <div className="h-10 w-full bg-blue-400/40 rounded mt-4"></div>
                 </div>
              </div>
            </div>
          </div>

          <div className="space-y-16">
            {marketerTools.map(tool => (
              <div key={tool.name} className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <Link href={tool.url} target="_blank" rel="noopener noreferrer">
                      <Image src={tool.image} alt={`${tool.name} logo`} width={750} height={500} className="rounded-lg object-cover" />
                    </Link>
                  </div>
                  <div className="md:w-2/3">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{tool.name}</h2>
                    <p className="text-gray-600 mb-4">{tool.description}</p>
                    <Link href={tool.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">
                      Visit {tool.name} →
                    </Link>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">Why it\'s great for marketers:</h3>
                  <p className="text-gray-600 mb-6">
                    {
                      {
                        'Jasper': 'Jasper is a powerhouse for content creation at scale. It helps marketing teams overcome writer\'s block and produce everything from blog posts to ad copy in a fraction of the time, all while maintaining a consistent brand voice.',
                        'Copy.ai': 'Perfect for rapid-fire copy needs, Copy.ai excels at generating short-form content like social media updates, email subject lines, and Google Ads headlines. Its freemium model makes it accessible for freelancers and small teams.',
                        'Semrush': 'Semrush integrates AI deep into its SEO toolkit. It provides AI-driven topic suggestions, content optimization guidance based on top-ranking competitors, and helps you track your keyword performance with intelligent insights.',
                        'Canva': 'Canva\'s Magic Studio is a one-stop-shop for marketing visuals. It allows you to generate images, create videos, and design social media posts using simple text prompts, drastically speeding up the creative workflow for marketing campaigns.'
                      }[tool.name] || 'This tool offers a variety of features that can help streamline marketing workflows, from content creation to analytics and automation.'
                    }
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-700 mb-2">Pros</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start"><Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" /> <span>Speeds up content creation significantly.</span></li>
                        <li className="flex items-start"><Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" /> <span>Helps generate new ideas and angles.</span></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-700 mb-2">Cons</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start"><X className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-1" /> <span>May require fact-checking and editing.</span></li>
                        <li className="flex items-start"><X className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-1" /> <span>Can sometimes lack brand-specific nuance.</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Frequently Asked Questions</h2>
            <div className="space-y-8 max-w-3xl mx-auto">
              {faqs.map(faq => (
                <div key={faq.question} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ToolsForMarketers;