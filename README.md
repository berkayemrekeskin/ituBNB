# ituBNB 🏠

A modern, full-stack accommodation booking platform built with React and Flask, featuring AI-powered search capabilities.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [AI-Powered Search](#ai-powered-search)
- [User Roles](#user-roles)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

ituBNB is a comprehensive accommodation booking platform that allows users to search, book, and manage property rentals. The platform features an intelligent AI-powered search system that understands natural language queries, making it easy for users to find their perfect accommodation.

## ✨ Features

### For Guests
- 🔍 **AI-Powered Search** - Natural language search using Google Gemini AI
- 🏨 **Property Browsing** - Browse listings with detailed information, photos, and reviews
- 📅 **Booking Management** - Create, view, and manage reservations
- 💬 **Messaging System** - Communicate with property hosts
- ⭐ **Review System** - Leave and read reviews for properties
- 💳 **Secure Payments** - Integrated payment processing
- 👤 **User Profiles** - Manage personal information and preferences

### For Hosts
- 📝 **Listing Management** - Create and edit property listings
- 📊 **Dashboard** - View and manage reservations
- 💰 **Reservation Control** - Approve or decline booking requests
- 📧 **Guest Communication** - Message guests directly
- 📈 **Performance Tracking** - Monitor listing performance and reviews

### For Administrators
- 🛡️ **Listing Moderation** - Approve or reject property listings
- 👥 **User Management** - Oversee platform users
- 📊 **Platform Analytics** - Monitor platform activity

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend
- **Flask** - Python web framework
- **MongoDB** - NoSQL database
- **PyMongo** - MongoDB driver for Python
- **Flask-JWT-Extended** - JWT authentication
- **Flask-CORS** - Cross-origin resource sharing
- **Google Gemini AI** - AI-powered search
- **Gunicorn** - WSGI HTTP server

## 📁 Project Structure

```
itubnb/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── features/         # Feature-specific components
│   │   │   ├── auth/        # Authentication components
│   │   │   ├── hotels/      # Hotel/listing components
│   │   │   ├── onboarding/  # User onboarding
│   │   │   └── search/      # Search components
│   │   ├── layout/          # Layout components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   ├── types/           # TypeScript type definitions
│   │   ├── utils/           # Utility functions
│   │   ├── App.tsx          # Main application component
│   │   └── main.tsx         # Application entry point
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies
│   └── vite.config.ts       # Vite configuration
│
├── server/                   # Backend Flask application
│   ├── routes/              # API route handlers
│   │   ├── auth.py         # Authentication endpoints
│   │   ├── listings.py     # Listing management
│   │   ├── reservation.py  # Reservation handling
│   │   ├── review.py       # Review system
│   │   ├── search_and_filter.py  # Search functionality
│   │   ├── messages.py     # Messaging system
│   │   ├── conversations.py # Conversation management
│   │   ├── user.py         # User management
│   │   ├── payment.py      # Payment processing
│   │   └── health.py       # Health check endpoint
│   ├── app.py              # Flask application factory
│   ├── db.py               # Database connection
│   ├── helpers.py          # Helper functions
│   ├── validations.py      # Input validation schemas
│   ├── search_prompt.py    # AI search prompt configuration
│   ├── admin.py            # Admin utilities
│   ├── requirements.txt    # Python dependencies
│   └── .ini                # Configuration file
│
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **Google Gemini API Key** (for AI search)

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/berkayemrekeskin/ituBNB.git
cd ituBNB
```

#### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

#### 3. Install Backend Dependencies

```bash
cd ../server
python -m venv .venv

# On Windows
.venv\Scripts\activate

# On macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
```

### Environment Variables

#### Backend (.env)

Create a `.env` file in the `server/` directory:

```env
GOOGLE_GENAI_API_KEY=your_google_gemini_api_key_here
```

#### Backend (.ini)

Create a `.ini` file in the `server/` directory:

```ini
[PROD]
SECRET_KEY=your_jwt_secret_key_here
MONGO_URI=your_mongodb_connection_string_here
DB_NAME=itubnb
```

#### Frontend

Create a `.env` file in the `client/` directory (if needed):

```env
VITE_API_URL=http://localhost:5000
```

### Running the Application

#### Start the Backend Server

```bash
cd server
python app.py
```

The backend will run on `http://localhost:5000`

#### Start the Frontend Development Server

```bash
cd client
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/verify-code` - Verify reset code
- `POST /api/auth/reset-password` - Reset password

### Listing Endpoints

- `GET /api/listings` - Get all approved listings
- `GET /api/listings/:id` - Get listing by ID
- `POST /api/listings` - Create new listing (requires auth)
- `PUT /api/listings/:id` - Update listing (requires auth)
- `DELETE /api/listings/:id` - Delete listing (requires auth)
- `GET /api/listings/admin/pending` - Get pending listings (admin only)
- `POST /api/listings/admin/approve/:id` - Approve listing (admin only)
- `POST /api/listings/admin/reject/:id` - Reject listing (admin only)

### Search Endpoints

- `POST /api/search/ai` - AI-powered natural language search
- `GET /api/search/:city` - Search listings by city

### Reservation Endpoints

- `GET /api/reservations` - Get user's reservations
- `POST /api/reservations` - Create new reservation
- `PUT /api/reservations/:id` - Update reservation status
- `DELETE /api/reservations/:id` - Cancel reservation

### Review Endpoints

- `GET /api/reviews/property/:id` - Get reviews for a property
- `POST /api/reviews` - Create a review
- `PUT /api/reviews/:id` - Update a review
- `DELETE /api/reviews/:id` - Delete a review

### Message Endpoints

- `GET /api/conversations` - Get user's conversations
- `GET /api/conversations/:id/messages` - Get messages in a conversation
- `POST /api/messages` - Send a message

### User Endpoints

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Payment Endpoints

- `POST /api/payment/create-checkout-session` - Create payment session
- `POST /api/payment/webhook` - Handle payment webhooks

## 🤖 AI-Powered Search

The platform features an advanced AI-powered search system using Google's Gemini AI. Users can search using natural language queries like:

- "Apartment in NYC for up to 4 people with wifi and air conditioning near subway, between $100 and $250"
- "House in Istanbul with at least 3 rooms and a pool"
- "Pet-friendly studio near parks, max $150 per night"

### How It Works

1. **User Input**: User enters a natural language search query
2. **AI Processing**: Google Gemini AI extracts structured filters from the query
3. **Validation**: The system validates the extracted filters
4. **Query Building**: Converts filters into MongoDB queries
5. **Results**: Returns matching listings with ratings and reviews

### Supported Search Parameters

- **Location**: City names
- **Property Type**: apartment, house, villa, studio, hotel, hostel
- **Amenities**: wifi, kitchen, heating, air_conditioning, washer, dryer, free_parking, pool, gym, pet_friendly
- **Nearby Features**: attractions, public_transport, restaurants, shopping_centers, parks
- **Details**: rooms, guests, beds, bathrooms (with min/max constraints)
- **Price**: min_per_night, max_per_night

## 👥 User Roles

### Guest
- Browse and search listings
- Make reservations
- Leave reviews
- Message hosts
- Manage profile

### Host
- Create and manage listings
- Approve/decline reservations
- Communicate with guests
- View performance metrics

### Admin
- Moderate listings (approve/reject)
- Manage users
- Monitor platform activity

## 🔒 Security Features

- JWT-based authentication
- Password hashing
- Secure password reset flow with verification codes
- CORS protection
- Input validation and sanitization
- Protected API endpoints

## 🎨 UI/UX Features

- Responsive design for all devices
- Interactive onboarding tour for new users
- Real-time search with AI assistance
- Date picker for booking
- Image galleries for listings
- Rating and review system
- Messaging interface
- User dashboard

## 🧪 Development

### Build for Production

#### Frontend
```bash
cd client
npm run build
```

#### Backend
```bash
cd server
gunicorn app:app
```

### Linting

```bash
cd client
npm run lint
```

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.


## 🙏 Acknowledgments

- Google Gemini AI for powering the intelligent search
- React and Flask communities for excellent documentation
- All contributors who have helped shape this project

---

**Note**: This is a student project developed as part of a software engineering course. For production use, additional security measures and optimizations should be implemented.

