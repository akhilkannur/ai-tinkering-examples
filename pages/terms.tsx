import Head from 'next/head'
import Navbar from '../components/Navbar'

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-black selection:bg-black selection:text-white">
      <Head>
        <title>Terms of Service | Real AI Examples</title>
        <meta name="description" content="Read our terms of service to understand the rules and guidelines for using our content." key="description" />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <Navbar />

      <main className="pt-24 pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-display text-black uppercase leading-[0.95] tracking-tight">Terms of Service</h1>
            <p className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mt-4">Last Updated: January 17, 2026</p>
          </div>
          
          <div className="bg-white border border-gray-200 p-8 md:p-16">
            <div className="max-w-none space-y-10 prose prose-lg">
                <section>
                    <h2 className="text-2xl font-display text-black uppercase">1. Agreement to Terms</h2>
                    <p>By accessing or using Real AI Examples ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, you may not access the Service.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-display text-black uppercase">2. Intellectual Property</h2>
                    <p>All content, including examples, workflows, and prompts provided on the Service, is the property of Real AI Examples. You are granted a limited, non-exclusive license to use this content for your personal or professional work. <strong className="font-bold">Republishing or reselling our curated content is strictly prohibited.</strong></p>
                </section>

                <section>
                    <h2 className="text-2xl font-display text-black uppercase">3. Disclaimer of Warranties</h2>
                    <p>The Service is provided "as is," without warranty of any kind. AI is an unpredictable field; we do not warrant that the examples or workflows will meet your requirements or be error-free. We are not responsible for any data loss, system errors, or damages resulting from their use.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-display text-black uppercase">4. Prohibited Uses</h2>
                    <p>You agree not to use the Service or its content for any unlawful purpose, to solicit others to perform or participate in any unlawful acts, or to infringe upon or violate our intellectual property rights.</p>
                </section>

                <section className="pt-10 border-t border-gray-200">
                    <p className="text-base">Questions? Contact us at: <a href="mailto:akhil@realaiexamples.com" className="font-bold underline">akhil@realaiexamples.com</a></p>
                </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
