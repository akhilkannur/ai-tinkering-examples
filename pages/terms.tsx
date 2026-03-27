import Head from 'next/head'
import Navbar from '../components/Navbar'

export default function Terms() {
  return (
    <div className="min-h-screen bg-coffee-100 font-sans text-coffee-900 selection:bg-coffee-300 selection:text-coffee-900">
      <Head>
        <title>Terms of Service | Real AI Examples</title>
        <meta name="description" content="Read our terms of service to understand the rules and guidelines for using our content." key="description" />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <Navbar />

      <main className="pt-32 md:pt-40 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">

          <div className="text-center mb-16 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-coffee-200/30 rounded-full blur-3xl pointer-events-none"></div>
            <h1 className="text-5xl md:text-7xl font-display font-semibold text-coffee-900 uppercase leading-[1.1] tracking-tight">Terms of Service</h1>
            <p className="text-[10px] font-mono font-bold text-coffee-400 uppercase tracking-widest mt-6">Last Updated: January 17, 2026</p>
          </div>

          <div className="bg-white rounded-[2rem] border border-coffee-100 p-10 md:p-16 shadow-soft">
            <div className="max-w-none space-y-10 prose prose-lg">
                <section>
                    <h2 className="text-2xl font-display font-semibold text-coffee-900 uppercase">1. Agreement to Terms</h2>
                    <p className="text-coffee-700 font-light leading-relaxed">By accessing or using Real AI Examples ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, you may not access the Service.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-display font-semibold text-coffee-900 uppercase">2. Intellectual Property</h2>
                    <p className="text-coffee-700 font-light leading-relaxed">All content, including examples, workflows, and prompts provided on the Service, is the property of Real AI Examples. You are granted a limited, non-exclusive license to use this content for your personal or professional work. <strong className="font-semibold text-coffee-900">Republishing or reselling our curated content is strictly prohibited.</strong></p>
                </section>

                <section>
                    <h2 className="text-2xl font-display font-semibold text-coffee-900 uppercase">3. Disclaimer of Warranties</h2>
                    <p className="text-coffee-700 font-light leading-relaxed">The Service is provided "as is," without warranty of any kind. AI is an unpredictable field; we do not warrant that the examples or workflows will meet your requirements or be error-free. We are not responsible for any data loss, system errors, or damages resulting from their use.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-display font-semibold text-coffee-900 uppercase">4. Prohibited Uses</h2>
                    <p className="text-coffee-700 font-light leading-relaxed">You agree not to use the Service or its content for any unlawful purpose, to solicit others to perform or participate in any unlawful acts, or to infringe upon or violate our intellectual property rights.</p>
                </section>

                <section className="pt-10 border-t border-coffee-100">
                    <p className="text-base text-coffee-700 font-light">Questions? Contact us at: <a href="mailto:akhil@realaiexamples.com" className="font-semibold text-coffee-900 underline decoration-coffee-300 underline-offset-4 hover:text-coffee-600">akhil@realaiexamples.com</a></p>
                </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
