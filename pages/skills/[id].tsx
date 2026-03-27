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
    <div className="flex flex-col min-h-screen bg-coffee-100 text-coffee-900 selection:bg-coffee-300 selection:text-coffee-900">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
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

      <main className="flex-grow container mx-auto px-6 pt-32 md:pt-40 pb-24 max-w-4xl relative z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-coffee-200/30 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-3 text-[10px] font-bold font-mono uppercase tracking-widest text-coffee-400 mb-12">
            <Link href="/" className="hover:text-coffee-900 flex items-center gap-1 shrink-0 bg-white px-3 py-1.5 rounded-full border border-coffee-200 shadow-sm transition-all">
              <ArrowLeft className="w-3 h-3 stroke-[3px]" /> HUB
            </Link>
            <span>/</span>
            <span className="text-coffee-900 truncate">{recipe.title}</span>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-10">
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl bg-coffee-900 flex items-center justify-center shadow-soft ${isLocked ? 'text-coffee-300' : 'text-coffee-100'}`}>
                  {isLocked ? <Crown className="w-10 h-10 stroke-[2px]" /> : <CatIcon className="w-10 h-10 stroke-[2px]" />}
                </div>
                <div>
                  <h1 className="text-3xl md:text-5xl font-display font-semibold text-coffee-900 uppercase leading-[1.1]">
                      {recipe.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${isLocked ? 'bg-coffee-800 text-white' : 'bg-coffee-200 text-coffee-800'}`}>
                      {isLocked ? 'Premium' : recipe.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Overview */}
            <div className="border-l-4 border-coffee-500 pl-8 py-6 bg-white rounded-r-[2rem] shadow-soft border border-coffee-100">
              <p className="text-coffee-800 text-xl font-light leading-relaxed">
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
          <div className="bg-coffee-900 rounded-[2rem] shadow-soft mb-16 flex flex-col relative overflow-hidden border border-coffee-800">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              
              {/* Toolbar */}
              <div className="bg-white px-8 py-6 border-b border-coffee-800/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-center gap-4">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-coffee-200"></div>
                        <div className="w-3 h-3 rounded-full bg-coffee-200"></div>
                        <div className="w-3 h-3 rounded-full bg-coffee-200"></div>
                      </div>
                      <span className="text-coffee-900 font-bold font-mono text-xs flex items-center gap-3 uppercase tracking-widest">
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
                              className="flex-1 sm:flex-none flex items-center justify-center gap-3 bg-coffee-900 text-white px-6 py-3 rounded-full font-medium text-sm uppercase transition-all shadow-md hover:bg-coffee-700"
                          >
                              <FileText className="w-5 h-5 stroke-[2px]" /> Blueprint (.md)
                          </a>

                          {/* Standard Actions */}
                          <div className="flex items-center gap-3">
                              <button
                                  onClick={handleDownloadZip}
                                  className="bg-coffee-100 text-coffee-900 px-5 py-2.5 rounded-full font-medium text-[10px] uppercase transition-all border border-coffee-200 shadow-sm hover:bg-coffee-50"
                              >
                                  <Package className="w-4 h-4 inline mr-2" />
                                  BUNDLE
                              </button>
                              <button
                                  onClick={handleCopy}
                                  className={`px-5 py-2.5 rounded-full font-medium text-[10px] uppercase transition-all shadow-sm ${
                                      copied
                                      ? 'bg-emerald-500 text-white'
                                      : 'bg-white text-coffee-700 border border-coffee-200 hover:bg-coffee-50'
                                  }`}
                              >
                                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                  {copied ? 'Copied' : 'Copy'}
                              </button>
                          </div>
                      </div>
                    </>
                  )}
              </div>

              {/* Code Content */}
              <div className="p-10 relative z-10 bg-coffee-900/40">
                <pre className="font-mono text-sm text-coffee-100 whitespace-pre-wrap leading-relaxed font-medium">
                    {publicBlueprint}
                    {!isLocked && privateBlueprint}
                </pre>
              </div>
          </div>

          {isLocked && (
              <div className="bg-coffee-200 rounded-[2rem] p-12 text-center shadow-soft relative overflow-hidden mb-24 border border-coffee-300">
                 <div className="relative z-10">
                    <div className="w-20 h-20 bg-coffee-900 rounded-2xl flex items-center justify-center mx-auto mb-10 shadow-md text-coffee-100">
                      <Lock className="w-10 h-10 stroke-[2px]" />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display font-semibold text-coffee-900 mb-6 uppercase leading-tight">Logic Locked</h2>
                    <p className="text-coffee-700 font-light text-sm mb-12 uppercase tracking-[0.2em] max-w-lg mx-auto leading-relaxed">
                      // Processing and Output phases are available to Pro members.
                    </p>
                    
                    {!showLicenseInput ? (
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                            <a 
                              href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP?session=sess_GCYotd6plh"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-coffee-900 text-white px-12 py-6 rounded-full font-display text-2xl uppercase transition-all shadow-lg hover:bg-coffee-700 hover:-translate-y-1"
                            >
                              Unlock All ($39) <ArrowRight className="w-8 h-8 stroke-[2px] inline-block ml-2" />
                            </a>
                            <button 
                              onClick={() => setShowLicenseInput(true)}
                              className="text-coffee-900 font-bold font-mono text-sm uppercase underline decoration-2 decoration-coffee-400 underline-offset-8 hover:text-coffee-600 transition-colors"
                            >
                              Enter License Key
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleLicenseSubmit} className="max-w-md mx-auto bg-white rounded-[2rem] p-10 shadow-soft border border-coffee-100">
                            <div className="flex items-center justify-between mb-8 border-b border-coffee-100 pb-4">
                                <h3 className="text-2xl font-display font-semibold text-coffee-900 uppercase">Enter Key</h3>
                                <button type="button" onClick={() => setShowLicenseInput(false)} className="p-2 hover:bg-coffee-50 rounded-full transition-all">
                                    <X className="w-8 h-8 text-coffee-400" />
                                </button>
                            </div>
                            <input 
                                type="text" 
                                value={licenseKeyInput}
                                onChange={(e) => setLicenseKeyInput(e.target.value)}
                                placeholder="TK-XXXX-XXXX-XXXX"
                                className="w-full bg-coffee-50 border border-coffee-200 rounded-2xl text-coffee-900 font-display text-xl px-6 py-5 focus:bg-white outline-none text-center uppercase tracking-widest placeholder-coffee-200 mb-8 transition-all"
                            />
                            <button 
                                type="submit"
                                className="w-full bg-coffee-900 text-white font-display py-6 rounded-2xl hover:bg-coffee-700 transition-all shadow-md uppercase text-xl"
                            >
                                <Key className="w-8 h-8 stroke-[2px] inline mr-4" /> Activate
                            </button>
                        </form>
                    )}
                 </div>
              </div>
          )}

          {!isLocked && (
              <>
                {recipe.sampleOutput && (
                  <div className="mb-24 border-l-4 border-coffee-900 pl-10">
                    <h2 className="text-xl font-display font-semibold text-coffee-900 uppercase tracking-widest mb-8 decoration-wavy underline decoration-coffee-300">
                      Sample Output
                    </h2>
                    <div className="bg-white rounded-[2rem] border border-coffee-100 p-10 shadow-soft font-mono text-sm text-coffee-800 leading-relaxed max-h-[400px] overflow-y-auto">
                      {recipe.sampleOutput}
                    </div>
                  </div>
                )}

                {/* Simplified Instructions */}
                <div className="mb-24">
                    <div className="bg-white rounded-[2rem] border border-coffee-100 p-12 shadow-soft">
                        <h3 className="text-3xl font-display font-semibold text-coffee-900 mb-10 uppercase flex items-center gap-4">
                            <Terminal className="w-10 h-10 stroke-[2px]" />
                            Execution
                        </h3>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="border-l-4 border-coffee-200 pl-6">
                                <span className="text-[10px] font-bold font-mono text-coffee-400 uppercase tracking-widest mb-4 block">Option 1: The Easy Way</span>
                                <p className="text-lg text-coffee-900 font-light leading-snug">Download the <span className="bg-coffee-900 text-white px-2 rounded font-medium">Bundle Zip</span> above. It contains everything.</p>
                            </div>
                            <div className="border-l-4 border-coffee-200 pl-6">
                                <span className="text-[10px] font-bold font-mono text-coffee-400 uppercase tracking-widest mb-4 block">Option 2: Terminal</span>
                                <div className="bg-coffee-900 rounded-xl p-5 font-mono text-xs text-coffee-100 uppercase font-medium mt-2">
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
            <div className="border-t border-coffee-200 pt-20 mt-20">
              <h3 className="text-4xl font-display font-semibold text-coffee-900 mb-12 uppercase decoration-wavy underline decoration-coffee-300">
                Related Blueprints
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedRecipes.map(related => (
                  <Link key={related.id} href={`/skills/${related.id}`} className="group flex flex-col bg-white rounded-3xl border border-coffee-100 p-8 shadow-soft hover:shadow-soft-hover hover:-translate-y-1.5 transition-all h-full overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                      <span className="bg-coffee-100 text-coffee-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                        {related.difficulty}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-coffee-50 flex items-center justify-center text-coffee-400 group-hover:bg-coffee-900 group-hover:text-white transition-colors">
                        <Terminal className="w-4 h-4 stroke-[2px]" />
                      </div>
                    </div>
                    <h4 className="text-xl font-display font-semibold text-coffee-900 mb-4 line-clamp-2 uppercase leading-tight group-hover:text-coffee-600 transition-colors">
                      {related.title}
                    </h4>
                    <p className="text-xs text-coffee-600 mb-8 line-clamp-3 font-light leading-relaxed">
                      {related.tagline}
                    </p>
                    <div className="mt-auto pt-6 border-t border-coffee-50 text-coffee-400 font-display text-[10px] uppercase">
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" /> {related.time}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="mt-32 border-t border-coffee-200 border-dashed pt-24">
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
