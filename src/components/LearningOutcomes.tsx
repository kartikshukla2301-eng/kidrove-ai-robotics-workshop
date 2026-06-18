import React from 'react';
import { motion } from 'framer-motion';

interface StepItem {
  id: string;
  title: string;
  desc: string;
  icon: string;
  colorClass: string;
  borderClass: string;
}

export const LearningOutcomes: React.FC = () => {
  const steps: StepItem[] = [
    {
      id: "01",
      title: "Discover AI",
      desc: "Understand the basics of Artificial Intelligence in simple & fun ways.",
      icon: "🤖",
      colorClass: "bg-green-500 text-white",
      borderClass: "border-t-brand-green"
    },
    {
      id: "02",
      title: "Build Robots",
      desc: "Explore robotics concepts and build working models.",
      icon: "⚙️",
      colorClass: "bg-blue-500 text-white",
      borderClass: "border-t-brand-blue"
    },
    {
      id: "03",
      title: "Create Projects",
      desc: "Build exciting AI & tech projects with real-world use.",
      icon: "💻",
      colorClass: "bg-purple-500 text-white",
      borderClass: "border-t-brand-purple"
    },
    {
      id: "04",
      title: "Solve Challenges",
      desc: "Boost logical thinking and problem solving skills.",
      icon: "🧠",
      colorClass: "bg-amber-500 text-white",
      borderClass: "border-t-brand-gold"
    },
    {
      id: "05",
      title: "Future Innovator",
      desc: "Gain confidence and become a creator of tomorrow!",
      icon: "🚀",
      colorClass: "bg-pink-500 text-white",
      borderClass: "border-t-brand-pink"
    }
  ];

  return (
    <div className="space-y-10">
      {/* Playful sparkled header */}
      <div className="flex items-center justify-center lg:justify-start gap-3 text-center lg:text-left">
        <span className="text-xl md:text-2xl text-brand-pink animate-float">✨</span>
        <h2 className="text-2xl md:text-3xl font-display font-black text-slate-800 tracking-tight flex items-center gap-2">
          What Kids Will Learn
        </h2>
        <span className="text-xl md:text-2xl text-brand-blue animate-float-delayed">✨</span>
      </div>

      {/* Grid mapping out the cards */}
      <div className="relative">
        
        {/* Playful curved connecting path behind cards (hidden on mobile) */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.25] pointer-events-none hidden md:block" xmlns="http://www.w3.org/2000/svg">
          <path d="M 60,80 Q 200,40 300,120 T 500,80 T 600,160" fill="none" stroke="#6366F1" strokeWidth="3" strokeDasharray="6 6" />
        </svg>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`
                relative bg-white border border-slate-100 rounded-3xl p-5 shadow-[0_8px_25px_rgba(79,70,229,0.02)]
                hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-t-4 ${step.borderClass}
                flex flex-col items-center text-center space-y-4
              `}
            >
              {/* Level circle badge */}
              <div className={`absolute -top-3.5 -left-3.5 h-7 w-7 rounded-full flex items-center justify-center font-mono text-xs font-black shadow-sm ${step.colorClass}`}>
                {step.id}
              </div>

              {/* Large Emojis icon */}
              <div className="text-4xl filter drop-shadow-sm pt-2">
                {step.icon}
              </div>

              {/* Card Titles */}
              <div className="space-y-1.5">
                <h4 className="text-slate-800 font-display font-black text-base md:text-lg">
                  {step.title}
                </h4>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};
