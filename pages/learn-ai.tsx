import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, CalendarCheck } from 'lucide-react';

export default function LearnAIPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Head>
        <title>Learn AI Apps One-on-One | Expert-Led Online Sessions</title>
        <meta
          name="description"
          content="Accelerate your AI app learning with personalized one-on-one sessions led by experts. Master tools like n8n and more through online meetings."
        />
      </Head>

      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Unlock AI Potential with One-on-One Expert Guidance
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to master powerful AI applications but need personalized support? Our one-on-one online coaching connects you with seasoned experts for tailored learning experiences.
          </p>
        </div>

        <div className="bg-white p-6 md:p-10 rounded-lg shadow-xl max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center">
            Personalized Learning for Key AI Tools
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Imagine learning a complex AI app like n8n, a powerful workflow automation tool, with an expert by your side. We offer dedicated one-hour online sessions where you can:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li>Understand core concepts and advanced features.</li>
            <li>Get real-time answers to your specific questions.</li>
            <li>Work through your own projects with expert feedback.</li>
            <li>Accelerate your learning curve and avoid common pitfalls.</li>
          </ul>

          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 text-center">
            How It Works
          </h3>
          <ol className="list-decimal list-inside text-gray-700 mb-8 space-y-2">
            <li>Express your interest by filling out our form.</li>
            <li>We'll match you with an expert tailored to your learning needs.</li>
            <li>Schedule your convenient one-on-one online session.</li>
            <li>Master your chosen AI app with direct, focused guidance.</li>
          </ol>

          <div className="text-center mt-8">
            <p className="text-xl text-gray-800 font-medium mb-4 flex items-center justify-center gap-2">
              <Mail className="w-6 h-6" /> Interested in learning?
            </p>
            <p className="text-gray-600 text-lg mb-6">
              Fill out our form below to get started. We'll reach out to schedule your personalized session!
            </p>
            <a
              href="#" // Placeholder for the form link
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-[#001858] hover:bg-indigo-700 transition duration-150 ease-in-out shadow-lg transform hover:-translate-y-1"
            >
              <CalendarCheck className="w-5 h-5 mr-2" /> I'm Interested!
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
