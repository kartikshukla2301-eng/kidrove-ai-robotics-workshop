import React from 'react';
import { Hero } from './components/Hero';
import { WorkshopDetails } from './components/WorkshopDetails';
import { LearningOutcomes } from './components/LearningOutcomes';
import { FAQ } from './components/FAQ';
import { RegistrationForm } from './components/RegistrationForm';

const App: React.FC = () => {
  const scrollToRegister = () => {
    const el = document.getElementById('register-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-700 flex flex-col selection:bg-brand-purple/20 selection:text-slate-800">
      
      {/* Playful Top Navigation Bar matching reference image */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-100/80 shadow-[0_2px_20px_rgba(79,70,229,0.01)]">
        <div className="container mx-auto px-6 h-16 max-w-7xl flex items-center justify-between">
          {/* Logo Branding */}
          <div className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-display font-black tracking-tight text-slate-800 flex items-center gap-2 cursor-pointer">
              <span className="text-brand-purple">Kid</span>
              <span className="text-brand-gold">rove</span>
              <span className="text-white font-mono text-xs border border-brand-blue bg-brand-blue px-1.5 py-0.5 rounded-lg">
                STEM
              </span>
            </span>
          </div>

          {/* Clean Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500">
            <a href="#outcomes" className="hover:text-brand-purple transition-colors">What You'll Learn</a>
            <a href="#details" className="hover:text-brand-purple transition-colors">Workshop Details</a>
            <a href="#faq" className="hover:text-brand-purple transition-colors">FAQ</a>
            <a href="#details" className="hover:text-brand-purple transition-colors">Parent Guide</a>
          </nav>

          {/* Header Action CTA */}
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToRegister}
              className="px-5 py-2 text-xs md:text-sm font-extrabold rounded-2xl bg-brand-purple text-white hover:brightness-105 hover:shadow-[0_0_15px_rgba(79,70,229,0.25)] transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              Enroll Now ➔
            </button>
          </div>
        </div>
      </header>

      {/* Main Learning Hub Sections */}
      <main className="flex-grow bg-white">
        {/* Playful Hero Redesign */}
        <Hero onCTAClick={scrollToRegister} />

        {/* Workshop Details Specs Card */}
        <div id="details" className="scroll-mt-16 bg-white">
          <WorkshopDetails />
        </div>

        {/* Staggered split section for Outcomes & Forms (Matching reference image) */}
        <section id="register-section" className="relative py-20 bg-white border-t border-b border-slate-100 overflow-hidden">
          {/* Subtle grid backdrop */}
          <div className="absolute inset-0 blueprint-grid opacity-[0.4] pointer-events-none"></div>

          <div className="container mx-auto px-6 max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Learning Outcomes Journey (7 cols) */}
            <div id="outcomes" className="lg:col-span-7 scroll-mt-20">
              <LearningOutcomes />
            </div>

            {/* Right Column: Registration Form (5 cols) */}
            <div className="lg:col-span-5">
              <RegistrationForm />
            </div>
          </div>
        </section>

        {/* Accordions FAQ Section */}
        <div id="faq" className="scroll-mt-16 bg-white">
          <FAQ />
        </div>
      </main>

      {/* Bright Footer Section */}
      <footer className="bg-white border-t border-slate-100 py-16 relative overflow-hidden">
        {/* Playful grid pattern backdrop */}
        <div className="absolute inset-0 blueprint-grid opacity-[0.25] pointer-events-none"></div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-200/60 pb-12 mb-12">
            
            {/* Branding Column */}
            <div className="space-y-4 md:col-span-2 text-left">
              <span className="text-2xl font-display font-black text-slate-800">
                <span className="text-brand-purple">Kid</span>
                <span className="text-brand-gold">rove</span>
              </span>
              <p className="text-slate-500 text-xs md:text-sm max-w-sm leading-relaxed">
                Empowering the next generation of engineers, coders, and scientists with fun, hands-on STEM workshops. Safe, accredited, and interactive.
              </p>
              <div className="flex gap-4 pt-2">
                <a href="#github" className="text-slate-400 hover:text-brand-purple transition-colors text-xs font-semibold">GitHub</a>
                <a href="#youtube" className="text-slate-400 hover:text-brand-purple transition-colors text-xs font-semibold">YouTube</a>
                <a href="#discord" className="text-slate-400 hover:text-brand-purple transition-colors text-xs font-semibold">Discord Camp</a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3 text-left">
              <h6 className="text-slate-800 font-mono text-xs uppercase tracking-widest font-bold">Launch Info</h6>
              <ul className="space-y-2 text-xs md:text-sm text-slate-500 font-medium">
                <li><a href="#details" className="hover:text-brand-purple transition-colors">Specifications</a></li>
                <li><a href="#outcomes" className="hover:text-brand-purple transition-colors">Learning Journey</a></li>
                <li><a href="#faq" className="hover:text-brand-purple transition-colors">Briefing Q&A</a></li>
              </ul>
            </div>

            {/* Reassurance Standards */}
            <div className="space-y-3 text-left">
              <h6 className="text-slate-800 font-mono text-xs uppercase tracking-widest font-bold font-mono">Camp Standards</h6>
              <div className="space-y-2 text-slate-500 text-xs md:text-sm font-medium">
                <div className="flex items-center gap-2">
                  <span className="text-brand-green font-bold">✔</span>
                  <span>Strict Safety Protocols</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand-green font-bold">✔</span>
                  <span>100% Expert Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand-green font-bold">✔</span>
                  <span>Refund Guarantee</span>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-medium gap-4">
            <p>© {new Date().getFullYear()} Kidrove Technologies Private Limited. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#terms" className="hover:text-slate-600">Terms of Service</a>
              <a href="#privacy" className="hover:text-slate-600">Privacy Safeguards</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default App;
