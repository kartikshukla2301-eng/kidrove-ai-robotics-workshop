import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './UI/Button';

interface HeroProps {
  onCTAClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCTAClick }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-white">
      {/* Background decorations */}
      <div  className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50 via-white to-yellow-50"></div>
     <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50 via-white to-yellow-50"></div>
      
      {/* Playful grid overlay */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.6] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Wording & Badges */}
        <div className="lg:col-span-6 text-center lg:text-left space-y-6 flex flex-col items-center lg:items-start">
          
          {/* Summer 2026 Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-200 bg-amber-50 text-amber-600 text-xs font-bold uppercase tracking-wider font-mono"
          >
            ☀️ Summer 2026
          </motion.div>

          {/* Heading Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight tracking-tight text-slate-800"
          >
            <span className="
                          text-5xl
                          md:text-7xl
                          font-black
                          leading-[0.95]">AI & Robotics</span> <br />
            <span className="
                      text-5xl
                      md:text-7xl
                      font-black
                      leading-[0.95]">Summer Workshop</span>
                                </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg text-slate-500 max-w-lg leading-relaxed text-center lg:text-left font-medium"
          >
           Build robots, create AI projects, solve exciting challenges and explore the future of technology through fun hands-on activities designed especially for young innovators.
          </motion.p>

          {/* Grid Spec Badges (Horizontal wrap list) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 gap-4 w-full max-w-md pt-2"
          >
            {/* Spec 1: Hands-on Projects */}
            <div className="flex items-center gap-2.5 text-left text-xs md:text-sm text-slate-600 font-bold">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-50 border border-green-200 text-brand-green text-lg">
                🤖
              </div>
              <span>Hands-on Projects</span>
            </div>

            {/* Spec 2: Live Sessions */}
            <div className="flex items-center gap-2.5 text-left text-xs md:text-sm text-slate-600 font-bold">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink-50 border border-pink-200 text-brand-pink text-lg">
                💡
              </div>
              <span>Live Interactive Sessions</span>
            </div>

            {/* Spec 3: Certificate */}
            <div className="flex items-center gap-2.5 text-left text-xs md:text-sm text-slate-600 font-bold">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 border border-blue-200 text-brand-blue text-lg">
                🏆
              </div>
              <span>Certificate Included</span>
            </div>

            {/* Spec 4: Ages */}
            <div className="flex items-center gap-2.5 text-left text-xs md:text-sm text-slate-600 font-bold">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-50 border border-amber-200 text-brand-gold text-lg">
                👥
              </div>
              <span>For Ages 8–14 Years</span>
            </div>
          </motion.div>

          {/* CTA & Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center lg:items-start gap-4 pt-4 w-full sm:w-auto"
          >
            <Button variant="primary" size="lg" onClick={onCTAClick} className="w-full sm:w-auto px-8">
              Reserve Your Seat →
            </Button>
            
            {/* Centered stars badge */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-full px-5 py-3 shadow-sm">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
              <span>Trusted by 5,000+ Parents</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Handcrafted SVG of Kid assembling robotics car (Matching Reference Image) */}
          <div className="lg:col-span-6 flex justify-center">
            <img
              src="/kids.png"
              alt="Kids learning robotics"
              className="w-full max-w-2xl object-contain"
            />
          </div>
      </div>
    </section>
  );
};