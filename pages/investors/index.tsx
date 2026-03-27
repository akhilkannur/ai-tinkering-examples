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
        <meta name="robots" content="noindex, nofollow" />
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

      <div className="min-h-screen bg-coffee-100 text-coffee-900 font-sans selection:bg-coffee-300 selection:text-coffee-900">
        <Navbar />
        
        <header className="max-w-6xl mx-auto px-6 pt-32 md:pt-40 pb-12 md:pb-20 text-center relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-coffee-200/30 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-coffee-200 text-coffee-600 font-medium text-[10px] uppercase tracking-widest mb-8 shadow-sm">
              <Briefcase className="w-3 h-3" /> Acquisition Roadmap
          </div>
          <h1 className="text-4xl md:text-7xl font-display font-semibold text-coffee-900 mb-8 tracking-tight leading-[1.1] uppercase">
            The SaaS <span className="text-coffee-500">Exit Database</span>
          </h1>
          <p className="text-lg md:text-xl text-coffee-700 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            {isUnlocked ? (
                <span className="text-coffee-600 font-medium flex items-center justify-center gap-2 bg-white/50 py-2 rounded-full border border-coffee-200 shadow-inner-soft">
                    <Check className="w-5 h-5" /> Verified Exit Partners Unlocked
                </span>
            ) : (
                `A curated list of 150+ micro-PE firms and acquisition partners looking for small, high-growth software companies. Sell your code, keep your freedom.`
            )}
            <br className="hidden md:block"/> Filter by check size, niche, and acquisition thesis to find your perfect buyer.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-coffee-300 group-focus-within:text-coffee-500 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-6 py-5 bg-white border border-coffee-200 rounded-[2rem] text-coffee-900 placeholder-coffee-300 focus:outline-none focus:ring-4 focus:ring-coffee-200/20 shadow-soft hover:shadow-soft-hover transition-all"
              placeholder="Search by firm name, acquisition thesis, or portfolio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <main className="max-w-[1440px] mx-auto px-6 pb-24 flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Filters */}
          <aside className="lg:w-1/4 space-y-6">
            <div className="bg-white border border-coffee-100 rounded-[2rem] p-8 shadow-soft sticky top-24">
              <div className="flex items-center gap-3 mb-8 text-coffee-900">
                <Filter className="h-5 w-5 text-coffee-500" />
                <h3 className="font-display font-semibold text-lg uppercase tracking-tight">Find Buyers</h3>
              </div>

              {/* Filter Group: Deal Type */}
              <div className="mb-8">
                <label className="block text-[10px] font-bold text-coffee-400 uppercase tracking-widest mb-3">Deal Type</label>
                <select 
                  value={selectedDealType}
                  onChange={(e) => setSelectedDealType(e.target.value)}
                  className="w-full bg-coffee-50 border border-coffee-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-coffee-500 focus:bg-white focus:outline-none transition-all cursor-pointer"
                >
                  {dealTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Filter Group: Check Size */}
              <div className="mb-8">
                <label className="block text-[10px] font-bold text-coffee-400 uppercase tracking-widest mb-3">Check Size</label>
                <select 
                  value={selectedCheckSize}
                  onChange={(e) => setSelectedCheckSize(e.target.value)}
                  className="w-full bg-coffee-50 border border-coffee-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-coffee-500 focus:bg-white focus:outline-none transition-all cursor-pointer"
                >
                  {checkSizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              {/* Filter Group: Geography */}
              <div className="mb-8">
                <label className="block text-[10px] font-bold text-coffee-400 uppercase tracking-widest mb-3">Geography</label>
                <select 
                  value={selectedGeo}
                  onChange={(e) => setSelectedGeo(e.target.value)}
                  className="w-full bg-coffee-50 border border-coffee-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-coffee-500 focus:bg-white focus:outline-none transition-all cursor-pointer"
                >
                  {geoLocations.map(geo => (
                    <option key={geo} value={geo}>{geo}</option>
                  ))}
                </select>
              </div>

              <div className="pt-6 border-t border-coffee-50">
                <p className="text-[10px] font-mono text-coffee-400 text-center uppercase tracking-widest">
                  {filteredInvestors.length} of {initialInvestors.length} firms
                </p>
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="lg:w-3/4">
            {filteredInvestors.length > 0 ? (
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* UNLOCKED INVESTORS */}
                  {displayedInvestors.map((investor, idx) => (
                    <div key={idx} className="bg-white border border-coffee-100 rounded-[2rem] p-8 hover:shadow-soft-hover hover:-translate-y-1.5 transition-all duration-300 shadow-soft group flex flex-col h-full relative overflow-hidden">
                      
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h2 className="text-2xl font-display font-semibold text-coffee-900 group-hover:text-coffee-600 transition-colors uppercase leading-tight">{investor.FirmName}</h2>
                          <div className="text-xs font-mono text-coffee-400 mt-1">
                            {investor.Website.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                          </div>
                        </div>
                        {investor.DealType && (
                          <span className="bg-coffee-100 text-coffee-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-coffee-200">
                            {investor.DealType}
                          </span>
                        )}
                      </div>

                      <p className="text-coffee-700 font-light text-sm mb-8 flex-grow italic leading-relaxed">
                        "{investor.InvestmentThesis}"
                      </p>

                      <div className="space-y-4 mb-8 pt-6 border-t border-coffee-50">
                        {investor.CheckSize && (
                          <div className="flex items-center text-sm text-coffee-600">
                            <DollarSign className="h-4 w-4 text-coffee-400 mr-3" />
                            <span className="text-coffee-400 mr-2 font-medium">Check:</span>
                            <span className="font-semibold text-coffee-900">{investor.CheckSize}</span>
                          </div>
                        )}
                        
                        {investor.TargetEBITDA && (
                          <div className="flex items-center text-sm text-coffee-600">
                            <Briefcase className="h-4 w-4 text-coffee-400 mr-3" />
                            <span className="text-coffee-400 mr-2 font-medium">Target:</span>
                            <span className="font-semibold text-coffee-900">{investor.TargetEBITDA}</span>
                          </div>
                        )}

                        {investor.GeographicFocus && (
                          <div className="flex items-center text-sm text-coffee-600">
                            <MapPin className="h-4 w-4 text-coffee-400 mr-3" />
                            <span className="text-coffee-400 mr-2 font-medium">Focus:</span>
                            <span className="font-semibold text-coffee-900">{investor.GeographicFocus}</span>
                          </div>
                        )}

                        {isUnlocked ? (
                             <div className="flex items-center text-sm bg-coffee-50 p-3 rounded-2xl border border-coffee-100 mt-4 shadow-inner-soft">
                                <Users className="h-4 w-4 text-coffee-500 mr-3" />
                                <span className="text-coffee-800 font-bold mr-2">Verified Contact:</span>
                                <span className="text-coffee-600">Email Available</span>
                             </div>
                        ) : (
                            <div className="flex items-center text-sm opacity-30 filter blur-[3px] select-none mt-4">
                                <Users className="h-4 w-4 text-coffee-400 mr-3" />
                                <span className="text-coffee-400 mr-2 font-medium">Contact:</span>
                                <span className="text-coffee-900">Partner Email Available</span>
                            </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* LOCKED TEASERS (If Paywall Active) */}
                  {showPaywallOverlay && lockedTeasers.map((investor, idx) => (
                    <div key={`locked-${idx}`} className="bg-white/50 border border-coffee-100 rounded-[2rem] p-8 relative overflow-hidden opacity-60 select-none shadow-soft">
                       {/* Locked Strip */}
                       <div className="absolute top-0 left-0 w-1.5 h-full bg-coffee-300" />
                       <div className="absolute top-6 right-6 text-coffee-400">
                         <Lock className="w-6 h-6" />
                       </div>

                       <h2 className="text-2xl font-display font-semibold text-coffee-300 mb-2 uppercase leading-tight">{investor.FirmName}</h2>
                       <p className="text-coffee-300 text-sm mb-6 italic line-clamp-2">"{investor.InvestmentThesis}"</p>
                       
                       <div className="space-y-3 filter blur-[4px]">
                          <div className="h-4 bg-coffee-100 rounded-full w-3/4"></div>
                          <div className="h-4 bg-coffee-100 rounded-full w-1/2"></div>
                          <div className="h-4 bg-coffee-100 rounded-full w-5/6"></div>
                       </div>
                    </div>
                  ))}

                </div>

                {/* Upsell / Paywall Overlay */}
                {showPaywallOverlay && (
                    <div className="relative mt-12 mb-20 text-center">
                        <div className="absolute inset-0 flex items-center justify-center -top-32 bg-gradient-to-t from-coffee-100 via-coffee-100/95 to-transparent z-10 pointer-events-none h-[400px]"></div>
                        
                        <div className="relative z-20 bg-coffee-900 rounded-[2rem] p-10 md:p-16 text-center shadow-soft-hover max-w-2xl mx-auto border border-coffee-800">
                        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                        
                        {!showLicenseInput ? (
                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-coffee-800 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-md text-coffee-300">
                                    <Crown className="h-10 w-10 stroke-[2px]" />
                                </div>
                                <h2 className="text-3xl md:text-5xl font-display font-semibold mb-6 text-white uppercase">Get the Email List</h2>
                                <p className="text-lg text-coffee-200 mb-10 max-w-lg mx-auto leading-relaxed font-light">
                                    Stop searching. Get the full list with <span className="text-white font-bold">verified partner emails</span> and detailed investment criteria. Or don't, and spend your weekend on Google.
                                </p>
                                <div className="flex flex-col items-center gap-6">
                                <a 
                                    href="https://checkout.dodopayments.com/buy/pdt_0NWKQ67zRM2yyxX7ulU7J?quantity=1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-coffee-100 text-coffee-900 px-12 py-5 rounded-full font-display text-xl uppercase transition-all shadow-lg hover:bg-white hover:-translate-y-1 flex items-center gap-3"
                                >
                                    Get Full Access <ArrowRight className="w-6 h-6 stroke-[2px]" />
                                </a>
                                <button 
                                    onClick={() => setShowLicenseInput(true)}
                                    className="text-sm text-coffee-400 hover:text-white underline decoration-coffee-700 underline-offset-8 transition-colors uppercase font-bold tracking-widest"
                                >
                                    I have a license key
                                </button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleLicenseSubmit} className="relative z-10 animate-fade-in max-w-sm mx-auto">
                                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                                <h3 className="text-2xl font-display font-semibold text-white uppercase">Enter License</h3>
                                <button type="button" onClick={() => setShowLicenseInput(false)} className="text-coffee-400 hover:text-white transition-all">
                                    <X className="w-8 h-8" />
                                </button>
                                </div>
                                <div className="mb-8">
                                <input 
                                    type="text" 
                                    value={licenseKeyInput}
                                    onChange={(e) => setLicenseKeyInput(e.target.value)}
                                    placeholder="TK-XXXX-XXXX-XXXX"
                                    className="w-full bg-coffee-800 border border-white/10 text-white px-6 py-5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-coffee-500/30 font-mono text-center uppercase tracking-widest placeholder-coffee-700 text-xl transition-all"
                                />
                                {unlockError && <p className="text-red-400 text-sm mt-4 font-medium">{unlockError}</p>}
                                </div>
                                <button 
                                type="submit"
                                className="w-full bg-coffee-100 text-coffee-900 font-display text-xl py-5 rounded-2xl hover:bg-white transition-all shadow-lg flex items-center justify-center gap-3 uppercase"
                                >
                                <Key className="w-6 h-6 stroke-[2px]" /> Activate License
                                </button>
                            </form>
                        )}
                        </div>
                    </div>
                )}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-[2rem] border border-dashed border-coffee-200 shadow-inner-soft">
                <Search className="h-16 w-16 text-coffee-100 mx-auto mb-6" />
                <h3 className="text-2xl font-display font-semibold text-coffee-900 mb-3 uppercase">No investors found</h3>
                <p className="text-coffee-400 font-light">Try adjusting your filters or search query.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDealType('All');
                    setSelectedGeo('All');
                    setSelectedCheckSize('All');
                  }}
                  className="mt-8 bg-coffee-900 text-white px-8 py-3 rounded-full font-medium shadow-md hover:bg-coffee-700 transition-all uppercase text-xs tracking-widest"
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