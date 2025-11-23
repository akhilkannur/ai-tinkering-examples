
import Head from 'next/head';
import { AiTool, aiTools } from '../../lib/ai-tools-data';
import AIToolCard from '../../components/AIToolCard';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const freeOrFreemium = ['Free', 'Freemium'];

const FreeToolsPage = () => {
  const freeTools = aiTools.filter(tool =>
    freeOrFreemium.includes(tool.tags.price)
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Head>
        <title>The Best Free AI Tools (2025) | Image, Writing, Code</title>
        <meta
          name="description"
          content="A curated list of the best free and freemium AI tools. Generate images, write content, code, and more without spending a dime."
        />
      </Head>
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            The Best Free AI Tools
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            High-quality AI doesn't have to break the bank. Here is our curated list of the most powerful and useful AI tools available for free or with a generous free plan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {freeTools.map(tool => (
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

export default FreeToolsPage;
