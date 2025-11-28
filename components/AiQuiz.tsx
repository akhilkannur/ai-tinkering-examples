import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import QuizCertificate from './QuizCertificate';
import NewsletterSignup from './NewsletterSignup';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const questions: Question[] = [
  {
    question: "Which AI tool is commonly used for generating realistic images from text descriptions?",
    options: ["ChatGPT", "Midjourney", "Jasper", "Zapier"],
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
  }
];

const TIMER_DURATION = 20; // Seconds per question

export default function AiQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0); // Represents correct answers count
  const [points, setPoints] = useState(0); // Represents gamified points
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
    // Load high score from local storage on mount
    const savedHighScore = localStorage.getItem('aiQuizHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
    setShowAnimation(true);
  }, []);

  useEffect(() => {
    if (showResult) return;
    if (selectedAnswer !== null) return; // Stop timer if answer selected

    if (timeLeft === 0) {
      handleAnswer(null); // Time's up
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, showResult, selectedAnswer]);

  useEffect(() => {
    // Reset timer and animation when question changes
    setTimeLeft(TIMER_DURATION);
    setShowAnimation(true);
  }, [currentQuestion]);

  const handleAnswer = (option: string | null) => {
    if (selectedAnswer !== null) return; // Prevent multiple answers

    const currentQ = questions[currentQuestion];
    const isAnswerCorrect = option === currentQ.answer;
    
    setSelectedAnswer(option || "TIME_UP"); // Mark as special value if time ran out
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
  
  // Effect to handle High Score update when result is shown
  useEffect(() => {
    if (showResult) {
       const currentFinalPoints = points; // Points should be updated by now from the last answer
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
    if (percentage === 100) return "Legendary! Perfect Score!";
    if (percentage >= 80) return "Excellent! You're an AI Pro.";
    if (percentage >= 60) return "Good Job! Keep learning.";
    return "Nice try! Review the topics and try again.";
  };

  const getTimerColor = () => {
    if (timeLeft > 10) return 'bg-green-500';
    if (timeLeft > 5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-primary-bg p-8 rounded-lg shadow-lg max-w-2xl mx-auto text-text-color relative overflow-hidden">
      {/* Top Bar: Score & High Score */}
      {!showResult && (
        <div className="flex justify-between items-center mb-6 text-sm font-bold uppercase tracking-wider text-gray-500">
          <div>Score: <span className="text-accent text-lg">{points}</span></div>
          <div>High Score: <span className="text-gray-700 text-lg">{Math.max(points, highScore)}</span></div>
        </div>
      )}

      {showResult ? (
        <div className="text-center animate-fade-in">
          <div className="mb-6">
             <span className="text-6xl">🏆</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">{getResultMessage()}</h2>
          
          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-6 mt-6">
             <div className="bg-gray-100 p-4 rounded-lg">
                <div className="text-gray-500 text-xs uppercase">Correct</div>
                <div className="text-2xl font-bold text-green-600">{score}/{questions.length}</div>
             </div>
             <div className="bg-gray-100 p-4 rounded-lg">
                <div className="text-gray-500 text-xs uppercase">Points</div>
                <div className="text-2xl font-bold text-accent">{points}</div>
             </div>
          </div>

          {showCertificate ? (
            <QuizCertificate score={score} totalQuestions={questions.length} userName={userName} quizUrl={quizUrl} />
          ) : (
            <form onSubmit={generateCertificate} className="my-8 bg-secondary-bg p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Get Your Certificate</h3>
              <input
                type="text"
                placeholder="Enter your full name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg mb-4 focus:border-accent focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-accent text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-700 transition-all transform hover:scale-105 shadow-md"
              >
                Generate Certificate
              </button>
            </form>
          )}

          <div className="my-8">
            <NewsletterSignup />
          </div>

          <button
            onClick={restartQuiz}
            className="text-accent font-bold py-2 px-4 hover:underline"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <>
          {questions && questions.length > 0 && questions[currentQuestion] ? (
            <div className={`transition-all duration-500 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              
              {/* Timer Bar */}
              <div className="w-full bg-gray-200 rounded-full h-4 mb-6 relative overflow-hidden">
                 <div 
                   className={`h-full transition-all duration-1000 ease-linear ${getTimerColor()}`}
                   style={{ width: `${(timeLeft / TIMER_DURATION) * 100}%` }}
                 ></div>
                 <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-xs font-bold text-white drop-shadow-md">
                    {timeLeft}s
                 </div>
              </div>

              {/* Streak Indicator */}
              {streak > 1 && (
                 <div className="absolute top-4 right-4 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-bold animate-bounce">
                    🔥 {streak} Streak!
                 </div>
              )}

              {/* Question Progress */}
              <div className="text-xs text-gray-400 font-bold uppercase mb-2">Question {currentQuestion + 1} of {questions.length}</div>
              
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 leading-tight">{questions[currentQuestion].question}</h2>
              
              <div className="grid grid-cols-1 gap-3">
                {questions[currentQuestion].options.map((option, index) => {
                  let btnClass = "bg-white border-2 border-gray-100 hover:border-accent hover:bg-pink-50 text-gray-700";
                  
                  if (selectedAnswer) {
                    if (option === questions[currentQuestion].answer) {
                      btnClass = "bg-green-500 border-green-500 text-white shadow-md";
                    } else if (option === selectedAnswer) {
                      btnClass = "bg-red-500 border-red-500 text-white";
                    } else {
                      btnClass = "bg-gray-50 border-gray-100 text-gray-300";
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      disabled={selectedAnswer !== null}
                      className={`p-4 rounded-xl text-left font-medium transition-all duration-200 transform ${selectedAnswer === null ? 'hover:-translate-y-1' : ''} ${btnClass}`}
                    >
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-bold border ${selectedAnswer && option === questions[currentQuestion].answer ? 'bg-white text-green-500 border-white' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                           {String.fromCharCode(65 + index)}
                        </div>
                        {option}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">Loading quiz data...</div>
          )}
        </>
      )}
    </div>
  );
}
