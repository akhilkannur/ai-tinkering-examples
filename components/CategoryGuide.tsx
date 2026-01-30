import React from 'react';
import { HelpCircle, BookOpen, ChevronRight, CheckCircle2 } from 'lucide-react';
import { categoryGuides } from '../lib/category-guides';

interface CategoryGuideProps {
  category: string;
}

const CategoryGuide: React.FC<CategoryGuideProps> = ({ category }) => {
  const content = categoryGuides[category];

  if (!content) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-24 mb-16 font-sans">
      
      {/* Main Guide Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 shadow-sm mb-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 font-headline">
            {content.guideTitle}
          </h2>
        </div>

        <div className="prose prose-lg text-gray-600 max-w-none">
          {content.guide.map((paragraph, idx) => (
            <p key={idx} className="mb-6 leading-relaxed">
              {paragraph.split('**').map((part, i) => 
                i % 2 === 1 ? <strong key={i} className="text-gray-900 font-bold">{part}</strong> : part
              )}
            </p>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      {content.faqs && content.faqs.length > 0 && (
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 font-headline">
              Common Questions
            </h2>
          </div>

          <div className="grid gap-6">
            {content.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-2">
                  <span className="text-purple-500 mt-1"><ChevronRight className="w-4 h-4" /></span>
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trust / E-E-A-T Signal */}
      <div className="mt-8 text-center text-sm text-gray-400 flex items-center justify-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-green-500" />
        <span>Content verified by our engineering team for accuracy.</span>
      </div>

    </div>
  );
};

export default CategoryGuide;
