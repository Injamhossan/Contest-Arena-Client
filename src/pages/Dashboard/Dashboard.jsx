import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import UserDashboard from './UserDashboard';
import CreatorDashboard from './CreatorDashboard';
import AdminDashboard from './AdminDashboard';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a37d8]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please sign in to access your dashboard</p>
          <a
            href="/login"
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#4a37d8] to-[#6928d9] text-white rounded-lg hover:from-[#3b2db0] hover:to-[#5722b5] transition-all"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  // Route to appropriate dashboard based on user role
  const getDashboard = () => {
    if (user.role === 'admin') {
      return <AdminDashboard />;
    } else if (user.role === 'creator') {
      return <CreatorDashboard />;
    } else {
      return <UserDashboard />;
    }
  };

  return (
      <DashboardLayout>
          {getDashboard()}
      </DashboardLayout>
  );
};

export default Dashboard;

