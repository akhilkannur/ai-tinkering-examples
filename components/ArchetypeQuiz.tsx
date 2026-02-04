import { useState } from 'react';
import { Terminal, Zap, PenTool, BarChart3, ChevronRight, RefreshCw, X } from 'lucide-react';
import Link from 'next/link';

// --- Configuration ---

type Archetype = 'Speedster' | 'Wordsmith' | 'Analyst' | 'Builder';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    weight: Archetype;
  }[];
}

interface ArchetypeResult {
  title: string;
  description: string;
  icon: any;
  color: string; // Tailwind color class specific to this archetype
  recommendedIds: string[]; // IDs of blueprints to recommend
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What drains your battery the most during the workday?",
    options: [
      { text: "Endless emails and scheduling meetings.", weight: 'Speedster' },
      { text: "Staring at a blank page, trying to write.", weight: 'Wordsmith' },
      { text: "Copy-pasting data between spreadsheets.", weight: 'Analyst' },
      { text: "Repetitive technical tasks I know I could script.", weight: 'Builder' },
    ],
  },
  {
    id: 2,
    text: "If you could snap your fingers and have AI do one thing, what would it be?",
    options: [
      { text: "Draft all my replies and Slack messages.", weight: 'Speedster' },
      { text: "Create 50 social media posts from one idea.", weight: 'Wordsmith' },
      { text: "Scrape the web and build me a lead list.", weight: 'Analyst' },
      { text: "Write code to build a mini-app for me.", weight: 'Builder' },
    ],
  },
  {
    id: 3,
    text: "How technical do you consider yourself?",
    options: [
      { text: "I just want it to work. One click.", weight: 'Speedster' },
      { text: "I'm creative, not technical.", weight: 'Wordsmith' },
      { text: "I live in Excel/Sheets. I love data.", weight: 'Analyst' },
      { text: "I'm comfortable with a command line (or want to be).", weight: 'Builder' },
    ],
  },
  {
    id: 4,
    text: "What is your primary goal with AI right now?",
    options: [
      { text: "Save 2 hours a day so I can go home early.", weight: 'Speedster' },
      { text: "Produce higher quality content, faster.", weight: 'Wordsmith' },
      { text: "Find insights and leads my competitors miss.", weight: 'Analyst' },
      { text: "Build systems and automate entire workflows.", weight: 'Builder' },
    ],
  },
  {
    id: 5,
    text: "Pick a tool you use everyday:",
    options: [
      { text: "Gmail / Slack / Calendar", weight: 'Speedster' },
      { text: "Notion / Word / Canva", weight: 'Wordsmith' },
      { text: "Excel / Airtable / CRM", weight: 'Analyst' },
      { text: "VS Code / Terminal / Zapier", weight: 'Builder' },
    ],
  },
];

const ARCHETYPES: Record<Archetype, ArchetypeResult> = {
  Speedster: {
    title: "The Speedster",
    description: "You value efficiency above all. You want AI to handle the admin grit so you can focus on the big picture.",
    icon: Zap,
    color: "text-yellow-500",
    recommendedIds: ['autonomous-project-manager', 'email-subject-line-tester', 'meeting-no-show-analyzer'] 
  },
  Wordsmith: {
    title: "The Wordsmith",
    description: "You are a creator. You want AI to be your muse, editor, and production studio all in one.",
    icon: PenTool,
    color: "text-pink-500",
    recommendedIds: ['newsletter-asset-factory', 'content-repurposer', 'brand-voice-guidelines']
  },
  Analyst: {
    title: "The Analyst",
    description: "You trust data. You want AI to mine the web, clean spreadsheets, and find hidden patterns.",
    icon: BarChart3,
    color: "text-blue-500",
    recommendedIds: ['competitor-price-watchdog', 'review-sentiment-quantifier', 'lead-list-cleaner']
  },
  Builder: {
    title: "The Builder",
    description: "You are an architect. You want to use AI to build custom tools, agents, and automated pipelines.",
    icon: Terminal,
    color: "text-purple-500",
    recommendedIds: ['schema-markup-generator', 'agent-context-builder', 'api-endpoint-validator']
  }
};

