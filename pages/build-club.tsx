import Head from 'next/head'
import Navbar from '../components/Navbar'
import { Hammer, CheckCircle2, ArrowRight, XCircle, Terminal, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function BuildClub() {
  const title = "The Build Club | AI Execution for Non-Technical Tinkerers";
  const description = "A strict accountability group for shipping AI projects. Miss 2 updates = You are removed. No coding required. No gurus. Just results.";

  const [signed, setSigned] = useState(false);

  return (
    <div className="min-h-screen bg-primary-bg font-sans text-black selection:bg-[#ff00ff] selection:text-white overflow-x-hidden">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <Navbar />

      <main className="pt-32 pb-24 relative z-10">
        
        {/* HERO SECTION */}
        <div className="container mx-auto px-4 max-w-5xl text-center mb-12 pt-16">
          <div className="inline-block border-4 border-black bg-black text-[#ccff00] px-6 py-2 mb-8 transform -rotate-2 brutalist-shadow-sm font-black text-2xl tracking-widest uppercase">
            COHORT #01: BETA
          </div>
          
          <h1 className="text-7xl md:text-9xl font-display mb-6 leading-none text-black drop-shadow-[4px_4px_0px_rgba(255,0,255,1)] uppercase tracking-tighter glitch-text" data-text="THE BUILD CLUB">
            THE BUILD CLUB
          </h1>
          
          <p className="text-xl md:text-3xl mb-12 max-w-2xl mx-auto leading-tight text-black font-black uppercase tracking-tighter">
            An accountability group that forces you to <br/>
            <span className="bg-[#ccff00] text-black px-2 border-2 border-black rotate-1 inline-block">ship one AI project per week.</span><br/>
            <span className="text-[#ff00ff] text-4xl">Or you're out.</span>
          </p>
          
          <div className="font-display text-2xl tracking-widest mb-12 text-black uppercase opacity-80 border-y-2 border-black py-2 inline-block">
            FOR NON-TECHNICAL, AI-CURIOUS PROFESSIONALS & OPERATORS.
          </div>
        </div>

        {/* MARQUEE BANNER */}
        <div className="bg-[#ff00ff] text-white py-4 border-y-4 border-black font-display tracking-widest text-2xl marquee-container relative z-40 mb-24 rotate-1">
            <div className="marquee-content">
            WARNING: LAZY PEOPLE WILL BE REMOVED. &nbsp;&nbsp; /// &nbsp;&nbsp; MISS 2 UPDATES = KICKED OUT. &nbsp;&nbsp; /// &nbsp;&nbsp; NO REFUNDS FOR SLACKERS. &nbsp;&nbsp; /// &nbsp;&nbsp; WARNING: LAZY PEOPLE WILL BE REMOVED. &nbsp;&nbsp; /// &nbsp;&nbsp; MISS 2 UPDATES = KICKED OUT. &nbsp;&nbsp; /// &nbsp;&nbsp; NO REFUNDS FOR SLACKERS.
            </div>
        </div>

        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start max-w-4xl mx-auto text-left mb-32">
            
            {/* THE AGREEMENT (Left) */}
            <div id="rules" className="bg-white p-8 border-4 border-black brutalist-shadow relative text-black">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-black border-4 border-black"></div>
                
                <h2 className="font-display text-4xl mb-8 border-b-4 border-black pb-2 text-black uppercase">MEMBERSHIP RULES</h2>
                
                <ul className="space-y-8 font-mono text-lg font-black uppercase leading-tight">
                  <li className="flex items-start gap-4">
                    <span className="bg-[#ccff00] px-1 border-2 border-black">01.</span>
                    <span>Post one update every week. Screenshot, Loom, or text. Proof you made progress.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="bg-[#00ffff] px-1 border-2 border-black">02.</span>
                    <span>I check in with you twice a week. Not a bot. Me. Async via DM.</span>
                  </li>
                  <li className="flex items-start gap-4 bg-black text-white p-2 border-2 border-[#ff00ff]">
                    <span className="text-[#ff00ff]">03.</span>
                    <span className="font-black">MISS 2 UPDATES = YOU'RE REMOVED. No warnings. No refunds.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="bg-[#ff00ff] px-1 border-2 border-black">04.</span>
                    <span>Build your own idea or pick from 500+ blueprints on this site. Your call.</span>
                  </li>
                </ul>

                <div className="mt-12 pt-8 border-t-4 border-black border-dashed">
                  <button 
                    onClick={() => setSigned(!signed)}
                    className="flex items-center gap-6 cursor-pointer group w-full text-left"
                  >
                    <div className={`w-12 h-12 border-4 border-black flex items-center justify-center transition-all brutalist-shadow-sm ${signed ? 'bg-black' : 'bg-white'}`}>
                      {signed && <CheckCircle2 className="text-[#ccff00] w-8 h-8 stroke-[4px]" />}
                    </div>
                    <span className="font-display text-2xl tracking-widest group-hover:text-[#ff00ff] uppercase transition-colors">I ACCEPT THE TERMS</span>
                  </button>
                </div>
            </div>

            {/* THE RECEIPT (Right) */}
            <div className="bg-white p-8 w-full max-w-sm mx-auto border-4 border-black brutalist-shadow transform rotate-1 font-mono text-sm relative text-black">
                <div className="text-center mb-8">
                  <div className="font-display text-2xl mb-2 uppercase">REAL AI EXAMPLES</div>
                  <div className="text-[10px] font-black uppercase text-gray-500 tracking-widest">STORE #001 - INTERNET</div>
                  <div className="text-[10px] font-black uppercase text-gray-500 tracking-widest">{new Date().toLocaleDateString()}</div>
                </div>

                <div className="border-b-4 border-dotted border-black mb-6"></div>

                <div className="flex justify-between mb-4 font-black uppercase tracking-widest text-[10px]">
                  <span>ITEM</span>
                  <span>PRICE</span>
                </div>

                <div className="flex justify-between font-black mb-2 uppercase text-base">
                  <span>BUILD CLUB (BETA)</span>
                  <span>$29.00/mo</span>
                </div>
                <div className="text-[10px] font-black text-gray-500 mb-6 pl-4 uppercase leading-relaxed">
                  // 2x Weekly Check-ins <br/>
                  // Private group chat <br/>
                  // Access to 500+ blueprints
                </div>

                <div className="border-b-4 border-dotted border-black mb-6"></div>

                <div className="flex justify-between text-2xl font-display mb-8 uppercase">
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
                    className={`block w-full py-4 border-4 border-black font-display text-xl uppercase transition-all brutalist-shadow-sm ${signed ? 'bg-black text-[#ccff00] hover:bg-[#ff00ff] hover:text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                  >
                    {signed ? "PROCEED TO PAYMENT" : "SIGN LEFT TO BUY"}
                  </a>
                  <p className="mt-4 text-[10px] font-black uppercase tracking-tighter text-gray-500 italic">By clicking, you agree to the Kick-Out Rule.</p>
                </div>
            </div>

          </div>
        </div>

        {/* WORKSHOP DETAILS */}
        <div className="container mx-auto px-4 max-w-4xl mb-32">
          <div className="bg-white border-4 border-black p-12 relative text-black brutalist-shadow">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white px-6 py-2 font-display text-2xl tracking-widest uppercase border-4 border-black brutalist-shadow-sm">
              WHAT COUNTS AS "BUILDING"?
            </div>
            
            <div className="grid md:grid-cols-3 gap-12 mt-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-black border-4 border-black flex items-center justify-center mx-auto mb-6 text-4xl brutalist-shadow-sm shadow-[#00ffff] transform -rotate-3 text-white">🛠️</div>
                <h3 className="font-display text-xl mb-4 uppercase">Automations</h3>
                <p className="text-sm font-black font-mono uppercase leading-tight">// Lead scrapers, CRM enrichers, inbox sorters. Save you hours.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-black border-4 border-black flex items-center justify-center mx-auto mb-6 text-4xl brutalist-shadow-sm shadow-[#ff00ff] transform rotate-3 text-white">📢</div>
                <h3 className="font-display text-xl mb-4 uppercase">Content</h3>
                <p className="text-sm font-black font-mono uppercase leading-tight">// Blog-to-LinkedIn, SEO auditors, cold email generators.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-black border-4 border-black flex items-center justify-center mx-auto mb-6 text-4xl brutalist-shadow-sm shadow-[#ccff00] transform -rotate-6 text-white">📱</div>
                <h3 className="font-display text-xl mb-4 uppercase">Products</h3>
                <p className="text-sm font-black font-mono uppercase leading-tight">// Chrome extensions, calculators, directories. Charge for them.</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ / NOTICE BOARD */}
        <div className="container mx-auto px-4 max-w-2xl mb-32">
          <h2 className="font-display text-5xl text-center mb-16 uppercase tracking-tight decoration-wavy underline decoration-[#ff00ff]">NOTICE BOARD</h2>
          
          <div className="bg-black p-2 brutalist-shadow transform rotate-1">
            <div className="bg-white p-8 border-4 border-black relative text-black">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#ff00ff] border-4 border-black rounded-full brutalist-shadow-sm"></div>
              
              <div className="space-y-10">
                <div>
                  <h3 className="font-display text-xl mb-2 text-[#ff00ff] uppercase">WHO IS THIS FOR?</h3>
                  <p className="font-black uppercase text-sm leading-relaxed font-mono">// All non-technical, AI-curious professionals. Whether you are a founder, marketer, salesperson, or ops specialist - if you want to build AI tools but keep getting distracted, this is for you.</p>
                </div>
                <div>
                  <h3 className="font-display text-xl mb-2 text-[#ccff00] bg-black px-1 inline-block uppercase">IS IT A COURSE?</h3>
                  <p className="font-black uppercase text-sm leading-relaxed font-mono">// No. Zero tutorials. I assume you know how to use ChatGPT or Claude. This is about doing, not learning.</p>
                </div>
                <div>
                  <h3 className="font-display text-xl mb-2 text-[#00ffff] uppercase">WHY $29?</h3>
                  <p className="font-black uppercase text-sm leading-relaxed font-mono">// Cheap enough to join, expensive enough to hurt if you waste it. Skin in the game.</p>
                </div>
                <div>
                  <h3 className="font-display text-xl mb-2 text-[#ff00ff] uppercase">AFTER 4 WEEKS?</h3>
                  <p className="font-black uppercase text-sm leading-relaxed font-mono">// At least one working AI tool. A lead scraper, a content repurposer, a Chrome extension. Something you can show people.</p>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-16 text-center">
            <a href="#rules" className="inline-block bg-[#ccff00] text-black border-4 border-black px-12 py-4 font-display text-2xl tracking-widest brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all transform -rotate-2 uppercase">
              BACK TO RULES ➜
            </a>
          </div>
        </div>

        {/* MEET YOUR HOST SECTION */}
        <div className="container mx-auto px-4 max-w-4xl mb-32">
          <div className="bg-white border-4 border-black p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 text-black brutalist-shadow relative overflow-hidden group rotate-1">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Terminal className="w-32 h-32 text-black" />
            </div>
            
            <div className="relative flex-shrink-0">
              <div className="w-40 h-40 rounded-none overflow-hidden border-4 border-black relative grayscale group-hover:grayscale-0 transition-all duration-700 brutalist-shadow-sm rotate-3">
                <Image src="/images/akhil.jpg" alt="Akhil MK" fill className="object-cover" />
              </div>
            </div>
            
            <div className="text-center md:text-left relative z-10">
              <div className="font-display text-2xl mb-6 border-b-4 border-black inline-block uppercase italic">MEET YOUR HOST</div>
              <p className="font-black text-lg leading-tight uppercase mb-8 italic bg-gray-50 p-4 border-l-8 border-[#ff00ff]">
                "I'm not a developer - I'm a tinkerer who got obsessed with making AI actually work for real businesses. I've spent hundreds of hours breaking things, fixing them, and figuring out which workflows actually save time. Now I help non-technical founders skip the mess."
              </p>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <a href="mailto:akhil@realaiexamples.com" className="bg-black text-[#ccff00] px-10 py-4 border-4 border-black font-display text-xl uppercase brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}
