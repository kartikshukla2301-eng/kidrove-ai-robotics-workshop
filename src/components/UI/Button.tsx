import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  ...props
}) => {
  const baseStyle = "relative inline-flex items-center justify-center font-display font-bold transition-all duration-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-purple/20 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97] cursor-pointer shadow-sm";
  
  const sizeStyles = {
    sm: "px-4 py-2 text-xs md:text-sm",
    md: "px-6 py-3 text-sm md:text-base",
    lg: "px-8 py-4 text-base md:text-lg",
  };

  const variantStyles = {
    primary: "bg-gradient-to-r from-brand-purple to-indigo-500 text-white hover:brightness-110 shadow-lg shadow-brand-purple/25 hover:shadow-xl hover:shadow-brand-purple/35",
    secondary: "bg-white text-slate-700 border-2 border-slate-200 hover:border-brand-purple hover:text-brand-purple hover:bg-slate-50",
    outline: "border-2 border-slate-200 text-slate-600 hover:text-brand-purple hover:border-brand-purple bg-transparent",
    ghost: "text-slate-500 hover:text-brand-purple hover:bg-slate-100/50",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Syncing...
        </>
      ) : children}
    </motion.button>
  );
};
