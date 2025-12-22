// src/pages/Home.tsx
import React from 'react';
import { Home as HomeIcon } from 'lucide-react';
import { MOCK_HOTELS } from '../data/mockData';
import { HotelCard } from '../features/hotels/HotelCard';
import { Hotel } from '../types';

interface HomeProps {
  onHotelClick: (hotel: Hotel) => void;
}

export const HomePage: React.FC<HomeProps> = ({ onHotelClick }) => {
  return (
    <main className="pb-20">
      {/* Hero */}
      <div className="bg-black text-white pt-12 pb-32 px-8 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="relative z-10 max-w-7xl mx-auto text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
              Find your next stay <br/> comfortably.
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-xl font-medium drop-shadow-md">
            Discover homes, rooms, and unique places to stay.
          </p>
        </div>
      </div>

      {/* Listing Grid */}
      <div className="max-w-7xl mx-auto mt-8 px-4 md:px-8">
        <h2 className="text-2xl font-bold mb-6">Featured stays</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {MOCK_HOTELS.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} onClick={onHotelClick} />
          ))}
        </div>
      </div>
    </main>
  );
};