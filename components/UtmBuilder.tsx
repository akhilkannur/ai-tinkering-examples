import React, { useState, useEffect } from 'react';
import { Copy, Check, Clock, Link as LinkIcon, ExternalLink } from 'lucide-react';

interface UtmHistoryItem {
  url: string;
  timestamp: number;
}

const UtmBuilder = () => {
  const [baseUrl, setBaseUrl] = useState('');
  const [source, setSource] = useState('google');
  const [medium, setMedium] = useState('cpc');
  const [campaign, setCampaign] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<UtmHistoryItem[]>([]);

  useEffect(() => {
    // Load history from local storage on mount
    const savedHistory = localStorage.getItem('utm_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to parse history', e);
      }
    }
  }, []);

  useEffect(() => {
    // Generate URL whenever inputs change
    if (!baseUrl) {
      setGeneratedUrl('');
      return;
    }

    try {
      // Handle cases where user types just "example.com"
      let validBaseUrl = baseUrl;
      if (!validBaseUrl.startsWith('http://') && !validBaseUrl.startsWith('https://')) {
        validBaseUrl = 'https://' + validBaseUrl;
      }

      const url = new URL(validBaseUrl);
      if (source) url.searchParams.set('utm_source', source);
      if (medium) url.searchParams.set('utm_medium', medium);
      if (campaign) {
        // Auto-convert spaces to dashes for campaign name
        const formattedCampaign = campaign.trim().replace(/\s+/g, '-').toLowerCase();
        url.searchParams.set('utm_campaign', formattedCampaign);
      }

      setGeneratedUrl(url.toString());
    } catch (e) {
      // Invalid URL input, just return empty or partially constructed string if needed
      // But for now, let's just wait for a valid URL structure
      setGeneratedUrl('');
    }
  }, [baseUrl, source, medium, campaign]);

  const handleCopy = () => {
    if (!generatedUrl) return;

    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    // Add to history
    const newItem: UtmHistoryItem = { url: generatedUrl, timestamp: Date.now() };
    const newHistory = [newItem, ...history].slice(0, 5); // Keep last 5
    setHistory(newHistory);
    localStorage.setItem('utm_history', JSON.stringify(newHistory));
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('utm_history');
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 max-w-4xl mx-auto">
      <div className="bg-blue-600 p-6 text-white">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <LinkIcon className="w-6 h-6" />
          UTM Link Builder
        </h2>
        <p className="text-blue-100 mt-1">Generate consistent tracking links for your campaigns.</p>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Base URL <span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://yourwebsite.com/landing-page"
                className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Source</label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            >
              <option value="google">Google</option>
              <option value="facebook">Facebook</option>
              <option value="linkedin">LinkedIn</option>
              <option value="twitter">Twitter / X</option>
              <option value="newsletter">Newsletter</option>
              <option value="tiktok">TikTok</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Medium</label>
            <select
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            >
              <option value="cpc">CPC (Cost Per Click)</option>
              <option value="organic">Organic</option>
              <option value="social">Social</option>
              <option value="email">Email</option>
              <option value="referral">Referral</option>
            </select>
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Campaign Name</label>
            <input
              type="text"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              placeholder="Summer Sale 2026"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">Spaces will be automatically converted to dashes.</p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Generated URL</label>
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            <div className="flex-grow bg-white border border-gray-300 rounded-lg p-3 font-mono text-sm break-all text-gray-700 flex items-center min-h-[50px]">
              {generatedUrl || <span className="text-gray-400 italic">Fill in the Base URL to see the result...</span>}
            </div>
            <button
              onClick={handleCopy}
              disabled={!generatedUrl}
              className={`flex-shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-all transform active:scale-95 ${
                !generatedUrl ? 'bg-gray-300 cursor-not-allowed' : copied ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
              }`}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>

        {history.length > 0 && (
          <div className="pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" />
                Recent History
              </h3>
              <button onClick={handleClearHistory} className="text-xs text-red-500 hover:text-red-700">Clear History</button>
            </div>
           
            <div className="space-y-3">
              {history.map((item, index) => (
                <div key={index} className="group flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-100 transition-all">
                  <div className="truncate mr-4 flex-grow">
                    <p className="text-sm font-mono text-gray-600 truncate" title={item.url}>{item.url}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(item.timestamp).toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => {
                        navigator.clipboard.writeText(item.url);
                        // Optional: show a small toast or visual feedback specific to this item
                    }}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                    title="Copy again"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UtmBuilder;
