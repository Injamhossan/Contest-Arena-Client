import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Root from '../Root/Root';
import Home from '../pages/Home/Home';
import ErrorPage from '../pages/Error/ErrorPage';
import AllContests from '../pages/AllContests/AllContests';
import Login from '../pages/Login/Login';
import Register from '../pages/Registration/Register';
import About from '../pages/About/About';
import SupportTeam from '../pages/SupportTeam/SupportTeam';
import Leaderboard from '../pages/Leaderboard/Leaderboard';



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
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
      {
        path: 'about',
        Component: About,
      },
      {
        path: 'support-team',
        Component: SupportTeam,
      },
      {
        path: 'leaderboard',
        Component: Leaderboard,
      },
    ]
  },
]);
