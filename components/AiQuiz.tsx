import { useState } from 'react';

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

  const handleAnswer = (option: string) => {
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
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
          <button
            onClick={restartQuiz}
            className="bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">{questions[currentQuestion].question}</h2>
          <div className="grid grid-cols-1 gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="bg-secondary-bg p-4 rounded-lg text-left hover:bg-accent-light transition-colors"
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
