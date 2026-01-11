import React from 'react';
import Link from 'next/link';
import { Terminal, Copy, Play, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

const HowToUseGuide = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mb-20">
      
      {/* 1. The "What is this?" Analogy */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white shadow-xl mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-blue-500/30">
              <Terminal className="w-3 h-3" />
              <span>New to CLI? Start here.</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              A Chatbot with <span className="text-blue-400">Hands.</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              ChatGPT can <em>write</em> an email, but it can't <em>send</em> it. <br/>
              <strong>Gemini CLI</strong> is different. It lives on your computer, so it can create files, run searches, and manage your projects—just like a remote intern.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
               <div className="flex items-center gap-3 bg-gray-700/50 px-4 py-3 rounded-xl border border-gray-600">
                 <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold text-sm">1</div>
                 <span className="text-sm font-medium">Install Gemini CLI</span>
               </div>
               <div className="hidden sm:block text-gray-500 self-center">→</div>
               <div className="flex items-center gap-3 bg-gray-700/50 px-4 py-3 rounded-xl border border-gray-600">
                 <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">2</div>
                 <span className="text-sm font-medium">Paste a Blueprint</span>
               </div>
            </div>
          </div>
          
          {/* Visual Analogy */}
          <div className="bg-gray-950 rounded-xl border border-gray-700 p-6 shadow-2xl font-mono text-sm">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-gray-500 text-xs">user@macbook:~</span>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2">
                <span className="text-green-400">➜</span>
                <span className="text-white">gemini run "Find high-value leads"</span>
              </div>
              <div className="text-gray-400 pl-4">
                Scanning LinkedIn... <br/>
                Found 50 prospects. <br/>
                Checking emails... <br/>
                <span className="text-blue-400">✓ Created leads.csv</span>
              </div>
              <div className="flex gap-2 animate-pulse">
                <span className="text-green-400">➜</span>
                <span className="text-white">_</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. The 3-Step Setup */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        
        {/* Step 1 */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4">
            <Terminal className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">1. Install the Tool</h3>
          <p className="text-sm text-gray-500 mb-4">
            Open your terminal (Command+Space, type "Terminal") and run this command once.
          </p>
          <div className="bg-gray-100 rounded-lg p-3 font-mono text-xs text-gray-700 flex justify-between items-center group cursor-pointer"
               onClick={() => navigator.clipboard.writeText('npm install -g gemini-chat-cli')}>
            <span>npm install -g gemini-chat-cli</span>
            <Copy className="w-3 h-3 text-gray-400 group-hover:text-blue-500" />
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
          <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 mb-4">
            <Copy className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">2. Copy a Blueprint</h3>
          <p className="text-sm text-gray-500 mb-4">
            Browse the library below. Click <strong>"Copy Blueprint"</strong> on any card (e.g., "The Sales Sniper").
          </p>
          <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
            <div className="flex items-center gap-2 text-xs text-purple-700 font-medium">
              <CheckCircle2 className="w-3 h-3" />
              <span>Blueprint copied to clipboard!</span>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
          <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600 mb-4">
            <Play className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">3. Run the Agent</h3>
          <p className="text-sm text-gray-500 mb-4">
            Go back to your terminal, type <code>gemini run</code>, and paste the text.
          </p>
          <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs text-green-400">
            &gt; gemini run "Paste here..."
          </div>
        </div>
      </div>

      {/* 3. The "Pro Tip" Box */}
      <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="bg-yellow-100 p-2 rounded-lg text-yellow-700 shrink-0">
          <Zap className="w-5 h-5" />
        </div>
        <div className="flex-grow">
          <h4 className="font-bold text-yellow-900 text-sm mb-1">Want to build something bigger?</h4>
          <p className="text-yellow-800 text-sm">
            Don't just run one recipe. Use the <strong>"Autonomous Project Manager"</strong> blueprint to chain multiple recipes together into a full workflow.
          </p>
        </div>
        <Link href="/blueprints/autonomous-project-manager">
          <button className="text-xs font-bold bg-yellow-200 text-yellow-800 px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors whitespace-nowrap">
            View Project Manager
          </button>
        </Link>
      </div>

    </div>
  );
};

export default HowToUseGuide;
