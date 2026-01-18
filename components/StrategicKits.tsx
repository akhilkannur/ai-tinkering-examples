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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Zap className="w-3 h-3" />
            <span>Curated Bundles</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-brand-navy mb-6">
            Execute a Strategy, <br />
            <span className="text-accent">Not Just a Task.</span>
          </h2>
          <p className="text-lg text-brand-navy/60">
            Generic prompts solve one problem. Our Strategic Kits combine multiple blueprints to help you dominate a specific business goal.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {kits.map((kit, idx) => (
            <div key={idx} className={`p-8 rounded-3xl border-2 ${kit.color} ${kit.borderColor} flex flex-col h-full`}>
              <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm mb-6">
                {kit.icon}
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-3">{kit.title}</h3>
              <p className="text-brand-navy/60 mb-8 leading-relaxed">
                {kit.description}
              </p>
              
              <div className="space-y-3 mt-auto">
                <p className="text-[10px] uppercase tracking-widest font-bold text-brand-navy/40 mb-2">Included Blueprints:</p>
                {kit.recipes.map((r, rIdx) => (
                  <Link key={rIdx} href={`/blueprints/${r.id}`} className="group flex items-center justify-between p-3 bg-white/50 hover:bg-white rounded-xl border border-transparent hover:border-white shadow-sm transition-all">
                    <span className="text-sm font-semibold text-brand-navy/80 group-hover:text-blue-600">{r.title}</span>
                    <ArrowRight className="w-4 h-4 text-brand-navy/20 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
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
