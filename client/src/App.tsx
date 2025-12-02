import React, { useState } from 'react';
import { Navbar } from './layout/Navbar';
import { HomePage } from './pages/Home';
import { SearchPage } from './pages/Search';
import { DetailPage } from './pages/Detail';
import { CheckoutPage } from './pages/Checkout';
import { OwnerDashboard } from './pages/OwnerDashboard';
import { MessagesPage } from './pages/Messages';
import { ListingEditor } from './pages/ListingEditor';
import { AuthModal } from './features/auth/AuthModal';
import { User, Hotel, BookingDetails } from './types';
import { MOCK_USER } from './data/mockData';

const App = () => {
  const [page, setPage] = useState<string>('home');
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({ checkIn: '', checkOut: '', guestCount: 1, total: 0 });

  const handleNavigate = (target: string) => {
    window.scrollTo(0, 0);
    setPage(target);
  };

  const handleLogin = () => {
    setUser(MOCK_USER);
    setShowAuth(false);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    handleNavigate('search');
  };

  const handleHotelClick = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    handleNavigate('detail');
  };

  const handleBook = (details: BookingDetails) => {
    if (!user) {
      setShowAuth(true);
    } else {
      setBookingDetails(details);
      handleNavigate('checkout');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {page !== 'checkout' && (
        <Navbar 
          user={user} 
          onLogin={() => user ? handleNavigate('messages') : setShowAuth(true)} 
          onNavigate={handleNavigate}
          currentPage={page}
        />
      )}

      {/* --- ROUTES --- */}

      {page === 'home' && <HomePage onHotelClick={handleHotelClick} />}
      
      {page === 'search' && (
        <SearchPage searchTerm={searchTerm} onHotelClick={handleHotelClick} />
      )}

      {page === 'detail' && selectedHotel && (
        <DetailPage 
          hotel={selectedHotel} 
          onBack={() => handleNavigate('search')}
          onBook={handleBook}
        />
      )}

      {page === 'checkout' && selectedHotel && (
        <CheckoutPage 
          hotel={selectedHotel}
          bookingDetails={bookingDetails}
          onBack={() => handleNavigate('detail')}
          onConfirm={() => {
            alert('Booking Confirmed!');
            handleNavigate('home');
          }}
        />
      )}

      {page === 'owner-dashboard' && (
        <OwnerDashboard 
           onBack={() => handleNavigate('home')}
           onCreate={() => handleNavigate('edit-listing')}
           onEdit={() => handleNavigate('edit-listing')}
        />
      )}

      {page === 'edit-listing' && (
        <ListingEditor 
          onBack={() => handleNavigate('owner-dashboard')}
          onSave={() => {
             alert('Listing Saved!');
             handleNavigate('owner-dashboard');
          }}
        />
      )}

      {page === 'messages' && (
        <MessagesPage onBack={() => handleNavigate('home')} />
      )}

      {/* Auth Modal */}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onLogin={handleLogin} />}
    </div>
  );
};

export default App;