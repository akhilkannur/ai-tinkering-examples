import Head from 'next/head'
import Navbar from '../components/Navbar'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-coffee-100 font-sans text-coffee-900 selection:bg-coffee-300 selection:text-coffee-900">
      <Head>
        <title>Privacy Policy | Real AI Examples</title>
        <meta name="description" content="Read our privacy policy to understand how we collect and protect your personal data." key="description" />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <Navbar />

      <main className="pt-32 md:pt-40 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-coffee-200/30 rounded-full blur-3xl pointer-events-none"></div>
            <h1 className="text-5xl md:text-7xl font-display font-semibold text-coffee-900 uppercase leading-[1.1] tracking-tight">Privacy Policy</h1>
            <p className="text-[10px] font-mono font-bold text-coffee-400 uppercase tracking-widest mt-6">Last Updated: January 17, 2026</p>
          </div>

          <div className="bg-white rounded-[2rem] border border-coffee-100 p-10 md:p-16 shadow-soft">
            <div className="max-w-none space-y-10 prose prose-lg">
                <section>
                    <h2 className="text-2xl font-display font-semibold text-coffee-900 uppercase">Introduction</h2>
                    <p className="text-coffee-900 font-light leading-relaxed">Welcome to Real AI Examples. We respect your privacy and are committed to protecting your personal data. This policy outlines how we handle your information.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-display font-semibold text-coffee-900 uppercase">Data We Collect</h2>
                    <p className="text-coffee-900 font-light leading-relaxed">We may collect, use, and store the following types of data:</p>
                    <ul className="space-y-3">
                        <li className="text-coffee-900 font-light"><strong className="font-semibold text-coffee-900">Identity Data:</strong> Your email address, if you subscribe to our newsletter.</li>
                        <li className="text-coffee-900 font-light"><strong className="font-semibold text-coffee-900">Technical Data:</strong> Anonymized data such as IP address, browser type, and device information for analytics purposes.</li>
                        <li className="text-coffee-900 font-light"><strong className="font-semibold text-coffee-900">Usage Data:</strong> Information about how you interact with our website and the examples you view.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-display font-semibold text-coffee-900 uppercase">How We Use Your Data</h2>
                    <p className="text-coffee-900 font-light leading-relaxed">We use your data to provide our services, including sending newsletters, and to improve our website through anonymous usage analytics. We do not sell your personal data to third parties.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-display font-semibold text-coffee-900 uppercase">Data Security</h2>
                    <p className="text-coffee-900 font-light leading-relaxed">We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way.</p>
                </section>

                <section className="pt-10 border-t border-coffee-100">
                    <p className="text-base text-coffee-900 font-light">Questions? Contact us at: <a href="mailto:akhil@realaiexamples.com" className="font-semibold text-coffee-900 underline decoration-coffee-300 underline-offset-4 hover:text-coffee-600">akhil@realaiexamples.com</a></p>
                </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
