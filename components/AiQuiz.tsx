import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import QuizCertificate from './QuizCertificate';
import NewsletterSignup from './NewsletterSignup';
import { Trophy, Timer, Flame, ArrowRight, RotateCcw, Check, X, ShieldCheck } from 'lucide-react';

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
    if (timeLeft > 10) return 'bg-[#ccff00]';
    if (timeLeft > 5) return 'bg-amber-400';
    return 'bg-red-600';
  };

  return (
    <div className="bg-white border-4 border-black p-6 md:p-10 brutalist-shadow relative overflow-hidden font-sans">
      
      {/* Top Bar: Score & High Score */}
      {!showResult && (
        <div className="flex justify-between items-center mb-12 border-b-2 border-black pb-4">
          <div className="font-mono text-xs uppercase font-black tracking-widest text-black">
            [ SCORE: <span className="text-[#ff00ff]">{points}</span> ]
          </div>
          <div className="font-mono text-xs uppercase font-black tracking-widest text-gray-400">
            [ HIGH_SCORE: {Math.max(points, highScore)} ]
          </div>
        </div>
      )}

      {showResult ? (
        <div className="text-center animate-in fade-in zoom-in duration-500 py-8">
          <div className="mb-10 relative inline-block">
             <div className="bg-black p-6 border-4 border-black brutalist-shadow-sm rotate-3 text-[#ccff00]">
                <Trophy className="w-20 h-20" strokeWidth={3} />
             </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-display mb-8 uppercase text-black italic bg-[#ccff00] border-2 border-black inline-block px-4 py-2">{getResultMessage()}</h2>
          
          <div className="grid grid-cols-2 gap-8 max-w-sm mx-auto mb-16 mt-10">
             <div className="bg-white border-4 border-black p-6 brutalist-shadow-sm">
                <div className="text-black text-[10px] font-black font-mono uppercase tracking-widest mb-2">ACCURACY</div>
                <div className="text-4xl font-display text-black">{score}/{questions.length}</div>
             </div>
             <div className="bg-white border-4 border-black p-6 brutalist-shadow-sm">
                <div className="text-black text-[10px] font-black font-mono uppercase tracking-widest mb-2">POINTS</div>
                <div className="text-4xl font-display text-[#ff00ff] tabular-nums">{points}</div>
             </div>
          </div>

          {showCertificate ? (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
                <QuizCertificate score={score} totalQuestions={questions.length} userName={userName} quizUrl={quizUrl} />
            </div>
          ) : (
            <div className="max-w-md mx-auto mb-16">
                <form onSubmit={generateCertificate} className="bg-gray-50 border-4 border-black p-10 brutalist-shadow relative">
                    <div className="absolute -top-4 left-6 bg-black text-white px-3 py-1 font-display text-xs uppercase">Identity Check</div>
                    <h3 className="text-2xl font-display mb-8 uppercase tracking-tight text-black flex items-center justify-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-[#00ffff] stroke-[3px]" /> Validate Name
                    </h3>
                    <input
                        type="text"
                        placeholder="Enter full name..."
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full px-6 py-4 bg-white border-4 border-black mb-8 text-black focus:bg-[#ccff00] focus:outline-none transition-all font-display text-xl uppercase placeholder:text-gray-300"
                    />
                    <button
                        type="submit"
                        className="w-full bg-black text-white font-display py-6 border-4 border-black hover:bg-[#ff00ff] transition-all brutalist-shadow-sm uppercase text-xl"
                    >
                        Issue_Certificate
                    </button>
                </form>
            </div>
          )}

          <div className="my-20 border-t-4 border-black border-dotted pt-20">
            <NewsletterSignup />
          </div>

          <button
            onClick={restartQuiz}
            className="inline-flex items-center gap-3 bg-white border-2 border-black px-6 py-2 text-black font-display text-xs uppercase hover:bg-black hover:text-white transition-all brutalist-shadow-sm"
          >
            <RotateCcw className="w-4 h-4 stroke-[3px]" /> Re-initialize_System
          </button>
        </div>
      ) : (
        <>
          {questions && questions.length > 0 && questions[currentQuestion] ? (
            <div className={`transition-all duration-500 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              
              {/* Timer Bar */}
              <div className="w-full bg-gray-100 border-4 border-black h-6 mb-16 relative overflow-hidden">
                 <div 
                   className={`h-full transition-all duration-1000 ease-linear ${getTimerColor()} border-r-4 border-black`}
                   style={{ width: `${(timeLeft / TIMER_DURATION) * 100}%` }}
                 ></div>
              </div>

              {/* Streak Indicator */}
              {streak > 1 && (
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ff00ff] text-white px-6 py-2 border-2 border-black font-display text-sm uppercase tracking-widest shadow-lg animate-bounce z-20">
                    <Flame className="w-5 h-5 inline-block mr-2 mb-1 fill-white" /> {streak}_STREAK
                 </div>
              )}

              {/* Question UI */}
              <div className="mb-16 border-l-8 border-[#ccff00] pl-8 py-2 bg-gray-50">
                <div className="text-xs font-black font-mono text-gray-400 uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                    <Timer className="w-4 h-4" /> 0{currentQuestion + 1} / 0{questions.length}
                </div>
                <h2 className="text-3xl sm:text-5xl font-display text-black leading-tight uppercase italic">
                    {questions[currentQuestion].question}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {questions[currentQuestion].options.map((option, index) => {
                  let btnStyle = "bg-white border-4 border-black hover:bg-gray-50 text-black brutalist-shadow-sm";
                  
                  if (selectedAnswer) {
                    if (option === questions[currentQuestion].answer) {
                      btnStyle = "bg-[#ccff00] border-4 border-black text-black scale-[1.02]";
                    } else if (option === selectedAnswer) {
                      btnStyle = "bg-red-600 border-4 border-black text-white";
                    } else {
                      btnStyle = "bg-gray-100 border-2 border-black text-gray-300 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      disabled={selectedAnswer !== null}
                      className={`p-8 text-left font-black transition-all duration-300 relative group overflow-hidden ${btnStyle}`}
                    >
                      <div className="flex items-center relative z-10">
                        <div className={`w-12 h-12 flex items-center justify-center mr-8 text-xl font-display border-4 border-black transition-colors ${selectedAnswer && option === questions[currentQuestion].answer ? 'bg-black text-[#ccff00]' : 'bg-black text-white group-hover:bg-[#ff00ff]'}`}>
                           {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-xl font-display uppercase tracking-tight">{option}</span>
                        {selectedAnswer && option === questions[currentQuestion].answer && (
                            <Check className="w-8 h-8 text-black ml-auto stroke-[4px]" />
                        )}
                        {selectedAnswer && option === selectedAnswer && option !== questions[currentQuestion].answer && (
                            <X className="w-8 h-8 text-white ml-auto stroke-[4px]" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-24 font-display text-xl text-black animate-pulse uppercase tracking-widest border-4 border-black border-dashed">BOOTING_DIAGNOSTIC_DATA...</div>
          )}
        </>
      )}
    </div>
  );
}
