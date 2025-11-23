
import Head from 'next/head';
import { AiTool, aiTools } from '../lib/ai-tools-data';
import AIToolCard from '../components/AIToolCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const developerUseCases = ['Development', 'Code Completion', 'Debugging', 'Documentation'];

const ToolsForDevelopers = () => {
  const developerTools = aiTools.filter(tool =>
    tool.tags.useCase.some(useCase => developerUseCases.includes(useCase))
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Head>
        <title>Top AI Tools for Developers (2025) | Code, Debug, Document</title>
        <meta
          name="description"
          content="Find the best AI coding assistants and tools for developers. Speed up your workflow with AI-powered code completion, debugging, and documentation."
        />
      </Head>
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            AI Tools for Developers
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Write better code, faster. This curated list features the best AI-powered tools to assist with code completion, debugging, and documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {developerTools.map(tool => (
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

      <Footer />
    </div>
  );
};

export default ToolsForDevelopers;
