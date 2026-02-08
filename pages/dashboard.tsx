import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { Terminal, Activity, FileText, Download, Play, Shield, Cpu, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function MissionControl() {
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSession = async () => {
    try {
      const res = await fetch('/api/agent-session');
      const data = await res.json();
      setSession(data);
    } catch (err) {
      console.error('Failed to fetch session', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
    const interval = setInterval(fetchSession, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-primary-bg font-mono text-text-color selection:bg-accent selection:text-black">
      <Head>
        <title>Mission Control | Agent Dashboard</title>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      </Head>

      <div className="texture-overlay opacity-10 pointer-events-none fixed inset-0 z-50"></div>
      
      <Navbar />

      <main className="pt-32 pb-20 container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="inline-block bg-black text-accent border-2 border-black px-3 py-1 mb-4 text-xs font-black uppercase tracking-widest">
              Local Mode: Active
            </div>
            <h1 className="text-6xl font-headline font-bold uppercase tracking-tight drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              Mission Control
            </h1>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-secondary-bg p-4 border-4 border-black text-black shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-bold uppercase tracking-widest text-xs">System Healthy</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT: STATUS & CONTROL */}
          <div className="lg:col-span-1 space-y-8">
            <div className="card">
              <h2 className="text-2xl font-headline mb-4 border-b-2 border-black pb-2 flex items-center gap-2">
                <Activity className="w-5 h-5" /> Session Status
              </h2>
              
              {!session || session.status === 'idle' ? (
                <div className="py-8 text-center opacity-50 italic">
                  No active session found.<br/>
                  <code className="text-[10px] mt-4 block bg-black/10 p-2 text-black not-italic">node scripts/simulate-agent.js</code>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-black/5 p-3 border-2 border-black border-dashed">
                    <span className="text-xs uppercase font-black">Agent</span>
                    <span className="text-sm font-bold">{session.agent}</span>
                  </div>
                  <div className="flex justify-between items-center bg-black/5 p-3 border-2 border-black border-dashed">
                    <span className="text-xs uppercase font-black">Status</span>
                    <span className={`text-sm font-bold uppercase ${session.status === 'completed' ? 'text-green-700' : 'text-primary-bg'}`}>
                      {session.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-black/5 p-3 border-2 border-black border-dashed">
                    <span className="text-xs uppercase font-black">Runtime</span>
                    <span className="text-sm font-bold">14.5s</span>
                  </div>
                </div>
              )}
            </div>

            <div className="card">
              <h2 className="text-2xl font-headline mb-4 border-b-2 border-black pb-2 flex items-center gap-2">
                <Cpu className="w-5 h-5" /> Artifacts
              </h2>
              
              <div className="space-y-3">
                {session?.artifacts?.length > 0 ? (
                  session.artifacts.map((art: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white border-2 border-black group">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-primary-bg" />
                        <span className="text-xs font-bold uppercase">{art.name}</span>
                      </div>
                      <a href={art.url} download className="hover:text-primary-bg">
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="py-4 text-center text-xs opacity-50 italic">Waiting for artifacts...</div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: LIVE TERMINAL */}
          <div className="lg:col-span-2">
            <div className="bg-black border-4 border-black shadow-[10px_10px_0px_rgba(0,0,0,1)] rounded-none overflow-hidden h-[600px] flex flex-col">
              <div className="bg-[#1a1a1a] px-6 py-3 flex items-center justify-between border-b-4 border-black">
                <div className="flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-accent" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Agent_Flight_Recorder.v1</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/30"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/30"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/30"></div>
                </div>
              </div>

              <div className="p-8 flex-grow overflow-y-auto font-mono text-sm space-y-3 custom-scrollbar">
                {session?.logs?.length > 0 ? (
                  session.logs.map((log: any, idx: number) => (
                    <div key={idx} className="flex gap-4 animate-in fade-in slide-in-from-left-2 duration-300">
                      <span className="text-white/20 text-[10px] pt-1">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                      <span className={`
                        ${log.type === 'action' ? 'text-accent' : ''}
                        ${log.type === 'success' ? 'text-green-400' : ''}
                        ${log.type === 'system' ? 'text-white/60 italic' : ''}
                        ${!log.type ? 'text-white' : ''}
                      `}>
                        {log.type === 'action' && <span className="mr-2">●</span>}
                        {log.type === 'success' && <span className="mr-2">✔</span>}
                        {log.message}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full flex-col gap-4 opacity-30">
                    <RefreshCw className="w-8 h-8 animate-spin" />
                    <span className="uppercase tracking-widest text-xs">Waiting for agent signal...</span>
                  </div>
                )}
                {session?.status === 'running' && (
                  <div className="w-2 h-5 bg-accent animate-pulse ml-16"></div>
                )}
              </div>

              {session?.status === 'completed' && (
                <div className="bg-green-600 text-black px-6 py-3 font-black text-center border-t-4 border-black flex items-center justify-center gap-3 uppercase tracking-tighter">
                   <CheckCircle2 className="w-5 h-5" /> Task Successfully Executed
                </div>
              )}
            </div>
          </div>

        </div>

        {/* SECURITY FOOTER */}
        <div className="mt-12 p-6 border-4 border-black bg-black text-white/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
             <Shield className="w-5 h-5 text-accent" />
             <span className="text-[10px] font-black uppercase tracking-widest">End-to-End Encrypted Tunnel Active</span>
          </div>
          <div className="text-[10px] font-mono">
            HOST: LOCALHOST // NODE_ENV: DEVELOPMENT // LOGS: PERSISTENT
          </div>
        </div>

      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #000;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border: 2px solid #000;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #C0392B;
        }
      `}</style>
    </div>
  );
}
