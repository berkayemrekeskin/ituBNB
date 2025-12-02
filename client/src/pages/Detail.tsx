import React, { useState } from 'react';
import { ChevronLeft, Star, Share, Heart, Check, Calendar } from 'lucide-react';
import { Hotel, BookingDetails } from '../types';
import { Button } from '../components/Button';
import { DoorOpen, Medal } from '../components/Icons';

interface DetailPageProps {
  hotel: Hotel;
  onBack: () => void;
  onBook: (details: BookingDetails) => void;
}

export const DetailPage: React.FC<DetailPageProps> = ({ hotel, onBack, onBook }) => {
  const [checkIn, setCheckIn] = useState("2025-11-24");
  const [checkOut, setCheckOut] = useState("2025-11-29");
  const [guestCount, setGuestCount] = useState(1);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  // Helper to calculate days
  const getDaysDifference = (d1: string, d2: string) => {
    if (!d1 || !d2) return 0;
    const diff = Math.abs(new Date(d2).getTime() - new Date(d1).getTime());
    return Math.ceil(diff / (1000 * 60 * 60 * 24)); 
  };

  const nights = getDaysDifference(checkIn, checkOut);
  const subtotal = hotel.price * nights;
  const cleaningFee = 500;
  const serviceFee = 850;
  const total = subtotal + cleaningFee + serviceFee;

  if (showAllPhotos) {
    return (
      <div className="fixed inset-0 bg-white z-[100] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <div className="sticky top-0 bg-white p-4 flex items-center justify-between border-b border-gray-100">
          <button onClick={() => setShowAllPhotos(false)} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft size={24}/>
          </button>
        </div>
        <div className="max-w-5xl mx-auto p-4 md:p-8 columns-1 md:columns-2 gap-4 space-y-4">
          {hotel.images.map((img, idx) => (
             <img key={idx} src={img} className="w-full rounded-xl mb-4 break-inside-avoid" alt={`Gallery ${idx}`}/>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto px-4 md:px-8 py-6 pb-20">
      <div className="mb-6">
        <button onClick={onBack} className="flex items-center text-gray-500 hover:text-black mb-4 font-medium">
          <ChevronLeft size={20} /> Back to search
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{hotel.title}</h1>
        {/* ... (Rating/Location Header from previous code) ... */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[300px] md:h-[480px] rounded-2xl overflow-hidden mb-8 md:mb-12">
        <div className="md:col-span-2 row-span-2 relative group cursor-pointer" onClick={() => setShowAllPhotos(true)}>
          <img src={hotel.images[0]} alt="Main" className="w-full h-full object-cover hover:opacity-95 transition-opacity" />
        </div>
        {hotel.images.slice(1, 5).map((img, i) => (
           <div key={i} className="hidden md:block relative group cursor-pointer" onClick={() => setShowAllPhotos(true)}>
             <img src={img} alt={`Grid ${i}`} className="w-full h-full object-cover hover:opacity-95 transition-opacity" />
           </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h2 className="text-xl font-semibold mb-1">{hotel.type} hosted by {hotel.superhost ? 'Superhost' : 'Host'}</h2>
            <p className="text-gray-500">{hotel.guests} guests · {hotel.bedrooms} bedrooms · {hotel.beds} beds · {hotel.baths} baths</p>
          </div>
          <div className="border-b border-gray-200 pb-6 mb-6">
             <div className="flex gap-4 mb-6">
               <div className="mt-1"><DoorOpen size={24} className="text-gray-700" /></div>
               <div><h3 className="font-medium">Self check-in</h3><p className="text-gray-500 text-sm">Check yourself in with the keypad.</p></div>
             </div>
             {/* ... more amenities ... */}
          </div>
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">About this place</h2>
            <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
          </div>
        </div>

        <div className="md:col-span-1 relative">
          <div className="sticky top-28 border border-gray-200 shadow-xl rounded-2xl p-6 bg-white">
            <div className="flex justify-between items-end mb-5">
              <div><span className="text-2xl font-semibold">₺{hotel.price}</span><span className="text-gray-500"> night</span></div>
            </div>
            <div className="border border-gray-300 rounded-xl mb-4 overflow-hidden">
              <div className="grid grid-cols-2 border-b border-gray-300">
                <div className="p-3 border-r border-gray-300 bg-white">
                  <label className="block text-[10px] font-bold uppercase text-gray-700">Check-in</label>
                  <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full text-sm outline-none bg-transparent p-0"/>
                </div>
                <div className="p-3 bg-white">
                  <label className="block text-[10px] font-bold uppercase text-gray-700">Checkout</label>
                   <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full text-sm outline-none bg-transparent p-0"/>
                </div>
              </div>
              <div className="p-3 bg-white">
                <label className="block text-[10px] font-bold uppercase text-gray-700">Guests</label>
                <input type="number" min="1" max={hotel.guests} value={guestCount} onChange={(e) => setGuestCount(Number(e.target.value))} className="w-full text-sm outline-none bg-transparent p-0"/>
              </div>
            </div>
            <Button variant="primary" className="w-full py-3.5 text-lg mb-4" onClick={() => onBook({checkIn, checkOut, guestCount, total})}>Reserve</Button>
            {/* Price breakdown text... */}
          </div>
        </div>
      </div>
    </div>
  );
};