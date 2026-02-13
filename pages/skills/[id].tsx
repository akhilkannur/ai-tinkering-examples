import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, Terminal, Copy, Check, Download, FileText, Cpu, BookOpen, Lock, Crown, Key, ArrowRight, X, Package, ShieldCheck, Zap, MousePointer2 } from 'lucide-react';
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
        
        {/* Breadcrumb Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": SITE_URL
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Skills",
              "item": `${SITE_URL}/#skills`
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": recipe.category,
              "item": `${SITE_URL}/skills/category/${recipe.category.toLowerCase().replace(/\s+/g, '-')}`
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": recipe.title,
              "item": `${SITE_URL}/skills/${recipe.id}`
            }
          ]
        })}} />
      </Head>
      
      <Navbar />

      <main className="flex-grow container mx-auto px-4 pt-24 md:pt-32 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-8 overflow-hidden">
            <Link href="/" className="hover:text-blue-600 flex items-center gap-1 shrink-0">
              <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Back to Skills</span><span className="sm:hidden text-xs">Back</span>
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 truncate text-xs sm:text-sm">{recipe.title}</span>
          </nav>

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className={`p-3 rounded-xl shadow-sm border shrink-0 ${isLocked ? 'bg-yellow-50 text-yellow-600 border-yellow-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                {isLocked ? <Crown className="w-8 h-8" /> : <CatIcon className="w-8 h-8" />}
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 flex flex-wrap items-center gap-2 leading-tight">
                    {recipe.title}
                    {isLocked && <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 shrink-0" />}
                </h1>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${isLocked ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {isLocked ? 'Premium' : recipe.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-gray-50 text-gray-500 border border-gray-200">
                    {recipe.difficulty}
                  </span>
                  <span className="text-gray-400 text-xs flex items-center gap-1 font-mono ml-1">
                    <Terminal className="w-3 h-3" /> {recipe.time}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Overview - More compact */}
          <div className="bg-white rounded-xl p-0 mb-10">
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              <SimpleMarkdown text={linkedDescription || recipe.description} />
            </p>
          </div>

          {/* Locked or Unlocked Content */}
          <div className="bg-[#0d1117] rounded-xl overflow-hidden border border-gray-800 shadow-2xl mb-12 flex flex-col">
              {/* Toolbar */}
              <div className="bg-[#161b22] px-4 py-3 border-b border-gray-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Window Controls & File Name */}
                  <div className="flex items-center gap-4">
                      <div className="flex gap-1.5 shrink-0 opacity-75">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                      </div>
                      <span className="text-gray-400 font-mono text-xs flex items-center gap-2 truncate opacity-80">
                        <FileText className="w-3 h-3" /> {recipe.id}.md
                      </span>
                  </div>

                  {!isLocked && (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        {/* Agent Skills Group */}
                        <div className="flex items-center bg-[#0d1117] rounded-lg border border-gray-800 p-1">
                            <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider px-2 hidden xl:block">Run as Agent:</span>
                            <div className="flex gap-1">
                                <a href={`/downloads/skills/${recipe.id}.skill`} download title="Download for Gemini CLI" className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors flex items-center gap-1">
                                    <Zap className="w-3 h-3" /> <span className="text-[10px] font-bold lg:hidden xl:inline">Gemini</span>
                                </a>
                                <div className="w-px h-4 bg-gray-800 my-auto"></div>
                                <a href={`/downloads/skills/${recipe.id}-claude.md`} download title="Download for Claude Code" className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors flex items-center gap-1">
                                    <Terminal className="w-3 h-3" /> <span className="text-[10px] font-bold lg:hidden xl:inline">Claude</span>
                                </a>
                                <div className="w-px h-4 bg-gray-800 my-auto"></div>
                                <a href={`/downloads/skills/${recipe.id}.cursorrules`} download title="Download for Cursor" className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors flex items-center gap-1">
                                    <MousePointer2 className="w-3 h-3" /> <span className="text-[10px] font-bold lg:hidden xl:inline">Cursor</span>
                                </a>
                            </div>
                        </div>

                        {/* Standard Files Group */}
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <button
                                onClick={handleDownloadZip}
                                className="flex-1 sm:flex-none text-xs font-bold px-3 py-1.5 rounded-lg flex items-center justify-center gap-2 transition-all bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/10"
                            >
                                <Package className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Bundle</span>
                                <span className="sm:hidden">Zip</span>
                            </button>
                            <button
                                onClick={handleCopy}
                                className={`flex-1 sm:flex-none text-xs font-bold px-3 py-1.5 rounded-lg flex items-center justify-center gap-2 transition-all border ${
                                    copied 
                                    ? 'bg-green-500/10 text-green-400 border-green-500/50' 
                                    : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
                                }`}
                            >
                                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                        </div>
                    </div>
                  )}
              </div>

              {/* Code Content */}
              <div className="p-4 sm:p-6 md:p-8 overflow-x-auto">
                <pre className="font-mono text-xs sm:text-sm text-blue-200/90 whitespace-pre-wrap leading-relaxed">
                    {publicBlueprint}
                    {!isLocked && privateBlueprint}
                </pre>
              </div>
          </div>

          {isLocked && (
              /* PREMIUM PAYWALL - Compact Version */
              <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-center border border-gray-800 shadow-2xl relative overflow-hidden mb-16">
                 <div className="relative z-10">
                    <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-500/20">
                      <Lock className="w-8 h-8 text-yellow-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">Logic Locked</h2>
                    <p className="text-gray-400 text-sm md:text-base mb-8 max-w-lg mx-auto">
                      Phase 2 (Processing) and Phase 3 (Output) are available to Pro members.
                    </p>
                    
                    {!showLicenseInput ? (
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a 
                              href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP?session=sess_GCYotd6plh"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-bold text-sm transition-all"
                            >
                              Unlock Access <ArrowRight className="w-4 h-4" />
                            </a>
                            <button 
                              onClick={() => setShowLicenseInput(true)}
                              className="text-gray-500 hover:text-white text-sm font-medium underline decoration-gray-700 underline-offset-4"
                            >
                              Enter Key
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleLicenseSubmit} className="max-w-sm mx-auto bg-gray-800 p-6 rounded-xl border border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-white font-bold text-sm">Activate License</h3>
                                <button type="button" onClick={() => setShowLicenseInput(false)} className="text-gray-400 hover:text-white">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <input 
                                type="text" 
                                value={licenseKeyInput}
                                onChange={(e) => setLicenseKeyInput(e.target.value)}
                                placeholder="TK-XXXX-XXXX-XXXX"
                                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-500 font-mono text-center uppercase tracking-widest text-sm mb-4"
                            />
                            <button 
                                type="submit"
                                className="w-full bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 text-sm"
                            >
                                <Key className="w-4 h-4" /> Activate
                            </button>
                        </form>
                    )}
                 </div>
              </div>
          )}

          {!isLocked && (
              <>
                {/* Output Snapshot */}
                {recipe.sampleOutput && (
                  <div className="mb-12 border-l-2 border-gray-200 pl-6 ml-2">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      Sample Output
                    </h2>
                    <div className="prose prose-sm max-w-none text-gray-600 font-mono whitespace-pre-wrap text-xs bg-gray-50 p-4 rounded-lg border border-gray-100">
                      {recipe.sampleOutput}
                    </div>
                  </div>
                )}

                {/* Simplified Instructions */}
                <div className="mb-16">
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Terminal className="w-5 h-5 text-gray-400" />
                            How to run this
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Option 1: The Easy Way</span>
                                <p className="text-sm text-gray-600 mb-3">Download the <span className="font-bold text-gray-900">Bundle Zip</span> above. It contains all necessary files.</p>
                            </div>
                            <div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Option 2: Terminal</span>
                                <div className="bg-white border border-gray-200 rounded-lg p-3 font-mono text-xs text-gray-600 overflow-x-auto">
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
            <div className="border-t border-gray-200 pt-16 mt-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-gray-400" />
                Related {recipe.category} Blueprints
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedRecipes.map(related => (
                  <Link key={related.id} href={`/skills/${related.id}`} className="group block bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all">
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