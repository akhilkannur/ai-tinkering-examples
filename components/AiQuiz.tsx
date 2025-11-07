import { useState, useEffect } from 'react';
import QuizCertificate from './QuizCertificate';
import NewsletterSignup from './NewsletterSignup';

const questions = [
  {
    question: "What is OpenAI's latest text-to-video model, capable of creating realistic and imaginative video scenes from text instructions?",
    options: [
      "DALL-E 3",
      "Sora",
      "GPT-4",
      "Clip",
    ],
    answer: "Sora",
  },
  {
    question: "In the context of Large Language Models (LLMs), which of the following is an example of an open-source model?",
    options: [
      "OpenAI's GPT-4",
      "Google's Gemini",
      "Meta's Llama 3",
      "Anthropic's Claude 3",
    ],
    answer: "Meta's Llama 3",
  },
  {
    question: "A marketing team is using an AI tool to analyze customer data and predict their future buying behavior to create individualized marketing messages. What is this AI application called?",
    options: [
      "AI-driven personalization",
      "AI-powered design",
      "AI-generated music",
      "AI-based copywriting",
    ],
    answer: "AI-driven personalization",
  },
  {
    question: "A sales team is using an AI system that can autonomously perform tasks like prospecting, scheduling, and follow-ups. What is this type of AI system called?",
    options: [
      "A CRM",
      "A chatbot",
      "An AI sales agent",
      "A data analytics tool",
    ],
    answer: "An AI sales agent",
  },
  {
    question: "An HR department is using AI to streamline its hiring process. Which of the following tasks is a common application of AI in recruitment?",
    options: [
      "Conducting final interviews",
      "Making the final hiring decision",
      "Screening resumes and automating candidate searches",
      "Negotiating salary packages",
    ],
    answer: "Screening resumes and automating candidate searches",
  },
  {
    question: "A marketing team wants to create a campaign that includes blog posts, images, and a short video, all based on a single idea. What type of AI would be most helpful for this?",
    options: [
      "Unimodal AI",
      "Multimodal AI",
      "Text-only AI",
      "Audio-only AI",
    ],
    answer: "Multimodal AI",
  },
  {
    question: "A sales manager wants to get a more accurate prediction of next quarter's sales figures. What AI-powered technique could they use?",
    options: [
      "AI-powered sales forecasting",
      "AI-generated sales scripts",
      "AI-powered customer support",
      "AI-based video creation",
    ],
    answer: "AI-powered sales forecasting",
  },
  {
    question: "An HR manager wants to help employees grow their skills. How can AI assist with this?",
    options: [
      "By automatically promoting employees",
      "By identifying skills gaps and recommending personalized learning paths",
      "By scheduling all employee meetings",
      "By writing all internal company emails",
    ],
    answer: "By identifying skills gaps and recommending personalized learning paths",
  },
  {
    question: "OpenAI's Sora model is built on a specific architecture that is an adaptation of the technology used in DALL-E 3. What is this architecture called?",
    options: [
      "Recurrent Neural Network (RNN)",
      "Convolutional Neural Network (CNN)",
      "Generative Adversarial Network (GAN)",
      "Diffusion transformer",
    ],
    answer: "Diffusion transformer",
  },
  {
    question: "Which of the following is a key benefit of using open-source LLMs for businesses?",
    options: [
      "They are always more powerful than closed-source models",
      "They come with guaranteed 24/7 customer support from the developers",
      "They offer greater data security and privacy because they can be hosted on-premise",
      "They are always free to use for any purpose without any restrictions",
    ],
    answer: "They offer greater data security and privacy because they can be hosted on-premise",
  },
];

export default function AiQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [userName, setUserName] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (quizStarted) {
      setShowAnimation(true);
    }
  }, [currentQuestion, quizStarted]);

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
    setQuizStarted(false);
    setUserName('');
  };

  const startQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim() !== '') {
      setQuizStarted(true);
    }
  };

  return (
    <div className="bg-primary-bg p-8 rounded-lg shadow-lg max-w-2xl mx-auto text-text-color">
      {!quizStarted ? (
        <form onSubmit={startQuiz} className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to test your AI knowledge?</h2>
          <p className="text-lg text-light-purple mb-6">Enter your name to start the quiz and get your personalized certificate!</p>
          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg mb-4"
          />
          <button
            type="submit"
            className="bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors"
          >
            Start Quiz
          </button>
        </form>
      ) : showResult ? (
        <div className="text-center">
          <QuizCertificate score={score} totalQuestions={questions.length} userName={userName} />
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
