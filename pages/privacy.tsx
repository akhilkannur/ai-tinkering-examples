import Head from 'next/head'
import Navbar from '../components/Navbar'

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Real AI Examples</title>
      </Head>
      <div className="min-h-screen bg-brand-beige font-sans text-brand-navy">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-headline font-bold mb-8 uppercase tracking-tight">Privacy Policy</h1>
          <div className="prose prose-navy max-w-none text-brand-navy/80 leading-relaxed">
            <p className="mb-4">Last Updated: January 17, 2026</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
            <p className="mb-4">Welcome to Real AI Examples ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Data We Collect</h2>
            <p className="mb-4">We may collect, use, store and transfer different kinds of personal data about you, including:</p>
            <ul className="list-disc ml-6 mb-4">
              <li><strong>Identity Data:</strong> Email address (if you subscribe to our newsletter).</li>
              <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting, and browser plug-in types.</li>
              <li><strong>Usage Data:</strong> Information about how you use our website.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Use Your Data</h2>
            <p className="mb-4">We use your data to provide our services, including sending newsletters if you have opted in, and to improve our website through analytics.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Cookies</h2>
            <p className="mb-4">We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Third-Party Services</h2>
            <p className="mb-4">We use third-party services like Google Analytics and Meta Pixel to help us understand how our site is used. These services may collect information sent by your browser as part of a web page request.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Contact Us</h2>
            <p className="mb-4">If you have any questions about this privacy policy, please contact us at: akhil@realaiexamples.com</p>
          </div>
        </div>
      </div>
    </>
  )
}
