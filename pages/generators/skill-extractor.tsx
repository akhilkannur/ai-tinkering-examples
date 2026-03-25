import Head from 'next/head'
import Navbar from '../../components/Navbar'
import { FileCode, Download, Zap, Brain, ArrowRight, ShieldCheck, Hammer, Target, Sparkles, Copy, CheckCircle } from 'lucide-react'
import { useState } from 'react'

const QUESTIONS = [
  {
    id: 'skillName',
    title: 'The Identity',
    question: 'What do you call this task? (e.g., "GSC Index Fixer", "Salestech Lead Scraper")',
    placeholder: 'The name of your new skill...',
    icon: <Target className="w-6 h-6" />,
  },
  {
    id: 'problem',
    title: 'The Problem',
    question: 'What is the repetitive "slop" we are killing? Why does this need to exist?',
    placeholder: 'e.g., "Manual GSC checking is slow and I miss 404 errors..."',
    icon: <Brain className="w-6 h-6" />,
  },
  {
    id: 'trigger',
    title: 'The Trigger',
    question: 'What event starts this task? When should the AI say "I should use this skill"?',
    placeholder: 'e.g., "When the user mentions an indexing issue or provides a GSC URL..."',
    icon: <Zap className="w-6 h-6" />,
  },
  {
    id: 'manualProcess',
    title: 'The Manual Process',
    question: 'Describe the exact sequence of events if you did this manually. (Extraction > Invention)',
    placeholder: '1. Check site for 404s
2. Log into GSC
3. Request re-index...',
    isTextArea: true,
    icon: <ArrowRight className="w-6 h-6" />,
  },
  {
    id: 'hammer',
    title: 'The Hammer',
    question: 'What specific tool, API, or command makes this work? (e.g., "grep_search", "web_fetch", "node scripts/check.js")',
    placeholder: 'The "Ironclad" tools needed...',
    icon: <Hammer className="w-6 h-6" />,
  },
  {
    id: 'guardrails',
    title: 'The Guardrails',
    question: 'How do we know the AI isn't hallucinating? What is the "Ironclad" validation check?',
    placeholder: 'e.g., "Must check HTTP 200 OK before confirming URL is live."',
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    id: 'output',
    title: 'The Artifact',
    question: 'What should the final output look like? (CSV, Markdown, File structure?)',
    placeholder: 'e.g., "A CSV named results.csv with columns: URL, Status, Fix Action."',
    icon: <FileCode className="w-6 h-6" />,
  },
];

