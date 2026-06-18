import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './UI/Button';


import type { RegistrationFormData } from '../types';

export const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    studentName: '',
    parentEmail: '',
    parentPhone: '',
  });

  const [errors, setErrors] = useState<Partial<RegistrationFormData>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [ticketId, setTicketId] = useState<string>('');

  const validateField = (name: string, value: string): string => {
    let error = '';
    if (name === 'studentName') {
      if (!value.trim()) {
        error = "Student's name is required";
      } else if (value.trim().length < 3) {
        error = "Name must be at least 3 characters";
      } else if (!/^[a-zA-Z\s]*$/.test(value)) {
        error = "Name can only contain letters";
      }
    } else if (name === 'parentEmail') {
      if (!value.trim()) {
        error = "Parent's email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Please enter a valid email address";
      }
    } else if (name === 'parentPhone') {
      if (!value.trim()) {
        error = "Phone number is required";
      } else if (!/^\d{10}$/.test(value)) {
        error = "Please enter a valid 10-digit phone number";
      }
    }
    return error;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    const newErrors = {
      studentName: validateField('studentName', formData.studentName),
      parentEmail: validateField('parentEmail', formData.parentEmail),
      parentPhone: validateField('parentPhone', formData.parentPhone),
    };

    setErrors(newErrors);
    setTouched({ studentName: true, parentEmail: true, parentPhone: true });

    if (newErrors.studentName || newErrors.parentEmail || newErrors.parentPhone) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/enquiry', {
        studentName: formData.studentName,
        parentEmail: formData.parentEmail,
        parentPhone: formData.parentPhone
      });

      if (response.data && response.data.success) {
        const id = response.data.data.id || '';
        const ticketSuffix = id ? id.substring(id.length - 4).toUpperCase() : Math.floor(1000 + Math.random() * 9000).toString();
        setTicketId(`KD-2026-${ticketSuffix}`);
        setIsSuccess(true);
      } else {
        throw new Error(response.data.message || "Server rejected registration");
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
        setApiError("Validation errors occurred. Please correct the fields marked in red.");
      } else {
        setApiError("Network Connection Timeout! Please check your internet link and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ studentName: '', parentEmail: '', parentPhone: '' });
    setErrors({});
    setTouched({});
    setIsSuccess(false);
    setApiError(null);
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          // Clean White Registration Form Card matching reference image
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-[0_15px_45px_rgba(79,70,229,0.04)] relative">
              
              {/* Header Sparkles */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-brand-green animate-float">✨</span>
                <h3 className="text-lg md:text-xl font-display font-black text-slate-800 text-center">
                  Register for the Workshop
                </h3>
                <span className="text-brand-green animate-float-delayed">✨</span>
              </div>

              {apiError && (
                <div className="mb-5 p-4 rounded-2xl border border-red-200 bg-red-50 text-red-500 text-xs md:text-sm font-semibold flex items-center gap-2.5">
                  <span>⚠️</span>
                  <p>{apiError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Student Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="studentName" className="block text-slate-500 font-display font-bold text-xs uppercase tracking-wider font-mono">
                    Student's Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="studentName"
                      name="studentName"
                      placeholder="Enter student's full name"
                      value={formData.studentName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`
                        w-full pl-11 pr-4 py-3 rounded-2xl border bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-4 transition-all text-sm
                        ${touched.studentName && errors.studentName ? 'border-red-300 focus:ring-red-200 focus:border-red-400' : 'border-slate-200 focus:ring-brand-purple/20 focus:border-brand-purple'}
                      `}
                    />
                    {/* User Icon SVG */}
                    <div className="absolute left-4 top-[14px] text-slate-400">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    {touched.studentName && (
                      <span className="absolute right-3 top-3.5 text-xs">
                        {errors.studentName ? '❌' : '✅'}
                      </span>
                    )}
                  </div>
                  {touched.studentName && errors.studentName && (
                    <p className="text-red-500 text-xs mt-0.5 pl-1 font-semibold">{errors.studentName}</p>
                  )}
                </div>

                {/* Parent Email Address */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="parentEmail" className="block text-slate-500 font-display font-bold text-xs uppercase tracking-wider font-mono">
                    Parent's Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="parentEmail"
                      name="parentEmail"
                      placeholder="Enter email address"
                      value={formData.parentEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`
                        w-full pl-11 pr-4 py-3 rounded-2xl border bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-4 transition-all text-sm
                        ${touched.parentEmail && errors.parentEmail ? 'border-red-300 focus:ring-red-200 focus:border-red-400' : 'border-slate-200 focus:ring-brand-purple/20 focus:border-brand-purple'}
                      `}
                    />
                    {/* Mail Icon SVG */}
                    <div className="absolute left-4 top-[14px] text-slate-400">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    {touched.parentEmail && (
                      <span className="absolute right-3 top-3.5 text-xs">
                        {errors.parentEmail ? '❌' : '✅'}
                      </span>
                    )}
                  </div>
                  {touched.parentEmail && errors.parentEmail && (
                    <p className="text-red-500 text-xs mt-0.5 pl-1 font-semibold">{errors.parentEmail}</p>
                  )}
                </div>

                {/* Parent Phone Number */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="parentPhone" className="block text-slate-500 font-display font-bold text-xs uppercase tracking-wider font-mono">
                    Parent's Phone Number (10-digit mobile)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="parentPhone"
                      name="parentPhone"
                      placeholder="Enter 10-digit mobile number"
                      value={formData.parentPhone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`
                        w-full pl-11 pr-4 py-3 rounded-2xl border bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-4 transition-all text-sm
                        ${touched.parentPhone && errors.parentPhone ? 'border-red-300 focus:ring-red-200 focus:border-red-400' : 'border-slate-200 focus:ring-brand-purple/20 focus:border-brand-purple'}
                      `}
                    />
                    {/* Phone Icon SVG */}
                    <div className="absolute left-4 top-[14px] text-slate-400">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h2.28a2 2 0 012 1.87l.41 2.82a2 2 0 01-1.24 2.19l-1.94.97a15.54 15.54 0 006.27 6.27l.97-1.94a2 2 0 012.19-1.24l2.82.41A2 2 0 0121 17.72V20a2 2 0 01-2 2h-1C9.716 22 3 15.284 3 7V5z" />
                      </svg>
                    </div>
                    {touched.parentPhone && (
                      <span className="absolute right-3 top-3.5 text-xs">
                        {errors.parentPhone ? '❌' : '✅'}
                      </span>
                    )}
                  </div>
                  {touched.parentPhone && errors.parentPhone && (
                    <p className="text-red-500 text-xs mt-0.5 pl-1 font-semibold">{errors.parentPhone}</p>
                  )}
                </div>

                {/* Submit button (GREEN solid like in the image) */}
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={isLoading}
                    className="
                      w-full py-4 text-sm md:text-base font-display font-extrabold rounded-2xl bg-brand-green text-white
                      hover:brightness-105 transition-all shadow-lg shadow-green-500/20 hover:shadow-xl cursor-pointer flex items-center justify-center gap-1.5
                    "
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Securing Seat...
                      </>
                    ) : (
                      <>Confirm & Enroll Now ➔</>
                    )}
                  </motion.button>
                </div>

                {/* Safe info bottom cap */}
                <p className="text-center text-xs text-slate-400 font-semibold flex items-center justify-center gap-1.5 pt-1">
                  <span>🔒</span>
                  <span>Your information is safe with us.</span>
                </p>

              </form>

            </div>
          </motion.div>
        ) : (
          // Success State Ticket Pass
          <motion.div
            key="ticket"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
          >
            <div className="bg-white border border-brand-green/30 rounded-[32px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 blueprint-grid opacity-[0.3] pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-32 h-32 glow-emerald opacity-[0.3]"></div>
              
              <div className="flex justify-between items-center border-b border-dashed border-slate-200 pb-5 mb-5">
                <div className="text-left">
                  <div className="text-brand-green font-display font-extrabold text-xs uppercase tracking-widest font-mono">
                    KIDROVE EXPLORER BADGE
                  </div>
                  <div className="text-slate-800 text-lg md:text-xl font-display font-black mt-1">
                    Registration Completed!
                  </div>
                </div>
                <div className="hidden sm:flex flex-col items-end">
                  <div className="flex gap-0.5 h-8">
                    {[1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4].map((w, idx) => (
                      <div key={idx} className="bg-slate-300" style={{ width: `${w}px` }}></div>
                    ))}
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 mt-1">{ticketId}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-left">
                <div className="md:col-span-8 space-y-4 font-mono text-xs text-slate-500">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Explorer Name</span>
                    <span className="text-lg font-black text-slate-800 uppercase font-display mt-0.5 block">
                      {formData.studentName}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Course Portal</span>
                      <span className="text-xs font-bold text-slate-700 mt-0.5 block">Kidrove Live Sandbox</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Explorer ID</span>
                      <span className="text-xs font-bold text-brand-green mt-0.5 block">{ticketId}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Launch Date</span>
                      <span className="text-xs font-bold text-slate-700 mt-0.5 block">15 July 2026</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Scope</span>
                      <span className="text-xs font-bold text-slate-700 mt-0.5 block">4 Weeks (Level 1-5)</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-4 flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <svg viewBox="0 0 100 100" fill="none" className="w-20 h-20 text-slate-700">
                    <rect x="0" y="0" width="28" height="28" stroke="currentColor" strokeWidth="4" />
                    <rect x="6" y="6" width="16" height="16" fill="currentColor" />
                    <rect x="72" y="0" width="28" height="28" stroke="currentColor" strokeWidth="4" />
                    <rect x="78" y="6" width="16" height="16" fill="currentColor" />
                    <rect x="0" y="72" width="28" height="28" stroke="currentColor" strokeWidth="4" />
                    <rect x="6" y="78" width="16" height="16" fill="currentColor" />
                    <rect x="36" y="6" width="8" height="8" fill="currentColor" />
                    <rect x="52" y="12" width="8" height="8" fill="currentColor" />
                    <rect x="40" y="24" width="8" height="8" fill="currentColor" />
                    <rect x="6" y="40" width="8" height="8" fill="currentColor" />
                    <rect x="18" y="52" width="8" height="8" fill="currentColor" />
                    <rect x="36" y="36" width="12" height="12" fill="currentColor" />
                    <rect x="56" y="44" width="8" height="8" fill="currentColor" />
                    <rect x="72" y="36" width="8" height="8" fill="#22C55E" />
                    <rect x="88" y="52" width="8" height="8" fill="currentColor" />
                    <rect x="36" y="72" width="8" height="8" fill="currentColor" />
                    <rect x="44" y="84" width="12" height="12" fill="currentColor" />
                    <rect x="76" y="76" width="12" height="12" fill="currentColor" />
                  </svg>
                  <span className="text-[7px] font-mono text-slate-400 uppercase tracking-widest mt-1.5">BADGE VALID</span>
                </div>
              </div>

              <div className="border-t border-dashed border-slate-200 pt-6 mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <p className="text-slate-400 text-xxs text-center sm:text-left leading-relaxed">
                  📧 Enrollment credentials details have been sent to parent email address.
                </p>
                <div className="flex gap-2 shrink-0">
                  <Button variant="outline" size="sm" onClick={handleReset} className="py-2 px-3 rounded-xl text-xs">
                    Register Another
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => window.print()} className="py-2 px-3 rounded-xl text-xs bg-slate-50 border-slate-200">
                    Print Badge
                  </Button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
