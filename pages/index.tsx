import { GetStaticProps } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import TerminalCookbook from '../components/BuilderFlowchart'
import HowToUseGuide from '../components/HowToUseGuide'
import { Terminal, BookOpen, Cpu, Command, ArrowRight } from 'lucide-react'
import { getAllRecipes } from '../lib/recipes'
import { Recipe } from '../lib/cookbook-data'
import { fetchFeaturedJobs, fetchFeaturedTools, fetchSiteSettings, JobRecord, ToolRecord } from '../lib/airtable'
import HorizontalStrip from '../components/HorizontalStrip'
import JobCard from '../components/JobCard'
import AIToolCard from '../components/AIToolCard'
import NewsletterForm from '../components/NewsletterForm'
import ArchetypeQuiz from '../components/ArchetypeQuiz'
import StrategicKits from '../components/StrategicKits'
import MockTerminal from '../components/MockTerminal'

interface HybridHomePageProps {
  recipes: Recipe[]
  featuredJobs: JobRecord[]
  featuredTools: ToolRecord[]
  siteSettings: Record<string, boolean>;
}

export default function HybridHomePage({ recipes, featuredJobs, featuredTools, siteSettings }: HybridHomePageProps) {
  const homepageTitle = "AI Blueprints: Copy, Paste, Automate Your Sales & Marketing";
  const homepageDescription = "Ditch endless chats. Turn Gemini & Claude into your personal assistants with professional text-file blueprints. No coding needed.";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com';

  return (
    <>
      <Head>
        <title>{homepageTitle}</title>
        <meta name="description" content={homepageDescription} key="description" />
        <meta property="og:title" content={homepageTitle} key="og:title" />
        <meta property="og:description" content={homepageDescription} key="og:description" />
        <meta property="og:image" content={`${baseUrl}/api/og?mode=home`} key="og:image" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Real AI Examples",
          "url": baseUrl,
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${baseUrl}/ai-examples?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        })}} />
      </Head>

      <div className="min-h-screen bg-brand-beige font-sans text-brand-navy fade-in">
        <Navbar />

        {/* HERO SECTION */}
        <div className="bg-brand-beige pt-20 pb-16">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-left">
                        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                            </span>
                            <span>The Global Blueprint Library</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-headline font-black text-brand-navy mb-6 tracking-tighter leading-[0.9]">
                            Stop Prompting. <br />
                            <span className="text-accent">Start Automating.</span>
                        </h1>
                        
                        <p className="text-xl text-brand-navy/80 mb-10 leading-relaxed max-w-lg">
                            Turn AI Agents into your personal Revenue Ops team. 
                            <strong> 600+ work-ready blueprints</strong> for Sales, Marketing, and SEO. 
                            No coding. Just results.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                            <a 
                                href="#blueprints" 
                                className="w-full sm:w-auto px-10 py-5 bg-brand-navy hover:bg-black text-white font-sans font-bold rounded-xl transition-all shadow-xl hover:shadow-2xl uppercase tracking-wider text-sm flex items-center justify-center gap-2"
                            >
                                Browse the Library <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>

                        {/* Compatibility Bar */}
                        <div className="pt-8 border-t border-brand-navy/5">
                            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-brand-navy/30 mb-4">Optimized for agentic workflows:</p>
                            <div className="flex flex-wrap gap-4 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                                <span className="flex items-center gap-1.5 text-xs font-bold"><Cpu className="w-4 h-4" /> Claude Code</span>
                                <span className="flex items-center gap-1.5 text-xs font-bold"><Command className="w-4 h-4" /> Gemini CLI</span>
                                <span className="flex items-center gap-1.5 text-xs font-bold"><Terminal className="w-4 h-4" /> Cursor</span>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block relative">
                        <div className="absolute -inset-4 bg-accent/5 blur-3xl rounded-full"></div>
                        <MockTerminal />
                    </div>
                </div>
            </div>
        </div>

        {/* HOW TO USE GUIDE */}
        <HowToUseGuide />

        {/* COOKBOOK GRID */}
        <div className="bg-brand-beige pb-16" id="blueprints">
            <div className="container mx-auto px-4">
               <TerminalCookbook recipes={recipes} />
            </div>
        </div>

        {/* PHILOSOPHY SECTION */}
        <div className="bg-brand-beige py-16 border-t border-brand-navy/10">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <div className="bg-white rounded-md border border-brand-navy/10 p-8 md:p-10 text-left shadow-sm">
                        <h2 className="text-2xl font-headline font-bold text-brand-navy mb-4 flex items-center gap-2">
                        <span className="bg-blue-100 text-blue-700 p-1.5 rounded-lg"><Terminal className="w-5 h-5"/></span>
                        CLI & Folder Agents
                        </h2>
                        <p className="text-brand-navy/80 leading-relaxed mb-6">
                        If you use <strong>Gemini CLI</strong>, <strong>Claude Code</strong>, or the new <strong>Claude Cowork</strong>, these blueprints act as your foundation. 
                        Drop a blueprint into a folder or paste it into the agent, and it understands the full scope: 
                        from creating files to handling complex workflows.
                        </p>
                        <div className="bg-brand-beige p-4 rounded-md border border-brand-navy/10 text-sm font-mono text-brand-navy/60">
                        Claude: "I've read the blueprint. Starting the build..." <span className="text-green-600">✓ Running</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-md border border-brand-navy/10 p-8 md:p-10 text-left shadow-sm">
                        <h2 className="text-2xl font-headline font-bold text-brand-navy mb-4 flex items-center gap-2">
                        <span className="bg-purple-100 text-purple-700 p-1.5 rounded-lg"><Cpu className="w-5 h-5"/></span>
                        For AI Editors
                        </h2>
                        <p className="text-brand-navy/80 leading-relaxed mb-6">
                        Using <strong>Cursor</strong> or <strong>Windsurf</strong>? Paste the blueprint into the "Composer" or "Chat" window. 
                        The AI will read the 'Role', 'Objective', and 'Workflow' and build the entire tool in your project folder automatically.
                        </p>
                        <div className="bg-brand-beige p-4 rounded-md border border-brand-navy/10 text-sm font-mono text-brand-navy/60">
                        Composer: "Follow this blueprint to build..." <span className="text-purple-600">Generating...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* ARCHETYPE QUIZ */}
        <ArchetypeQuiz />

        {/* STRATEGIC KITS */}
        <StrategicKits />

        {/* FAQ SECTION */}
        <div className="bg-brand-beige py-20 border-t border-brand-navy/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-brand-navy mb-12 text-center uppercase tracking-tight">
              Behind the Blueprints: <span className="text-accent">Our Process</span>
            </h2>
            
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-sm border border-brand-navy/5 shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-brand-navy flex items-center gap-2">
                  <span className="text-accent text-lg">01</span> How are these blueprints created?
                </h3>
                <p className="text-brand-navy/70 leading-relaxed">
                  These aren't just theoretical prompts. They are a mixture of workflows we use internally while running our own agencies and projects, combined with AI to help us structure and scale the documentation. We identify real bottlenecks in Sales and Marketing, then architect a multi-step workflow that an AI agent can actually execute.
                </p>
              </div>

              <div className="bg-white p-8 rounded-sm border border-brand-navy/5 shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-brand-navy flex items-center gap-2">
                  <span className="text-accent text-lg">02</span> Are these tested and verified?
                </h3>
                <p className="text-brand-navy/70 leading-relaxed">
                  Yes. We run and test these recipes regularly to ensure they work. For complex scenarios where we can't verify every single edge case ourselves, we rely on user feedback. We are constantly fixing bugs and updating the logic based on how these perform in the real world.
                </p>
              </div>

              <div className="bg-white p-8 rounded-sm border border-brand-navy/5 shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-brand-navy flex items-center gap-2">
                  <span className="text-accent text-lg">03</span> What if a blueprint doesn't work for me?
                </h3>
                <p className="text-brand-navy/70 leading-relaxed">
                  Reach out to us! If you find a bug or have a specific use case that isn't covered, let us know. We use your feedback to fix existing blueprints and build new ones that are relevant to the actual problems you're trying to solve.
                </p>
              </div>

              <div className="bg-white p-8 rounded-sm border border-brand-navy/5 shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-brand-navy flex items-center gap-2">
                  <span className="text-accent text-lg">04</span> Which AI tools can run these?
                </h3>
                <p className="text-brand-navy/70 leading-relaxed">
                  Our blueprints are tool-agnostic. They are optimized for "Folder Agents" like Claude Code, Gemini CLI, and Cursor, but they work in any environment that can read files and follow logical instructions.
                </p>
              </div>

              <div className="bg-white p-8 rounded-sm border border-brand-navy/5 shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-brand-navy flex items-center gap-2">
                  <span className="text-accent text-lg">05</span> Why use these instead of simple prompts?
                </h3>
                <p className="text-brand-navy/70 leading-relaxed">
                  Simple prompts often fail at complex tasks like tiered commission math or fuzzy lead matching. We've built the underlying logic into these blueprints so you don't have to spend hours debugging prompts. They are designed to be work-ready systems, not just text generators.
                </p>
              </div>

              <div className="bg-white p-8 rounded-sm border border-brand-navy/5 shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-brand-navy flex items-center gap-2">
                  <span className="text-accent text-lg">06</span> Is it safe to download these ZIP bundles?
                </h3>
                <p className="text-brand-navy/70 leading-relaxed">
                  Yes. Our bundles contain **100% plain text files** (.md for the blueprint and .csv for the sample data). We never include executables, scripts, or binaries. You can even inspect the files in any text editor before using them. If you prefer not to download, every blueprint can also be copied and pasted directly from the page.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="bg-white text-brand-navy py-16" id="newsletter">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-4xl sm:text-5xl font-headline font-bold mb-4 uppercase tracking-tight text-accent">
              📬 Don't Miss Out!
            </h2>
            <p className="text-xl mb-8 font-sans text-brand-navy/70">
              Get 5-10 hand-picked AI blueprints delivered weekly. Join hundreds of subscribers learning to use AI practically.
            </p>
            
            <div className="max-w-[500px] mx-auto">
              <NewsletterForm />
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<HybridHomePageProps> = async () => {
  try {
    const [recipes, featuredJobs, featuredTools, siteSettingsData] = await Promise.all([
      Promise.resolve(getAllRecipes()),
      fetchFeaturedJobs(),
      fetchFeaturedTools(),
      fetchSiteSettings(),
    ]);

    const siteSettings: Record<string, boolean> = {};
    siteSettingsData.forEach(setting => {
      siteSettings[setting.settingName] = setting.enabled;
    });

    return {
      props: { recipes, featuredJobs, featuredTools, siteSettings },
      revalidate: 300,
    }
  } catch (error) {
    console.error('Failed to fetch data for homepage:', error)
    return {
      props: { recipes: [], featuredJobs: [], featuredTools: [], siteSettings: {} },
      revalidate: 60,
    }
  }
}
