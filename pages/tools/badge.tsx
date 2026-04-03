import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Check, Copy, Shield, Zap, Eye, RefreshCw, ArrowRight, ExternalLink } from 'lucide-react';

const SITE_URL = 'https://realaiexamples.com';

interface BadgeVariant {
  id: string;
  name: string;
  description: string;
  preview: string;
  embedCode: string;
  bg: string;
}

const badges: BadgeVariant[] = [
  {
    id: 'dark',
    name: 'Dark',
    description: 'Best on light backgrounds',
    preview: '/images/badge-dark.svg',
    embedCode: `<a href="${SITE_URL}/tools" target="_blank" rel="noopener">\n  <img src="${SITE_URL}/images/badge-dark.svg" alt="Verified on Real AI Examples" width="220" height="54" />\n</a>`,
    bg: 'bg-white',
  },
  {
    id: 'light',
    name: 'Light',
    description: 'Best on dark backgrounds',
    preview: '/images/badge-light.svg',
    embedCode: `<a href="${SITE_URL}/tools" target="_blank" rel="noopener">\n  <img src="${SITE_URL}/images/badge-light.svg" alt="Verified on Real AI Examples" width="220" height="54" />\n</a>`,
    bg: 'bg-[#1a1a1a]',
  },
  {
    id: 'minimal',
    name: 'Compact',
    description: 'For footers & sidebars',
    preview: '/images/badge-minimal.svg',
    embedCode: `<a href="${SITE_URL}/tools" target="_blank" rel="noopener">\n  <img src="${SITE_URL}/images/badge-minimal.svg" alt="Real AI Examples" width="160" height="40" />\n</a>`,
    bg: 'bg-white',
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 bg-black text-[#ccff00] px-5 py-2.5 border-2 border-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#ccff00] hover:text-black transition-all brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
    >
      {copied ? <Check className="w-4 h-4 stroke-[3px]" /> : <Copy className="w-4 h-4 stroke-[3px]" />}
      {copied ? 'Copied!' : 'Copy Code'}
    </button>
  );
}

export default function BadgePage() {
  const [activeBadge, setActiveBadge] = useState<string>('dark');
  const currentBadge = badges.find(b => b.id === activeBadge) || badges[0];

  return (
    <>
      <Head>
        <title>Verification Badge | Real AI Examples — AI Tools Directory</title>
        <meta name="description" content="Add a verified badge to your site. Get listed instantly on Real AI Examples, the curated AI tools directory." key="description" />
      </Head>

      <style jsx global>{`
        :root {
          --font-display: 'Arial Black', 'Impact', sans-serif;
          --font-mono: 'JetBrains Mono', 'Courier New', monospace;
          --font-body: 'Newsreader', 'Georgia', serif;
          --color-neon: #ccff00;
        }

        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap');

        .badge-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem 6rem;
        }

        .badge-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 0;
          border-bottom: 1px solid #000;
          margin-bottom: 4rem;
        }

        .badge-hero {
          text-align: center;
          margin-bottom: 5rem;
        }

        .badge-hero-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #888;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .badge-hero-label::before {
          content: '';
          width: 8px;
          height: 8px;
          background: var(--color-neon);
          border-radius: 50%;
        }

        .badge-hero h1 {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 6vw, 5rem);
          text-transform: uppercase;
          line-height: 0.9;
          margin-bottom: 1.5rem;
          letter-spacing: -0.03em;
        }

        .badge-hero h1 span {
          color: var(--color-neon);
          background: black;
          padding: 0 0.3em;
          display: inline-block;
        }

        .badge-hero p {
          font-size: 1.2rem;
          max-width: 50ch;
          margin: 0 auto;
          color: #555;
          line-height: 1.6;
        }

        .badge-selector {
          display: flex;
          justify-content: center;
          gap: 0;
          margin-bottom: 2rem;
          border: 2px solid black;
          width: fit-content;
          margin-left: auto;
          margin-right: auto;
        }

        .badge-selector button {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          text-transform: uppercase;
          font-weight: 800;
          letter-spacing: 0.1em;
          padding: 0.75rem 1.5rem;
          border: none;
          cursor: pointer;
          transition: all 0.15s;
          border-right: 2px solid black;
          background: white;
          color: black;
        }

        .badge-selector button:last-child {
          border-right: none;
        }

        .badge-selector button.active {
          background: black;
          color: var(--color-neon);
        }

        .badge-preview-area {
          border: 2px solid black;
          margin-bottom: 3rem;
        }

        .badge-preview-top {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          min-height: 160px;
          transition: background 0.3s;
        }

        .badge-code-area {
          border-top: 2px solid black;
          background: #0a0a0a;
          padding: 1.5rem;
          position: relative;
        }

        .badge-code-area pre {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: #ccc;
          white-space: pre-wrap;
          word-break: break-all;
          line-height: 1.6;
          margin: 0;
        }

        .badge-code-area .copy-float {
          position: absolute;
          top: 1rem;
          right: 1rem;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border: 2px solid black;
          margin-bottom: 5rem;
        }

        .step-card {
          padding: 2.5rem;
          border-right: 2px solid black;
          position: relative;
        }

        .step-card:last-child {
          border-right: none;
        }

        .step-number {
          font-family: var(--font-display);
          font-size: 4rem;
          line-height: 1;
          color: var(--color-neon);
          margin-bottom: 1rem;
          background: black;
          display: inline-block;
          padding: 0.1em 0.3em;
        }

        .step-card h3 {
          font-family: var(--font-display);
          font-size: 1.1rem;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        .step-card p {
          font-size: 0.95rem;
          color: #555;
          line-height: 1.5;
        }

        .benefits-section {
          margin-bottom: 5rem;
        }

        .benefits-section h2 {
          font-family: var(--font-display);
          font-size: 2.5rem;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 3rem;
          line-height: 0.95;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: black;
          border: 2px solid black;
        }

        .benefit-card {
          background: white;
          padding: 2.5rem;
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
        }

        .benefit-icon {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          background: var(--color-neon);
          border: 2px solid black;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .benefit-card h3 {
          font-family: var(--font-display);
          font-size: 0.95rem;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }

        .benefit-card p {
          font-size: 0.9rem;
          color: #555;
          line-height: 1.5;
        }

        .cta-section {
          background: black;
          color: white;
          border: 2px solid black;
          padding: 4rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 300px;
          height: 300px;
          background: var(--color-neon);
          opacity: 0.05;
          border-radius: 50%;
        }

        .cta-section h2 {
          font-family: var(--font-display);
          font-size: 2.5rem;
          text-transform: uppercase;
          margin-bottom: 1rem;
          position: relative;
        }

        .cta-section p {
          color: #888;
          margin-bottom: 2rem;
          font-size: 1.1rem;
          position: relative;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: var(--color-neon);
          color: black;
          font-family: var(--font-display);
          font-size: 1rem;
          text-transform: uppercase;
          text-decoration: none;
          padding: 1rem 2.5rem;
          border: 2px solid var(--color-neon);
          transition: all 0.2s;
          position: relative;
        }

        .cta-btn:hover {
          background: white;
          border-color: white;
        }

        .faq-section {
          margin-top: 5rem;
          margin-bottom: 4rem;
        }

        .faq-section h2 {
          font-family: var(--font-display);
          font-size: 2rem;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 3rem;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: black;
          border: 2px solid black;
        }

        .faq-item {
          background: white;
          padding: 2rem;
        }

        .faq-item h4 {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
          font-weight: 800;
          margin-bottom: 0.75rem;
          letter-spacing: 0.05em;
        }

        .faq-item p {
          font-size: 0.9rem;
          color: #555;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .badge-page {
            padding: 0 1rem 4rem;
          }
          .badge-header {
            flex-direction: column;
            gap: 0.5rem;
            align-items: flex-start;
            margin-bottom: 2rem;
          }
          .badge-hero {
            margin-bottom: 3rem;
          }
          .badge-hero h1 {
            font-size: 2rem;
          }
          .badge-hero p {
            font-size: 1rem;
          }
          .steps-grid {
            grid-template-columns: 1fr;
          }
          .step-card {
            border-right: none;
            border-bottom: 2px solid black;
          }
          .step-card:last-child {
            border-bottom: none;
          }
          .benefits-grid {
            grid-template-columns: 1fr;
          }
          .faq-grid {
            grid-template-columns: 1fr;
          }
          .cta-section {
            padding: 2.5rem 1.5rem;
          }
          .cta-section h2 {
            font-size: 1.5rem;
          }
          .badge-selector button {
            padding: 0.6rem 1rem;
            font-size: 0.6rem;
          }
        }
      `}</style>

      <div className="badge-page">
        {/* Header */}
        <header className="badge-header">
          <Link href="/" style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', textTransform: 'uppercase', textDecoration: 'none', color: 'black', letterSpacing: '-0.05em' }}>
            realaiexamples
          </Link>
          <nav style={{ display: 'flex', gap: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 800 }}>
            <Link href="/tools" style={{ textDecoration: 'none', color: 'black' }}>← Tools</Link>
            <Link href="/tools/badge" style={{ textDecoration: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px', color: 'black' }}>Badge</Link>
          </nav>
        </header>

        {/* Hero */}
        <section className="badge-hero">
          <p className="badge-hero-label">Free Tool Submission</p>
          <h1>
            Get <span>Verified</span><br />
            Instantly
          </h1>
          <p>
            Add our badge to your site, submit your tool, and go live immediately.
            No waiting, no approval queue. The badge builds trust with your visitors
            and keeps your listing active.
          </p>
        </section>

        {/* Badge Selector + Preview */}
        <section>
          <div className="badge-selector">
            {badges.map((b) => (
              <button
                key={b.id}
                className={activeBadge === b.id ? 'active' : ''}
                onClick={() => setActiveBadge(b.id)}
              >
                {b.name}
              </button>
            ))}
          </div>

          <div className="badge-preview-area">
            <div className={`badge-preview-top ${currentBadge.bg}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentBadge.preview}
                alt={`${currentBadge.name} badge preview`}
                style={{ width: currentBadge.id === 'minimal' ? 160 : 220, height: 'auto' }}
              />
            </div>
            <div className="badge-code-area">
              <div className="copy-float">
                <CopyButton text={currentBadge.embedCode} />
              </div>
              <pre>{currentBadge.embedCode}</pre>
            </div>
          </div>

          <p style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', color: '#888', letterSpacing: '0.1em' }}>
            {currentBadge.description}
          </p>
        </section>

        {/* How It Works */}
        <section style={{ marginTop: '5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', textTransform: 'uppercase', textAlign: 'center', marginBottom: '3rem', lineHeight: '0.95' }}>
            How It Works
          </h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <h3>Copy the badge code</h3>
              <p>Choose a badge style above and copy the HTML embed code. Paste it anywhere on your site — footer, about page, or homepage.</p>
            </div>
            <div className="step-card">
              <div className="step-number">02</div>
              <h3>Submit your tool</h3>
              <p>Fill out the submission form with your tool details. Include the URL where you placed the badge so we can verify it.</p>
            </div>
            <div className="step-card">
              <div className="step-number">03</div>
              <h3>Go live instantly</h3>
              <p>Once we verify the badge on your site, your listing goes live immediately. No approval queue, no waiting days.</p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="benefits-section">
          <h2>Why Add<br />The Badge?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <Zap className="w-5 h-5 stroke-[3px]" />
              </div>
              <div>
                <h3>Instant Listing</h3>
                <p>Skip the approval queue. Badge-verified tools go live the same day — no waiting for manual review.</p>
              </div>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <Shield className="w-5 h-5 stroke-[3px]" />
              </div>
              <div>
                <h3>Trust Signal</h3>
                <p>The &ldquo;Verified on Real AI Examples&rdquo; badge acts as social proof for your visitors. It says your tool has been vetted.</p>
              </div>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <Eye className="w-5 h-5 stroke-[3px]" />
              </div>
              <div>
                <h3>Free Forever</h3>
                <p>Badge-verified listings are completely free. No hidden fees, no surprise paywalls. The badge is the only requirement.</p>
              </div>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <RefreshCw className="w-5 h-5 stroke-[3px]" />
              </div>
              <div>
                <h3>Stays Active</h3>
                <p>We periodically re-verify badges. As long as the badge is on your site, your listing stays active and visible.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq-section">
          <h2>Common Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Where should I place the badge?</h4>
              <p>Anywhere visible — your footer, about page, homepage, or a dedicated &ldquo;as featured on&rdquo; section. It just needs to be on a public page we can verify.</p>
            </div>
            <div className="faq-item">
              <h4>What if I remove the badge?</h4>
              <p>We periodically re-verify badges. If the badge is removed, your listing will be moved to a review queue and may be delisted after a grace period.</p>
            </div>
            <div className="faq-item">
              <h4>Can I customize the badge?</h4>
              <p>We offer three variants (dark, light, compact). Please don't modify the badge itself, but you can style the container around it however you like.</p>
            </div>
            <div className="faq-item">
              <h4>Is there a paid option without the badge?</h4>
              <p>Not yet, but we&apos;re working on premium listings with enhanced features. Badge-verified listings will always remain free.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <h2>Ready to Get Listed?</h2>
          <p>Copy a badge above, add it to your site, and submit your tool.</p>
          <a
            href="https://forms.gle/KqN82GGdCohshtVx8"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn"
          >
            Submit Your Tool <ArrowRight className="w-5 h-5 stroke-[3px]" />
          </a>
        </section>
      </div>
    </>
  );
}
