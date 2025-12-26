import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { listingService } from '../services/listingService';
import { userService } from '../services/userService';
import { reviewService, ReviewWithUser } from '../services/reviewService';
import { reservationService } from '../services/reservationService';
import { Hotel, User } from '../types';
import { Check, X, MapPin, Home, Train, UtensilsCrossed, ShoppingBag, Trees, Landmark, Users, Trash2, Star, List, Calendar } from 'lucide-react';
import { Button } from '../components/Button';

interface AdminPageProps {
    onLogout: () => void;
}

const NEARBY_CONFIG = {
    attractions: { icon: Landmark, label: "Attractions" },
    public_transport: { icon: Train, label: "Public Transport" },
    restaurants: { icon: UtensilsCrossed, label: "Restaurants" },
    shopping_centers: { icon: ShoppingBag, label: "Shopping Centers" },
    parks: { icon: Trees, label: "Parks" }
};

export const AdminPage: React.FC<AdminPageProps> = ({ onLogout }) => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();
    const [pendingListings, setPendingListings] = useState<Hotel[]>([]);
    const [selectedListing, setSelectedListing] = useState<Hotel | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [allListings, setAllListings] = useState<Hotel[]>([]);
    const [isLoadingAllListings, setIsLoadingAllListings] = useState(true);
    const [reviews, setReviews] = useState<ReviewWithUser[]>([]);
    const [isLoadingReviews, setIsLoadingReviews] = useState(true);
    const [reservations, setReservations] = useState<any[]>([]);
    const [isLoadingReservations, setIsLoadingReservations] = useState(true);
    const [allListingsRatings, setAllListingsRatings] = useState<Map<string, { rating: number; count: number }>>(new Map());

    // Search and filter state for listings
    const [listingSearchQuery, setListingSearchQuery] = useState('');
    const [selectedHost, setSelectedHost] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    // Search and filter state for reservations
    const [reservationSearchQuery, setReservationSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [reservationCurrentPage, setReservationCurrentPage] = useState(1);

    // Search and filter state for users
    const [userSearchQuery, setUserSearchQuery] = useState('');
    const [selectedRole, setSelectedRole] = useState<string>('all');

    // Refs for scroll navigation
    const pendingRef = useRef<HTMLDivElement>(null);
    const usersRef = useRef<HTMLDivElement>(null);
    const listingsRef = useRef<HTMLDivElement>(null);
    const reviewsRef = useRef<HTMLDivElement>(null);
    const reservationsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/', { replace: true });
            return;
        }
        loadPendingListings();
        loadUsers();
        loadAllListings();
        loadReviews();
        loadReservations();
    }, []);



    const loadPendingListings = async () => {
        setIsLoading(true);
        try {
            const data = await listingService.getPendingListings();
            setPendingListings(data as Hotel[]);
        } catch (error) {
            console.error("Failed to load pending listings", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleApprove = async (listingId: string) => {
        try {
            await listingService.approveListing(listingId);
            setPendingListings(prev => prev.filter(l => l.id !== listingId));
            setSelectedListing(null);
        } catch (error) {
            console.error("Failed to approve listing", error);
        }
    };

    const handleDecline = async (listingId: string) => {
        try {
            await listingService.rejectListing(listingId);
            setPendingListings(prev => prev.filter(l => l.id !== listingId));
            setSelectedListing(null);
        } catch (error) {
            console.error("Failed to decline listing", error);
        }
    };

    const loadUsers = async () => {
        setIsLoadingUsers(true);
        try {
            const data = await userService.getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error("Failed to load users", error);
        } finally {
            setIsLoadingUsers(false);
        }
    };

    const loadAllListings = async () => {
        setIsLoadingAllListings(true);
        try {
            const data = await listingService.getAllListings();
            setAllListings(data);
        } catch (error) {
            console.error("Failed to load all listings", error);
        } finally {
            setIsLoadingAllListings(false);
        }
    };

    const loadReviews = async () => {
        setIsLoadingReviews(true);
        try {
            const data = await reviewService.getAllReviews();
            setReviews(data);
        } catch (error) {
            console.error("Failed to load reviews", error);
        } finally {
            setIsLoadingReviews(false);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm('Are you sure you want to delete this user?')) return;

        try {
            await userService.deleteUser(userId);
            setUsers(prev => prev.filter(u => {
                const id = typeof u._id === 'object' ? u._id.$oid : u._id;
                return id !== userId;
            }));
        } catch (error) {
            console.error("Failed to delete user", error);
        }
    };

    const handleDeleteReview = async (reviewId: string) => {
        if (!confirm('Are you sure you want to delete this review?')) return;

        try {
            await reviewService.deleteReview(reviewId);
            setReviews(prev => prev.filter(r => {
                const id = typeof r._id === 'object' ? r._id.$oid : r._id;
                return id !== reviewId;
            }));
        } catch (error) {
            console.error("Failed to delete review", error);
        }
    };

    const loadReservations = async () => {
        setIsLoadingReservations(true);
        try {
            const data = await reservationService.getAllReservations();
            setReservations(data);
        } catch (error) {
            console.error("Failed to load reservations", error);
        } finally {
            setIsLoadingReservations(false);
        }
    };

    const handleDeleteReservation = async (reservationId: string) => {
        if (!confirm('Are you sure you want to delete this reservation?')) return;

        try {
            await reservationService.deleteReservation(reservationId);
            setReservations(prev => prev.filter(r => {
                const id = typeof r._id === 'object' ? r._id.$oid : r._id;
                return id !== reservationId;
            }));
        } catch (error) {
            console.error("Failed to delete reservation", error);
        }
    };

    const handleDeleteListing = async (listingId: string) => {
        if (!confirm('Are you sure you want to delete this listing? This action cannot be undone.')) return;

        try {
            await listingService.deleteListing(listingId);
            setAllListings(prev => prev.filter(l => l.id !== listingId));
        } catch (error) {
            console.error("Failed to delete listing", error);
            alert('Failed to delete listing. Please try again.');
        }
    };



    const handleLogout = () => {
        onLogout();
    };

    if (!user || user.role !== 'admin') {
        return null; // Return null while redirecting
    }

    const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Filter listings based on search and host selection
    const filteredListings = allListings.filter(listing => {
        // Filter by search query
        const searchLower = listingSearchQuery.toLowerCase();
        const matchesSearch = !listingSearchQuery ||
            listing.title.toLowerCase().includes(searchLower) ||
            listing.city.toLowerCase().includes(searchLower) ||
            listing.property_type.toLowerCase().includes(searchLower);

        // Filter by selected host
        const listingHostId = typeof listing.host_id === 'object' ? listing.host_id.$oid : listing.host_id;
        const matchesHost = selectedHost === 'all' || String(listingHostId) === String(selectedHost);

        return matchesSearch && matchesHost;
    });

    // Pagination calculations
    const totalPages = Math.ceil(filteredListings.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedListings = filteredListings.slice(startIndex, endIndex);

    // Reset to page 1 when search or filter changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [listingSearchQuery, selectedHost]);

    // Filter and paginate reservations
    const filteredReservations = reservations.filter(reservation => {
        // Get guest user info
        const userId = typeof reservation.user_id === 'object' ? reservation.user_id.$oid : reservation.user_id;
        const guestUser = users.find(u => {
            const uId = typeof u._id === 'object' ? u._id.$oid : u._id;
            return String(uId) === String(userId);
        });

        // Get listing info
        const listingId = typeof reservation.listing_id === 'object' ? reservation.listing_id.$oid : reservation.listing_id;
        const listing = allListings.find(l => l.id === listingId);

        // Filter by search query (guest name, email, or listing title)
        const searchLower = reservationSearchQuery.toLowerCase();
        const matchesSearch = !reservationSearchQuery ||
            guestUser?.name?.toLowerCase().includes(searchLower) ||
            guestUser?.email?.toLowerCase().includes(searchLower) ||
            listing?.title?.toLowerCase().includes(searchLower);

        // Filter by status
        const matchesStatus = selectedStatus === 'all' || reservation.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    // Pagination for reservations
    const reservationTotalPages = Math.ceil(filteredReservations.length / ITEMS_PER_PAGE);
    const reservationStartIndex = (reservationCurrentPage - 1) * ITEMS_PER_PAGE;
    const reservationEndIndex = reservationStartIndex + ITEMS_PER_PAGE;
    const paginatedReservations = filteredReservations.slice(reservationStartIndex, reservationEndIndex);

    // Reset reservation page when search or filter changes
    React.useEffect(() => {
        setReservationCurrentPage(1);
    }, [reservationSearchQuery, selectedStatus]);

    // Filter users by search and role
    const filteredUsers = users.filter(user => {
        // Filter by search query (name, email, or username)
        const searchLower = userSearchQuery.toLowerCase();
        const matchesSearch = !userSearchQuery ||
            user.name?.toLowerCase().includes(searchLower) ||
            user.email?.toLowerCase().includes(searchLower) ||
            user.username?.toLowerCase().includes(searchLower);

        // Filter by role
        const matchesRole = selectedRole === 'all' || user.role === selectedRole;

        return matchesSearch && matchesRole;
    });

    return (
        <>
            {/* Floating Navigation */}
            <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
                <button
                    onClick={() => scrollToSection(pendingRef)}
                    className="group relative w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-amber-200 hover:border-amber-500"
                    title="Pending Listings"
                >
                    <Check size={20} className="text-amber-600" />
                    <span className="absolute left-full ml-3 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Pending Listings
                    </span>
                </button>

                <button
                    onClick={() => scrollToSection(usersRef)}
                    className="group relative w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-blue-200 hover:border-blue-500"
                    title="Manage Users"
                >
                    <Users size={20} className="text-blue-600" />
                    <span className="absolute left-full ml-3 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Manage Users
                    </span>
                </button>

                <button
                    onClick={() => scrollToSection(listingsRef)}
                    className="group relative w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-green-200 hover:border-green-500"
                    title="All Listings"
                >
                    <List size={20} className="text-green-600" />
                    <span className="absolute left-full ml-3 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        All Listings
                    </span>
                </button>

                <button
                    onClick={() => scrollToSection(reviewsRef)}
                    className="group relative w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-amber-200 hover:border-amber-500"
                    title="All Reviews"
                >
                    <Star size={20} className="text-amber-600" />
                    <span className="absolute left-full ml-3 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        All Reviews
                    </span>
                </button>

                <button
                    onClick={() => scrollToSection(reservationsRef)}
                    className="group relative w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-blue-200 hover:border-blue-500"
                    title="All Reservations"
                >
                    <Calendar size={20} className="text-blue-600" />
                    <span className="absolute left-full ml-3 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        All Reservations
                    </span>
                </button>
            </div>

            <main className="pb-20 pt-8 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
                        <p className="text-gray-500 mt-2">Manage platform content and approvals</p>
                    </div>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleLogout}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                        Log Out
                    </Button>
                </div>

                {/* Pending Approvals List */}
                <div ref={pendingRef}>
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Pending Listings</h2>
                                <p className="text-sm text-gray-500 mt-1">Review and approve new properties</p>
                            </div>
                            {pendingListings.length > 0 && (
                                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    {pendingListings.length} Pending
                                </span>
                            )}
                        </div>

                        {isLoading ? (
                            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mb-4"></div>
                                <p>Loading listings...</p>
                            </div>
                        ) : pendingListings.length === 0 ? (
                            <div className="p-16 text-center text-gray-400 bg-white">
                                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
                                    <Check size={32} />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">All caught up!</h3>
                                <p className="mt-1">No pending listings to review.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {pendingListings.map(listing => (
                                    <div key={listing.id} className="p-4 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row items-start sm:items-center gap-4 group">
                                        <div className="relative overflow-hidden rounded-lg w-full sm:w-32 h-48 sm:h-24 flex-shrink-0 bg-gray-200">
                                            <img
                                                src={listing.images[0]}
                                                alt={listing.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0 py-1">
                                            <div className="flex items-start justify-between">
                                                <h4 className="font-bold text-gray-900 text-lg truncate pr-4">{listing.title}</h4>
                                                <span className="font-semibold text-gray-900 whitespace-nowrap">₺{listing.price}<span className="text-gray-400 text-xs font-normal">/night</span></span>
                                            </div>

                                            {/* Host Information */}
                                            <div className="flex items-center gap-2 mt-2">
                                                {(() => {
                                                    // Debug: Log the entire listing object to see what fields exist
                                                    console.log('Full listing object:', listing);
                                                    console.log('Listing keys:', Object.keys(listing));

                                                    // Extract host_id from listing - try multiple field names
                                                    let hostId = null;
                                                    if (listing.host_id) {
                                                        if (typeof listing.host_id === 'object') {
                                                            hostId = listing.host_id.$oid || listing.host_id;
                                                        } else {
                                                            hostId = listing.host_id;
                                                        }
                                                    }

                                                    console.log('Extracted host ID:', hostId);

                                                    // Try to find the host in multiple ways
                                                    const host = hostId ? users.find(u => {
                                                        // Get user ID in various formats
                                                        const uId = typeof u._id === 'object' ? u._id.$oid : u._id;
                                                        const uIdStr = String(uId);
                                                        const hostIdStr = String(hostId);

                                                        // Try exact match and string comparison
                                                        return uId === hostId || uIdStr === hostIdStr;
                                                    }) : null;

                                                    const hostName = host?.name || host?.username || 'Unknown Host';
                                                    const hostInitial = hostName.charAt(0).toUpperCase();

                                                    console.log('Found host:', host);

                                                    return (
                                                        <>
                                                            <div className="flex-shrink-0 h-6 w-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                                {hostInitial}
                                                            </div>
                                                            <span className="text-xs text-gray-600">
                                                                Hosted by <span className="font-medium text-gray-900">{hostName}</span>
                                                                {host && host.username && <span className="text-gray-500 ml-1">@{host.username}</span>}
                                                                {host && host.email && <span className="text-gray-400 ml-1">• {host.email}</span>}
                                                                {!host && hostId && <span className="text-gray-400 ml-1">(ID: {String(hostId).substring(0, 8)}...)</span>}
                                                            </span>
                                                        </>
                                                    );
                                                })()}
                                            </div>

                                            <div className="flex flex-wrap items-center text-sm text-gray-500 mt-2 gap-3">
                                                <span className="flex items-center bg-gray-100 px-2 py-1 rounded text-xs font-medium"><MapPin size={12} className="mr-1" /> {listing.city}</span>
                                                <span className="flex items-center bg-gray-100 px-2 py-1 rounded text-xs font-medium"><Home size={12} className="mr-1" /> {listing.property_type}</span>
                                            </div>
                                        </div>

                                        <div className="flex sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setSelectedListing(listing)}
                                                className="w-full sm:w-auto"
                                            >
                                                Review
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* User Management Section */}
                <div ref={usersRef} className="mt-8">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <Users size={24} className="text-gray-700" />
                                    Manage Users
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">View and manage user roles and accounts</p>
                            </div>
                            {users.length > 0 && (
                                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    {users.length} Users
                                </span>
                            )}
                        </div>

                        {/* Search and Filter Controls */}
                        {!isLoadingUsers && users.length > 0 && (
                            <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row gap-3">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Search by name, email, or username..."
                                        value={userSearchQuery}
                                        onChange={(e) => setUserSearchQuery(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="sm:w-48">
                                    <select
                                        value={selectedRole}
                                        onChange={(e) => setSelectedRole(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="all">All Roles</option>
                                        <option value="user">User</option>
                                        <option value="host">Host</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {isLoadingUsers ? (
                            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
                                <p>Loading users...</p>
                            </div>
                        ) : users.length === 0 ? (
                            <div className="p-16 text-center text-gray-400 bg-white">
                                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
                                    <Users size={32} />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">No users found</h3>
                                <p className="mt-1">There are no users in the system.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">User</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Username</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Phone</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Role</th>
                                            <th className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredUsers.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                                    <div className="flex flex-col items-center">
                                                        <Users size={32} className="text-gray-300 mb-2" />
                                                        <p>No users match your search criteria.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : filteredUsers.map(u => {
                                            const userId = typeof u._id === 'object' ? u._id.$oid : u._id;
                                            const isCurrentUser = userId === user?.id;

                                            return (
                                                <tr key={userId} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            {u.avatar ? (
                                                                <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                                                                    <img
                                                                        src={u.avatar}
                                                                        alt={u.name || 'User'}
                                                                        className="h-full w-full object-cover"
                                                                        onError={(e) => {
                                                                            // Fallback to initial if image fails to load
                                                                            e.currentTarget.style.display = 'none';
                                                                            if (e.currentTarget.parentElement) {
                                                                                e.currentTarget.parentElement.innerHTML = `<div class="h-full w-full bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold">${u.name?.charAt(0).toUpperCase() || 'U'}</div>`;
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                                                                    {u.name?.charAt(0).toUpperCase() || 'U'}
                                                                </div>
                                                            )}
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{u.name}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{u.email}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">{u.username || '-'}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">{u.phone || '-'}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                                            u.role === 'host' ? 'bg-green-100 text-green-800' :
                                                                'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {u.role || 'user'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex justify-end gap-2">
                                                            {!isCurrentUser && u.role !== 'admin' && (
                                                                <Button
                                                                    variant="secondary"
                                                                    size="sm"
                                                                    onClick={() => handleDeleteUser(userId!)}
                                                                    className="text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-1"
                                                                >
                                                                    <Trash2 size={14} />
                                                                    Delete
                                                                </Button>
                                                            )}
                                                            {isCurrentUser && (
                                                                <span className="text-xs text-gray-400 italic">Current User</span>
                                                            )}
                                                            {u.role === 'admin' && !isCurrentUser && (
                                                                <span className="text-xs text-gray-400 italic">Admin</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                {/* All Listings Section */}
                <div ref={listingsRef} className="mt-8">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <List size={24} className="text-gray-700" />
                                    All Listings
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">View all approved and pending listings</p>
                            </div>
                            {allListings.length > 0 && (
                                <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    {allListings.length} Listings
                                </span>
                            )}
                        </div>

                        {/* Search and Filter Controls */}
                        {!isLoadingAllListings && allListings.length > 0 && (
                            <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row gap-3">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Search by property name, city, or type..."
                                        value={listingSearchQuery}
                                        onChange={(e) => setListingSearchQuery(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="sm:w-64">
                                    <select
                                        value={selectedHost}
                                        onChange={(e) => setSelectedHost(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    >
                                        <option value="all">All Hosts</option>
                                        {Array.from(new Set(allListings.map(l => {
                                            const hostId = typeof l.host_id === 'object' ? l.host_id.$oid : l.host_id;
                                            return hostId;
                                        }).filter(Boolean))).map(hostId => {
                                            const host = users.find(u => {
                                                const uId = typeof u._id === 'object' ? u._id.$oid : u._id;
                                                return String(uId) === String(hostId);
                                            });
                                            return (
                                                <option key={hostId} value={hostId}>
                                                    {host?.name || host?.username || `Host ${String(hostId).substring(0, 8)}`}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                        )}

                        {isLoadingAllListings ? (
                            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mb-4"></div>
                                <p>Loading listings...</p>
                            </div>
                        ) : allListings.length === 0 ? (
                            <div className="p-16 text-center text-gray-400 bg-white">
                                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
                                    <List size={32} />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">No listings found</h3>
                                <p className="mt-1">There are no listings in the system.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Property</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Host</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Location</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Price</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Rating</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {paginatedListings.length === 0 ? (
                                            <tr>
                                                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                                    <div className="flex flex-col items-center">
                                                        <List size={32} className="text-gray-300 mb-2" />
                                                        <p>No listings match your search criteria.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : paginatedListings.map(listing => {
                                            // Find the host for this listing
                                            const hostId = typeof listing.host_id === 'object' ? listing.host_id.$oid : listing.host_id;
                                            const host = users.find(u => {
                                                const uId = typeof u._id === 'object' ? u._id.$oid : u._id;
                                                return String(uId) === String(hostId);
                                            });

                                            return (
                                                <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden bg-gray-200">
                                                                <img src={listing.images[0]} alt={listing.title} className="h-full w-full object-cover" />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                                                                <div className="text-xs text-gray-500">{listing.property_type}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            {host?.avatar ? (
                                                                <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden bg-gray-200">
                                                                    <img
                                                                        src={host.avatar}
                                                                        alt={host?.name || 'Host'}
                                                                        className="h-full w-full object-cover"
                                                                        onError={(e) => {
                                                                            e.currentTarget.style.display = 'none';
                                                                            if (e.currentTarget.parentElement) {
                                                                                const initial = host?.name?.charAt(0).toUpperCase() || 'H';
                                                                                e.currentTarget.parentElement.innerHTML = `<div class="h-full w-full bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">${initial}</div>`;
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div className="flex-shrink-0 h-8 w-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                                    {host?.name?.charAt(0).toUpperCase() || 'H'}
                                                                </div>
                                                            )}
                                                            <div className="ml-3">
                                                                <div className="text-sm font-medium text-gray-900">{host?.name || 'Unknown Host'}</div>
                                                                <div className="text-xs text-gray-500">{host?.username ? `@${host.username}` : ''}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{listing.city}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-semibold text-gray-900">₺{listing.price}</div>
                                                        <div className="text-xs text-gray-500">per night</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-1">
                                                            <Star size={14} className="text-amber-500 fill-amber-500" />
                                                            <span className="text-sm font-medium text-gray-900">
                                                                {listing.rating ? listing.rating.toFixed(1) : '0.0'}
                                                            </span>
                                                            <span className="text-xs text-gray-500">
                                                                ({listing.reviews || 0})
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${listing.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                            listing.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                                                                'bg-red-100 text-red-800'
                                                            }`}>
                                                            {listing.status || 'approved'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <Button
                                                            variant="secondary"
                                                            size="sm"
                                                            onClick={() => handleDeleteListing(listing.id)}
                                                            className="text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-1"
                                                        >
                                                            <Trash2 size={14} />
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Pagination Controls */}
                        {!isLoadingAllListings && filteredListings.length > 0 && totalPages > 1 && (
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                                    <span className="font-medium">{Math.min(endIndex, filteredListings.length)}</span> of{' '}
                                    <span className="font-medium">{filteredListings.length}</span> listings
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Previous
                                    </button>

                                    <div className="flex gap-1">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                                            // Show first page, last page, current page, and pages around current
                                            const showPage = page === 1 ||
                                                page === totalPages ||
                                                (page >= currentPage - 1 && page <= currentPage + 1);

                                            const showEllipsis = (page === currentPage - 2 && currentPage > 3) ||
                                                (page === currentPage + 2 && currentPage < totalPages - 2);

                                            if (showEllipsis) {
                                                return <span key={page} className="px-2 text-gray-500">...</span>;
                                            }

                                            if (!showPage) return null;

                                            return (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                                                        ? 'bg-green-600 text-white'
                                                        : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {page}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-1 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* All Reviews Section */}
                <div ref={reviewsRef} className="mt-8">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <Star size={24} className="text-gray-700" />
                                    All Reviews
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">Manage and moderate user reviews</p>
                            </div>
                            {reviews.length > 0 && (
                                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    {reviews.length} Reviews
                                </span>
                            )}
                        </div>

                        {isLoadingReviews ? (
                            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mb-4"></div>
                                <p>Loading reviews...</p>
                            </div>
                        ) : reviews.length === 0 ? (
                            <div className="p-16 text-center text-gray-400 bg-white">
                                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
                                    <Star size={32} />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">No reviews found</h3>
                                <p className="mt-1">There are no reviews in the system.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-200">
                                {reviews.map(review => {
                                    const reviewId = typeof review._id === 'object' ? review._id.$oid : review._id;
                                    // Find the listing for this review
                                    const listing = allListings.find(l => l.id === review.property_id);

                                    return (
                                        <div key={reviewId} className="p-6 hover:bg-gray-50 transition-colors">
                                            <div className="flex justify-between items-start gap-4">
                                                <div className="flex-1">
                                                    {/* Reviewer Info */}
                                                    <div className="flex items-center gap-3 mb-3">
                                                        {review.user?.avatar ? (
                                                            <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                                                                <img
                                                                    src={review.user.avatar}
                                                                    alt={review.user?.name || review.user?.username || 'User'}
                                                                    className="h-full w-full object-cover"
                                                                    onError={(e) => {
                                                                        // Fallback to initial if image fails to load
                                                                        e.currentTarget.style.display = 'none';
                                                                        if (e.currentTarget.parentElement) {
                                                                            const initial = (review.user?.name || review.user?.username)?.charAt(0).toUpperCase() || 'U';
                                                                            e.currentTarget.parentElement.innerHTML = `<div class="h-full w-full bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold">${initial}</div>`;
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                                                                {(review.user?.name || review.user?.username)?.charAt(0).toUpperCase() || 'U'}
                                                            </div>
                                                        )}
                                                        <div>
                                                            <div className="text-sm font-semibold text-gray-900">
                                                                {review.user?.name || review.user?.username || 'Anonymous'}
                                                                {review.user?.username && review.user?.name && (
                                                                    <span className="text-gray-500 font-normal ml-1">@{review.user.username}</span>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <div className="flex items-center gap-1">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <Star
                                                                            key={i}
                                                                            size={14}
                                                                            className={i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}
                                                                        />
                                                                    ))}
                                                                </div>
                                                                <span className="text-xs text-gray-500">
                                                                    {new Date(typeof review.created_at === 'object' ? review.created_at.$date : review.created_at).toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Review Comment */}
                                                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">{review.comment}</p>

                                                    {/* Listing Info */}
                                                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                                        <div className="flex items-start gap-3">
                                                            {listing?.images?.[0] && (
                                                                <div className="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden bg-gray-200">
                                                                    <img
                                                                        src={listing.images[0]}
                                                                        alt={listing.title}
                                                                        className="h-full w-full object-cover"
                                                                    />
                                                                </div>
                                                            )}
                                                            <div className="flex-1 min-w-0">
                                                                <div className="text-sm font-semibold text-gray-900 mb-1">
                                                                    {listing?.title || 'Listing not found'}
                                                                </div>
                                                                {listing && (
                                                                    <div className="flex flex-wrap items-center gap-2 text-xs">
                                                                        <span className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded border border-gray-200">
                                                                            <MapPin size={12} className="text-gray-500" />
                                                                            <span className="text-gray-600">{listing.city}</span>
                                                                        </span>
                                                                        <span className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded border border-gray-200">
                                                                            <Home size={12} className="text-gray-500" />
                                                                            <span className="text-gray-600">{listing.property_type}</span>
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                <div className="text-xs text-gray-500 mt-1">
                                                                    Property ID: {review.property_id}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => handleDeleteReview(reviewId!)}
                                                    className="text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-1 flex-shrink-0"
                                                >
                                                    <Trash2 size={14} />
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* All Reservations Section */}
                <div ref={reservationsRef} className="mt-8">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <Calendar size={24} className="text-gray-700" />
                                    All Reservations
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">View and manage all booking reservations</p>
                            </div>
                            {reservations.length > 0 && (
                                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    {reservations.length} Reservations
                                </span>
                            )}
                        </div>

                        {/* Search and Filter Controls */}
                        {!isLoadingReservations && reservations.length > 0 && (
                            <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row gap-3">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Search by guest name, email, or listing..."
                                        value={reservationSearchQuery}
                                        onChange={(e) => setReservationSearchQuery(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="sm:w-48">
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="all">All Statuses</option>
                                        <option value="upcoming">Upcoming</option>
                                        <option value="pending">Pending</option>
                                        <option value="cancelled">Cancelled</option>
                                        <option value="past">Past</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {isLoadingReservations ? (
                            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
                                <p>Loading reservations...</p>
                            </div>
                        ) : reservations.length === 0 ? (
                            <div className="p-16 text-center text-gray-400 bg-white">
                                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
                                    <Calendar size={32} />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">No reservations found</h3>
                                <p className="mt-1">There are no reservations in the system.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Guest</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Listing</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Dates</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Guests</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Total</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {paginatedReservations.length === 0 ? (
                                            <tr>
                                                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                                    <div className="flex flex-col items-center">
                                                        <Calendar size={32} className="text-gray-300 mb-2" />
                                                        <p>No reservations match your search criteria.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : paginatedReservations.map(reservation => {
                                            const reservationId = typeof reservation._id === 'object' ? reservation._id.$oid : reservation._id;
                                            const listingId = typeof reservation.listing_id === 'object' ? reservation.listing_id.$oid : reservation.listing_id;
                                            const userId = typeof reservation.user_id === 'object' ? reservation.user_id.$oid : reservation.user_id;

                                            // Find the listing and user for this reservation
                                            const listing = allListings.find(l => l.id === listingId);
                                            const guestUser = users.find(u => {
                                                const uId = typeof u._id === 'object' ? u._id.$oid : u._id;
                                                return uId === userId;
                                            });

                                            return (
                                                <tr key={reservationId} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            {guestUser?.avatar ? (
                                                                <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                                                                    <img
                                                                        src={guestUser.avatar}
                                                                        alt={guestUser?.name || 'Guest'}
                                                                        className="h-full w-full object-cover"
                                                                        onError={(e) => {
                                                                            // Fallback to initial if image fails to load
                                                                            e.currentTarget.style.display = 'none';
                                                                            if (e.currentTarget.parentElement) {
                                                                                const initial = guestUser?.name?.charAt(0).toUpperCase() || 'G';
                                                                                e.currentTarget.parentElement.innerHTML = `<div class="h-full w-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">${initial}</div>`;
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                                                    {guestUser?.name?.charAt(0).toUpperCase() || 'G'}
                                                                </div>
                                                            )}
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{guestUser?.name || 'Unknown Guest'}</div>
                                                                <div className="text-xs text-gray-500">{guestUser?.email || ''}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            {listing?.images?.[0] && (
                                                                <div className="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden bg-gray-200">
                                                                    <img src={listing.images[0]} alt={listing.title} className="h-full w-full object-cover" />
                                                                </div>
                                                            )}
                                                            <div className="min-w-0">
                                                                <div className="text-sm font-medium text-gray-900 truncate">{listing?.title || 'Listing not found'}</div>
                                                                <div className="text-xs text-gray-500">{listing?.city || ''}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {new Date(reservation.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                        </div>
                                                        <div className="text-xs text-gray-500">to</div>
                                                        <div className="text-sm text-gray-900">
                                                            {new Date(reservation.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{reservation.guests || 1}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-semibold text-gray-900">₺{reservation.total_price}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${reservation.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                                                            reservation.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                                                                reservation.status === 'unpaid' ? 'bg-red-100 text-red-800' :
                                                                    reservation.status === 'declined' ? 'bg-gray-100 text-gray-800' :
                                                                        reservation.status === 'canceled' ? 'bg-gray-100 text-gray-800' :
                                                                            'bg-blue-100 text-blue-800'
                                                            }`}>
                                                            {reservation.status || 'pending'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <Button
                                                            variant="secondary"
                                                            size="sm"
                                                            onClick={() => handleDeleteReservation(reservationId!)}
                                                            className="text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-1 ml-auto"
                                                        >
                                                            <Trash2 size={14} />
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Pagination Controls */}
                        {!isLoadingReservations && filteredReservations.length > 0 && reservationTotalPages > 1 && (
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{reservationStartIndex + 1}</span> to{' '}
                                    <span className="font-medium">{Math.min(reservationEndIndex, filteredReservations.length)}</span> of{' '}
                                    <span className="font-medium">{filteredReservations.length}</span> reservations
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setReservationCurrentPage(prev => Math.max(1, prev - 1))}
                                        disabled={reservationCurrentPage === 1}
                                        className="px-3 py-1 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Previous
                                    </button>

                                    <div className="flex gap-1">
                                        {Array.from({ length: reservationTotalPages }, (_, i) => i + 1).map(page => {
                                            const showPage = page === 1 ||
                                                page === reservationTotalPages ||
                                                (page >= reservationCurrentPage - 1 && page <= reservationCurrentPage + 1);

                                            const showEllipsis = (page === reservationCurrentPage - 2 && reservationCurrentPage > 3) ||
                                                (page === reservationCurrentPage + 2 && reservationCurrentPage < reservationTotalPages - 2);

                                            if (showEllipsis) {
                                                return <span key={page} className="px-2 text-gray-500">...</span>;
                                            }

                                            if (!showPage) return null;

                                            return (
                                                <button
                                                    key={page}
                                                    onClick={() => setReservationCurrentPage(page)}
                                                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${reservationCurrentPage === page
                                                        ? 'bg-blue-600 text-white'
                                                        : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {page}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button
                                        onClick={() => setReservationCurrentPage(prev => Math.min(reservationTotalPages, prev + 1))}
                                        disabled={reservationCurrentPage === reservationTotalPages}
                                        className="px-3 py-1 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Inspection Modal */}
                {
                    selectedListing && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                            <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 ring-1 ring-gray-900/5">
                                {/* Modal Header */}
                                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-10">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">Review Listing</h3>
                                        <p className="text-xs text-gray-500 font-mono mt-0.5">ID: {selectedListing.id}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedListing(null)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Modal Content */}
                                <div className="flex-1 overflow-y-auto p-0">
                                    <div className="relative h-64 sm:h-80 w-full group">
                                        <img
                                            src={selectedListing.images[0]}
                                            alt={selectedListing.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                                        <div className="absolute bottom-6 left-6 text-white text-shadow-lg">
                                            <h2 className="text-3xl font-bold tracking-tight">{selectedListing.title}</h2>
                                            <p className="flex items-center mt-2 font-medium opacity-90 text-lg">
                                                <MapPin size={20} className="mr-2" /> {selectedListing.city}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-8">
                                        <div className="flex flex-wrap gap-6 mb-8 text-center text-gray-700">
                                            <div className="flex-1 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">Price</p>
                                                <p className="text-xl font-bold text-gray-900">₺{selectedListing.price}</p>
                                            </div>
                                            <div className="flex-1 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">Guests</p>
                                                <p className="text-xl font-bold text-gray-900">{selectedListing.details?.guests || 1}</p>
                                            </div>
                                            <div className="flex-1 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">Bedrooms</p>
                                                <p className="text-xl font-bold text-gray-900">{selectedListing.details?.rooms || 1}</p>
                                            </div>
                                            <div className="flex-1 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">Bathrooms</p>
                                                <p className="text-xl font-bold text-gray-900">{selectedListing.details?.bathrooms || 1}</p>
                                            </div>
                                        </div>

                                        <div className="prose prose-gray max-w-none text-gray-600 mb-8">
                                            <h4 className="text-gray-900 font-bold text-lg mb-3">About this place</h4>
                                            <p className="leading-relaxed">{selectedListing.description}</p>
                                        </div>

                                        <div>
                                            <h4 className="text-gray-900 font-bold text-lg mb-3">Amenities</h4>
                                            <div className="flex flex-wrap gap-3">
                                                {selectedListing.amenities && Object.entries(selectedListing.amenities)
                                                    .filter(([_, value]) => value === true)
                                                    .map(([amenity, _]) => (
                                                        <span key={amenity} className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 shadow-sm">
                                                            {amenity.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                        </span>
                                                    ))
                                                }
                                            </div>
                                        </div>

                                        {/* Nearby Section */}
                                        {selectedListing.nearby && Object.values(selectedListing.nearby).some(val => val === true) && (
                                            <div className="mt-8">
                                                <h4 className="text-gray-900 font-bold text-lg mb-3">What's Nearby</h4>
                                                <div className="flex flex-wrap gap-3">
                                                    {Object.entries(selectedListing.nearby)
                                                        .filter(([_, value]) => value === true)
                                                        .map(([key, _]) => {
                                                            const config = NEARBY_CONFIG[key as keyof typeof NEARBY_CONFIG];
                                                            if (!config) return null;
                                                            const Icon = config.icon;

                                                            return (
                                                                <span key={key} className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 shadow-sm flex items-center gap-2">
                                                                    <Icon size={16} className="text-amber-600" />
                                                                    {config.label}
                                                                </span>
                                                            );
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Modal Footer / Actions */}
                                <div className="p-6 border-t border-gray-100 bg-white sticky bottom-0 z-10 flex gap-4">
                                    <Button
                                        variant="secondary"
                                        className="flex-1 bg-white hover:bg-red-50 text-gray-700 hover:text-red-600 border-gray-200 hover:border-red-200 py-3"
                                        onClick={() => handleDecline(selectedListing.id)}
                                    >
                                        <X size={20} className="mr-2" />
                                        Decline Listing
                                    </Button>
                                    <Button
                                        variant="primary"
                                        className="flex-1 bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-200 hover:shadow-amber-300 py-3"
                                        onClick={() => handleApprove(selectedListing.id)}
                                    >
                                        <Check size={20} className="mr-2" />
                                        Approve & Publish
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </main>
        </>
    );
};
