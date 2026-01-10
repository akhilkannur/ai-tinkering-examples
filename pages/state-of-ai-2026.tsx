import Head from 'next/head'
import Navbar from '../components/Navbar'
import NewsletterForm from '../components/NewsletterForm'
import Footer from '../components/Footer'

export default function StateOfAI() {
  const pageTitle = "Real People, Real Results: The State of Practical AI 2026";
  const pageDescription = "Forget market caps. Here's how marketers, small business owners, and sales teams are actually using AI to save time and make money in 2026.";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>

      <div className="min-h-screen bg-primary-bg font-sans text-text-color">
        <Navbar />

        {/* Hero Section */}
        <div className="relative border-b border-navy-dark bg-secondary-bg py-16 sm:py-24">
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          </div>
          
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl sm:text-6xl font-headline font-bold mb-6 text-text-color uppercase tracking-tight">
              Practical AI <span className="text-accent">2026</span>
            </h1>
            <p className="text-xl text-text-secondary font-mono mb-8 max-w-2xl mx-auto">
              No hype. No "future of work" fluff. Just the data on how real people are saving hours every single week.
            </p>
            <div className="inline-block px-4 py-2 border border-accent/30 rounded-full bg-accent/10 text-accent font-mono text-sm">
              Updated: January 2026
            </div>
          </div>
        </div>

        {/* Hero Stats Cards (Relatable Focus) */}
        <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary-bg border border-navy-light p-8 shadow-xl hover:border-accent transition-colors group">
              <div className="text-5xl font-headline font-bold text-accent mb-2 group-hover:scale-105 transition-transform">11 hrs</div>
              <div className="text-lg font-bold text-text-color mb-3">Saved Weekly by Marketers</div>
              <p className="text-text-secondary text-sm leading-relaxed">
                Marketing teams using AI for content and email save over a full work day every week.
              </p>
            </div>
            
            <div className="bg-primary-bg border border-navy-light p-8 shadow-xl hover:border-accent transition-colors group">
              <div className="text-5xl font-headline font-bold text-accent mb-2 group-hover:scale-105 transition-transform">2x</div>
              <div className="text-lg font-bold text-text-color mb-3">Sales Target Success</div>
              <p className="text-text-secondary text-sm leading-relaxed">
                Salespeople using AI for admin & summaries are twice as likely to hit their quota.
              </p>
            </div>

            <div className="bg-primary-bg border border-navy-light p-8 shadow-xl hover:border-accent transition-colors group">
              <div className="text-5xl font-headline font-bold text-accent mb-2 group-hover:scale-105 transition-transform">20+ hrs</div>
              <div className="text-lg font-bold text-text-color mb-3">Saved Monthly by SMBs</div>
              <p className="text-text-secondary text-sm leading-relaxed">
                Small business owners are automating 20+ hours of admin & support work per month.
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="max-w-4xl mx-auto px-4 pb-20">
          
          {/* Section 1: Marketing */}
          <div className="mb-16">
            <h2 className="text-3xl font-headline font-bold mb-8 border-l-4 border-accent pl-4">
              1. For Marketers: The Content Engine
            </h2>
            <p className="mb-6 text-text-secondary">
              It's not about replacing creativity; it's about removing the grunt work. 2025 data shows massive adoption for specific tasks.
            </p>
            <div className="bg-secondary-bg border border-navy-dark p-6 mb-8">
              <ul className="space-y-4 font-mono text-sm text-text-secondary">
                <li className="flex items-start">
                  <span className="text-accent mr-2">➜</span>
                  <span><strong>85%</strong> of marketers now use AI for content creation (blogs, social).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">➜</span>
                  <span><strong>46%</strong> use it specifically for copywriting assistance (not just generation).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">➜</span>
                  <span><strong>13%</strong> increase in email click-through rates when AI optimizes subject lines.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 2: Small Business (Time Saved Chart) */}
          <div className="mb-16">
            <h2 className="text-3xl font-headline font-bold mb-8 border-l-4 border-accent pl-4">
              2. For Small Business: The 24/7 Admin
            </h2>
            <p className="mb-6 text-text-secondary">
              Small business owners wear too many hats. AI is taking the "Support" and "Admin" hats off their heads.
            </p>
            
            <div className="bg-secondary-bg p-8 border border-navy-dark">
              <h3 className="font-bold mb-6 text-center text-accent uppercase tracking-widest text-sm">Impact on Small Business Operations</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-1 font-mono">
                    <span>Faster Customer Support Resolution</span>
                    <span className="text-accent">92%</span>
                  </div>
                  <div className="w-full bg-navy-dark h-4 rounded-sm overflow-hidden">
                    <div className="bg-accent h-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1 font-mono">
                    <span>Global Adoption Rate (SMBs)</span>
                    <span className="text-accent">77%</span>
                  </div>
                  <div className="w-full bg-navy-dark h-4 rounded-sm overflow-hidden">
                    <div className="bg-accent/70 h-full" style={{ width: '77%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1 font-mono">
                    <span>Reported Cost Savings</span>
                    <span className="text-accent">30%</span>
                  </div>
                  <div className="w-full bg-navy-dark h-4 rounded-sm overflow-hidden">
                    <div className="bg-accent/40 h-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-center mt-6 text-text-secondary opacity-60">
                Data Sources: ColorWhistle, Salesforce (2025 SMB Reports)
              </p>
            </div>
          </div>

          {/* Section 3: Sales (The Admin Killer) */}
          <div className="mb-16">
            <h2 className="text-3xl font-headline font-bold mb-8 border-l-4 border-accent pl-4">
              3. For Sales: The Admin Killer
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border border-navy-dark p-6 hover:bg-secondary-bg transition-colors">
                <h3 className="font-bold text-lg mb-2 text-accent">CRM Data Entry</h3>
                <p className="text-3xl font-headline mb-2">Automated</p>
                <p className="text-sm text-text-secondary">
                  Salespeople save 12 hours/week by letting AI handle CRM updates and meeting notes.
                </p>
              </div>
              <div className="border border-navy-dark p-6 hover:bg-secondary-bg transition-colors">
                <h3 className="font-bold text-lg mb-2 text-accent">Daily Usage</h3>
                <p className="text-3xl font-headline mb-2">56%</p>
                <p className="text-sm text-text-secondary">
                  Of sales professionals rely on AI tools every single day to function.
                </p>
              </div>
            </div>
          </div>

          {/* Sources Section */}
          <div className="mt-20 pt-10 border-t border-navy-dark text-sm text-text-secondary">
            <h4 className="font-bold mb-4 uppercase tracking-widest text-xs">Sources & Methodology</h4>
            <p className="mb-4 opacity-80">
              This report aggregates data from 2025 practical usage reports including HubSpot, Salesforce SMB Trends, and Gartner Sales predictions. Focus is strictly on non-technical use cases.
            </p>
          </div>

        </div>

        {/* CTA Section */}
        <div className="bg-secondary-bg border-t border-navy-dark py-20">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-headline font-bold mb-4">
              Stop reading stats. <span className="text-accent">Start saving time.</span>
            </h2>
            <p className="text-text-secondary mb-8">
              Join 5,000+ others getting one practical AI workflow delivered weekly.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}