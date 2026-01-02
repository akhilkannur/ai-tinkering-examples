import { useState } from 'react'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { investors, Investor } from '../../lib/investors-data'

export default function InvestorsPage() {
  const [displayInvestors] = useState<Investor[]>(investors)

  return (
    <>
      <Head>
        <title>Micro-PE Match | Find Buyers for Your AI Tool - AI Tinkering Examples</title>
        <meta name="description" content="A curated directory of active micro-private equity firms and search funds looking to acquire AI and SaaS businesses." />
      </Head>

      <div className="min-h-screen bg-primary-bg text-text-color font-sans">
        <Navbar />
        
        <header className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 font-headline bg-clip-text text-transparent bg-gradient-to-r from-accent to-light-purple">
            Micro-PE Match
          </h1>
          <p className="text-xl text-light-purple max-w-2xl mx-auto">
            The definitive list of active buyers for AI tools and Micro-SaaS. Skip the brokers and sell directly to the firms that move fast.
          </p>
        </header>

        <main className="max-w-6xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {displayInvestors.map((investor) => (
              <div key={investor.id} className="bg-secondary-bg border border-border-color rounded-2xl p-8 hover:border-accent transition-all duration-300 shadow-xl group">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold group-hover:text-accent">{investor.name}</h2>
                  {investor.isVerified && (
                    <span className="bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-accent/20">
                      Active Buyer
                    </span>
                  )}
                </div>
                <p className="text-light-purple mb-6 line-clamp-3">
                  {investor.description}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center text-sm">
                    <span className="text-accent font-semibold w-24">Focus:</span>
                    <span className="text-text-color">{investor.focus.join(', ')}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-accent font-semibold w-24">Revenue:</span>
                    <span className="text-text-color">{investor.revenueRange}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-accent font-semibold w-24">Location:</span>
                    <span className="text-text-color">{investor.location}</span>
                  </div>
                </div>
                <div className="mt-8">
                  <a 
                    href={investor.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center bg-accent hover:bg-opacity-90 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-accent/20"
                  >
                    View Investment Thesis
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Upsell Section */}
          <div className="bg-gradient-to-br from-secondary-bg to-primary-bg border-2 border-accent rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.82v-1.91c-.06-.02-.13-.04-.19-.06-1.14-.38-1.94-1.12-2.4-2.22l1.64-.68c.24.58.62 1.05 1.15 1.39.42.27.91.41 1.48.41.67 0 1.22-.16 1.63-.49.38-.3.57-.69.57-1.15 0-.41-.12-.76-.36-1.04-.24-.29-.63-.53-1.17-.74l-1.39-.53c-1.11-.42-1.92-1.02-2.43-1.8-.51-.77-.76-1.68-.76-2.72 0-1.12.33-2.12.98-2.99.65-.87 1.57-1.47 2.76-1.81V5h2.82v1.91c.06.02.13.04.19.06 1.14.38 1.94 1.12 2.4 2.22l-1.64.68c-.24-.58-.62-1.05-1.15-1.39-.42-.27-.91-.41-1.48-.41-.67 0-1.22.16-1.63.49-.38.3-.57.69-.57 1.15 0 .41.12.76.36 1.04.24.29.63.53 1.17.74l1.39.53c1.11.42 1.92 1.02 2.43 1.8.51.77.76 1.68.76 2.72 0 1.12-.33 2.12-.98 2.99-.65.87-1.57 1.47-2.76 1.81z"/>
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Want the Full Database?</h2>
            <p className="text-xl text-light-purple mb-8 max-w-2xl mx-auto">
              We have a private list of 50+ additional active buyers, search funds, and family offices looking for AI acquisitions right now. Includes direct emails.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a 
                href="https://buy.stripe.com/example" 
                className="bg-accent text-white px-10 py-4 rounded-2xl font-bold text-xl hover:scale-105 transition-transform shadow-xl"
              >
                Get Access for $49
              </a>
              <span className="text-light-purple font-medium">Limited to 20 spots this month</span>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  )
}
