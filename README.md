# Contest Arena

**Contest Arena** is a full-stack platform designed to manage and participate in creative contests. Users can browse contests, register/pay to participate, submit their work, and win prizes. It features a role-based dashboard for Admins, Creators, and Participants.

## 🚀 Key Features

*   **User Roles & Authentication**: Secure login and registration using Firebase & JWT. Supports 3 roles:
    *   **User/Participant**: Can browse contests, pay entry fees, submit tasks, and view winning history.
    *   **Creator**: Can create contests, monitor submissions, and declare winners.
    *   **Admin**: Manages users, approves contests, and oversees platform content.
*   **Contest Management**: Browse, search, and filter contests by tags and popularity.
*   **Payment Integration**: Secure payment processing with Stripe for contest entry fees.
*   **Leaderboard**: Showcases top participants and winners.
*   **Dynamic Dashboard**: Tailored views for each user role (e.g., "My Created Contests" for Creators, "My Participations" for Users).
*   **Visuals**: Interactive UI with animations using Framer Motion and data visualization with Recharts.

---

## 🛠️ Technologies Used

### Frontend (Client)
*   **Framework**: [React](https://react.dev/) (Vite)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
*   **State & Data Fetching**: [TanStack Query](https://tanstack.com/query/latest) (React Query), [Zustand](https://zustand-demo.pmnd.rs/), Axio
*   **Authentication**: [Firebase](https://firebase.google.com/)
*   **Payments**: [Stripe.js](https://stripe.com/docs/js) & React Stripe.js
*   **Animations**: [Framer Motion](https://www.framer.com/motion/) & AOS
*   **Forms**: React Hook Form
*   **Other Tools**: React Router DOM, React Hot Toast, Recharts, Lucide React

### Backend (Server)
*   **Runtime**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
*   **Database**: [MongoDB](https://www.mongodb.com/) (using Native Driver & Mongoose)
*   **Authentication**: JSON Web Token (JWT) & Firebase Admin
*   **Payments**: Stripe SDK
*   **Security**: Helmet, CORS, Dotenv

---

## 📂 Project Structure & Components

### 1. **Pages (`/src/pages`)**
*   **Home**: Landing page featuring a Banner, Popular Contests, and Recent Winners.
*   **AllContests**: Catalog of all available contests with search and filter options.
*   **ContestDetails**: Detailed view of a specific contest (Description, Prize, Deadline) with purchase options.
*   **Leaderboard**: Displays top-performing users.
*   **Dashboard**:
    *   _Admin_: Manage Users, Manage Contests.
    *   _Creator_: Add Contest, My Created Contests, Submitted Page.
    *   _User_: My Participated Contests, Winning Contests, Profile.
*   **Payment**: Payment gateway integration page.
*   **Login & Registration**: User authentication pages.
*   **SupportTeam**: Contact or support information page.
*   **Error**: Custom 404 error page.

### 2. **Components (`/src/components`)**
*   **Shared**:
    *   `Navbar`: Responsive navigation bar with user profile dropdown.
    *   `Footer`: Application footer.
    *   `Container`: Wrapper for consistent layout width.
*   **Home**:
    *   `Banner`: Hero section with search functionality.
    *   `PopularContests`: Grid displaying top contests.
    *   `RecentWinners`: Section highlighting recent contest winners.
*   **Dashboard**:
    *   `Sidebar`: Navigation menu for the dashboard layout.
*   **Forms & Modals**:
    *   `CheckoutForm`: Stripe payment form element.
    *   `PaymentModal`: Modal for processing contest payments.
    *   `UpdateContest`: Modal/Form for creators to edit their contests.
*   **UI Elements**:
    *   `Loader`: Loading spinners.
    *   `SectionTitle`: Reusable title component for sections.

---

## ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```

2.  **Setup Backend:**
    ```bash
    cd ContestArena-Server
    npm install
    # Create a .env file with: PORT, DB_USER, DB_PASS, STRIPE_SECRET_KEY, ACCESS_TOKEN_SECRET, etc.
    npm run dev
    ```

3.  **Setup Frontend:**
    ```bash
    cd ContestArena-client
    npm install
    # Create a .env.local file if needed for Firebase config.
    npm run dev
    ```
