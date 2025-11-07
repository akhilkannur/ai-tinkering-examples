import React from 'react';

interface QuizCertificateProps {
  score: number;
  totalQuestions: number;
  userName: string;
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

export default function QuizCertificate({ score, totalQuestions, userName }: QuizCertificateProps) {
  const title = getCertificateTitle(score, totalQuestions);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto text-center border-2 border-accent my-8">
      <h2 className="text-3xl font-bold text-text-color mb-2">Certificate of AI Prowess</h2>
      <p className="text-lg text-light-purple mb-4">This certifies that</p>
      <h3 className="text-4xl font-bold text-accent mb-4">{userName}</h3>
      <p className="text-lg text-light-purple mb-4">has demonstrated knowledge in the field of Artificial Intelligence by scoring</p>
      <p className="text-5xl font-black text-text-color mb-4">{score}/{totalQuestions}</p>
      <p className="text-lg text-light-purple mb-4">and has earned the title of</p>
      <h4 className="text-3xl font-bold text-accent mb-4">{title}</h4>
    </div>
  );
}
