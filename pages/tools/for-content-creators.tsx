
import Head from 'next/head';
import { AiTool, aiTools } from '../../lib/ai-tools-data';
import AIToolCard from '../../components/AIToolCard';
import Navbar from '../../components/Navbar';

const creatorUseCases = ['Video Editing', 'Audio Production', 'Blog Writing', 'Image Editing', 'Design', 'Social Media'];

const ToolsForContentCreators = () => {
  const creatorTools = aiTools.filter(tool =>
    tool.tags.useCase.some(useCase => creatorUseCases.includes(useCase))
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Head>
        <title>Essential AI Tools for Content Creators (2025) | Video, Audio, Design</title>
        <meta
          name="description"
          content="The ultimate list of AI tools for content creators. Find the best AI-powered software for video editing, audio production, graphic design, and writing."
          key="description"
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" key="og:type" />
        <meta property="og:title" content="Essential AI Tools for Content Creators (2025) | Video, Audio, Design" key="og:title" />
        <meta property="og:description" content="The ultimate list of AI tools for content creators. Find the best AI-powered software for video editing, audio production, graphic design, and writing." key="og:description" />
        <meta property="og:image" content="https://realaiexamples.com/api/og?mode=home" key="og:image" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content="Essential AI Tools for Content Creators (2025) | Video, Audio, Design" key="twitter:title" />
        <meta name="twitter:description" content="The ultimate list of AI tools for content creators. Find the best AI-powered software for video editing, audio production, graphic design, and writing." key="twitter:description" />
        <meta name="twitter:image" content="https://realaiexamples.com/api/og?mode=home" key="twitter:image" />
      </Head>
      <Navbar />

      <main className="flex-grow container mx-auto px-4 pt-32 md:pt-40 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            AI Tools for Content Creators
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Bring your ideas to life with the power of AI. This curated list features the best tools for video editing, audio production, design, and writing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {creatorTools.map(tool => (
            <AIToolCard
              key={tool.name}
              name={tool.name}
              description={tool.description}
              url={tool.url}
              imageUrl={tool.image}
              category={tool.category}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ToolsForContentCreators;
