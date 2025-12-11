import React, { useState } from "react";
import { Search, Sparkles } from "lucide-react";

type NavSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (data: { dateRange?: { start: string; end: string } }) => void;
};

export const NavSearchBar: React.FC<NavSearchBarProps> = ({
  value,
  onChange,
  onSubmit,
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  // Logic to determine AI Mode
  const isAiMode = value.length > 12;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    onSubmit({
      dateRange: { start: startDate, end: endDate }
    });
  };

  return (
    <div className="hidden md:flex flex-1 justify-center px-4 md:px-12">
      <div 
        className={`
          relative flex w-full max-w-3xl items-center gap-2 rounded-full border bg-white px-2 py-2 shadow-sm transition-all duration-500 ease-in-out
          ${isAiMode ? 'border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'border-gray-200'}
        `}
      >
        {/* --- Search Input Section --- */}
        <div className="flex flex-1 items-center pl-3">
            <div className="relative w-5 h-5 mr-3">
                <Search 
                    size={20} 
                    className={`absolute text-gray-500 transition-all duration-500 ${isAiMode ? 'opacity-0 scale-75 rotate-90' : 'opacity-100 scale-100 rotate-0'}`} 
                />
                <Sparkles 
                    size={20} 
                    className={`absolute text-indigo-500 transition-all duration-500 ${isAiMode ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-90'}`} 
                />
            </div>

            <input
              type="text"
              placeholder={isAiMode ? "Describe your dream trip..." : "Search destination..."}
              className="w-full bg-transparent text-sm md:text-base outline-none placeholder:text-gray-400 transition-all"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
            />
        </div>

        {/* --- Divider --- */}
        <div className={`h-6 w-[1px] bg-gray-300 transition-all duration-300 ${isAiMode ? 'opacity-0' : 'opacity-100'}`}></div>

        {/* --- Dynamic Section --- */}
        <div className="flex items-center overflow-hidden">
            
            {/* Date Inputs */}
            <div 
                className={`flex items-center gap-2 transition-all duration-500 ease-in-out whitespace-nowrap overflow-hidden
                ${isAiMode ? 'max-w-0 opacity-0 translate-x-10' : 'max-w-[300px] opacity-100 translate-x-0 px-2'}`}
            >
                <div className="flex flex-col w-24">
                    <span className="text-[10px] font-bold text-gray-800 uppercase tracking-wider pl-1">Check In</span>
                    <input 
                        type="text"
                        placeholder="dd/mm/yyyy"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => {
                          if (!e.target.value) e.target.type = "text";
                        }}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="text-xs text-gray-600 outline-none bg-transparent font-medium cursor-pointer w-full p-1" 
                    />
                </div>
                <div className="flex flex-col w-24">
                    <span className="text-[10px] font-bold text-gray-800 uppercase tracking-wider pl-1">Check Out</span>
                    <input 
                        type="text"
                        placeholder="dd/mm/yyyy"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => {
                          if (!e.target.value) e.target.type = "text";
                        }}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="text-xs text-gray-600 outline-none bg-transparent font-medium cursor-pointer w-full p-1" 
                    />
                </div>
            </div>

            {/* AI MODE: Visual Cue Text */}
            <div 
                className={`flex items-center gap-2 transition-all duration-500 ease-in-out whitespace-nowrap overflow-hidden
                ${isAiMode ? 'max-w-[200px] opacity-100 translate-x-0 px-3' : 'max-w-0 opacity-0 -translate-x-10'}`}
            >
                <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100">
                    AI Enhanced Search Active
                </span>
            </div>

        </div>

        {/* --- Search Button --- */}
        <button
          className={`
            shrink-0 rounded-full px-6 py-3 text-sm font-medium text-white transition-all duration-300
            ${isAiMode ? 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200' : 'bg-amber-600 hover:bg-amber-700'}
          `}
          onClick={handleSubmit}
        >
          {isAiMode ? 'Ask AI' : 'Search'}
        </button>
      </div>
    </div>
  );
};