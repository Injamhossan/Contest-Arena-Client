import { StrictMode } from 'react'
import './index.css'

import { router } from './routes/Routes.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from 'react-hot-toast';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';



import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

import { ThemeProvider } from './contexts/ThemeContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
          <ToastContainer position="top-right" autoClose={2000} />
          <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)