export default function ArchetypeQuiz() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [scores, setScores] = useState<Record<Archetype, number>>({
    Speedster: 0,
    Wordsmith: 0,
    Analyst: 0,
    Builder: 0,
  });
  const [result, setResult] = useState<Archetype | null>(null);

  const handleAnswer = (weight: Archetype) => {
    const newScores = { ...scores, [weight]: scores[weight] + 1 };
    setScores(newScores);

    if (currentQIndex < QUESTIONS.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      // Calculate Winner
      const winner = Object.entries(newScores).reduce((a, b) => newScores[a[0] as Archetype] > newScores[b[0] as Archetype] ? a : b)[0] as Archetype;
      setResult(winner);
    }
  };

  const resetQuiz = () => {
    setResult(null);
    setCurrentQIndex(0);
    setScores({ Speedster: 0, Wordsmith: 0, Analyst: 0, Builder: 0 });
  };

  const QuizContent = () => {
    if (result) {
      const profile = ARCHETYPES[result];
      const Icon = profile.icon;

      return (
        <div className="animate-fade-in text-center p-8 bg-secondary-bg rounded-xl border border-navy-dark shadow-2xl max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className={`p-5 rounded-xl bg-primary-bg border border-navy-dark shadow-inner ${profile.color}`}>
              <Icon size={48} />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-text-color mb-3">You are {profile.title}</h3>
          <p className="text-text-secondary mb-8 max-w-md mx-auto leading-relaxed">{profile.description}</p>
          
          <div className="bg-primary-bg p-6 rounded-xl border border-navy-dark mb-8 shadow-inner">
            <h4 className="font-bold text-xs uppercase tracking-widest text-text-secondary/50 mb-6 border-b border-navy-dark pb-4">Recommended Blueprints</h4>
            <div className="flex flex-col gap-3">
               {profile.recommendedIds.map(id => (
                 <Link key={id} href={`/skills/${id}`} onClick={() => setIsOpen(false)} className="bg-secondary-bg border border-navy-dark p-4 rounded-lg shadow-sm hover:border-accent/50 transition-all text-sm font-bold text-text-color flex items-center justify-between group">
                    <span className="capitalize">{id.split('-').join(' ')}</span>
                    <ChevronRight className="w-4 h-4 text-text-secondary/30 group-hover:text-accent transition-colors" />
                 </Link>
               ))}
            </div>
          </div>

          <button onClick={resetQuiz} className="text-xs font-bold text-text-secondary/40 hover:text-accent flex items-center justify-center gap-2 mx-auto transition-colors">
            <RefreshCw size={14} /> Retake Quiz
          </button>
        </div>
      );
    }

    const q = QUESTIONS[currentQIndex];

    return (
      <div className="bg-secondary-bg rounded-xl shadow-2xl border border-navy-dark max-w-2xl mx-auto overflow-hidden animate-fade-in relative">
        <button 
            onClick={() => setIsOpen(false)} 
            className="absolute top-6 right-6 text-text-secondary/30 hover:text-text-color transition-colors"
        >
            <X size={24} />
        </button>

        {/* Progress Bar */}
        <div className="h-1.5 bg-primary-bg w-full">
          <div 
            className="h-full bg-accent transition-all duration-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]"
            style={{ width: `${((currentQIndex + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>

        <div className="p-8 md:p-12">
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent mb-6 border border-accent/20 inline-block px-3 py-1 rounded">
            Question {currentQIndex + 1} / {QUESTIONS.length}
          </div>
          
          <h3 className="text-2xl md:text-4xl font-bold text-text-color mb-10 leading-tight tracking-tight">
            {q.text}
          </h3>

          <div className="grid gap-4">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt.weight)}
                className="group flex items-center justify-between p-5 text-left bg-primary-bg border border-navy-dark rounded-xl hover:border-accent/50 hover:shadow-[0_0_20px_rgba(244,63,94,0.05)] transition-all duration-300"
              >
                <span className="font-sans font-bold text-text-color/80 group-hover:text-text-color transition-colors">
                  {opt.text}
                </span>
                <ChevronRight className="w-5 h-5 text-text-secondary/20 group-hover:text-accent transition-all transform group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen) {
    return (
      <div className="w-full bg-secondary-bg py-16 px-4 border-y border-navy-dark relative overflow-hidden group cursor-pointer" onClick={() => setIsOpen(true)}>
         {/* Abstract BG */}
         <div className="absolute inset-0 bg-hero-gradient opacity-10" />
         
         <div className="max-w-4xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-text-color mb-3 tracking-tight">
                    Not sure where to start?
                </h2>
                <p className="text-text-secondary text-lg font-normal">
                    Take the 30-second archetype quiz to find your perfect workflow.
                </p>
            </div>
            <button className="bg-white hover:bg-slate-200 text-slate-950 font-bold py-4 px-10 rounded-lg shadow-xl transition-all uppercase tracking-widest text-xs flex items-center gap-3">
                Discover My Archetype <ChevronRight className="w-4 h-4" />
            </button>
         </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
        <QuizContent />
    </div>
  );
}
