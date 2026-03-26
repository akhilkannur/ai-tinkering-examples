import Head from 'next/head'
import Navbar from '../components/Navbar'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-black selection:bg-black selection:text-white">
      <Head>
        <title>Privacy Policy | Real AI Examples</title>
        <meta name="description" content="Read our privacy policy to understand how we collect and protect your personal data." key="description" />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <Navbar />

      <main className="pt-32 md:pt-40 pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-display text-black uppercase leading-[0.95] tracking-tight">Privacy Policy</h1>
            <p className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mt-4">Last Updated: January 17, 2026</p>
          </div>
          
          <div className="bg-white border border-gray-200 p-8 md:p-16">
            <div className="max-w-none space-y-10 prose prose-lg">
                <section>
                    <h2 className="text-2xl font-display text-black uppercase">Introduction</h2>
                    <p>Welcome to Real AI Examples. We respect your privacy and are committed to protecting your personal data. This policy outlines how we handle your information.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-display text-black uppercase">Data We Collect</h2>
                    <p>We may collect, use, and store the following types of data:</p>
                    <ul>
                        <li><strong>Identity Data:</strong> Your email address, if you subscribe to our newsletter.</li>
                        <li><strong>Technical Data:</strong> Anonymized data such as IP address, browser type, and device information for analytics purposes.</li>
                        <li><strong>Usage Data:</strong> Information about how you interact with our website and the examples you view.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-display text-black uppercase">How We Use Your Data</h2>
                    <p>We use your data to provide our services, including sending newsletters, and to improve our website through anonymous usage analytics. We do not sell your personal data to third parties.</p>
                </section>
                
                <section>
                    <h2 className="text-2xl font-display text-black uppercase">Data Security</h2>
                    <p>We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way.</p>
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
