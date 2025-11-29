import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface HeroSearchProps {
  onSearch: (term: string) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  
  return (
    <div className="bg-white border border-gray-200 shadow-xl rounded-3xl max-w-4xl mx-auto -mt-6 relative z-10 flex flex-col md:flex-row overflow-hidden">
      <div className="flex-1 p-4 md:border-r border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer group">
        <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">Where</label>
        <input 
          type="text" 
          placeholder="Search destinations" 
          className="w-full bg-transparent outline-none text-gray-600 placeholder-gray-400 font-medium group-hover:bg-gray-50"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="flex-1 p-4 md:border-r border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
        <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">Check in</label>
        <div className="text-gray-400 font-medium">Add dates</div>
      </div>
      <div className="flex-1 p-4 md:border-r border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
        <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">Check out</label>
        <div className="text-gray-400 font-medium">Add dates</div>
      </div>
      <div className="flex-[1.2] p-3 pl-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer rounded-r-3xl">
        <div>
          <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">Who</label>
          <div className="text-gray-400 font-medium">Add guests</div>
        </div>
        <button 
          className="bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-full shadow-lg transition-all hover:scale-105 flex items-center gap-2"
          onClick={() => onSearch(location)}
        >
          <Search size={20} strokeWidth={2.5} />
          <span className="md:hidden font-bold">Search</span>
        </button>
      </div>
    </div>
  );
};