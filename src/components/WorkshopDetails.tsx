import React from 'react';

export const WorkshopDetails: React.FC = () => {
  const details = [
    {
      label: "Age Group",
      value: "8–14 Years",
      icon: "👦",
      bgClass: "bg-green-50 border-green-200 text-brand-green"
    },
    {
      label: "Duration",
      value: "4 Weeks",
      icon: "📅",
      bgClass: "bg-blue-50 border-blue-200 text-brand-blue"
    },
    {
      label: "Mode",
      value: "Online",
      icon: "💻",
      bgClass: "bg-indigo-50 border-indigo-200 text-brand-purple"
    },
    {
      label: "Fee",
      value: "₹2,999",
      icon: "🏷️",
      bgClass: "bg-amber-50 border-amber-200 text-brand-gold"
    },
    {
      label: "Start Date",
      value: "15 July 2026",
      icon: "📅",
      bgClass: "bg-pink-50 border-pink-200 text-brand-pink"
    }
  ];

  return (
    <section id="details" className="relative py-12 bg-[#F8FAFC]/50 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Horizontal Specifications Bar */}
        <div className="bg-white border border-slate-100 rounded-[32px] shadow-[0_10px_40px_rgba(79,70,229,0.04)] p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-6 items-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {details.map((item, idx) => (
              <div 
                key={idx} 
                className={`flex items-center gap-4 lg:justify-center w-full ${idx > 0 ? 'pt-6 lg:pt-0' : ''} ${idx % 2 === 1 ? 'md:pt-0' : ''}`}
                style={{ borderTop: 'none' }} // remove automatic dividing line artifacts
              >
                {/* Colored circle icon */}
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-xl ${item.bgClass}`}>
                  {item.icon}
                </div>
                
                {/* Wording labels */}
                <div className="text-left space-y-0.5">
                  <p className="text-slate-400 text-xs font-mono font-bold uppercase tracking-wider">{item.label}</p>
                  <p className="text-slate-800 text-base md:text-lg font-display font-black leading-tight">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
