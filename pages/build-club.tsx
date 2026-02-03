import Head from 'next/head'
import Navbar from '../components/Navbar'
import { Hammer, CheckCircle2, ArrowRight, XCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function BuildClub() {
  const title = "The Build Club | AI Execution for Non-Technical Tinkerers";
  const description = "A strict accountability group for shipping AI projects. Miss 2 updates = You are removed. No coding required. No gurus. Just results.";

  // Wes Anderson Palette
  const colors = {
    bg: '#C0392B', // Brick Red (High Contrast)
    text: '#FFFDE7', // Paper White
    red: '#FDF498', // Yellow (Accent)
    blue: '#3B4E59', // Slate Blue
    paper: '#FFFDE7', // Light Paper
    green: '#88A096', // Sage Green
  }

  const [signed, setSigned] = useState(false);

  return (
    <div className="min-h-screen font-mono selection:bg-yellow-400 selection:text-black" style={{ backgroundColor: colors.bg, color: colors.text }}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {/* Load Retro Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
        <style>{`
          .font-header { font-family: 'Bebas Neue', sans-serif; }
          .font-body { font-family: 'Courier Prime', monospace; }
          .marquee-container { overflow: hidden; white-space: nowrap; position: relative; }
          .marquee-content { display: inline-block; animation: marquee 20s linear infinite; }
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .texture-overlay {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            opacity: 0.15;
            pointer-events: none;
          }
          .stamp {
            mask-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/8399/grunge.png");
            mask-size: 940px 600px;
            mix-blend-mode: multiply;
          }
        `}</style>
      </Head>

      <div className="fixed inset-0 texture-overlay z-50"></div>

      {/* MARQUEE BANNER */}
      <div className="bg-[#FDF498] text-black py-2 border-b-4 border-black font-header tracking-widest text-lg marquee-container relative z-40">
        <div className="marquee-content">
          WARNING: LAZY PEOPLE WILL BE REMOVED. &nbsp;&nbsp; /// &nbsp;&nbsp; MISS 2 UPDATES = KICKED OUT. &nbsp;&nbsp; /// &nbsp;&nbsp; NO REFUNDS FOR SLACKERS. &nbsp;&nbsp; /// &nbsp;&nbsp; WARNING: LAZY PEOPLE WILL BE REMOVED. &nbsp;&nbsp; /// &nbsp;&nbsp; MISS 2 UPDATES = KICKED OUT. &nbsp;&nbsp; /// &nbsp;&nbsp; NO REFUNDS FOR SLACKERS.
        </div>
      </div>

      <Navbar />

      <main className="pt-32 pb-20 relative z-10">
        
        {/* HERO SECTION */}
        <div className="container mx-auto px-4 max-w-5xl text-center mb-20 pt-16">
          <div className="inline-block border-4 border-black bg-white px-6 py-2 mb-8 transform -rotate-2 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <span className="font-header text-2xl tracking-widest text-black">COHORT #01: BETA</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-header mb-6 leading-none text-[#FDF498] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            THE BUILD CLUB
          </h1>
          
          <p className="font-body text-xl md:text-2xl mb-6 max-w-2xl mx-auto leading-relaxed text-white">
            An accountability group that forces you to ship one AI tool per month.<br/>
            <span className="bg-[#FDF498] text-black px-2 italic font-bold border-2 border-black">Or you're out.</span>
          </p>
          
          <div className="font-header text-2xl tracking-widest mb-12 opacity-80 uppercase">
            FOR NON-TECHNICAL, AI-CURIOUS PROFESSIONALS & OPERATORS.
          </div>

          {/* VIDEO SECTION */}
          <div className="max-w-4xl mx-auto mb-20 relative">
            <div className="border-[6px] border-black bg-black shadow-[12px_12px_0px_rgba(0,0,0,1)] overflow-hidden p-4 md:p-8">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-auto aspect-video shadow-2xl"
              >
                <source src="/videos/AIGymTrainerWes.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            {/* Stamp Overlay */}
            <div className="absolute -bottom-6 -right-6 transform rotate-12 z-20">
               <div className="bg-red-700 text-white font-header text-2xl px-4 py-1 border-4 border-white shadow-lg">
                 APPROVED FOR SHIP
               </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start max-w-4xl mx-auto text-left">
            
            {/* THE AGREEMENT (Left) */}
            <div className="bg-[#FFFDE7] p-8 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] relative text-[#4A2C2A]">
                {/* Paper Clip Visual */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-24 h-12 bg-gray-300 rounded-t-lg border-4 border-black border-b-0"></div>
                
                <h2 className="font-header text-4xl mb-6 border-b-4 border-black pb-2 text-black">MEMBERSHIP RULES</h2>
                
                <ul className="space-y-6 font-body text-lg">
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-red-700">01.</span>
                    <span>Post one update every week. Screenshot, Loom, or text. Proof you made progress.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-red-700">02.</span>
                    <span>I check in with you twice a week. Not a bot. Me. Async via DM.</span>
                  </li>
                  <li className="flex items-start gap-3 p-2 bg-red-100 border border-red-800 -mx-2 text-red-900">
                    <span className="font-bold text-red-700">03.</span>
                    <span className="font-bold">MISS 2 UPDATES = YOU'RE REMOVED. No warnings. No refunds.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-red-700">04.</span>
                    <span>Build your own idea or pick from 700+ blueprints on this site. Your call.</span>
                  </li>
                </ul>

                <div className="mt-8 pt-6 border-t-4 border-black border-dashed">
                  <label className="flex items-center gap-4 cursor-pointer group">
                    <div className={`w-8 h-8 border-4 border-black flex items-center justify-center transition-colors ${signed ? 'bg-black' : 'bg-white'}`} onClick={() => setSigned(!signed)}>
                      {signed && <CheckCircle2 className="text-white w-6 h-6" />}
                    </div>
                    <span className="font-header text-xl tracking-wide group-hover:underline text-black">I ACCEPT THE TERMS</span>
                  </label>
                </div>
            </div>

            {/* THE RECEIPT (Right) */}
            <div className="bg-white p-6 w-full max-w-sm mx-auto border border-gray-200 shadow-xl transform rotate-1 font-mono text-sm relative text-black">
                {/* Receipt Jagged Edge Top */}
                <div className="absolute top-0 left-0 w-full h-4 bg-white" style={{ clipPath: 'polygon(0% 100%, 5% 0%, 10% 100%, 15% 0%, 20% 100%, 25% 0%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 100%, 55% 0%, 60% 100%, 65% 0%, 70% 100%, 75% 0%, 80% 100%, 85% 0%, 90% 100%, 95% 0%, 100% 100%)', marginTop: '-10px' }}></div>

                <div className="text-center mb-6">
                  <div className="font-header text-2xl mb-1">REAL AI EXAMPLES</div>
                  <div className="text-xs text-gray-500">STORE #001 - INTERNET</div>
                  <div className="text-xs text-gray-500">{new Date().toLocaleDateString()}</div>
                </div>

                <div className="border-b-2 border-dashed border-gray-300 mb-4"></div>

                <div className="flex justify-between mb-2">
                  <span>ITEM</span>
                  <span>PRICE</span>
                </div>

                <div className="flex justify-between font-bold mb-1">
                  <span>BUILD CLUB (BETA)</span>
                  <span>$29.00/mo</span>
                </div>
                <div className="text-xs text-gray-500 mb-4 pl-4">
                  - 2x Weekly Check-ins (me, not a bot)<br/>
                  - Private group chat<br/>
                  - Access to 700+ blueprints
                </div>

                <div className="border-b-2 border-dashed border-gray-300 mb-4"></div>

                <div className="flex justify-between text-xl font-bold mb-6">
                  <span>TOTAL</span>
                  <span>$29.00</span>
                </div>

                <div className="text-center">
                  <a 
                    href={signed ? "https://checkout.dodopayments.com/buy/pdt_0NXUrQ3VQZzHbEiLKP2hN?quantity=1" : "#"}
                    target={signed ? "_blank" : "_self"}
                    rel={signed ? "noopener noreferrer" : ""}
                    onClick={(e) => {
                      if (!signed) {
                        e.preventDefault();
                        alert("YOU MUST SIGN THE AGREEMENT FIRST.");
                      }
                    }}
                    className={`block w-full py-3 border-2 border-black font-bold transition-all ${signed ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                  >
                    {signed ? "PROCEED TO PAYMENT" : "SIGN LEFT TO BUY"}
                  </a>
                  <p className="mt-2 text-[10px] uppercase">By clicking, you agree to the Kick-Out Rule.</p>
                </div>

                {/* Receipt Jagged Edge Bottom */}
                <div className="absolute bottom-0 left-0 w-full h-4 bg-white" style={{ clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)', marginBottom: '-10px' }}></div>
            </div>

          </div>
        </div>

        {/* WORKSHOP DETAILS */}
        <div className="container mx-auto px-4 max-w-4xl mb-24">
          <div className="bg-white border-4 border-black p-10 relative text-black">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white px-4 py-1 font-header text-xl tracking-widest">
              WHAT COUNTS AS "BUILDING"?
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-4 font-body">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🛠️</div>
                <h3 className="font-bold text-lg mb-2">Automations</h3>
                <p className="text-sm">Lead scrapers, CRM enrichers, inbox sorters. Things that save you hours.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">📢</div>
                <h3 className="font-bold text-lg mb-2">Content Machines</h3>
                <p className="text-sm">Blog-to-LinkedIn converters, SEO auditors, cold email generators.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">📱</div>
                <h3 className="font-bold text-lg mb-2">Mini Products</h3>
                <p className="text-sm">Chrome extensions, calculators, directories. Things you can charge for.</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ / NOTICE BOARD */}
        <div className="container mx-auto px-4 max-w-2xl mb-24">
          <h2 className="font-header text-5xl text-center mb-12">NOTICE BOARD</h2>
          
          <div className="bg-[#5D4037] p-4 rounded-lg shadow-2xl">
            <div className="bg-[#D7CCC8] p-8 border-2 border-[#8D6E63] relative text-[#3E2723]">
              {/* Pin */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 shadow-md"></div>
              
              <div className="space-y-6 font-body">
                <div>
                  <h3 className="font-bold underline mb-1">WHO IS THIS FOR?</h3>
                  <p>Founders, marketers, salespeople, ops folks. People who want to build AI tools but keep getting distracted. If you're an engineer looking for architecture talks, this isn't it.</p>
                </div>
                <div>
                  <h3 className="font-bold underline mb-1">IS IT A COURSE?</h3>
                  <p>No. Zero tutorials. I assume you know how to use ChatGPT or Claude. This is about doing, not learning.</p>
                </div>
                <div>
                  <h3 className="font-bold underline mb-1">WHY $29?</h3>
                  <p>Cheap enough to join, expensive enough to hurt if you waste it. Skin in the game.</p>
                </div>
                <div>
                  <h3 className="font-bold underline mb-1">WHAT WILL I HAVE AFTER 4 WEEKS?</h3>
                  <p>At least one working AI tool. A lead scraper, a content repurposer, a Chrome extension. Something you can show people.</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </main>
    </div>
  )
}
