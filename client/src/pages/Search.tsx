import React, { useMemo } from 'react';
import { Filter } from 'lucide-react';
import { Hotel } from '../types';
import { MOCK_HOTELS } from '../data/mockData';
import { HotelCard } from '../features/hotels/HotelCard';

interface SearchPageProps {
  searchTerm: string;
  onHotelClick: (hotel: Hotel) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ searchTerm, onHotelClick }) => {
  const filteredHotels = useMemo(() => {
    return MOCK_HOTELS.filter(h => {
      if (searchTerm && !h.location.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });
  }, [searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
       <div className="flex items-center gap-4 mb-6 overflow-x-auto pb-2">
         <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm hover:border-black transition-colors whitespace-nowrap">
           <Filter size={14} /> Filters
         </button>
         <button className="border border-gray-300 rounded-full px-4 py-2 text-sm hover:border-black transition-colors whitespace-nowrap">Price</button>
         <button className="border border-gray-300 rounded-full px-4 py-2 text-sm hover:border-black transition-colors whitespace-nowrap">Type of place</button>
         <div className="border-l border-gray-300 h-6 mx-2"></div>
         <div className="text-sm font-medium text-gray-500 whitespace-nowrap">{filteredHotels.length} stays found</div>
       </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
         {filteredHotels.length > 0 ? (
           filteredHotels.map(hotel => (
             <HotelCard key={hotel.id} hotel={hotel} onClick={onHotelClick} />
           ))
         ) : (
           <div className="col-span-full text-center py-20">
              <h3 className="text-xl font-medium text-gray-900">No matches found</h3>
              <p className="text-gray-500">Try changing your filters or search area.</p>
           </div>
         )}
       </div>
    </div>
  );
};