import React, { useState } from 'react';
import { Navbar } from './layout/Navbar';
import { HomePage } from './pages/Home';
import { SearchPage } from './pages/Search';
import { DetailPage } from './pages/Detail';
import { CheckoutPage } from './pages/Checkout';
import { OwnerDashboard } from './pages/OwnerDashboard';
import { MessagesPage } from './pages/Messages';
import { ListingEditor } from './pages/ListingEditor';
import { MyTripsPage } from './pages/MyTripsPage';
import { SuccessPage } from './pages/SuccessPage';
import { AuthModal } from './features/auth/AuthModal';
import { User, Hotel, BookingDetails } from './types';
import { MOCK_USER } from './data/mockData';

interface SearchPayload {
  dateRange?: { start: string; end: string };
}

const App = () => {
  const [page, setPage] = useState<string>('home');
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({ checkIn: '', checkOut: '', guestCount: 1, total: 0 });

  // Detect AI mode based on length criteria
  const isAiMode = searchTerm.length > 12;

  const handleNavigate = (target: string) => {
    window.scrollTo(0, 0);
    setPage(target);
  };

  const handleLogin = () => {
    setUser(MOCK_USER);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setUser(null);
    handleNavigate('home');
  };

  /**
   * BACKEND TEAM:
   * This is where the Traditional Search Logic goes.
   * e.g., Filter by exact string match, location, and date availability.
   */
  const performTraditionalSearch = (term: string, dates?: { start: string, end: string }) => {
    console.log("Creating Traditional Query:", { term, dates });
    // TODO: Call API endpoint: GET /api/v1/search?q={term}&start={dates.start}...
    handleNavigate('search');
  };

  /**
   * BACKEND TEAM:
   * This is where the AI Search Logic goes.
   * Since we are in AI mode, we ignore specific dates in the UI (or infer them from the prompt).
   */
  const performAiSearch = (prompt: string) => {
    console.log("Creating AI/LLM Query:", { prompt });
    // TODO: Call API endpoint: POST /api/v1/ai-search { prompt: prompt }
    // The visual response might be different, but for now we go to search page
    handleNavigate('search');
  };

  const handleSearchSubmit = (data?: SearchPayload) => {
    if (isAiMode) {
      performAiSearch(searchTerm);
    } else {
      performTraditionalSearch(searchTerm, data?.dateRange);
    }
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
          onLogin={() => setShowAuth(true)} 
          onLogout={handleLogout}
          onNavigate={handleNavigate}
          currentPage={page}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearchSubmit={handleSearchSubmit} 
        />
      )}

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

      {page === 'success' && (
        <SuccessPage onGoHome={() => handleNavigate('home')} />
      )}

      {page === 'checkout' && selectedHotel && (
        <CheckoutPage 
          hotel={selectedHotel}
          bookingDetails={bookingDetails}
          onBack={() => handleNavigate('detail')}
          onConfirm={() => {
            handleNavigate('success');
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
          onSave={(data) => {
             console.log('Listing Data:', data);
             alert('Listing Saved!');
             handleNavigate('owner-dashboard');
          }}
        />
      )}

      {page === 'messages' && (
        <MessagesPage onBack={() => handleNavigate('home')} />
      )}

      {page === 'trips' && (
        <MyTripsPage />
      )}

      {/* Auth Modal */}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onLogin={handleLogin} />}
    </div>
  );
};

export default App;