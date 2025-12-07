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
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

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
    ]
  },
]);
