import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = "", ...props }) => (
  <div className={`flex flex-col ${className}`}>
    {label && <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{label}</label>}
    <input 
      className="w-full p-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
      {...props}
    />
  </div>
);