import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../utils/api';
import { Users, Calendar, CheckCircle, XCircle, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalContests: 0,
    pendingContests: 0,
    confirmedContests: 0,
  });
  const [pendingContests, setPendingContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch users
      const usersResponse = await api.get('/users?page=1&limit=1');
      setStats(prev => ({ ...prev, totalUsers: usersResponse.data.total || 0 }));
      
      // Fetch contests
      const contestsResponse = await api.get('/contests');
      const allContests = contestsResponse.data;
      const pending = allContests.filter(c => c.status === 'pending');
      const confirmed = allContests.filter(c => c.status === 'confirmed');
      
      setStats(prev => ({
        ...prev,
        totalContests: allContests.length,
        pendingContests: pending.length,
        confirmedContests: confirmed.length,
      }));
      
      setPendingContests(pending);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveContest = async (contestId) => {
    try {
      await api.patch(`/contests/${contestId}/status`, { status: 'confirmed' });
      toast.success('Contest approved successfully');
      fetchDashboardData();
    } catch (error) {
      console.error('Error approving contest:', error);
      toast.error(error.response?.data?.message || 'Failed to approve contest');
    }
  };

  const handleRejectContest = async (contestId) => {
    if (!window.confirm('Are you sure you want to reject this contest?')) return;
    
    try {
      await api.delete(`/contests/${contestId}`);
      toast.success('Contest rejected and deleted');
      fetchDashboardData();
    } catch (error) {
      console.error('Error rejecting contest:', error);
      toast.error(error.response?.data?.message || 'Failed to reject contest');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a37d8]"></div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-[#4a37d8]" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <p className="text-gray-600">Manage users, contests, and platform settings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
              </div>
              <div className="p-3 bg-[#4a37d8]/10 rounded-lg">
                <Users className="h-6 w-6 text-[#4a37d8]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Contests</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalContests}</p>
              </div>
              <div className="p-3 bg-[#6928d9]/10 rounded-lg">
                <Calendar className="h-6 w-6 text-[#6928d9]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Approval</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pendingContests}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <XCircle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Confirmed</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.confirmedContests}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Pending Contests */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Pending Contests Approval</h2>
          </div>
          
          {pendingContests.length === 0 ? (
            <div className="p-12 text-center">
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <p className="text-gray-600">No pending contests to review</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {pendingContests.map((contest) => (
                <div key={contest._id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {contest.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {contest.shortDescription}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Creator: {contest.creatorId?.name || 'Unknown'}</span>
                        <span>Deadline: {new Date(contest.deadline).toLocaleDateString()}</span>
                        <span>Prize: ${contest.prizeMoney}</span>
                        <span>Type: {contest.contestType}</span>
                      </div>
                    </div>
                    <div className="ml-4 flex items-center gap-2">
                      <button
                        onClick={() => handleApproveContest(contest._id)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectContest(contest._id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

