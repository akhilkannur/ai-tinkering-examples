import Head from 'next/head';
import Navbar from '../components/Navbar';
import TerminalCookbook from '../components/BuilderFlowchart';
import HowToUseGuide from '../components/HowToUseGuide';
import { Terminal, BookOpen, Cpu, Command } from 'lucide-react';
import { getAllRecipes } from '../lib/recipes';
import { Recipe } from '../lib/cookbook-data';

interface BlueprintsPageProps {
  recipes: Recipe[];
}

export async function getStaticProps() {
  const recipes = getAllRecipes();
  return {
    props: {
      recipes,
    },
  };
}

const BlueprintsPage = ({ recipes }: BlueprintsPageProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Head>
        <title>The Terminal Cookbook | Blueprints for Non-Technical Builders</title>
        <meta
          name="description"
          content="A library of copy-paste blueprints to build powerful autonomous agents using Gemini CLI, Claude Code, Cowork, or Cursor."
        />
        <meta property="og:title" content="The Terminal Cookbook | Blueprints for Non-Technical Builders" />
        <meta property="og:description" content="A library of copy-paste blueprints to build powerful autonomous agents using Gemini CLI, Claude Code, Cowork, or Cursor." />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/Gemini_Generated_Image_b3hv6cb3hv6cb3hv.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Terminal Cookbook | Blueprints for Non-Technical Builders" />
        <meta name="twitter:description" content="A library of copy-paste blueprints to build powerful autonomous agents using Gemini CLI, Claude Code, Cowork, or Cursor." />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/Gemini_Generated_Image_b3hv6cb3hv6cb3hv.png`} />
        <link rel="canonical" href="https://realaiexamples.com/blueprints" />
      </Head>
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-16">
        
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <BookOpen className="w-4 h-4" />
            <span>The Terminal Cookbook</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
            Stop Chatting. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Start Automating.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10">
            ChatGPT is for questions. These blueprints are for <strong>work</strong>.
            <br className="hidden md:block"/>
            Copy-paste instructions that turn <strong>Claude Cowork</strong> and <strong>Gemini CLI</strong> into autonomous employees that scrape data, build lists, and write code for you.
          </p>

          {/* Compatibility Badge */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-gray-500 mb-2">
            <span className="uppercase tracking-widest font-bold text-xs">Choose your Agent:</span>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 font-medium border border-gray-200">
                <Cpu className="w-4 h-4 text-purple-600" /> Claude Cowork
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 font-medium border border-gray-200">
                <Command className="w-4 h-4 text-blue-600" /> Gemini CLI
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 font-medium border border-gray-200">
                <Terminal className="w-4 h-4 text-gray-600" /> Cursor
              </span>
            </div>
          </div>
        </div>

        {/* How To Use Guide */}
        <HowToUseGuide />

        {/* The Cookbook Grid */}
        <div className="mb-24">
          <TerminalCookbook recipes={recipes} />
        </div>

        {/* Philosophy Section */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-gray-50 rounded-3xl p-8 md:p-10 text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-700 p-1.5 rounded-lg"><Terminal className="w-5 h-5"/></span>
              CLI & Folder Agents
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              If you use <strong>Gemini CLI</strong>, <strong>Claude Code</strong>, or the new <strong>Claude Cowork</strong>, these blueprints act as your foundation. 
              Drop a blueprint into a folder or paste it into the agent, and it understands the full scope: 
              from creating files to handling complex workflows.
            </p>
            <div className="bg-white p-4 rounded-xl border border-gray-200 text-sm font-mono text-gray-500">
              Claude: "I've read the blueprint. Starting the build..." <span className="text-green-600">✓ Running</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-3xl p-8 md:p-10 text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="bg-purple-100 text-purple-700 p-1.5 rounded-lg"><Cpu className="w-5 h-5"/></span>
              For AI Editors
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Using <strong>Cursor</strong> or <strong>Windsurf</strong>? Paste the blueprint into the "Composer" or "Chat" window. 
              The AI will read the 'Role', 'Objective', and 'Workflow' and build the entire tool in your project folder automatically.
            </p>
            <div className="bg-white p-4 rounded-xl border border-gray-200 text-sm font-mono text-gray-500">
              Composer: "Follow this blueprint to build..." <span className="text-purple-600">Generating...</span>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default BlueprintsPage;