import React from 'react';
import Image from 'next/image';
import SocialSharing from './SocialSharing';
import { Award, ShieldCheck, Trophy, Sparkles } from 'lucide-react';

interface QuizCertificateProps {
  score: number;
  totalQuestions: number;
  userName: string;
  quizUrl: string;
}

const getCertificateTitle = (score: number, totalQuestions: number) => {
  const percentage = (score / totalQuestions) * 100;
  if (percentage === 100) return 'AI Systems Architect';
  if (percentage >= 80) return 'Strategic AI Operator';
  if (percentage >= 60) return 'AI Implementation Specialist';
  return 'AI Intelligence Associate';
};

export default function QuizCertificate({ score, totalQuestions, userName, quizUrl }: QuizCertificateProps) {
  const title = getCertificateTitle(score, totalQuestions);
  const shareTitle = `I earned my ${title} certification on Real AI Examples!`;
  const shareDescription = `I scored ${score}/${totalQuestions} on the professional AI Readiness Quiz. How do you rank?`;

  return (
    <div className="my-12 max-w-2xl mx-auto">
      {/* The Certificate Frame */}
      <div className="bg-[#0B1120] p-1 border-[12px] border-double border-navy-dark rounded-sm relative shadow-2xl overflow-hidden">
        
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-accent/30 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-accent/30 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-accent/30 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-accent/30 rounded-br-lg" />

        <div className="bg-primary-bg p-10 md:p-16 border border-white/5 relative">
          {/* Watermark Logo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
             <Image src="/favicon_transparent.png" alt="" width={400} height={400} />
          </div>

          <div className="relative z-10 text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center border border-accent/20 text-accent">
                <Award size={40} />
              </div>
            </div>

            <h4 className="font-mono text-[10px] font-bold text-accent uppercase tracking-[0.4em] mb-4">
              Certification of Achievement
            </h4>
            
            <h2 className="text-3xl md:text-4xl font-headline font-black text-white mb-8 tracking-tight uppercase italic">
              Verification of AI Literacy
            </h2>

            <p className="text-sm text-text-secondary font-light mb-2">This officially certifies that</p>
            <h3 className="text-4xl md:text-5xl font-headline font-bold text-white mb-8 border-b-2 border-accent/20 inline-block px-8 pb-2">
              {userName}
            </h3>

            <p className="text-sm text-text-secondary font-light max-w-xs mx-auto leading-relaxed mb-8">
              Has successfully demonstrated advanced comprehension of AI implementation by achieving a score of
            </p>

            <div className="flex items-center justify-center gap-4 mb-10">
               <div className="h-px w-12 bg-white/10" />
               <span className="text-5xl font-black text-white tracking-tighter">{score}/{totalQuestions}</span>
               <div className="h-px w-12 bg-white/10" />
            </div>

            <p className="text-xs text-text-secondary uppercase tracking-widest mb-2 font-bold opacity-60 italic">Title Conferred:</p>
            <h4 className="text-2xl md:text-3xl font-headline font-black text-accent uppercase tracking-tight mb-12">
              {title}
            </h4>

            <div className="flex justify-between items-end border-t border-white/5 pt-8">
               <div className="text-left">
                  <p className="text-[8px] font-mono text-text-secondary/40 uppercase tracking-widest mb-1">Date Issued</p>
                  <p className="text-[10px] font-bold text-white/60">{new Date().toLocaleDateString()}</p>
               </div>
               <div className="w-16 h-16 opacity-40 grayscale contrast-125">
                  <Image src="/favicon_transparent.png" alt="Seal" width={64} height={64} />
               </div>
               <div className="text-right">
                  <p className="text-[8px] font-mono text-text-secondary/40 uppercase tracking-widest mb-1">Verify ID</p>
                  <p className="text-[10px] font-bold text-white/60 font-mono">TK-{Math.random().toString(36).substring(7).toUpperCase()}</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-secondary-bg border border-navy-dark p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
           <Sparkles className="text-accent w-5 h-5" />
           <p className="text-sm font-bold text-white">Share your official rank with the community.</p>
        </div>
        <SocialSharing url={quizUrl} title={shareTitle} description={shareDescription} compact />
      </div>
    </div>
  );
}
