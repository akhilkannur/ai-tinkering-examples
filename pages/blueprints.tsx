import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TerminalCookbook from '../components/BuilderFlowchart';
import { Terminal, BookOpen, Coffee } from 'lucide-react';

const BlueprintsPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Head>
        <title>The Terminal Cookbook | Blueprints for Non-Technical Builders</title>
        <meta
          name="description"
          content="A library of copy-paste blueprints to build powerful internal tools using Claude Code or Gemini, without writing code yourself."
        />
      </Head>
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-16">
        
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <BookOpen className="w-4 h-4" />
            <span>The Terminal Cookbook</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
            Don't Learn to Code.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">
              Learn to Cook.
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            You have the raw ingredients (AI & Terminal). Here are the <strong>Recipes</strong>.
            <br/>
            Pick a blueprint, copy it, and let Claude Code be your sous-chef.
          </p>
        </div>

        {/* The Cookbook Grid */}
        <div className="mb-24">
          <TerminalCookbook />
        </div>

        {/* Philosophy Section */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why "Blueprints"?</h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
            AI coding agents work best when you give them a structure. Our blueprints are pre-written <strong>"System Prompts"</strong> that force the AI to build exactly what you want, preventing it from getting confused or asking technical questions.
          </p>
          <div className="inline-flex items-center gap-2 text-gray-500 font-mono text-sm bg-white px-4 py-2 rounded-lg border border-gray-200">
            <Terminal className="w-4 h-4" />
            <span>Tested with Claude 3.5 Sonnet & Gemini 1.5 Pro</span>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default BlueprintsPage;
