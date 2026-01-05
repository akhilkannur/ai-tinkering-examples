import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BuilderFlowchart from '../../components/BuilderFlowchart';
import { Terminal, Cpu, Hammer } from 'lucide-react';

const ToolsHubPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Head>
        <title>The Builder's Blueprint | Build Your Own AI Tools</title>
        <meta
          name="description"
          content="Stop paying for AI wrappers. Use our 'Problem-to-Prompt' blueprints to build your own custom tools directly in your terminal."
        />
      </Head>
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-16">
        
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <Terminal className="w-4 h-4" />
            <span>The Terminal Cookbook</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
            Cure Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              AI IDE FOMO.
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            "I want to use Claude Code... but I don't know what to build." 
            <br/><br/>
            Don't start with a blank screen. Pick a <strong>Blueprint</strong> from the menu below, copy it, and watch your AI build a real utility in minutes.
          </p>
        </div>

        {/* The Core Tool */}
        <div className="mb-24">
          <BuilderFlowchart />
        </div>

        {/* Philosophy Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto border-t border-gray-100 pt-16">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <Cpu className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Kill the Blank Canvas</h3>
            <p className="text-gray-600 leading-relaxed">
              The biggest hurdle to using Claude Code or Gemini is knowing where to start. These blueprints give you a day-one destination.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <Hammer className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Non-Technical Power</h3>
            <p className="text-gray-600 leading-relaxed">
              You don't need to be a developer to use the terminal. If you can describe a problem, the AI can execute the build.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <Terminal className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Native Building</h3>
            <p className="text-gray-600 leading-relaxed">
              Stop relying on third-party wrappers. Build your own tools that run locally, exactly how you want them to work.
            </p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default ToolsHubPage;