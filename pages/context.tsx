import Head from 'next/head';
import Navbar from '../components/Navbar';
import { Download, FileJson, Brain, Zap, CheckCircle } from 'lucide-react';

export default function ContextLibrary() {
  const cookbooks = [
    { name: "Master Brain (All 700+)", file: "/cookbook-full.json", count: 723, color: "text-accent" },
    { name: "Sales Ops Specialist", file: "/context/cookbook-sales-ops.json", count: 181, color: "text-blue-400" },
    { name: "Strategic Ops Specialist", file: "/context/cookbook-strategic-ops.json", count: 124, color: "text-purple-400" },
    { name: "Lead Gen Specialist", file: "/context/cookbook-lead-gen.json", count: 73, color: "text-green-400" },
    { name: "SEO Specialist", file: "/context/cookbook-seo.json", count: 49, color: "text-yellow-400" },
    { name: "Marketing Ops Specialist", file: "/context/cookbook-marketing-ops.json", count: 58, color: "text-pink-400" },
  ];

  return (
    <div className="min-h-screen bg-primary-bg text-text-color font-sans">
      <Head>
        <title>Context Library | Real AI Examples</title>
        <meta name="description" content="Downloadable context files for Gemini CLI and Claude Code." />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-navy-light border border-accent/30 rounded-full px-4 py-1 text-accent text-sm font-bold mb-6">
            <Zap className="w-4 h-4" /> Premium Context Library
          </div>
          <h1 className="text-5xl font-bold font-headline mb-6 text-text-color">
            Give Your Agent a <span className="text-accent">PhD.</span>
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed">
            Stop copying prompts one by one. Download these <strong>Context Files</strong> and drop them into your project. 
            Your agent will instantly know 700+ workflows.
          </p>
        </div>

        {/* How it Works */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-secondary-bg p-8 rounded-xl border border-navy-light">
            <div className="bg-navy-dark w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-accent">1</div>
            <h3 className="text-xl font-bold mb-2">Download JSON</h3>
            <p className="text-text-secondary">Grab the specialized cookbook for your role (or the Master Brain).</p>
          </div>
          <div className="bg-secondary-bg p-8 rounded-xl border border-navy-light">
            <div className="bg-navy-dark w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-accent">2</div>
            <h3 className="text-xl font-bold mb-2">Drop in Folder</h3>
            <p className="text-text-secondary">Place it in your project root. No installation required.</p>
          </div>
          <div className="bg-secondary-bg p-8 rounded-xl border border-navy-light">
            <div className="bg-navy-dark w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-accent">3</div>
            <h3 className="text-xl font-bold mb-2">Prompt Agent</h3>
            <p className="text-text-secondary">"Read the cookbook. Recommend 3 automation workflows for this repo."</p>
          </div>
        </div>

        {/* Downloads */}
        <div className="bg-navy-dark/50 border border-navy-light rounded-2xl p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Brain className="w-6 h-6 text-accent" /> Available Context Files
          </h2>
          
          <div className="grid gap-4">
            {cookbooks.map((book, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center justify-between bg-primary-bg p-6 rounded-xl border border-navy-light hover:border-accent/50 transition-all">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <FileJson className={`w-8 h-8 ${book.color}`} />
                  <div>
                    <h4 className="text-lg font-bold text-text-color">{book.name}</h4>
                    <p className="text-sm text-text-secondary">{book.count} Workflows included</p>
                  </div>
                </div>
                <a 
                  href={book.file} 
                  download 
                  className="flex items-center gap-2 bg-navy-light hover:bg-accent text-text-color hover:text-primary-bg px-6 py-3 rounded-lg font-bold transition-all w-full md:w-auto justify-center"
                >
                  <Download className="w-4 h-4" /> Download JSON
                </a>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center text-sm text-text-secondary bg-navy-light/30 p-4 rounded-lg">
            <CheckCircle className="w-4 h-4 inline mr-2 text-green-500" />
            Compatible with <strong>Gemini CLI</strong>, <strong>Claude Code</strong>, and <strong>Cursor</strong>.
          </div>
        </div>
      </main>
    </div>
  );
}
