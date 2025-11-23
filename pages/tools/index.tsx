
import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, Zap, Code, Mic, PenSquare, DollarSign } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const hubLinks = [
  {
    href: '/tools/free-ai-tools',
    title: 'Free AI Tools',
    description: 'A curated list of the best tools with free or freemium plans.',
    icon: <DollarSign className="w-8 h-8 text-teal-400" />,
    bgColor: 'bg-teal-900'
  },
  {
    href: '/tools/for-marketers',
    title: 'AI for Marketers',
    description: 'Tools for SEO, copywriting, and social media automation.',
    icon: <PenSquare className="w-8 h-8 text-blue-400" />,
    bgColor: 'bg-blue-900'
  },
  {
    href: '/tools/for-developers',
    title: 'AI for Developers',
    description: 'Assistants for coding, debugging, and documentation.',
    icon: <Code className="w-8 h-8 text-green-400" />,
    bgColor: 'bg-green-900'
  },
  {
    href: '/tools/for-content-creators',
    title: 'AI for Creators',
    description: 'Create stunning video, audio, and visuals with AI.',
    icon: <Mic className="w-8 h-8 text-pink-400" />,
    bgColor: 'bg-pink-900'
  },
];

const ToolsHubPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Head>
        <title>AI Tool Directories | Find the Best AI for Any Task</title>
        <meta
          name="description"
          content="Explore our specialized AI tool directories for marketers, developers, and content creators, or use our interactive finder to get a personalized recommendation."
        />
      </Head>
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Find the Right AI Tool for the Job
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're a marketer, developer, or creator, we have a curated list of AI tools to help you succeed. Choose a directory below to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {hubLinks.map(link => (
            <Link href={link.href} key={link.href}>
              <div className={`relative p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 h-full flex flex-col justify-between ${link.bgColor} text-white`}>
                <div>
                  <div className="mb-4">
                    {link.icon}
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{link.title}</h2>
                  <p className="text-gray-300">{link.description}</p>
                </div>
                <div className="flex items-center justify-end text-sm font-semibold mt-6">
                  Explore
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ToolsHubPage;
