import React from 'react';
import Image from 'next/image';
import SocialSharing from './SocialSharing';

interface QuizCertificateProps {
  score: number;
  totalQuestions: number;
  userName: string;
  quizUrl: string;
}

const getCertificateTitle = (score: number, totalQuestions: number) => {
  const percentage = (score / totalQuestions) * 100;
  if (percentage === 100) {
    return 'AI Master';
  } else if (percentage >= 80) {
    return 'AI Adept';
  } else if (percentage >= 60) {
    return 'AI Apprentice';
  } else {
    return 'Curious Novice';
  }
};

export default function QuizCertificate({ score, totalQuestions, userName, quizUrl }: QuizCertificateProps) {
  const title = getCertificateTitle(score, totalQuestions);
  const shareTitle = `I scored ${score}/${totalQuestions} on the AI in the Workplace Quiz!`;
  const shareDescription = `I earned the title of ${title}. How will you score?`;

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto text-center border-2 border-accent my-8">
      <div className="flex justify-center items-center mb-4">
        <Image src="/logo.png" alt="AI Examples Logo" width={80} height={80} className="rounded-full" />
      </div>
      <h2 className="text-3xl font-bold text-text-color mb-2">Certificate of AI Prowess</h2>
      <p className="text-lg text-light-purple mb-4">This certifies that</p>
      <h3 className="text-4xl font-bold text-accent mb-4">{userName}</h3>
      <p className="text-lg text-light-purple mb-4">has demonstrated knowledge in the field of Artificial Intelligence by scoring</p>
      <p className="text-5xl font-black text-text-color mb-4">{score}/{totalQuestions}</p>
      <p className="text-lg text-light-purple mb-4">and has earned the title of</p>
      <h4 className="text-3xl font-bold text-accent mb-4">{title}</h4>
      <div className="mt-6">
        <SocialSharing url={quizUrl} title={shareTitle} description={shareDescription} compact />
      </div>
    </div>
  );
}
