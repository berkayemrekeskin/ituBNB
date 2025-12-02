import React, { useState } from 'react';
import { ChevronLeft, DollarSign } from 'lucide-react';
import { Hotel, BookingDetails } from '../types';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { CreditCardIcon } from '../components/Icons';

interface CheckoutPageProps {
  hotel: Hotel;
  bookingDetails: BookingDetails;
  onBack: () => void;
  onConfirm: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ hotel, bookingDetails, onBack, onConfirm }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onConfirm();
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 animate-in slide-in-from-bottom-8 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100"><ChevronLeft /></button>
        <h1 className="text-3xl font-bold">Request to book</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Your trip</h2>
            <div className="flex justify-between py-3 border-b">
              <div><div className="font-medium">Dates</div><div className="text-gray-600">{bookingDetails.checkIn} – {bookingDetails.checkOut}</div></div>
              <button className="font-medium underline text-gray-800" onClick={onBack}>Edit</button>
            </div>
            <div className="flex justify-between py-3 border-b">
              <div><div className="font-medium">Guests</div><div className="text-gray-600">{bookingDetails.guestCount} guest(s)</div></div>
              <button className="font-medium underline text-gray-800" onClick={onBack}>Edit</button>
            </div>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">Pay with</h2>
            <div className="flex gap-3 mb-4">
               <div className="border border-black rounded p-2"><CreditCardIcon size={20}/></div>
               <div className="border border-gray-300 rounded p-2 text-gray-400"><DollarSign size={20}/></div>
            </div>
            <Input placeholder="Card number" className="mb-3" />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Expiration" />
              <Input placeholder="CVV" />
            </div>
          </section>
          <Button variant="primary" className="w-full py-4 text-lg font-bold" onClick={handlePayment} disabled={loading}>
            {loading ? "Processing..." : "Confirm and pay"}
          </Button>
        </div>

        <div className="hidden md:block">
          <div className="border border-gray-200 rounded-xl p-6 shadow-lg sticky top-24">
            <div className="flex gap-4 mb-6 border-b pb-6">
               <img src={hotel.images[0]} className="w-28 h-24 object-cover rounded-lg" alt="Thumbnail" />
               <div>
                 <div className="text-xs text-gray-500 mb-1">{hotel.type}</div>
                 <div className="font-medium text-sm mb-2">{hotel.title}</div>
               </div>
            </div>
            <div className="flex justify-between font-bold"><span>Total (TRY)</span><span>₺{bookingDetails.total}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};