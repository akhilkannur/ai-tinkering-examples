import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Terminal, Target, ArrowRight, Zap, BarChart, PenTool } from 'lucide-react'
import Link from 'next/link'

export default function ZeroBudgetMarketing() {
  const title = "How to Market a SaaS with $0 Budget (The AI Stack)";
  const description = "Beat funded competitors using free AI agents. A complete automated marketing stack for bootstrappers.";

  const stack = [
    {
      title: "1. The Spy",
      icon: Target,
      role: "Competitor Intelligence",
      problem: "Competitors have teams of analysts.",
      solution: "Use the 'Competitor Tech Stack Spy' agent. It visits their site, identifies their tools (HubSpot? Segment?), and writes a report on their maturity.",
      link: "/blueprints/competitor-tech-stack-spy"
    },
    {
      title: "2. The Content Machine",
      icon: PenTool,
      role: "Content Repurposing",
      problem: "You can't afford a social media agency.",
      solution: "Record one loom video. Use the 'Repurposing Engine' to turn the transcript into a blog post, 5 tweets, and a LinkedIn essay automatically.",
      link: "/blueprints/content-repurposer"
    },
    {
      title: "3. The Hunter",
      icon: Zap,
      role: "Outbound Sales",
      problem: "Manual DMs are too slow.",
      solution: "The 'Cold Email Writer' reads a prospect's LinkedIn profile and generates a hyper-personalized icebreaker. No generic spam.",
      link: "/blueprints/cold-email-writer"
    }
  ];

  return (
    <div className="min-h-screen bg-primary-bg font-sans text-text-color selection:bg-accent selection:text-white">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Navbar />

      <main className="pt-32 pb-20 container mx-auto px-4 max-w-4xl">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-green-500/20">
            <Terminal className="w-3 h-3" /> Validated Strategy
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            How to Market a SaaS with <br/>
            <span className="text-green-400">$0 Budget.</span>
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
            Your competitor raised $81M. You have $0. <br/>
            You can't out-spend them, but you can <strong>out-automate</strong> them. <br/>
            Here is the exact "AI Stack" needed to run a marketing department of 10 people, solo.
          </p>
        </div>

        {/* THE STACK */}
        <div className="grid gap-8 mb-20">
          {stack.map((item, idx) => (
            <div key={idx} className="bg-secondary-bg border border-navy-dark rounded-2xl p-8 hover:border-accent/30 transition-all flex flex-col md:flex-row gap-8 items-start group">
              <div className="bg-primary-bg p-4 rounded-xl border border-navy-dark text-accent group-hover:scale-110 transition-transform">
                <item.icon className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <div className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-4">{item.role}</div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-red-500/5 p-4 rounded-lg border border-red-500/10">
                    <span className="text-red-400 font-bold text-xs uppercase block mb-2">The Problem</span>
                    <p className="text-sm text-text-secondary">{item.problem}</p>
                  </div>
                  <div className="bg-green-500/5 p-4 rounded-lg border border-green-500/10">
                    <span className="text-green-400 font-bold text-xs uppercase block mb-2">The AI Fix</span>
                    <p className="text-sm text-text-secondary">{item.solution}</p>
                  </div>
                </div>

                <Link href={item.link} className="inline-flex items-center gap-2 text-white font-bold hover:text-accent transition-colors">
                  Get the Blueprint <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-accent/10 border border-accent/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Want to build this stack?</h2>
          <p className="text-lg text-text-secondary mb-8">
            Join the <strong>AI Execution Group</strong>. We are building these exact tools this week. <br/>
            Stop planning. Start shipping.
          </p>
          <Link href="/build-club" className="inline-block bg-accent hover:bg-accent-hover text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg shadow-accent/20">
            Join the Build Club ($29/mo)
          </Link>
        </div>

      </main>
      
      <Footer />
    </div>
  )
}
