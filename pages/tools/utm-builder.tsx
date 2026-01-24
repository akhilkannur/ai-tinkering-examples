import Head from 'next/head';
import Navbar from '../../components/Navbar';
import UtmBuilder from '../../components/UtmBuilder';

const UtmBuilderPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Head>
        <title>UTM Builder | Free Marketing Tool | Real AI Examples</title>
        <meta
          name="description"
          content="Generate error-free UTM tracking links for your marketing campaigns with our free, easy-to-use builder."
          key="description"
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:title" content="UTM Builder | Free Marketing Tool" key="og:title" />
        <meta property="og:description" content="Generate error-free UTM tracking links for your marketing campaigns with our free, easy-to-use builder." key="og:description" />
        <meta property="og:image" content="https://realaiexamples.com/api/og?mode=home" key="og:image" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content="UTM Builder | Free Marketing Tool" key="twitter:title" />
        <meta name="twitter:description" content="Generate error-free UTM tracking links for your marketing campaigns with our free, easy-to-use builder." key="twitter:description" />
        <meta name="twitter:image" content="https://realaiexamples.com/api/og?mode=home" key="twitter:image" />
      </Head>
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            The 'Foolproof' UTM Builder
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stop guessing URL parameters. Create consistent, trackable links for your campaigns in seconds.
          </p>
        </div>

        <UtmBuilder />
        
        <div className="max-w-4xl mx-auto mt-16 text-gray-600 text-sm">
            <h3 className="font-bold text-gray-800 mb-2">Why use this tool?</h3>
            <p className="mb-4">
                Inconsistent UTM tagging ruins analytics data. By using standardized inputs for Source and Medium, you ensure your Google Analytics reports are clean and actionable.
            </p>
        </div>
      </main>
    </div>
  );
};

export default UtmBuilderPage;
