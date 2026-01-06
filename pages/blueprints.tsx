import Head from 'next/head';
import Navbar from '../components/Navbar';
import TerminalCookbook from '../components/BuilderFlowchart';
import { Terminal, BookOpen, Cpu, Command } from 'lucide-react';

const BlueprintsPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Head>
        <title>The Terminal Cookbook | Blueprints for Non-Technical Builders</title>
        <meta
          name="description"
          content="A library of copy-paste blueprints to build powerful autonomous agents using Gemini CLI, Claude Code, or Cursor."
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
              Learn to Direct.
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            You don't need to be an engineer to build sophisticated tools.
            These <strong>Blueprints</strong> are "Operating Instructions" for your AI Agent.
            <br className="hidden md:block"/>
            Copy a recipe, paste it into your terminal, and watch it work.
          </p>

          {/* Compatibility Badge */}
          <div className="flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium">
              <Command className="w-4 h-4" /> Works with Gemini CLI
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium">
              <Cpu className="w-4 h-4" /> Claude Code
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium">
              <Terminal className="w-4 h-4" /> Cursor / Windsurf
            </span>
          </div>
        </div>

        {/* The Cookbook Grid */}
        <div className="mb-24">
          <TerminalCookbook />
        </div>

        {/* Philosophy Section */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-gray-50 rounded-3xl p-8 md:p-10 text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-700 p-1.5 rounded-lg"><Terminal className="w-5 h-5"/></span>
              For CLI Agents
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              If you use <strong>Gemini CLI</strong> or <strong>Claude Code</strong>, these blueprints act as "Mission Files". 
              Instead of typing 50 small commands, you paste one blueprint, and the agent understands the full scope: 
              from creating files to handling edge cases.
            </p>
            <div className="bg-white p-4 rounded-xl border border-gray-200 text-sm font-mono text-gray-500">
              &gt; gemini run "Build the Sales Sniper..." <span className="text-green-600">✓ Accepted</span>
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