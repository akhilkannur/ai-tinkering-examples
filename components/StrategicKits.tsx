import React from 'react';
import { Rocket, Target, BarChart3, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

const kits = [
  {
    title: "High-Growth SDR Kit",
    description: "Everything a solo SDR needs to book meetings without the manual grunt work.",
    icon: <Rocket className="w-6 h-6 text-orange-500" />,
    color: "bg-orange-50",
    borderColor: "border-orange-100",
    recipes: [
      { id: "boolean-search-architect", title: "Boolean Search Architect" },
      { id: "cold-dm-personalizer", title: "Cold DM Personalizer" },
      { id: "outreach-cadence-optimizer", title: "Outreach Cadence Tuner" },
      { id: "crm-logging-agent", title: "Auto-CRM Logger" }
    ]
  },
  {
    title: "SEO Authority Kit",
    description: "Scale your organic traffic by automating the technical and planning phases of SEO.",
    icon: <Target className="w-6 h-6 text-green-500" />,
    color: "bg-green-50",
    borderColor: "border-green-100",
    recipes: [
      { id: "topic-cluster-architect", title: "Topic Cluster Architect" },
      { id: "internal-link-auditor", title: "Internal Link Auditor" },
      { id: "serp-conquesting-planner", title: "SERP Conquest Planner" },
      { id: "canonical-url-verifier", title: "Canonical Verifier" }
    ]
  },
  {
    title: "Revenue Intelligence Kit",
    description: "Stop revenue leaks and find expansion opportunities buried in your data.",
    icon: <BarChart3 className="w-6 h-6 text-blue-500" />,
    color: "bg-blue-50",
    borderColor: "border-blue-100",
    recipes: [
      { id: "saas-usage-red-flag-detector", title: "Zombie Account Hunter" },
      { id: "commission-payout-variance", title: "Commission Auditor" },
      { id: "free-to-paid-conversion-signal", title: "PQL Usage Trigger" },
      { id: "expansion-propensity-scorer", title: "Upsell Propensity Scorer" }
    ]
  }
];

export default function StrategicKits() {
  return (
    <section className="py-24 bg-primary-bg border-t border-navy-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient opacity-10 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent border border-accent/20 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest mb-6">
            <Zap className="w-3 h-3" />
            <span>Curated Bundles</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-text-color mb-6 tracking-tight">
            Execute a Strategy, <br />
            <span className="text-transparent bg-clip-text bg-modern-gradient">Not Just a Task.</span>
          </h2>
          <p className="text-lg text-text-secondary font-normal">
            Generic prompts solve one problem. Our Strategic Kits combine multiple blueprints to help you dominate a specific business goal.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {kits.map((kit, idx) => (
            <div key={idx} className="group p-8 rounded-2xl bg-secondary-bg border border-navy-dark hover:border-accent/30 transition-all duration-500 flex flex-col h-full hover:shadow-[0_0_40px_rgba(244,63,94,0.05)]">
              <div className="bg-primary-bg w-14 h-14 rounded-xl flex items-center justify-center border border-navy-dark shadow-inner mb-8 group-hover:scale-110 transition-transform duration-500">
                {kit.icon}
              </div>
              <h3 className="text-2xl font-bold text-text-color mb-4">{kit.title}</h3>
              <p className="text-text-secondary mb-10 leading-relaxed font-normal">
                {kit.description}
              </p>
              
              <div className="space-y-3 mt-auto">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-secondary/40 mb-4">Included Blueprints:</p>
                {kit.recipes.map((r, rIdx) => (
                  <Link key={rIdx} href={`/blueprints/${r.id}`} className="group/item flex items-center justify-between p-4 bg-primary-bg/50 hover:bg-primary-bg rounded-xl border border-navy-dark hover:border-accent/30 transition-all duration-300">
                    <span className="text-sm font-bold text-text-color/80 group-hover/item:text-accent transition-colors">{r.title}</span>
                    <ArrowRight className="w-4 h-4 text-text-secondary/30 group-hover/item:text-accent group-hover/item:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
