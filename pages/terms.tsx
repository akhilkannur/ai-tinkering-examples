import Head from 'next/head'
import Navbar from '../components/Navbar'

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service | Real AI Examples</title>
        <meta name="description" content="Read our terms of service to understand the rules and guidelines for using our website and blueprints." key="description" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:title" content="Terms of Service | Real AI Examples" key="og:title" />
        <meta property="og:description" content="Read our terms of service to understand the rules and guidelines for using our website and blueprints." key="og:description" />
        <meta property="og:image" content="https://realaiexamples.com/api/og?mode=home" key="og:image" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content="Terms of Service | Real AI Examples" key="twitter:title" />
        <meta name="twitter:description" content="Read our terms of service to understand the rules and guidelines for using our website and blueprints." key="twitter:description" />
        <meta name="twitter:image" content="https://realaiexamples.com/api/og?mode=home" key="twitter:image" />
      </Head>
      <div className="min-h-screen bg-brand-beige font-sans text-brand-navy">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-headline font-bold mb-8 uppercase tracking-tight">Terms of Service</h1>
          <div className="prose prose-navy max-w-none text-brand-navy/80 leading-relaxed">
            <p className="mb-4">Last Updated: January 17, 2026</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">By accessing or using Real AI Examples (realaiexamples.com), you agree to be bound by these Terms of Service.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Use of Content</h2>
            <p className="mb-4">All blueprints, examples, and content provided on this site are for informational and educational purposes. You may use the blueprints for your own personal or business projects. Redistribution of the content as a standalone database or product is prohibited without express permission.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. No Warranties</h2>
            <p className="mb-4">The service is provided on an "AS IS" and "AS AVAILABLE" basis. We do not warrant that the AI prompts or workflows will always produce the desired results, as AI models are third-party tools subject to change.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Limitation of Liability</h2>
            <p className="mb-4">In no event shall Real AI Examples be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Changes to Terms</h2>
            <p className="mb-4">We reserve the right to modify or replace these terms at any time. Your continued use of the site after any changes constitutes acceptance of the new terms.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Governing Law</h2>
            <p className="mb-4">These terms shall be governed and construed in accordance with the laws of the jurisdiction in which the owner resides, without regard to its conflict of law provisions.</p>
          </div>
        </div>
      </div>
    </>
  )
}
