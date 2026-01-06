import { useState, useMemo } from 'react'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import { parseCSV, InvestorCSV } from '../../lib/csv-parser'
import { GetStaticProps } from 'next'
import { Search, Filter, MapPin, DollarSign, Briefcase, Users } from 'lucide-react'

interface InvestorsPageProps {
  initialInvestors: InvestorCSV[];
}

export default function InvestorsPage({ initialInvestors }: InvestorsPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDealType, setSelectedDealType] = useState('All')
  const [selectedGeo, setSelectedGeo] = useState('All')
  const [selectedCheckSize, setSelectedCheckSize] = useState('All')

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

  return (
    <>
      <Head>
        <title>Micro-PE Match | Find Buyers for Your SaaS - AI Tinkering Examples</title>
        <meta name="description" content="A curated directory of 150+ active micro-private equity firms, search funds, and aggregators looking to acquire AI and SaaS businesses." />
      </Head>

      <div className="min-h-screen bg-primary-bg text-text-color font-sans">
        <Navbar />
        
        <header className="max-w-6xl mx-auto px-4 py-12 md:py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 font-headline bg-clip-text text-transparent bg-gradient-to-r from-accent to-light-purple">
            Micro-PE Match
          </h1>
          <p className="text-xl text-light-purple max-w-2xl mx-auto mb-8">
            Previewing 6 of {initialInvestors.length} active buyers for AI tools & Micro-SaaS. 
            <br className="hidden md:block"/>Filter by check size, deal type, and geography to find your perfect exit partner.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-accent transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-4 bg-secondary-bg border border-border-color rounded-xl text-text-color placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent shadow-lg transition-all"
              placeholder="Search by firm name, thesis, or portfolio companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 pb-20 flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters (Desktop) / Top Filters (Mobile) */}
          <aside className="lg:w-1/4 space-y-6">
            <div className="bg-secondary-bg border border-border-color rounded-2xl p-6 shadow-lg sticky top-24">
              <div className="flex items-center gap-2 mb-6 text-accent">
                <Filter className="h-5 w-5" />
                <h3 className="font-bold text-lg">Filter Investors</h3>
              </div>

              {/* Filter Group: Deal Type */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-light-purple mb-2">Deal Type</label>
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
                <label className="block text-sm font-semibold text-light-purple mb-2">Check Size</label>
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
                <label className="block text-sm font-semibold text-light-purple mb-2">Geography</label>
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
                  {filteredInvestors.slice(0, 6).map((investor, idx) => (
                    <div key={idx} className="bg-secondary-bg border border-border-color rounded-2xl p-6 hover:border-accent transition-all duration-300 shadow-lg group flex flex-col h-full relative">
                      
                      {/* Card Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-xl font-bold group-hover:text-accent transition-colors">{investor.FirmName}</h2>
                          <div className="text-xs text-light-purple">
                            {investor.Website.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                          </div>
                        </div>
                        {investor.DealType && (
                          <span className="bg-accent/10 text-accent text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border border-accent/20">
                            {investor.DealType}
                          </span>
                        )}
                      </div>

                      {/* Thesis */}
                      <p className="text-gray-300 text-sm mb-6 flex-grow italic">
                        "{investor.InvestmentThesis}"
                      </p>

                      {/* Data Points */}
                      <div className="space-y-3 mb-6">
                        {investor.CheckSize && (
                          <div className="flex items-center text-sm">
                            <DollarSign className="h-4 w-4 text-accent mr-2" />
                            <span className="text-light-purple mr-2">Check Size:</span>
                            <span className="font-semibold text-white">{investor.CheckSize}</span>
                          </div>
                        )}
                        
                        {investor.TargetEBITDA && (
                          <div className="flex items-center text-sm">
                            <Briefcase className="h-4 w-4 text-accent mr-2" />
                            <span className="text-light-purple mr-2">Target:</span>
                            <span className="text-white">{investor.TargetEBITDA}</span>
                          </div>
                        )}

                        {investor.GeographicFocus && (
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 text-accent mr-2" />
                            <span className="text-light-purple mr-2">Focus:</span>
                            <span className="text-white">{investor.GeographicFocus}</span>
                          </div>
                        )}

                        {/* Hidden Contact Info in Preview */}
                        <div className="flex items-center text-sm opacity-50 filter blur-[2px] select-none">
                          <Users className="h-4 w-4 text-accent mr-2" />
                          <span className="text-light-purple mr-2">Contact:</span>
                          <span className="text-white">John Doe (Partner) - john@firm.com</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Upsell / Paywall Overlay */}
                <div className="relative mt-8">
                   <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-transparent to-transparent z-10 -mt-32 h-32"></div>
                   <div className="bg-gradient-to-br from-secondary-bg to-primary-bg border-2 border-accent/50 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden group z-20">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Users className="h-32 w-32" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Unlock the Full List of {initialInvestors.length} Buyers</h2>
                    <p className="text-xl text-light-purple mb-8 max-w-2xl mx-auto">
                      You are viewing a limited preview. Get immediate access to the <strong>verified personal emails</strong>, LinkedIn profiles, and "best way to pitch" notes for all {initialInvestors.length} partners.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                      <a 
                        href="#" 
                        className="bg-accent hover:bg-opacity-90 text-white px-10 py-4 rounded-2xl font-bold text-xl hover:scale-105 transition-transform shadow-xl"
                      >
                        Buy Full Access ($49)
                      </a>
                      <span className="text-light-purple font-medium text-sm">One-time payment. Lifetime updates.</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 bg-secondary-bg rounded-3xl border border-dashed border-border-color">
                <Search className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No investors found</h3>
                <p className="text-light-purple">Try adjusting your filters or search query.</p>
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

        {/* Upsell Banner Removed - Embedded in List */}
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
