import { GetStaticProps } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import TerminalCookbook from '../components/BuilderFlowchart'
import HowToUseGuide from '../components/HowToUseGuide'
import { Terminal, BookOpen, Cpu, Command } from 'lucide-react'
import { getAllRecipes } from '../lib/recipes'
import { Recipe } from '../lib/cookbook-data'
import { fetchFeaturedJobs, fetchFeaturedTools, fetchSiteSettings, JobRecord, ToolRecord } from '../lib/airtable'
import HorizontalStrip from '../components/HorizontalStrip'
import JobCard from '../components/JobCard'
import AIToolCard from '../components/AIToolCard'
import NewsletterForm from '../components/NewsletterForm'

interface HybridHomePageProps {
  recipes: Recipe[]
  featuredJobs: JobRecord[]
  featuredTools: ToolRecord[]
  siteSettings: Record<string, boolean>;
}

export default function HybridHomePage({ recipes, featuredJobs, featuredTools, siteSettings }: HybridHomePageProps) {
  const homepageTitle = "AI Blueprints: Copy, Paste, Automate Your Work";
  const homepageDescription = "Ditch endless chats. Turn Gemini & Claude into your personal assistants with simple text-file blueprints. No coding needed.";
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
          "name": homepageTitle,
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
        <div className="bg-brand-beige pt-16 pb-12">
            <div className="container mx-auto px-4 text-center max-w-4xl">
                <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                    <BookOpen className="w-4 h-4" />
                    <span>The Work Automation Library</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-headline font-bold text-brand-navy mb-6 tracking-tight leading-tight">
                    AI Blueprints: <br />
                    <span className="text-accent">
                    Copy, Paste, Automate Your Work.
                    </span>
                </h1>
                
                <p className="text-lg md:text-xl text-brand-navy/80 max-w-2xl mx-auto leading-relaxed mb-4">
                    Ditch endless chats. Get real work done.
                </p>
                <p className="text-md md:text-lg text-brand-navy/60 max-w-2xl mx-auto leading-relaxed mb-10">
                    Turn tools like Gemini & Claude into your personal assistants — <strong>No Coding Needed.</strong>
                    <br className="hidden md:block"/>
                    Simple text files you can run instantly on free tools.
                </p>

                {/* Compatibility Badge */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-brand-navy/60 mb-2">
                    <span className="uppercase tracking-widest font-bold text-xs">Use with:</span>
                    <div className="flex flex-wrap justify-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-brand-navy font-medium border border-gray-200">
                        <Cpu className="w-4 h-4 text-purple-600" /> Claude Cowork
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-brand-navy font-medium border border-gray-200">
                        <Command className="w-4 h-4 text-blue-600" /> Gemini CLI
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-brand-navy font-medium border border-gray-200">
                        <Terminal className="w-4 h-4 text-gray-600" /> Cursor
                    </span>
                    </div>
                </div>
            </div>
        </div>

        {/* HOW TO USE GUIDE */}
        <HowToUseGuide />

        {/* COOKBOOK GRID */}
        <div className="bg-brand-beige pb-16">
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

        {/* SECONDARY CONTENT: FEATURED TOOLS */}
        {siteSettings.enableFeaturedToolsSection && featuredTools.length > 0 && (
          <div className="bg-brand-beige py-16 border-y border-brand-navy/10">
             <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl sm:text-3xl font-headline font-bold text-brand-navy flex items-center gap-3 uppercase tracking-tight">
                    <span className="text-accent">#</span> Featured Tools
                  </h2>
                  <a href="/tools" className="text-brand-navy/60 hover:text-accent font-mono text-sm font-bold uppercase tracking-wider transition-colors flex items-center gap-2">
                    View All <span className="transform group-hover:translate-x-1">→</span>
                  </a>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {featuredTools.map((tool) => (
                    <div key={tool.id} className="h-full">
                       <AIToolCard
                          name={tool.toolName}
                          description={tool.shortDescription}
                          url={tool.websiteUrl}
                          imageUrl={tool.logo?.[0]?.url}
                          category={null} 
                        />
                    </div>
                  ))}
                </div>
             </div>
          </div>
        )}

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
