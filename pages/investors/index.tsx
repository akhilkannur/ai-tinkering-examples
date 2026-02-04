import { useState, useMemo, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import { parseCSV, InvestorCSV } from '../../lib/csv-parser'
import { GetStaticProps } from 'next'
import { Search, Filter, MapPin, DollarSign, Briefcase, Users, Lock, Key, ArrowRight, X, Crown, Check } from 'lucide-react'

interface InvestorsPageProps {
  initialInvestors: InvestorCSV[];
}

export default function InvestorsPage({ initialInvestors }: InvestorsPageProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDealType, setSelectedDealType] = useState('All')
  const [selectedGeo, setSelectedGeo] = useState('All')
  const [selectedCheckSize, setSelectedCheckSize] = useState('All')
  
  // Paywall State
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showLicenseInput, setShowLicenseInput] = useState(false);
  const [licenseKeyInput, setLicenseKeyInput] = useState('');
  const [unlockError, setUnlockError] = useState('');

  // Check for License Key
  useEffect(() => {
    const hasAccess = localStorage.getItem('terminal_cookbook_premium_v2') === 'true';
    if (hasAccess) {
      setIsUnlocked(true);
    }

    if (router.isReady) {
      const { license_key } = router.query;
      if (license_key === 'TK-8821-XPRO-MQ') {
        setIsUnlocked(true);
        localStorage.setItem('terminal_cookbook_premium_v2', 'true');
        router.replace('/investors', undefined, { shallow: true });
      }
    }
  }, [router.isReady, router.query]);

  const handleLicenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (licenseKeyInput.trim() === 'TK-8821-XPRO-MQ') {
      setIsUnlocked(true);
      localStorage.setItem('terminal_cookbook_premium_v2', 'true');
      setShowLicenseInput(false);
      setUnlockError('');
    } else {
      setUnlockError('Invalid license key. Please check your purchase email.');
    }
  };

  // Extract unique filter options
  const dealTypes = useMemo(() => {
    const types = new Set(initialInvestors.map(i => i.DealType).filter(Boolean));
    return ['All', ...Array.from(types).sort()];
  }, [initialInvestors]);

  const geoLocations = useMemo(() => {
    const locations = new Set(initialInvestors.map(i => i.GeographicFocus).filter(Boolean));
    return ['All', ...Array.from(locations).sort()];
  }, [initialInvestors]);

  const checkSizes = useMemo(() => {
    const sizes = new Set(initialInvestors.map(i => i.CheckSize).filter(Boolean));
    return ['All', ...Array.from(sizes).sort()];
  }, [initialInvestors]);

  // Filter Logic
  const filteredInvestors = useMemo(() => {
    return initialInvestors.filter(investor => {
      const matchesSearch = 
        investor.FirmName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        investor.InvestmentThesis.toLowerCase().includes(searchQuery.toLowerCase()) ||
        investor.PortfolioExamples.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDealType = selectedDealType === 'All' || investor.DealType === selectedDealType;
      const matchesGeo = selectedGeo === 'All' || investor.GeographicFocus === selectedGeo;
      const matchesCheckSize = selectedCheckSize === 'All' || investor.CheckSize === selectedCheckSize;

      return matchesSearch && matchesDealType && matchesGeo && matchesCheckSize;
    });
  }, [initialInvestors, searchQuery, selectedDealType, selectedGeo, selectedCheckSize]);

  // Pagination / Unlock Logic
  const FREE_LIMIT = 25;
  const displayedInvestors = isUnlocked ? filteredInvestors : filteredInvestors.slice(0, FREE_LIMIT);
  const showPaywallOverlay = !isUnlocked && filteredInvestors.length > FREE_LIMIT;

  // We also want to show the "Locked" teasers if paywall is active
  // So let's render the first 25 normally, and then render the next 25 as "Locked/Blurred" rows before the CTA
  const lockedTeasers = !isUnlocked ? filteredInvestors.slice(FREE_LIMIT, FREE_LIMIT + 6) : [];

  return (
    <>
      <Head>
        <title>SaaS Exit Database | 150+ PE Firms & Acquisition Partners - Real AI Examples</title>
        <meta name="description" content="A curated directory of 150+ active micro-private equity firms, search funds, and aggregators looking to acquire AI and SaaS businesses. Find your exit partner today." key="description" />
        <meta property="og:title" content="SaaS Exit Database | Find Buyers for Your Software Business" key="og:title" />
        <meta property="og:description" content="A curated directory of 150+ active micro-private equity firms, search funds, and aggregators looking to acquire AI and SaaS businesses." key="og:description" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/api/og?mode=home`} key="og:image" />
        <meta property="og:type" content="website" key="og:type" />
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content="SaaS Exit Database | Find Buyers for Your SaaS" key="twitter:title" />
        <meta name="twitter:description" content="A curated directory of 150+ active micro-private equity firms, search funds, and aggregators looking to acquire AI and SaaS businesses." key="twitter:description" />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/api/og?mode=home`} key="twitter:image" />
      </Head>

      <div className="min-h-screen bg-primary-bg text-text-color font-sans">
        <Navbar />
        
        <header className="max-w-6xl mx-auto px-4 py-12 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-[10px] uppercase tracking-[0.2em] mb-6 font-mono">
              <Briefcase className="w-3 h-3" /> Acquisition Roadmap
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-text-color mb-6 tracking-tighter leading-tight uppercase italic">
            The SaaS <span className="text-accent">Exit Database</span>
          </h1>
          <p className="text-lg text-text-color/80 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
            {isUnlocked ? (
                <span className="text-accent font-bold flex items-center justify-center gap-2">
                    <Check className="w-5 h-5" /> Verified Exit Partners Unlocked
                </span>
            ) : (
                `A curated list of 150+ micro-PE firms and acquisition partners looking for small, high-growth software companies. Sell your code, keep your freedom.`
            )}
            <br className="hidden md:block"/> Filter by check size, niche, and acquisition thesis to find your perfect buyer.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-accent transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-4 bg-secondary-bg border border-navy-dark rounded-xl text-text-color placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent shadow-2xl transition-all"
              placeholder="Search by firm name, acquisition thesis, or portfolio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 pb-20 flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="lg:w-1/4 space-y-6">
            <div className="bg-secondary-bg border border-navy-dark rounded-xl p-6 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-6 text-accent">
                <Filter className="h-5 w-5" />
                <h3 className="font-bold text-lg uppercase tracking-tight italic">Find Buyers</h3>
              </div>

              {/* Filter Group: Deal Type */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-text-secondary mb-2">Deal Type</label>
                <select 
                  value={selectedDealType}
                  onChange={(e) => setSelectedDealType(e.target.value)}
                  className="w-full bg-primary-bg border border-border-color rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-accent focus:outline-none"
                >
                  {dealTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Filter Group: Check Size */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-text-secondary mb-2">Check Size</label>
                <select 
                  value={selectedCheckSize}
                  onChange={(e) => setSelectedCheckSize(e.target.value)}
                  className="w-full bg-primary-bg border border-border-color rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-accent focus:outline-none"
                >
                  {checkSizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              {/* Filter Group: Geography */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-text-secondary mb-2">Geography</label>
                <select 
                  value={selectedGeo}
                  onChange={(e) => setSelectedGeo(e.target.value)}
                  className="w-full bg-primary-bg border border-border-color rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-accent focus:outline-none"
                >
                  {geoLocations.map(geo => (
                    <option key={geo} value={geo}>{geo}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t border-border-color">
                <p className="text-xs text-gray-500 text-center">
                  Showing {filteredInvestors.length} of {initialInvestors.length} firms
                </p>
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="lg:w-3/4">
            {filteredInvestors.length > 0 ? (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* UNLOCKED INVESTORS */}
                  {displayedInvestors.map((investor, idx) => (
                    <div key={idx} className="bg-secondary-bg border border-border-color rounded-lg p-6 hover:border-white/20 transition-all duration-300 shadow-sm group flex flex-col h-full relative">
                      
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-xl font-bold font-headline group-hover:text-accent transition-colors">{investor.FirmName}</h2>
                          <div className="text-xs text-text-secondary">
                            {investor.Website.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                          </div>
                        </div>
                        {investor.DealType && (
                          <span className="bg-accent/10 text-accent text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border border-accent/20">
                            {investor.DealType}
                          </span>
                        )}
                      </div>

                      <p className="text-gray-300 text-sm mb-6 flex-grow italic">
                        "{investor.InvestmentThesis}"
                      </p>

                      <div className="space-y-3 mb-6">
                        {investor.CheckSize && (
                          <div className="flex items-center text-sm">
                            <DollarSign className="h-4 w-4 text-accent mr-2" />
                            <span className="text-text-secondary mr-2">Check Size:</span>
                            <span className="font-semibold text-text-color">{investor.CheckSize}</span>
                          </div>
                        )}
                        
                        {investor.TargetEBITDA && (
                          <div className="flex items-center text-sm">
                            <Briefcase className="h-4 w-4 text-accent mr-2" />
                            <span className="text-text-secondary mr-2">Target:</span>
                            <span className="text-text-color">{investor.TargetEBITDA}</span>
                          </div>
                        )}

                        {investor.GeographicFocus && (
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 text-accent mr-2" />
                            <span className="text-text-secondary mr-2">Focus:</span>
                            <span className="text-text-color">{investor.GeographicFocus}</span>
                          </div>
                        )}

                        {/* Contact Info (Always blurred in this version, or revealed if unlocked?) 
                            The current component hardcoded it as blurred. 
                            Let's reveal it if unlocked!
                        */}
                        {isUnlocked ? (
                             <div className="flex items-center text-sm bg-accent/10 p-2 rounded-lg border border-accent/20 mt-2">
                                <Users className="h-4 w-4 text-accent mr-2" />
                                <span className="text-text-secondary mr-2 font-bold">Verified Contact:</span>
                                <span className="text-text-color">Partner Email Available</span>
                             </div>
                        ) : (
                            <div className="flex items-center text-sm opacity-50 filter blur-[2px] select-none mt-2">
                                <Users className="h-4 w-4 text-accent mr-2" />
                                <span className="text-text-secondary mr-2">Contact:</span>
                                <span className="text-text-color">John Doe (Partner) - john@firm.com</span>
                            </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* LOCKED TEASERS (If Paywall Active) */}
                  {showPaywallOverlay && lockedTeasers.map((investor, idx) => (
                    <div key={`locked-${idx}`} className="bg-secondary-bg/50 border border-border-color rounded-lg p-6 relative overflow-hidden opacity-80 select-none">
                       {/* Locked Strip */}
                       <div className="absolute top-0 left-0 w-1.5 h-full bg-yellow-500" />
                       <div className="absolute top-4 right-4 text-yellow-500">
                         <Lock className="w-5 h-5" />
                       </div>

                       <h2 className="text-xl font-bold font-headline text-gray-400 mb-2">{investor.FirmName}</h2>
                       <p className="text-gray-500 text-sm mb-4 italic line-clamp-2">"{investor.InvestmentThesis}"</p>
                       
                       <div className="space-y-2 filter blur-[3px]">
                          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                       </div>
                    </div>
                  ))}

                </div>

                {/* Upsell / Paywall Overlay */}
                {showPaywallOverlay && (
                    <div className="relative mt-12 mb-20 text-center">
                        <div className="absolute inset-0 flex items-center justify-center -top-32 bg-gradient-to-t from-primary-bg via-primary-bg/95 to-transparent z-10 pointer-events-none h-[400px]"></div>
                        
                        <div className="relative z-20 bg-secondary-bg border border-white/10 rounded-xl p-8 md:p-12 text-center shadow-2xl max-w-2xl mx-auto transform hover:scale-[1.01] transition-transform">
                        
                        {!showLicenseInput ? (
                            <>
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Crown className="h-32 w-32 text-accent" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4 text-text-color">Get the Email List</h2>
                                <p className="text-lg text-text-secondary mb-8 max-w-lg mx-auto leading-relaxed">
                                    Stop searching. Get the full list with <span className="text-text-color font-bold">verified partner emails</span> and detailed investment criteria. Or don't, and spend your weekend on Google.
                                </p>
                                <div className="flex flex-col items-center gap-4">
                                <a 
                                    href="https://checkout.dodopayments.com/buy/pdt_0NWKQ67zRM2yyxX7ulU7J?quantity=1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-accent hover:bg-opacity-90 text-primary-bg px-10 py-4 rounded-2xl font-bold text-xl transition-all shadow-xl shadow-accent/20 flex items-center gap-2"
                                >
                                    Get Full Access <ArrowRight className="w-5 h-5" />
                                </a>
                                <button 
                                    onClick={() => setShowLicenseInput(true)}
                                    className="text-sm text-gray-500 hover:text-text-color underline decoration-gray-600 underline-offset-4 transition-colors"
                                >
                                    I have a license key
                                </button>
                                </div>
                            </>
                        ) : (
                            <form onSubmit={handleLicenseSubmit} className="animate-fade-in max-w-sm mx-auto">
                                <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-text-color">Enter License Key</h3>
                                <button type="button" onClick={() => setShowLicenseInput(false)} className="text-gray-500 hover:text-text-color">
                                    <X className="w-6 h-6" />
                                </button>
                                </div>
                                <div className="mb-6">
                                <input 
                                    type="text" 
                                    value={licenseKeyInput}
                                    onChange={(e) => setLicenseKeyInput(e.target.value)}
                                    placeholder="TK-XXXX-XXXX-XXXX"
                                    className="w-full bg-primary-bg border border-border-color text-text-color px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent font-mono text-center uppercase tracking-widest placeholder-gray-600 text-lg"
                                />
                                {unlockError && <p className="text-red-400 text-sm mt-3">{unlockError}</p>}
                                </div>
                                <button 
                                type="submit"
                                className="w-full bg-accent text-primary-bg font-bold py-4 rounded-xl hover:bg-opacity-90 transition-colors shadow-lg flex items-center justify-center gap-2 text-lg"
                                >
                                <Key className="w-5 h-5" /> Activate License
                                </button>
                            </form>
                        )}
                        </div>
                    </div>
                )}
              </div>
            ) : (
              <div className="text-center py-20 bg-secondary-bg rounded-3xl border border-dashed border-border-color">
                <Search className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold font-headline text-text-color mb-2">No investors found</h3>
                <p className="text-text-secondary">Try adjusting your filters or search query.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDealType('All');
                    setSelectedGeo('All');
                    setSelectedCheckSize('All');
                  }}
                  className="mt-6 text-accent hover:underline font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const investors = parseCSV('public/micro-pe-investors.csv');
  
  return {
    props: {
      initialInvestors: investors,
    },
  };
}