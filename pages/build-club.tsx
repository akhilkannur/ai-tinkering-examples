import Head from 'next/head'
import Navbar from '../components/Navbar'
import { Terminal, Hammer, Target, XCircle, CheckCircle2, ArrowRight, ShieldAlert } from 'lucide-react'

export default function BuildClub() {
  const title = "The AI Execution Group | Stop Planning, Start Shipping";
  const description = "A small execution group for people who want to build with AI consistently. No courses, no gurus, just weekly shipping goals.";

  return (
    <div className="min-h-screen bg-primary-bg font-sans text-text-color selection:bg-accent selection:text-white">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://realaiexamples.com/api/og?mode=dark" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Navbar />

      <main className="pt-32 pb-20">
        
        {/* HERO */}
        <div className="container mx-auto px-4 max-w-4xl text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
            <Hammer className="w-3 h-3" /> Beta Testing Phase
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-[1.1]">
            Stop Planning. <br />
            <span className="text-accent">Start Shipping.</span>
          </h1>
          
          <p className="text-xl text-text-secondary mb-10 leading-relaxed max-w-2xl mx-auto">
            For the past month, I've been consistently shipping small AI tools. <br/>
            Nothing fancy. Just things that run. <br/><br/>
            I noticed a lot of you have the tools (ChatGPT, Claude), but get stuck <strong>deciding what to build</strong> and <strong>finishing it</strong>.
          </p>

          <a 
            href="mailto:akhil.1000what@gmail.com?subject=I want to join the Execution Group&body=Tell me a bit about what you want to build:"
            className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-200 font-bold px-8 py-4 rounded-xl text-lg transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Apply to Join Beta <ArrowRight className="w-5 h-5" />
          </a>
          <p className="mt-4 text-xs text-text-secondary/50 uppercase tracking-widest font-mono">Limited spots. Serious builders only.</p>
        </div>

        {/* THE PITCH */}
        <div className="container mx-auto px-4 max-w-3xl mb-24">
          <div className="bg-secondary-bg border border-navy-dark rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background noise */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-6">This is NOT a course.</h2>
              <p className="text-lg text-text-secondary leading-relaxed mb-8">
                I am not "teaching" AI. This is not expert-led. <br/>
                This is a <strong>small execution group</strong> for people who want to build with AI more consistently.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-bold text-green-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> How it Works
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="bg-green-500/10 text-green-400 w-6 h-6 flex items-center justify-center rounded text-xs font-bold mt-0.5">1</span>
                      <span className="text-text-secondary text-sm">Everyone shares what they want to build.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-green-500/10 text-green-400 w-6 h-6 flex items-center justify-center rounded text-xs font-bold mt-0.5">2</span>
                      <span className="text-text-secondary text-sm">Each week you commit to a <strong>realistic goal</strong>.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-green-500/10 text-green-400 w-6 h-6 flex items-center justify-center rounded text-xs font-bold mt-0.5">3</span>
                      <span className="text-text-secondary text-sm">You ship proof. Loom, screenshot, demo, or repo. Real artifacts only.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-green-500/10 text-green-400 w-6 h-6 flex items-center justify-center rounded text-xs font-bold mt-0.5">4</span>
                      <span className="text-text-secondary text-sm">I help <strong>push scope down</strong> so you actually finish.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <XCircle className="w-4 h-4" /> What This Is Not
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-text-secondary text-sm">
                      <span className="text-red-500/50">×</span> No tutorials.
                    </li>
                    <li className="flex items-center gap-3 text-text-secondary text-sm">
                      <span className="text-red-500/50">×</span> No learning sessions.
                    </li>
                    <li className="flex items-center gap-3 text-text-secondary text-sm">
                      <span className="text-red-500/50">×</span> No passive Discord lurking.
                    </li>
                    <li className="flex items-center gap-3 text-text-secondary text-sm">
                      <span className="text-red-500/50">×</span> No motivation talk.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WHO IS THIS FOR */}
        <div className="container mx-auto px-4 max-w-2xl text-center mb-24">
          <h2 className="text-3xl font-bold text-white mb-12">Who is this for?</h2>
          
          <div className="grid gap-4">
            <div className="bg-[#0D1117] p-6 rounded-xl border border-navy-dark flex items-center gap-4 text-left hover:border-accent/50 transition-colors">
              <div className="bg-blue-500/10 p-3 rounded-lg text-blue-400"><Terminal className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-white">Builders & Tinkerers</h3>
                <p className="text-sm text-text-secondary">You already have the tools. You just need the push.</p>
              </div>
            </div>

            <div className="bg-[#0D1117] p-6 rounded-xl border border-navy-dark flex items-center gap-4 text-left hover:border-accent/50 transition-colors">
              <div className="bg-purple-500/10 p-3 rounded-lg text-purple-400"><Target className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-white">Non-Technical Allowed</h3>
                <p className="text-sm text-text-secondary">You don't need to be a dev. You just need to want to ship.</p>
              </div>
            </div>

            <div className="bg-[#0D1117] p-6 rounded-xl border border-navy-dark flex items-center gap-4 text-left hover:border-accent/50 transition-colors">
              <div className="bg-orange-500/10 p-3 rounded-lg text-orange-400"><ShieldAlert className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-white">Action Bias</h3>
                <p className="text-sm text-text-secondary">For people who want to ship instead of planning forever.</p>
              </div>
            </div>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="container mx-auto px-4 text-center max-w-xl">
          <p className="text-lg text-text-secondary mb-8">
            I am running this because the process works for me and I want to see if it works in a group format.
          </p>
          <a 
            href="mailto:akhil.1000what@gmail.com?subject=I want to join the Execution Group"
            className="inline-block bg-accent hover:bg-accent-hover text-white font-bold px-12 py-4 rounded-xl text-lg transition-colors shadow-lg shadow-accent/20"
          >
            I'm In. Let's Build.
          </a>
          <p className="mt-6 text-sm text-text-secondary/60">
            *If you want step-by-step instructions or a guru, this will not be a fit.
          </p>
        </div>

      </main>
    </div>
  )
}
