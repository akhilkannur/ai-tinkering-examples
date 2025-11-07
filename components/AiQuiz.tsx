import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import QuizCertificate from './QuizCertificate';
import NewsletterSignup from './NewsletterSignup';

const questions = [
  // ... (questions remain the same)
];

export default function AiQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [userName, setUserName] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);

  const router = useRouter();
  const quizUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`;

  useEffect(() => {
    setShowAnimation(true);
  }, [currentQuestion]);

  const handleAnswer = (option: string) => {
    if (selectedAnswer) return; // Prevent multiple answers

    setSelectedAnswer(option);
    const isAnswerCorrect = option === questions[currentQuestion].answer;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore(score + 1);
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
          setShowResult(true);
        }
      }, 500);
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
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
    if (percentage === 100) {
      return "Wow! You're an AI expert!";
    } else if (percentage >= 80) {
      return "Great job! You know a lot about AI.";
    } else if (percentage >= 60) {
      return "Good effort! You're on your way to becoming an AI whiz.";
    } else {
      return "Keep learning! The world of AI is always growing.";
    }
  };

  return (
    <div className="bg-primary-bg p-8 rounded-lg shadow-lg max-w-2xl mx-auto text-text-color">
      {showResult ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">{getResultMessage()}</h2>
          <p className="text-xl mb-4">
            You scored {score} out of {questions.length}
          </p>

          {showCertificate ? (
            <QuizCertificate score={score} totalQuestions={questions.length} userName={userName} quizUrl={quizUrl} />
          ) : (
            <form onSubmit={generateCertificate} className="my-8">
              <h3 className="text-2xl font-bold mb-4">Get Your Personalized Certificate!</h3>
              <input
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg mb-4"
              />
              <button
                type="submit"
                className="bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors"
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
            className="bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors"
          >
            Restart Quiz
          </button>
          <p className="text-sm text-gray-500 mt-4">
            We update the quiz every week with new questions about the latest in AI. Come back next week to test your knowledge again!
          </p>
        </div>
      ) : (
        <div className={`transition-opacity duration-500 ${showAnimation ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-accent h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
            ></div>
          </div>
          <h2 className="text-2xl font-bold mb-4">{questions[currentQuestion].question}</h2>
          <div className="grid grid-cols-1 gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
                className={`p-4 rounded-lg text-left transition-colors duration-300 ${
                  selectedAnswer
                    ? option === questions[currentQuestion].answer
                      ? 'bg-green-500 text-white'
                      : option === selectedAnswer
                      ? 'bg-red-500 text-white'
                      : 'bg-secondary-bg'
                    : 'bg-secondary-bg hover:bg-accent-light'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
