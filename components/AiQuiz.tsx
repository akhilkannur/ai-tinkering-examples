import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import QuizCertificate from './QuizCertificate';
import NewsletterSignup from './NewsletterSignup';
import { Trophy, Timer, Flame, ArrowRight, RotateCcw, Check, X } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const questions: Question[] = [
  {
    question: "Which AI tool is commonly used for generating realistic images from text descriptions?",
    options: ["Google Sheets", "Midjourney", "Jasper", "Zapier"],
    answer: "Midjourney"
  },
  {
    question: "How can AI most effectively assist in HR recruitment processes?",
    options: ["Replacing all human interviews", "Screening resumes and candidate matching", "Making final hiring decisions autonomously", "Writing legal contracts without supervision"],
    answer: "Screening resumes and candidate matching"
  },
  {
    question: "In sales, what is 'predictive lead scoring' powered by AI?",
    options: ["Guessing which leads are nice", "Using historical data to rank prospects by likelihood to convert", "Sending spam emails to everyone", "Manually checking every LinkedIn profile"],
    answer: "Using historical data to rank prospects by likelihood to convert"
  },
  {
    question: "What is a common use case for AI in content marketing?",
    options: ["Generating blog post outlines and drafts", "Fixing hardware issues", "Managing office plumbing", "Delivering physical mail"],
    answer: "Generating blog post outlines and drafts"
  },
  {
    question: "Which of the following is a popular Large Language Model (LLM)?",
    options: ["Excel", "GPT-4", "Photoshop", "Salesforce"],
    answer: "GPT-4"
  },
  {
    question: "What does 'NLP' stand for in the context of AI?",
    options: ["Natural Language Processing", "New Laptop Purchase", "Neural Link Protocol", "Non-Linear Programming"],
    answer: "Natural Language Processing"
  },
  {
    question: "Which AI feature is helpful for summarizing long meeting transcripts?",
    options: ["Image generation", "Text summarization", "Voice cloning", "Video editing"],
    answer: "Text summarization"
  },
  {
    question: "What is a potential ethical concern when using AI in the workplace?",
    options: ["AI works too fast", "Bias in algorithms and data privacy", "AI uses too much electricity", "AI has no concerns"],
    answer: "Bias in algorithms and data privacy"
  },
  {
    question: "What distinguishes an 'AI Agent' from a standard chatbot?",
    options: ["It has a human voice", "It can autonomously execute tasks and use tools", "It is always expensive", "It only works on Tuesdays"],
    answer: "It can autonomously execute tasks and use tools"
  },
  {
    question: "What is 'Prompt Engineering'?",
    options: ["Building physical robots", "Crafting specific inputs to guide AI outputs", " repairing computer chips", "Writing binary code"],
    answer: "Crafting specific inputs to guide AI outputs"
  }
];

const TIMER_DURATION = 20; // Seconds per question

