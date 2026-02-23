import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, Terminal, Copy, Check, Download, FileText, Cpu, BookOpen, Lock, Crown, Key, ArrowRight, X, Package, ShieldCheck, Clock } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { getAllRecipes, getRelatedRecipes } from '../../lib/recipes';
import { Recipe, categoryIcons } from '../../lib/cookbook-data';
import { generateHowToSchema, generateFAQSchema, injectInternalLinks, generateSoftwareAppSchema } from '../../lib/seo-utils';
import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import NewsletterSignup from '../../components/NewsletterSignup';

interface RecipePageProps {
  recipe: Recipe;
  relatedRecipes: Recipe[];
  linkedDescription: string;
  schema: any[];
}

const SimpleMarkdown = ({ text }: { text: string }) => {
  if (!text) return null;
  // Split by links [text](url)
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <span>
      {parts.map((part, i) => {
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          return <Link key={i} href={linkMatch[2]} className="text-[#ff00ff] hover:bg-[#ccff00] hover:text-black transition-colors font-black underline decoration-2">{linkMatch[1]}</Link>;
        }
        return part;
      })}
    </span>
  );
};

const VerifiedTerminal = ({ run }: { run: Recipe['verifiedRun'] }) => {
  const [visibleLines, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (visibleLines < run.log.length) {
      const timer = setTimeout(() => setVisibleCount(prev => prev + 1), 800);
      return () => clearTimeout(timer);
    }
  }, [visibleLines, run]);

  if (!run) return null;

  return (
    <div className="mt-12 bg-black border-4 border-black brutalist-shadow-sm overflow-hidden font-mono text-xs md:text-sm relative">
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b-4 border-black">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
          </div>
          <span className="text-black text-[10px] uppercase tracking-widest font-black ml-2 italic flex items-center gap-2">
            <ShieldCheck className="w-3 h-3 text-emerald-600 stroke-[3px]" /> Proof of Execution
          </span>
        </div>
        <div className="text-[9px] text-black font-black uppercase tracking-widest">
          {run.date} // Agent: {run.agent}
        </div>
      </div>
      
      <div className="p-6 min-h-[200px] flex flex-col gap-2.5 bg-black">
        {run.log.slice(0, visibleLines).map((line, idx) => (
          <div key={idx} className="animate-in fade-in slide-in-from-left-2 duration-500">
            {line.type === 'input' && (
              <span className="text-[#00ffff]">
                <span className="text-[#ccff00] mr-2">➜</span>
                {line.text}
              </span>
            )}
            {line.type === 'system' && <span className="text-white/40">{line.text}</span>}
            {line.type === 'success' && <span className="text-[#ccff00] font-black">{line.text}</span>}
            {line.type === 'report' && (
              <div className="mt-3 p-4 bg-[#ccff00]/10 rounded-none border-2 border-[#ccff00]/30 text-[#ccff00] italic text-xs leading-relaxed uppercase font-black">
                "{line.text}"
              </div>
            )}
          </div>
        ))}
        {visibleLines < run.log.length && (
          <div className="w-2 h-5 bg-[#ccff00] animate-pulse inline-block ml-1"></div>
        )}
      </div>

      {run.outputFile && visibleLines >= run.log.length && (
        <div className="border-t-2 border-white/10 bg-white/5 p-6 animate-in fade-in duration-1000">
           <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-black font-mono">Generated: {run.outputFile.name}</span>
              <a 
                href={run.outputFile.url} 
                download 
                className="text-[10px] font-black text-[#ccff00] hover:bg-[#ccff00] hover:text-black px-2 py-1 border border-[#ccff00] flex items-center gap-1.5 transition-all uppercase"
              >
                <Download className="w-3 h-3 stroke-[3px]" /> Download Proof
              </a>
           </div>
           <div className="bg-black/50 border border-white/10 rounded-none p-4 font-mono text-[11px] text-white/60 overflow-x-auto whitespace-pre">
              {run.outputFile.preview}
           </div>
        </div>
      )}
    </div>
  );
};

