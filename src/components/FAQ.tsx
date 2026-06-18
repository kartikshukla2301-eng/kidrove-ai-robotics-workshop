import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FAQItem } from '../types';

export const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "My child has never coded or built robots before. Can they join?",
      answer: "Yes, absolutely! The workshop starts from the absolute fundamentals. We use friendly visual block-based programming interfaces and virtual robotic parts to explain concepts naturally. Our mentors provide step-by-step guidance so no child is left behind."
    },
    {
      id: 2,
      question: "What computer specs and equipment are needed?",
      answer: "Any laptop or computer (Windows, macOS, or Chromebook) with a working internet connection, webcam, and microphone is perfect. All coding and simulated robotic testing run directly inside the web browser on our platform—no additional kits or downloads are required."
    },
    {
      id: 3,
      question: "What happens if we miss a live class session?",
      answer: "Every weekend live lab session is recorded and uploaded to the child's secure portal within 2 hours. Additionally, kids can book weekly 1:1 help calls with coding mentors to ask doubts and clear any hurdles."
    },
    {
      id: 4,
      question: "Do children receive a certificate after completion?",
      answer: "Yes! After creating and demonstrating their Week 4 capstone project in the online Graduation Showcase Gala, students receive a verified Kidrove 'STEM Explorer' completion certificate and a level-up achievement badge mailed to their home."
    }
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 bg-slate-50/50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/12 w-72 h-72 glow-purple rounded-full opacity-[0.3] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/12 w-72 h-72 glow-pink rounded-full opacity-[0.25] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="text-brand-purple font-display font-extrabold text-sm tracking-widest uppercase">
            💡 Common Queries
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black text-slate-800 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-sm md:text-base">
            Find answers to common questions about workshop setups, mentorships, and student certificates.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqData.map((item, idx) => {
            const isOpen = activeIndex === idx;

            return (
              <div
                key={item.id}
                className={`
                  rounded-3xl border transition-all duration-300 overflow-hidden bg-white
                  ${isOpen ? 'border-brand-purple shadow-lg shadow-brand-purple/5' : 'border-slate-100 shadow-[0_4px_20px_rgba(79,70,229,0.02)] hover:border-slate-200'}
                `}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-slate-800 font-display font-bold text-sm md:text-base pr-4">
                    {item.question}
                  </span>
                  
                  {/* Chevron Icon with Rotation */}
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className={`flex h-8 w-8 items-center justify-center rounded-xl border border-slate-100 text-slate-400 shrink-0 ${isOpen ? 'border-brand-purple/20 text-brand-purple bg-indigo-50' : ''}`}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.span>
                </button>

                {/* Accordion Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 border-t border-slate-50 pt-4 text-slate-500 text-xs md:text-sm leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