export default function SkillExtractor() {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({
    skillName: '',
    problem: '',
    trigger: '',
    manualProcess: '',
    hammer: '',
    guardrails: '',
    output: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ content: string, fileName: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      handleGenerate();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const updateResponse = (val: string) => {
    setResponses({ ...responses, [QUESTIONS[step].id]: val });
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setIsFinished(false);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/extract-skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ responses })
      });

      const data = await response.json();
      
      if (data.success) {
        setResult({ content: data.content, fileName: data.fileName });
        setIsFinished(true);
      } else {
        setError(data.error || 'Failed to extract skill. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result.content], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const currentQuestion = QUESTIONS[step];

  return (
    <>
      <Head>
        <title>Skill Extractor | Turn Expertise into Procedural Truth</title>
        <meta name="description" content="Stop building skills from hallucinations. Interview yourself to extract real expertise into a professional SKILL.md." />
      </Head>

      <div className="min-h-screen bg-primary-bg text-black font-sans selection:bg-[#ff00ff] selection:text-white">
        <Navbar />

        {/* HERO SECTION */}
        <div className="pt-32 pb-20 relative overflow-hidden border-b-4 border-black bg-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff00ff] opacity-10 blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#ccff00] opacity-10 blur-xl"></div>
          <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-[#ccff00] border-2 border-black font-black text-[10px] uppercase tracking-widest mb-6 transform -rotate-1">
              <Sparkles className="w-3 h-3 fill-current" /> Extraction &gt; Invention
            </div>
            <h1 className="text-5xl md:text-7xl font-display text-black mb-6 tracking-tighter uppercase leading-[0.9] glitch-text" data-text="SKILL EXTRACTOR">
              SKILL <span className="text-[#ff00ff]">EXTRACTOR</span>
            </h1>
            <p className="text-xl md:text-2xl text-black font-bold max-w-2xl mx-auto leading-relaxed border-l-8 border-[#ccff00] pl-6 py-2 bg-gray-50">
              Turn your hard-won expertise into a professional <strong className="bg-black text-[#ccff00] px-1 uppercase">SKILL.md</strong> file.
              Stop using "AI slop" and start using <strong className="border-b-4 border-[#ff00ff]">procedural truth</strong>.
            </p>
          </div>
        </div>

        {/* INTERVIEW SECTION */}
        <div className="container mx-auto px-4 max-w-4xl py-20">
          {!isFinished ? (
            <div className="bg-white border-4 border-black p-8 md:p-16 brutalist-shadow relative overflow-hidden">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-black text-[#ccff00] flex items-center justify-center border-2 border-black transform -rotate-3">
                  {currentQuestion.icon}
                </div>
                <div>
                  <h2 className="text-xs font-black uppercase tracking-widest text-gray-400">Step {step + 1} of {QUESTIONS.length}</h2>
                  <h3 className="text-2xl font-display uppercase tracking-tighter">{currentQuestion.title}</h3>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-xl font-bold mb-4 text-black">
                  {currentQuestion.question}
                </label>
                {currentQuestion.isTextArea ? (
                  <textarea
                    rows={6}
                    value={responses[currentQuestion.id]}
                    onChange={(e) => updateResponse(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    className="w-full p-4 border-4 border-black bg-gray-50 font-mono text-sm focus:bg-white outline-none transition-all resize-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-1 focus:translate-y-1"
                  />
                ) : (
                  <input
                    type="text"
                    value={responses[currentQuestion.id]}
                    onChange={(e) => updateResponse(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    className="w-full p-4 border-4 border-black bg-gray-50 font-bold text-lg focus:bg-white outline-none transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-1 focus:translate-y-1"
                  />
                )}
              </div>

              <div className="flex items-center justify-between mt-12">
                <button
                  onClick={handleBack}
                  disabled={step === 0}
                  className={`px-6 py-3 border-4 border-black font-black uppercase tracking-widest text-sm transition-all ${
                    step === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100 active:translate-y-1'
                  }`}
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={isGenerating || !responses[currentQuestion.id]}
                  className={`px-10 py-4 bg-black text-[#ccff00] border-4 border-black font-black uppercase tracking-widest text-lg flex items-center gap-3 transition-all transform hover:-translate-y-1 active:translate-y-0 brutalist-shadow-lg ${
                    isGenerating || !responses[currentQuestion.id] ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-none'
                  }`}
                >
                  {isGenerating ? (
                    <>Processing...</>
                  ) : step === QUESTIONS.length - 1 ? (
                    <>Finalize Skill <Zap className="w-5 h-5 fill-current" /></>
                  ) : (
                    <>Next Step <ArrowRight className="w-5 h-5" /></>
                  )}
                </button>
              </div>

              {/* PROGRESS BAR */}
              <div className="mt-12 h-4 border-4 border-black w-full overflow-hidden bg-gray-100">
                <div 
                  className="h-full bg-[#ff00ff] transition-all duration-500 ease-in-out" 
                  style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="bg-white border-4 border-black p-8 md:p-12 brutalist-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b-4 border-black pb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#ccff00] text-black flex items-center justify-center border-4 border-black transform rotate-2">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-display uppercase tracking-tighter">Skill Extracted</h2>
                      <p className="font-bold text-gray-500">Your procedural truth is ready for implementation.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-6 py-3 border-4 border-black font-black uppercase text-sm hover:bg-gray-100 transition-all active:translate-y-1"
                    >
                      {copied ? <><CheckCircle className="w-4 h-4 text-green-500" /> Copied</> : <><Copy className="w-4 h-4" /> Copy Content</>}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-6 py-3 bg-black text-[#ccff00] border-4 border-black font-black uppercase text-sm hover:shadow-none brutalist-shadow transition-all active:translate-y-1"
                    >
                      <Download className="w-4 h-4" /> Download .md
                    </button>
                  </div>
                </div>

                <div className="bg-gray-900 text-[#ccff00] p-6 md:p-10 font-mono text-sm overflow-x-auto border-4 border-black shadow-[inset_0px_0px_20px_0px_rgba(0,0,0,0.5)]">
                  <pre className="whitespace-pre-wrap leading-relaxed">
                    {result?.content}
                  </pre>
                </div>
              </div>
              
              <div className="text-center">
                <button 
                  onClick={() => {setStep(0); setIsFinished(false); setResult(null);}}
                  className="font-black uppercase tracking-widest text-sm border-b-4 border-black hover:bg-black hover:text-white px-4 py-2 transition-all"
                >
                  Start New Extraction Session
                </button>
              </div>
            </div>
          )}
        </div>

        {/* GUIDANCE SECTION */}
        <div className="container mx-auto px-4 max-w-4xl pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border-4 border-black bg-[#ccff00] brutalist-shadow">
              <h4 className="text-xl font-black uppercase mb-4">Why Extraction?</h4>
              <p className="font-bold leading-relaxed">
                Generic AI prompts converge to the median. They generate "slop" because they guess at expertise. 
                Extraction forces you to define the <strong>Hammer</strong> and the <strong>Guardrails</strong>—the specific 
                technical steps that prevent hallucinations.
              </p>
            </div>
            <div className="p-8 border-4 border-black bg-white brutalist-shadow">
              <h4 className="text-xl font-black uppercase mb-4">What's Next?</h4>
              <p className="font-bold leading-relaxed">
                Download your <strong>SKILL.md</strong> and place it in your <code>.gemini/skills/[name]/</code> directory. 
                Pair it with any scripts mentioned in your workflow to build a deterministic, high-signal automation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