export default function AiQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0); 
  const [points, setPoints] = useState(0); 
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [userName, setUserName] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const router = useRouter();
  const quizUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`;

  useEffect(() => {
    const savedHighScore = localStorage.getItem('aiQuizHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
    setShowAnimation(true);
  }, []);

  useEffect(() => {
    if (showResult) return;
    if (selectedAnswer !== null) return; 

    if (timeLeft === 0) {
      handleAnswer(null); 
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, showResult, selectedAnswer]);

  useEffect(() => {
    setTimeLeft(TIMER_DURATION);
    setShowAnimation(true);
  }, [currentQuestion]);

  const handleAnswer = (option: string | null) => {
    if (selectedAnswer !== null) return; 

    const currentQ = questions[currentQuestion];
    const isAnswerCorrect = option === currentQ.answer;
    
    setSelectedAnswer(option || "TIME_UP"); 
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore(score + 1);
      const timeBonus = timeLeft * 10;
      const streakBonus = streak * 50;
      const newPoints = points + 100 + timeBonus + streakBonus;
      setPoints(newPoints);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      setShowAnimation(false);
      setTimeout(() => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
          setCurrentQuestion(nextQuestion);
          setSelectedAnswer(null);
          setIsCorrect(null);
        } else {
          finishQuiz();
        }
      }, 500);
    }, 2000);
  };

  const finishQuiz = () => {
    setShowResult(true);
  };
  
  useEffect(() => {
    if (showResult) {
       const currentFinalPoints = points;
       if (currentFinalPoints > highScore) {
         setHighScore(currentFinalPoints);
         localStorage.setItem('aiQuizHighScore', currentFinalPoints.toString());
       }
    }
  }, [showResult, points]);


  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setPoints(0);
    setStreak(0);
    setTimeLeft(TIMER_DURATION);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowCertificate(false);
    setUserName('');
    setShowAnimation(true);
  };

  const generateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim() !== '') {
      setShowCertificate(true);
    }
  };

  const getResultMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "LEGENDARY_STATUS_ACHIEVED";
    if (percentage >= 80) return "PRO_SYSTEM_OPERATOR";
    if (percentage >= 60) return "ANALYST_GRADE_AUTHORIZED";
    return "SYSTEM_KNOWLEDGE_INSUFFICIENT";
  };

  const getTimerColor = () => {
    if (timeLeft > 10) return 'bg-accent';
    if (timeLeft > 5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-primary-bg p-1 md:p-2 rounded-3xl relative overflow-hidden font-sans">
      
      {/* Top Bar: Score & High Score */}
      {!showResult && (
        <div className="flex justify-between items-center mb-10 px-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
            [ SCORE: <span className="text-accent font-bold">{points}</span> ]
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-text-secondary opacity-40">
            [ HIGH_SCORE: {Math.max(points, highScore)} ]
          </div>
        </div>
      )}

      {showResult ? (
        <div className="text-center animate-in fade-in zoom-in duration-500 py-8">
          <div className="mb-8 relative inline-block">
             <div className="absolute -inset-4 bg-accent/20 rounded-full blur-2xl animate-pulse"></div>
             <Trophy className="w-20 h-20 text-accent relative z-10" />
          </div>
          <h2 className="text-2xl md:text-4xl font-black mb-4 uppercase tracking-tighter italic text-white">{getResultMessage()}</h2>
          
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-12 mt-10">
             <div className="bg-secondary-bg border border-white/5 p-6 rounded-2xl">
                <div className="text-text-secondary text-[10px] font-mono uppercase tracking-widest mb-2">ACCURACY</div>
                <div className="text-3xl font-black text-white">{score}/{questions.length}</div>
             </div>
             <div className="bg-secondary-bg border border-white/5 p-6 rounded-2xl">
                <div className="text-text-secondary text-[10px] font-mono uppercase tracking-widest mb-2">POINTS</div>
                <div className="text-3xl font-black text-accent tabular-nums">{points}</div>
             </div>
          </div>

          {showCertificate ? (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
                <QuizCertificate score={score} totalQuestions={questions.length} userName={userName} quizUrl={quizUrl} />
            </div>
          ) : (
            <div className="max-w-md mx-auto mb-12">
                <form onSubmit={generateCertificate} className="bg-secondary-bg/50 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
                    <h3 className="text-lg font-bold mb-6 uppercase tracking-tight text-white flex items-center justify-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-accent" /> Validate Identity
                    </h3>
                    <input
                        type="text"
                        placeholder="Enter full name for record..."
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full px-5 py-4 bg-primary-bg border border-white/10 rounded-xl mb-6 text-white focus:border-accent focus:outline-none transition-all font-mono text-sm uppercase tracking-wider placeholder:text-text-secondary/20"
                    />
                    <button
                        type="submit"
                        className="w-full bg-white text-primary-bg font-bold py-4 rounded-xl hover:bg-accent hover:text-white transition-all transform active:scale-95 shadow-xl uppercase text-xs tracking-[0.2em]"
                    >
                        Issue_Certificate
                    </button>
                </form>
            </div>
          )}

          <div className="my-16 border-t border-white/5 pt-16">
            <NewsletterSignup />
          </div>

          <button
            onClick={restartQuiz}
            className="inline-flex items-center gap-2 text-text-secondary font-mono text-[10px] uppercase tracking-widest hover:text-accent transition-colors"
          >
            <RotateCcw className="w-3 h-3" /> Re-initialize_System
          </button>
        </div>
      ) : (
        <>
          {questions && questions.length > 0 && questions[currentQuestion] ? (
            <div className={`transition-all duration-500 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              
              {/* Timer Bar */}
              <div className="w-full bg-secondary-bg border border-white/5 rounded-full h-2 mb-12 relative overflow-hidden">
                 <div 
                   className={`h-full transition-all duration-1000 ease-linear ${getTimerColor()} shadow-[0_0_15px_rgba(244,63,94,0.5)]`}
                   style={{ width: `${(timeLeft / TIMER_DURATION) * 100}%` }}
                 ></div>
              </div>

              {/* Streak Indicator */}
              {streak > 1 && (
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-[0.2em] shadow-lg animate-bounce z-20">
                    <Flame className="w-3 h-3 inline-block mr-1 mb-0.5 fill-white" /> {streak}_STREAK
                 </div>
              )}

              {/* Question UI */}
              <div className="mb-12">
                <div className="text-[10px] font-mono text-accent/60 font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                    <Timer className="w-3 h-3" /> 0{currentQuestion + 1} / 0{questions.length}
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight italic">
                    {questions[currentQuestion].question}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {questions[currentQuestion].options.map((option, index) => {
                  let btnStyle = "bg-secondary-bg/40 border border-white/5 hover:border-accent/30 hover:bg-secondary-bg/60 text-text-secondary";
                  
                  if (selectedAnswer) {
                    if (option === questions[currentQuestion].answer) {
                      btnStyle = "bg-accent/20 border-accent text-white shadow-[0_0_20px_rgba(244,63,94,0.2)]";
                    } else if (option === selectedAnswer) {
                      btnStyle = "bg-red-500/20 border-red-500 text-red-400";
                    } else {
                      btnStyle = "bg-primary-bg border-white/5 text-text-secondary/20 opacity-40";
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      disabled={selectedAnswer !== null}
                      className={`p-6 rounded-2xl text-left font-medium transition-all duration-300 relative group overflow-hidden ${btnStyle}`}
                    >
                      <div className="flex items-center relative z-10">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-6 text-xs font-mono font-bold border transition-colors ${selectedAnswer && option === questions[currentQuestion].answer ? 'bg-accent border-accent text-white' : 'bg-primary-bg border-white/10 text-text-secondary group-hover:text-white group-hover:border-accent/30'}`}>
                           {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-lg tracking-tight font-light">{option}</span>
                        {selectedAnswer && option === questions[currentQuestion].answer && (
                            <Check className="w-5 h-5 text-accent ml-auto" />
                        )}
                        {selectedAnswer && option === selectedAnswer && option !== questions[currentQuestion].answer && (
                            <X className="w-5 h-5 text-red-500 ml-auto" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 font-mono text-xs text-text-secondary animate-pulse">BOOTING_DIAGNOSTIC_DATA...</div>
          )}
        </>
      )}
    </div>
  );
}