import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Root from '../Root/Root';
import Home from '../pages/Home/Home';
import ErrorPage from '../pages/Error/ErrorPage';
import AllContests from '../pages/AllContests/AllContests';
import Login from '../pages/Login/Login';
import Register from '../pages/Registration/Register';
import About from '../pages/About/About';
import Leaderboard from '../pages/Leaderboard/Leaderboard';
import SupportTeam from '../pages/SupportTeam/SupportTeam';
import Dashboard from '../pages/Dashboard/Dashboard';
import AddContest from '../pages/Dashboard/AddContest';
import Payment from '../pages/Payment/Payment';
import ManageUsers from '../pages/Dashboard/ManageUsers';
import ManageContests from '../pages/Dashboard/ManageContests';
import PaymentHistory from '../pages/Dashboard/PaymentHistory';
import ManagePayments from '../pages/Dashboard/ManagePayments';
import WinningContests from '../pages/Dashboard/WinningContests';
import MyProfile from '../pages/Dashboard/MyProfile';
import CreatorMyContests from '../pages/Dashboard/CreatorMyContests';
import CreatorSubmissions from '../pages/Dashboard/CreatorSubmissions';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import ContestDetails from '../pages/ContestDetails/ContestDetails';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        index: true,
        Component: Home,
      },
      {
        path: 'all-contests',
        Component: AllContests,
      },
      {
        path: 'contest-details/:id',
        Component: ContestDetails,
      },
      {
        path:'about',
        Component: About
      },
      {
        path:'leaderboard',
        Component: Leaderboard
      },
      {
        path: 'support-team',
        Component: SupportTeam
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'contests/create',
        element: (
          <ProtectedRoute>
            <AddContest />
          </ProtectedRoute>
        ),
      },
      {
        path: 'payment',
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: 'dashboard/users',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <ManageUsers />
          </ProtectedRoute>
        ),
      },
      {
        path: 'dashboard/contests',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <ManageContests />
          </ProtectedRoute>
        ),
      },
      {
        path: 'dashboard/payment-history',
        element: (
          <ProtectedRoute allowedRoles={['creator']}>
            <PaymentHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: 'dashboard/my-contests',
        element: (
          <ProtectedRoute allowedRoles={['creator']}>
            <CreatorMyContests />
          </ProtectedRoute>
        ),
      },
      {
        path: 'dashboard/submitted',
        element: (
          <ProtectedRoute allowedRoles={['creator']}>
            <CreatorSubmissions />
          </ProtectedRoute>
        ),
      },
      {
        path: 'dashboard/payments',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <ManagePayments />
          </ProtectedRoute>
        ),
      },
      {
        path: 'dashboard/winning',
        element: (
          <ProtectedRoute allowedRoles={['user']}>
            <WinningContests />
          </ProtectedRoute>
        ),
      },
      {
        path: 'dashboard/profile',
        element: (
          <ProtectedRoute allowedRoles={['user', 'creator', 'admin']}>
            <MyProfile />
          </ProtectedRoute>
        ),
      },
    ]
  },
]);
