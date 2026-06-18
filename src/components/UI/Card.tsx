import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: 'indigo' | 'emerald' | 'amber' | 'none';
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  glowColor = 'none',
  interactive = false,
  className = '',
  ...props
}) => {
  const glowStyles = {
    indigo: "border-slate-100 hover:border-brand-purple/30 hover:shadow-xl hover:shadow-brand-purple/5 border-t-4 border-t-brand-purple",
    emerald: "border-slate-100 hover:border-brand-green/30 hover:shadow-xl hover:shadow-brand-green/5 border-t-4 border-t-brand-green",
    amber: "border-slate-100 hover:border-brand-gold/30 hover:shadow-xl hover:shadow-brand-gold/5 border-t-4 border-t-brand-gold",
    none: "border-slate-100 hover:border-slate-200",
  };

  return (
    <div
      className={`
        relative overflow-hidden rounded-3xl border bg-white p-6 md:p-8
        transition-all duration-300 shadow-[0_10px_30px_rgba(79,70,229,0.03)]
        ${interactive ? 'cursor-pointer transform hover:-translate-y-1' : ''}
        ${glowStyles[glowColor]}
        ${className}
      `}
      {...props}
    >
      {/* Light subtle grid overlay inside card */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.25] pointer-events-none"></div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
