# Authentication & Dashboard Setup

This document describes the authentication and dashboard implementation for ContestArena.

## Features Implemented

### 1. Authentication System
- **Firebase Authentication**: Email/password and Google sign-in
- **Backend Integration**: JWT token management with backend API
- **Role-based Access**: User, Creator, and Admin roles

### 2. Login & Registration
- **Login Page**: Email/password and Google authentication
- **Register Page**: Email/password and Google authentication with role selection
- **Role Selection Modal**: Appears after signup to choose between joining contests (user) or creating contests (creator)

### 3. Dashboards
- **User Dashboard**: For users who join contests
  - Shows participations, active contests, and wins
  - Displays contest details and status
  
- **Creator Dashboard**: For users who create contests
  - Shows created contests with status (pending/confirmed)
  - Displays participants count
  - Allows creating new contests
  - Can delete pending contests

- **Admin Dashboard**: For platform administrators
  - Shows platform statistics
  - Manages pending contest approvals
  - Can approve or reject contests

### 4. Protected Routes
- Dashboard routes are protected and require authentication
- Role-based routing to appropriate dashboard

### 5. Navigation
- Updated Navbar with user profile dropdown
- Shows user avatar, name, and role
- Quick access to dashboard and sign out

## Environment Variables Required

Create a `.env` file in the root directory with:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_API_BASE_URL=http://localhost:5000/api
```

## Backend API Endpoints Used

### Authentication
- `POST /api/auth/jwt` - Create or get JWT token
- `GET /api/auth/me` - Get current user profile

### Users
- `PATCH /api/users/:id/role` - Update user role

### Contests
- `GET /api/contests` - Get all contests
- `DELETE /api/contests/:id` - Delete contest
- `PATCH /api/contests/:id/status` - Approve contest (Admin)

### Participations
- `GET /api/participations/me` - Get my participations
- `GET /api/participations/contest/:contestId` - Get contest submissions

## File Structure

```
src/
├── contexts/
│   └── AuthContext.jsx          # Authentication context provider
├── components/
│   ├── Layout/
│   │   └── Navbar/
│   │       └── Navbar.jsx       # Updated navbar with user menu
│   ├── Modal/
│   │   └── RoleSelectionModal.jsx  # Role selection popup
│   └── ProtectedRoute/
│       └── ProtectedRoute.jsx   # Protected route component
├── pages/
│   ├── Login/
│   │   └── Login.jsx            # Login page with Firebase auth
│   ├── Registration/
│   │   └── Register.jsx         # Register page with role selection
│   └── Dashboard/
│       ├── Dashboard.jsx        # Main dashboard router
│       ├── UserDashboard.jsx    # User dashboard
│       ├── CreatorDashboard.jsx # Creator dashboard
│       └── AdminDashboard.jsx   # Admin dashboard
├── utils/
│   └── api.js                   # API configuration and axios instance
└── firebase/
    └── firebase.config.js       # Firebase configuration
```

## Usage Flow

1. **New User Registration**:
   - User signs up with email/password or Google
   - Role selection modal appears
   - User chooses "Join Contests" (user) or "Create Contests" (creator)
   - Role is updated in backend
   - User is redirected to appropriate dashboard

2. **Existing User Login**:
   - User signs in with email/password or Google
   - JWT token is obtained from backend
   - User is redirected to their dashboard based on role

3. **Dashboard Access**:
   - User dashboard: Shows participations and contest history
   - Creator dashboard: Shows created contests and allows management
   - Admin dashboard: Shows platform stats and pending approvals

## Notes

- The role selection modal only appears for new signups
- Users can change their role later through the backend API
- All API calls include JWT token in Authorization header
- Token is stored in localStorage and automatically included in requests
- Token expiration is handled by API interceptors

