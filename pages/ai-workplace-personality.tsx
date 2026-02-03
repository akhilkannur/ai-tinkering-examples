import Head from 'next/head';
import Navbar from '../components/Navbar';
import ArchetypeQuiz from '../components/ArchetypeQuiz';

export default function AIWorkplacePersonalityPage() {
  const pageTitle = "AI Workplace Personality Quiz | Real AI Examples";
  const pageDescription = "Discover your AI working style. Are you a Speedster, Wordsmith, Analyst, or Builder? Take the 30-second quiz to find your perfect AI workflow.";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${baseUrl}/api/og?mode=home`} /> {/* Using default OG for now */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <link rel="canonical" href={`${baseUrl}/ai-workplace-personality`} />
      </Head>

      <div className="min-h-screen bg-primary-bg flex flex-col font-sans text-text-color fade-in">
        <Navbar />

        <main className="flex-grow pt-32 pb-20 container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              What's Your <span className="text-accent">AI Personality?</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Not everyone uses AI the same way. Find out if you're a <strong>Speedster</strong>, <strong>Wordsmith</strong>, <strong>Analyst</strong>, or <strong>Builder</strong>, and get a curated list of blueprints tailored to your style.
            </p>
          </div>

          {/* 
            We need to make sure the ArchetypeQuiz component renders in an "open" state or prominently.
            The current component has a "teaser" state (closed) and a "modal" state (open).
            For a dedicated page, we might want it to trigger immediately or look different.
            However, to respect "Conventions" and "Minimal Changes", I will just render it as is.
            The user can click to start. 
            
            Actually, looking at the code, if I just render <ArchetypeQuiz />, it shows the teaser banner.
            That's acceptable, but maybe a bit odd for a dedicated page.
            But the user just said "place it somewhere", so the component as-is is the safest bet to avoid breaking logic.
          */}
          <ArchetypeQuiz />
          
          <div className="mt-20 text-center">
            <p className="text-sm text-text-secondary/60">
              This quiz helps us recommend the right automation workflows for your specific role and technical comfort level.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
