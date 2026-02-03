import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, Terminal, Copy, Check, Download, FileText, Cpu, BookOpen, Lock, Crown, Key, ArrowRight, X, Package, ShieldCheck, Zap, MousePointer2 } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { getAllRecipes, getRelatedRecipes } from '../../lib/recipes';
import { Recipe, categoryIcons } from '../../lib/cookbook-data';
import { generateHowToSchema, generateFAQSchema, injectInternalLinks } from '../../lib/seo-utils';
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
          return <Link key={i} href={linkMatch[2]} className="text-blue-600 hover:underline font-medium">{linkMatch[1]}</Link>;
        }
        return part;
      })}
    </span>
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
        router.replace(`/blueprints/${recipe.id}`, undefined, { shallow: true });
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

  // For SEO: Split blueprint into public/private parts
  const blueprintParts = recipe.blueprint.split('### Phase 2:');
  const publicBlueprint = blueprintParts[0];
  const privateBlueprint = blueprintParts.length > 1 ? `### Phase 2:${blueprintParts[1]}` : '';

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Head>
        <title>{recipe.title} | AI Agent Blueprint | Real AI Examples</title>
        <meta name="description" content={recipe.description} key="description" />
        <meta property="og:title" content={`${recipe.title} | AI Agent Blueprint`} key="og:title" />
        <meta property="og:description" content={recipe.description} key="og:description" />
        <meta property="og:url" content={`${SITE_URL}/blueprints/${recipe.id}`} key="og:url" />
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

        <link rel="canonical" href={`${SITE_URL}/blueprints/${recipe.id}`} key="canonical" />
        
        {/* Structured Data */}
        {schema && schema.map((s, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
          />
        ))}
      </Head>
      
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-8">
            <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back to Blueprints
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 truncate">{recipe.title}</span>
          </nav>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-6">
              <div className={`p-4 rounded-2xl shadow-sm border ${isLocked ? 'bg-yellow-50 text-yellow-600 border-yellow-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                {isLocked ? <Crown className="w-10 h-10" /> : <CatIcon className="w-10 h-10" />}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 flex items-center gap-3">
                    {recipe.title}
                    {isLocked && <Lock className="w-6 h-6 text-yellow-500" />}
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isLocked ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {isLocked ? 'Premium Blueprint' : recipe.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    recipe.difficulty === 'Beginner' ? 'bg-green-50 text-green-600' : 
                    recipe.difficulty === 'Intermediate' ? 'bg-yellow-50 text-yellow-600' : 
                    'bg-red-50 text-red-600'
                  }`}>
                    {recipe.difficulty}
                  </span>
                  <span className="text-gray-400 text-sm flex items-center gap-1 font-mono">
                    <Terminal className="w-3 h-3" /> {recipe.time}
                  </span>
                </div>
              </div>
            </div>
            {/* New Main Download Action */}
            {!isLocked && (
                <button
                    onClick={handleDownloadZip}
                    className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-600/20 transition-all transform hover:-translate-y-1"
                >
                    <Package className="w-5 h-5" />
                    Download Bundle
                </button>
            )}
          </div>

          {/* Mission Overview */}
          <div className="bg-gray-50 rounded-3xl p-8 mb-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Mission Overview</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              <SimpleMarkdown text={linkedDescription || recipe.description} />
            </p>
          </div>

          {/* POWER USER SECTION: DOWNLOAD SKILLS */}
          {!isLocked && (
            <div className="bg-blue-950 rounded-3xl p-8 mb-12 border border-blue-900/50 shadow-xl relative overflow-hidden group">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_24px] opacity-20"></div>
                
                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-4 font-mono">
                                <Cpu className="w-3 h-3" /> Agent-Ready Tools
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Run this as a Native Skill</h3>
                            <p className="text-blue-200/70 text-sm max-w-md leading-relaxed">
                                Don't copy-paste. Download the pre-packaged skill to run this workflow directly in your terminal agent.
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a 
                                href={`/downloads/skills/${recipe.id}.skill`}
                                download
                                className="flex items-center justify-center gap-2 bg-white text-blue-950 px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all shadow-lg"
                            >
                                <Zap className="w-4 h-4 fill-current" /> Gemini CLI
                            </a>
                            <a 
                                href={`/downloads/skills/${recipe.id}-claude.md`}
                                download
                                className="flex items-center justify-center gap-2 bg-blue-800 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all border border-blue-700 shadow-lg"
                            >
                                <Terminal className="w-4 h-4" /> Claude Code
                            </a>
                            <a 
                                href={`/downloads/skills/${recipe.id}.cursorrules`}
                                download
                                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-500 transition-all border border-blue-500 shadow-lg"
                            >
                                <MousePointer2 className="w-4 h-4" /> Cursor Rule
                            </a>
                        </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap gap-6">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-blue-400/60 uppercase tracking-widest">
                            <ShieldCheck className="w-3 h-3" /> 100% Malware-Free
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-blue-400/60 uppercase tracking-widest">
                            <Package className="w-3 h-3" /> Includes Archetype Logic
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-blue-400/60 uppercase tracking-widest">
                            <Cpu className="w-3 h-3" /> Optimized for Gemini 2.0
                        </div>
                    </div>
                </div>
            </div>
          )}

          {/* Locked or Unlocked Content */}
          <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl mb-12">
              <div className="bg-gray-800 px-6 py-4 flex flex-col md:flex-row items-center justify-between border-b border-gray-700 gap-4">
              <div className="flex items-center gap-3 self-start md:self-auto">
                  <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <span className="text-gray-400 font-mono text-xs ml-2 flex items-center gap-2">
                  <FileText className="w-3 h-3" /> BLUEPRINT.md {isLocked && "(Preview Mode)"}
                  </span>
              </div>
              {!isLocked && (
                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                        <div className="flex flex-col items-end gap-1">
                          <button
                              onClick={handleDownloadZip}
                              className="flex-1 md:flex-none text-sm font-bold px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition-all bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20"
                          >
                              <Package className="w-4 h-4" />
                              Download Zip
                          </button>
                          <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1 uppercase tracking-tighter">
                            <ShieldCheck className="w-3 h-3 text-green-500" /> 100% Text-Only (.md, .csv)
                          </span>
                        </div>
                        <button
                        onClick={handleCopy}
                        className={`flex-1 md:flex-none text-sm font-bold px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg ${
                            copied 
                            ? 'bg-green-500 text-white shadow-green-500/20' 
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600 shadow-gray-900/20'
                        }`}
                        >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
              )}
              </div>
              <div className="bg-gray-800/50 px-6 py-2 border-b border-gray-700">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Bundle Contents:</span>
                  <div className="flex gap-4 mt-1">
                    <span className="text-xs text-blue-400 font-mono flex items-center gap-1">
                      <FileText className="w-3 h-3" /> {recipe.id}.md
                    </span>
                    {recipe.sampleData && (
                      <span className="text-xs text-blue-400 font-mono flex items-center gap-1">
                        <Package className="w-3 h-3" /> {recipe.sampleData.filename}
                      </span>
                    )}
                    <span className="text-xs text-blue-400 font-mono flex items-center gap-1">
                      <FileText className="w-3 h-3" /> README.txt
                    </span>
                  </div>
              </div>
              <div className="p-8">
                <pre className="font-mono text-base text-blue-300 whitespace-pre-wrap leading-relaxed">
                    {publicBlueprint}
                    {!isLocked && privateBlueprint}
                </pre>
              </div>
          </div>

          {isLocked && (
              /* PREMIUM PAYWALL */
              <div className="bg-gray-900 rounded-3xl p-12 text-center border-4 border-yellow-500/30 shadow-2xl relative overflow-hidden mb-16">
                 <div className="relative z-10">
                    <div className="w-24 h-24 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-yellow-500/20">
                      <Lock className="w-12 h-12 text-yellow-500" />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-4">The Logic is Locked</h2>
                    <p className="text-gray-400 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
                      Phase 2 (Processing) and Phase 3 (Output) are reserved for Pro members. Unlock 500+ premium automation blueprints instantly.
                    </p>
                    
                    {!showLicenseInput ? (
                        <div className="flex flex-col items-center gap-6">
                            <a 
                              href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP?session=sess_GCYotd6plh"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-yellow-500/20"
                            >
                              Unlock All Blueprints <ArrowRight className="w-6 h-6" />
                            </a>
                            <button 
                              onClick={() => setShowLicenseInput(true)}
                              className="text-gray-500 hover:text-white underline decoration-gray-700 underline-offset-4 font-medium transition-colors"
                            >
                              I already have a license key
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleLicenseSubmit} className="max-w-md mx-auto bg-gray-800/50 p-8 rounded-2xl border border-gray-700 animate-fade-in">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-white font-bold text-lg">Activate License</h3>
                                <button type="button" onClick={() => setShowLicenseInput(false)} className="text-gray-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="mb-6">
                                <input 
                                    type="text" 
                                    value={licenseKeyInput}
                                    onChange={(e) => setLicenseKeyInput(e.target.value)}
                                    placeholder="TK-XXXX-XXXX-XXXX"
                                    className="w-full bg-gray-900 border border-gray-700 text-white px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 font-mono text-center uppercase tracking-widest placeholder-gray-600 text-lg"
                                />
                                {unlockError && <p className="text-red-400 text-sm mt-3 text-left">{unlockError}</p>}
                            </div>
                            <button 
                                type="submit"
                                className="w-full bg-yellow-500 text-gray-900 font-bold py-4 rounded-xl hover:bg-yellow-400 transition-colors shadow-lg flex items-center justify-center gap-3 text-lg"
                            >
                                <Key className="w-5 h-5" /> Activate Premium
                            </button>
                        </form>
                    )}
                 </div>
                 
                 {/* Decorative background elements */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                 <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>
              </div>
          )}

          {!isLocked && (
              <>
                {/* Output Snapshot */}
                {recipe.sampleOutput && (
                  <div className="mb-12">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-accent" />
                      Phase 3 Sample Output
                    </h2>
                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-inner">
                      <div className="prose prose-sm max-w-none text-gray-600 font-mono whitespace-pre-wrap">
                        {recipe.sampleOutput}
                      </div>
                    </div>
                  </div>
                )}

                {/* Instructions Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-yellow-50 border border-yellow-100 p-8 rounded-3xl">
                    <div className="bg-yellow-500 text-white w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-yellow-500/20">!</div>
                    <h3 className="text-xl font-bold text-yellow-900 mb-6">How to Run This</h3>
                    
                    <div className="space-y-6">
                        <div>
                        <h4 className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-yellow-200 text-yellow-800 flex items-center justify-center text-sm">1</span>
                            Get the files
                        </h4>
                        <p className="text-yellow-800 text-sm mb-2 ml-8">
                            Download the <span className="font-mono font-bold">Bundle ZIP</span> above. It contains the blueprint and any required files.
                        </p>
                        </div>

                        <div>
                        <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-yellow-200 text-yellow-800 flex items-center justify-center text-sm">2</span>
                            Run in Terminal
                        </h4>
                        <p className="text-yellow-800 text-xs mb-4 ml-8 italic opacity-80">
                            Universal: These blueprints work with any agentic CLI.
                        </p>
                        
                        <div className="ml-8 space-y-4">
                            <div className="bg-white rounded-xl border border-yellow-200 overflow-hidden">
                            <div className="px-4 py-2 bg-yellow-100/50 border-b border-yellow-100 flex justify-between items-center">
                                <span className="text-xs font-bold text-yellow-800 uppercase tracking-wider">Gemini CLI</span>
                                <button 
                                onClick={() => navigator.clipboard.writeText(`gemini "Read @${recipe.id}.md and execute the workflow"`)}
                                className="text-xs text-yellow-700 hover:text-yellow-900 font-medium"
                                >
                                Copy
                                </button>
                            </div>
                            <div className="p-4 font-mono text-sm text-gray-700 overflow-x-auto whitespace-nowrap">
                                gemini "Read @{recipe.id}.md {recipe.sampleData ? "and use the sample file " : ""}to execute the workflow"
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 p-8 rounded-3xl">
                    <div className="bg-blue-600 text-white w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-blue-600/20">?</div>
                    <h3 className="text-xl font-bold text-blue-900 mb-4">Why use blueprints?</h3>
                    <p className="text-blue-800 leading-relaxed">
                        Blueprints act as a "Mission File". Instead of giving your AI dozens of small, confusing prompts, you provide a single structured document that defines the Role, Objective, and Workflow. 
                    </p>
                    </div>
                </div>
              </>
          )}

          {/* Related Blueprints */}
          {relatedRecipes && relatedRecipes.length > 0 && (
            <div className="border-t border-gray-200 pt-16 mt-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-gray-400" />
                Related {recipe.category} Blueprints
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedRecipes.map(related => (
                  <Link key={related.id} href={`/blueprints/${related.id}`} className="group block bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        {related.difficulty}
                      </span>
                      <Terminal className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {related.title}
                    </h4>
                    <p className="text-sm text-gray-500 line-clamp-3 mb-4">
                      {related.tagline}
                    </p>
                    <div className="flex items-center text-xs text-gray-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Terminal className="w-3 h-3" /> {related.time}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="mt-20 border-t border-gray-100 pt-16">
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

  // 1. Get Related Recipes
  const relatedRecipes = recipes
    .filter(r => r.category === recipe.category && r.id !== recipe.id)
    .slice(0, 3);

  // 2. Generate Internal Links for Description
  // Pass all recipes as the "glossary"
  const linkedDescription = injectInternalLinks(recipe.description, recipes);

  // 3. Generate Schema
  const SITE_URL = 'https://realaiexamples.com';
  const ogImageUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(recipe.title)}&category=${encodeURIComponent(recipe.category)}&tagline=${encodeURIComponent(recipe.tagline)}`;
  
  const howTo = generateHowToSchema(recipe, SITE_URL, ogImageUrl);
  const faq = generateFAQSchema(recipe);
  const schema = [howTo, faq].filter(Boolean);

  return {
    props: {
      recipe,
      relatedRecipes,
      linkedDescription,
      schema
    },
  };
};