import React, { useState, useEffect, useRef } from "react";
import { Search, Sparkles, ArrowUp, X } from "lucide-react";

type SearchData = {
  mode: 'standard' | 'ai';
  destination: string;
  dateRange?: { start: string; end: string };
};

type NavSearchBarProps = {
  initialValue?: string;
  onSubmit: (data: SearchData) => void;
};

export const NavSearchBar: React.FC<NavSearchBarProps> = ({
  initialValue = "",
  onSubmit,
}) => {
  const [mode, setMode] = useState<'standard' | 'ai'>('standard');
  const [destination, setDestination] = useState(initialValue);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isAi = mode === 'ai';

  useEffect(() => {
    if (isAi && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isAi]);

  const handleSubmit = () => {
    onSubmit({
      mode,
      destination,
      dateRange: mode === 'standard' ? { start: startDate, end: endDate } : undefined
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="hidden md:flex flex-1 justify-center px-8 z-50">
      
      {/* Layout Anchor (Keeps navbar height stable) */}
      <div className="relative w-full max-w-2xl h-12">
        
        {/* --- Visual Search Card --- */}
        <div 
            className={`
              absolute top-0 left-0 w-full flex flex-col bg-white border shadow-sm transition-all duration-300 ease-out origin-top overflow-hidden
              rounded-[24px]
              ${isAi 
                 ? 'h-40 border-indigo-300 shadow-xl ring-4 ring-indigo-50/50' 
                 : 'h-12 border-gray-200 hover:shadow-md'
              }
            `}
        >
            <div className="flex w-full h-full">
                
                {/* 1. Input Area */}
                <div className={`flex-1 flex flex-col justify-center px-5 py-2 transition-all duration-300 ${isAi ? 'w-full' : ''}`}>
                    
                    {/* Standard Input */}
                    <input
                      type="text"
                      placeholder="Where to?"
                      className={`
                        w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-500 truncate
                        ${isAi ? 'hidden' : 'block'}
                      `}
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />

                    {/* AI Textarea */}
                    {isAi && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 w-full h-full flex flex-col pt-1">
                             <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider mb-1">
                                AI Travel Assistant
                             </span>
                            <textarea
                                ref={textareaRef}
                                placeholder="Describe your trip (e.g. 'A 3 bedroom apartment in New York, near to the gym, near to the Chinese restaurants and has smoke detector...')"
                                className="w-full h-full bg-transparent outline-none text-indigo-950 placeholder:text-indigo-300/70 text-base resize-none font-medium leading-relaxed custom-scrollbar"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    )}
                </div>

                {/* 2. Divider & Dates (Standard Only) */}
                <div 
                    className={`
                        flex items-center overflow-hidden transition-all duration-300 ease-in-out
                        ${isAi ? 'max-w-0 opacity-0' : 'max-w-[300px] opacity-100 border-l border-gray-200'}
                    `}
                >
                    <div className="flex items-center gap-1 px-2">
                        {/* Check In */}
                        <div className="flex flex-col justify-center px-3 py-1 hover:bg-gray-100 rounded-full cursor-pointer group relative">
                            <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Check In</label>
                            <div className="text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[60px]">
                                {startDate || "Add date"}
                            </div>
                            <input 
                               type="date" 
                               className="absolute inset-0 opacity-0 cursor-pointer"
                               onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>

                        {/* Check Out */}
                        <div className="flex flex-col justify-center px-3 py-1 hover:bg-gray-100 rounded-full cursor-pointer group relative">
                            <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Check Out</label>
                            <div className="text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[60px]">
                                {endDate || "Add date"}
                            </div>
                            <input 
                               type="date" 
                               className="absolute inset-0 opacity-0 cursor-pointer"
                               onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* 3. Search Button */}
                <div className={`pr-1 flex transition-all duration-300 ${isAi ? 'items-end pb-3' : 'items-center'}`}>
                    <button
                        className={`
                            flex items-center justify-center rounded-full text-white transition-all duration-300 shadow-sm
                            ${isAi 
                                ? 'w-10 h-10 bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' 
                                : 'w-10 h-10 bg-amber-600 hover:bg-amber-700'
                            }
                        `}
                        onClick={handleSubmit}
                    >
                        {isAi ? <ArrowUp size={20} /> : <Search size={18} />}
                    </button>
                </div>
            </div>
        </div>

        {/* --- Toggle Button --- */}
        <div className="absolute -right-14 top-1">
             <button
                onClick={() => setMode(isAi ? 'standard' : 'ai')}
                className={`
                    flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300
                    ${isAi 
                        ? 'bg-gray-100 border-gray-200 text-gray-500 hover:bg-gray-200' 
                        : 'bg-white border-indigo-100 text-indigo-500 hover:bg-indigo-50 hover:border-indigo-200 shadow-sm'
                    }
                `}
                title={isAi ? "Close AI Search" : "Try AI Search"}
            >
                {isAi ? <X size={18} /> : <Sparkles size={18} />}
            </button>
        </div>
        
      </div>
    </div>
  );
};