export default function RecipePage({ recipe, relatedRecipes, linkedDescription, schema }: RecipePageProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showLicenseInput, setShowLicenseInput] = useState(false);
  const [licenseKeyInput, setLicenseKeyInput] = useState('');
  const [unlockError, setUnlockError] = useState('');

  const CatIcon = categoryIcons[recipe.category] || Terminal;

  useEffect(() => {
    const hasAccess = localStorage.getItem('terminal_cookbook_premium_v2') === 'true';
    if (hasAccess) {
      setIsUnlocked(true);
    }

    if (router.isReady) {
      const { license_key } = router.query;
      if (license_key === 'TK-8821-XPRO-MQ') {
        setIsUnlocked(true);
        localStorage.setItem('terminal_cookbook_premium_v2', 'true');
        router.replace(`/skills/${recipe.id}`, undefined, { shallow: true });
      }
    }
  }, [router.isReady, router.query, recipe.id]);

  const handleLicenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (licenseKeyInput.trim() === 'TK-8821-XPRO-MQ') {
      setIsUnlocked(true);
      localStorage.setItem('terminal_cookbook_premium_v2', 'true');
      setShowLicenseInput(false);
      setUnlockError('');
    } else {
      setUnlockError('Invalid license key. Please check your purchase email.');
    }
  };

  const handleCopy = () => {
    if (recipe.isPremium && !isUnlocked) return;
    navigator.clipboard.writeText(recipe.blueprint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    if (recipe.isPremium && !isUnlocked) return;
    
    const zip = new JSZip();
    
    // Add the main blueprint file
    zip.file(`${recipe.id}.md`, recipe.blueprint);
    
    // Add sample data if it exists
    if (recipe.sampleData) {
        zip.file(recipe.sampleData.filename, recipe.sampleData.content);
    }

    // Add a simple README
    const readmeContent = `# ${recipe.title}
    
${recipe.description}

## Usage
1. Use the '${recipe.id}.md' file as your prompt/blueprint.
${recipe.sampleData ? `2. The file '${recipe.sampleData.filename}' contains sample data for this workflow.` : ''}

Downloaded from RealAIExamples.com`;

    zip.file("README.txt", readmeContent);

    // Generate and trigger download
    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${recipe.id}-bundle.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const isLocked = recipe.isPremium && !isUnlocked;
  const SITE_URL = 'https://realaiexamples.com';
  const ogImageUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(recipe.title)}&category=${encodeURIComponent(recipe.category)}&tagline=${encodeURIComponent(recipe.tagline)}`;

  const blueprintParts = recipe.blueprint.split('### Phase 2:');
  const publicBlueprint = blueprintParts[0];
  const privateBlueprint = blueprintParts.length > 1 ? `### Phase 2:${blueprintParts[1]}` : '';

  return (
    <div className="flex flex-col min-h-screen bg-primary-bg text-black selection:bg-[#ff00ff] selection:text-white">
      <Head>
        <title>{recipe.title} | AI Agent Blueprint | Real AI Examples</title>
        <meta name="description" content={recipe.description} key="description" />
        <meta property="og:title" content={`${recipe.title} | AI Agent Blueprint`} key="og:title" />
        <meta property="og:description" content={recipe.description} key="og:description" />
        <meta property="og:url" content={`${SITE_URL}/skills/${recipe.id}`} key="og:url" />
        <meta property="og:image" content={ogImageUrl} key="og:image" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="article" key="og:type" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:site" content="@realaiexamples" />
        <meta name="twitter:title" content={`${recipe.title} | AI Agent Blueprint`} key="twitter:title" />
        <meta name="twitter:description" content={recipe.description} key="twitter:description" />
        <meta name="twitter:image" content={ogImageUrl} key="twitter:image" />

        <link rel="canonical" href={`${SITE_URL}/skills/${recipe.id}`} key="canonical" />
        <meta name="robots" content="noindex" />
      </Head>
      
      <Navbar />

      <main className="flex-grow container mx-auto px-4 pt-32 pb-24 max-w-4xl relative z-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff00ff] opacity-10 blur-xl"></div>
        
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-3 text-xs font-black font-mono uppercase tracking-widest text-black/40 mb-12">
            <Link href="/" className="hover:text-black flex items-center gap-1 shrink-0 bg-white px-2 py-1 border border-black">
              <ArrowLeft className="w-3 h-3 stroke-[3px]" /> Hub
            </Link>
            <span className="text-black">/</span>
            <span className="text-black truncate">{recipe.title}</span>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-10">
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 bg-black flex items-center justify-center border-4 border-black brutalist-shadow-sm ${isLocked ? 'text-[#ccff00]' : 'text-[#ff00ff]'}`}>
                  {isLocked ? <Crown className="w-10 h-10 stroke-[3px]" /> : <CatIcon className="w-10 h-10 stroke-[3px]" />}
                </div>
                <div>
                  <h1 className="text-3xl md:text-5xl font-display text-black uppercase leading-[0.9] glitch-text" data-text={recipe.title.toUpperCase()}>
                      {recipe.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <span className={`px-2 py-0.5 border-2 border-black text-[10px] font-black uppercase tracking-widest ${isLocked ? 'bg-black text-[#ccff00]' : 'bg-[#ccff00] text-black'}`}>
                      {isLocked ? 'Premium' : recipe.category}
                    </span>
                    <span className="px-2 py-0.5 border-2 border-black text-[10px] font-black uppercase tracking-widest bg-white text-black">
                      {recipe.difficulty}
                    </span>
                    <span className="text-black font-black font-mono text-[10px] flex items-center gap-2 uppercase bg-gray-100 px-2 py-0.5 border border-black ml-2">
                      <Terminal className="w-3 h-3 stroke-[3px]" /> {recipe.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Overview */}
            <div className="border-l-8 border-[#ff00ff] pl-8 py-4 bg-white border-4 border-black brutalist-shadow">
              <p className="text-black text-xl font-bold uppercase leading-tight font-sans">
                <SimpleMarkdown text={linkedDescription || recipe.description} />
              </p>
            </div>
          </div>

          {recipe.verifiedRun && (
            <div className="mb-16">
               <VerifiedTerminal run={recipe.verifiedRun} />
            </div>
          )}

          {/* Locked or Unlocked Content */}
          <div className="bg-black border-4 border-black brutalist-shadow mb-16 flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              
              {/* Toolbar */}
              <div className="bg-white px-6 py-4 border-b-4 border-black flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-center gap-4">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-black"></div>
                        <div className="w-3 h-3 bg-black"></div>
                        <div className="w-3 h-3 bg-black"></div>
                      </div>
                      <span className="text-black font-black font-mono text-xs flex items-center gap-3 uppercase tracking-widest">
                        <FileText className="w-4 h-4" /> {recipe.id}.md
                      </span>
                  </div>

                  {!isLocked && (
                    <>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                          {/* Download Button */}
                          <a
                              href={`/downloads/skills/${recipe.id}-claude.md`}
                              download
                              className="flex-1 sm:flex-none flex items-center justify-center gap-3 bg-black text-white px-6 py-3 border-2 border-black font-display text-sm uppercase transition-all brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                          >
                              <FileText className="w-5 h-5 stroke-[3px]" /> Download Blueprint (.md)
                          </a>

                          {/* Standard Actions */}
                          <div className="flex items-center gap-3">
                              <button
                                  onClick={handleDownloadZip}
                                  className="bg-[#ccff00] text-black px-4 py-2 border-2 border-black font-display text-[10px] uppercase transition-all brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                              >
                                  <Package className="w-4 h-4 inline mr-2 stroke-[3px]" />
                                  Bundle
                              </button>
                              <button
                                  onClick={handleCopy}
                                  className={`px-4 py-2 border-2 border-black font-display text-[10px] uppercase transition-all brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none ${
                                      copied
                                      ? 'bg-emerald-400 text-black'
                                      : 'bg-white text-black hover:bg-[#ff00ff] hover:text-white'
                                  }`}
                              >
                                  {copied ? <Check className="w-4 h-4 stroke-[3px]" /> : <Copy className="w-4 h-4 stroke-[3px]" />}
                                  {copied ? 'Copied' : 'Copy'}
                              </button>
                          </div>
                      </div>
                      <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mt-2">
                          Works with Claude Code, Gemini CLI, Cursor, and all major agent tools
                      </p>
                    </>
                  )}
              </div>

              {/* Code Content */}
              <div className="p-8 relative z-10 bg-black/40">
                <pre className="font-mono text-sm text-[#00ffff] whitespace-pre-wrap leading-relaxed uppercase font-black">
                    {publicBlueprint}
                    {!isLocked && privateBlueprint}
                </pre>
              </div>
          </div>

          {isLocked && (
              <div className="bg-[#ccff00] border-4 border-black p-12 text-center brutalist-shadow relative overflow-hidden mb-24">
                 <div className="relative z-10">
                    <div className="w-24 h-24 bg-black flex items-center justify-center mx-auto mb-10 border-4 border-black brutalist-shadow-sm shadow-[#ff00ff] rotate-3 text-white">
                      <Lock className="w-12 h-12 stroke-[4px]" />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display text-black mb-6 uppercase leading-tight">Logic Locked</h2>
                    <p className="text-black font-black font-mono text-sm mb-12 uppercase tracking-[0.2em] max-w-lg mx-auto leading-relaxed">
                      // Processing and Output phases are available to Pro members.
                    </p>
                    
                    {!showLicenseInput ? (
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                            <a 
                              href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP?session=sess_GCYotd6plh"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-black text-white px-12 py-6 border-4 border-white font-display text-2xl uppercase transition-all brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                            >
                              Unlock All ($39) <ArrowRight className="w-8 h-8 stroke-[4px] inline-block ml-2" />
                            </a>
                            <button 
                              onClick={() => setShowLicenseInput(true)}
                              className="text-black font-black font-mono text-sm uppercase underline decoration-4 decoration-black underline-offset-8 hover:text-white transition-colors"
                            >
                              Enter License Key
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleLicenseSubmit} className="max-w-md mx-auto bg-white border-4 border-black p-10 brutalist-shadow-sm">
                            <div className="flex items-center justify-between mb-8 border-b-4 border-black pb-4">
                                <h3 className="text-2xl font-display text-black uppercase">Enter Key</h3>
                                <button type="button" onClick={() => setShowLicenseInput(false)} className="p-2 hover:bg-gray-100 border-2 border-transparent hover:border-black transition-all">
                                    <X className="w-8 h-8 text-black stroke-[3px]" />
                                </button>
                            </div>
                            <input 
                                type="text" 
                                value={licenseKeyInput}
                                onChange={(e) => setLicenseKeyInput(e.target.value)}
                                placeholder="TK-XXXX-XXXX-XXXX"
                                className="w-full bg-gray-50 border-4 border-black text-black font-display text-xl px-6 py-5 focus:bg-[#ccff00] outline-none text-center uppercase tracking-widest placeholder-gray-300 mb-8"
                            />
                            <button 
                                type="submit"
                                className="w-full bg-black text-white font-display py-6 border-4 border-black hover:bg-[#ff00ff] transition-all brutalist-shadow-sm uppercase text-xl"
                            >
                                <Key className="w-8 h-8 stroke-[3px] inline mr-4" /> Activate
                            </button>
                        </form>
                    )}
                 </div>
              </div>
          )}

          {!isLocked && (
              <>
                {recipe.sampleOutput && (
                  <div className="mb-24 border-l-8 border-black pl-10">
                    <h2 className="text-xl font-display text-black uppercase tracking-widest mb-8 decoration-wavy underline decoration-[#00ffff]">
                      Sample Output
                    </h2>
                    <div className="bg-white border-4 border-black p-8 brutalist-shadow-sm font-mono text-sm text-black font-black uppercase leading-relaxed max-h-[400px] overflow-y-auto">
                      {recipe.sampleOutput}
                    </div>
                  </div>
                )}

                {/* Simplified Instructions */}
                <div className="mb-24">
                    <div className="bg-white border-4 border-black p-10 brutalist-shadow">
                        <h3 className="text-3xl font-display text-black mb-10 uppercase flex items-center gap-4">
                            <Terminal className="w-10 h-10 stroke-[3px]" />
                            Execution
                        </h3>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="border-l-4 border-[#ff00ff] pl-6">
                                <span className="text-[10px] font-black font-mono text-gray-400 uppercase tracking-widest mb-4 block">Option 1: The Easy Way</span>
                                <p className="text-lg text-black font-bold uppercase leading-tight">Download the <span className="bg-[#ff00ff] text-white px-1">Bundle Zip</span> above. It contains everything.</p>
                            </div>
                            <div className="border-l-4 border-[#ccff00] pl-6">
                                <span className="text-[10px] font-black font-mono text-gray-400 uppercase tracking-widest mb-4 block">Option 2: Terminal</span>
                                <div className="bg-black border-2 border-black p-4 font-mono text-xs text-[#ccff00] uppercase font-black">
                                    gemini "Read @{recipe.id}.md execute"
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </>
          )}

          {/* Related Blueprints */}
          {relatedRecipes && relatedRecipes.length > 0 && (
            <div className="border-t-4 border-black pt-20 mt-20">
              <h3 className="text-4xl font-display text-black mb-12 uppercase decoration-wavy underline decoration-[#ff00ff]">
                <BookOpen className="w-10 h-10 text-black stroke-[3px] inline mr-4" />
                Related Blueprints
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedRecipes.map(related => (
                  <Link key={related.id} href={`/skills/${related.id}`} className="group flex flex-col bg-white border-4 border-black p-6 brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all h-full">
                    <div className="flex items-center justify-between mb-6">
                      <span className="bg-black text-[#ccff00] text-[10px] font-black px-2 py-0.5 border-2 border-black uppercase tracking-widest">
                        {related.difficulty}
                      </span>
                      <Terminal className="w-5 h-5 text-black group-hover:text-[#ff00ff] transition-colors stroke-[3px]" />
                    </div>
                    <h4 className="text-xl font-display text-black mb-4 line-clamp-2 uppercase leading-tight group-hover:text-[#ff00ff] transition-colors">
                      {related.title}
                    </h4>
                    <p className="text-xs font-black font-mono text-black/60 mb-8 line-clamp-3 uppercase tracking-tighter">
                      // {related.tagline}
                    </p>
                    <div className="mt-auto pt-4 border-t-2 border-black/10 text-black font-display text-[10px] uppercase">
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 stroke-[3px]" /> {related.time}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="mt-32 border-t-4 border-black border-dotted pt-24">
            <NewsletterSignup />
          </div>

        </div>
      </main>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const recipes = getAllRecipes();
  const paths = recipes
    .filter((recipe) => recipe.id)
    .map((recipe) => ({
      params: { id: recipe.id },
    }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const recipes = getAllRecipes();
  const recipe = recipes.find((r) => r.id === params?.id);

  if (!recipe) {
    return { notFound: true };
  }

  const relatedRecipes = recipes
    .filter(r => r.category === recipe.category && r.id !== recipe.id)
    .slice(0, 3);

  const linkedDescription = injectInternalLinks(recipe.description, recipes);

  const SITE_URL = 'https://realaiexamples.com';
  const ogImageUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(recipe.title)}&category=${encodeURIComponent(recipe.category)}&tagline=${encodeURIComponent(recipe.tagline)}`;
  
  const howTo = generateHowToSchema(recipe, SITE_URL, ogImageUrl);
  const faq = generateFAQSchema(recipe);
  const software = generateSoftwareAppSchema(recipe, SITE_URL);
  const schema = [howTo, faq, software].filter(Boolean);

  return {
    props: {
      recipe,
      relatedRecipes,
      linkedDescription,
      schema
    },
  };
};
