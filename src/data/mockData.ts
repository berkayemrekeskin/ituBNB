// src/data/mockData.ts
import { Hotel, User } from '../types';

export const MOCK_USER: User = {
  name: "Emir Buğra",
  role: "customer",
  avatar: "https://i.pravatar.cc/150?img=11"
};

export const MOCK_HOTELS: Hotel[] = [
  {
    id: 1,
    title: "Luxury Bosphorus Suite with View",
    location: "Beşiktaş, İstanbul",
    type: "Entire apartment",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    price: 2500,
    rating: 4.92,
    reviews: 128,
    superhost: true,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Wifi", "Kitchen", "Washer", "Air conditioning", "Sea view"],
    description: "Experience the magic of the city from this stunning suite overlooking the Bosphorus."
  },
];