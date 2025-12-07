import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../utils/api';
import { Trophy, Calendar, Award, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';

const UserDashboard = () => {
  const { user } = useAuth();
  const [participations, setParticipations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalParticipations: 0,
    activeContests: 0,
    wins: 0,
  });

  useEffect(() => {
    fetchParticipations();
  }, []);

  const fetchParticipations = async () => {
    try {
      setLoading(true);
      const response = await api.get('/participations/me?sort=deadline');
      setParticipations(response.data);
      
      // Calculate stats
      const active = response.data.filter(p => 
        new Date(p.contest?.deadline) > new Date() && p.status !== 'winner'
      ).length;
      
      const wins = response.data.filter(p => p.status === 'winner').length;
      
      setStats({
        totalParticipations: response.data.length,
        activeContests: active,
        wins: wins,
      });
    } catch (error) {
      console.error('Error fetching participations:', error);
      toast.error('Failed to load participations');
    } finally {
      setLoading(false);
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name || 'User'}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Participations</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalParticipations}</p>
              </div>
              <div className="p-3 bg-[#4a37d8]/10 rounded-lg">
                <Trophy className="h-6 w-6 text-[#4a37d8]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Contests</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeContests}</p>
              </div>
              <div className="p-3 bg-[#6928d9]/10 rounded-lg">
                <Calendar className="h-6 w-6 text-[#6928d9]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Wins</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.wins}</p>
              </div>
              <div className="p-3 bg-[#f59f0a]/10 rounded-lg">
                <Award className="h-6 w-6 text-[#f59f0a]" />
              </div>
            </div>
          </div>
        </div>

        {/* Participations List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">My Participations</h2>
          </div>
          
          {participations.length === 0 ? (
            <div className="p-12 text-center">
              <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">You haven't joined any contests yet</p>
              <a
                href="/all-contests"
                className="inline-block px-6 py-3 bg-gradient-to-r from-[#4a37d8] to-[#6928d9] text-white rounded-lg hover:from-[#3b2db0] hover:to-[#5722b5] transition-all"
              >
                Browse Contests
              </a>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {participations.map((participation) => (
                <div key={participation._id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {participation.contest?.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {participation.contest?.shortDescription}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-sm text-gray-500">
                          Deadline: {new Date(participation.contest?.deadline).toLocaleDateString()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          participation.status === 'winner' 
                            ? 'bg-green-100 text-green-800'
                            : new Date(participation.contest?.deadline) > new Date()
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {participation.status === 'winner' ? 'Winner' : 
                           new Date(participation.contest?.deadline) > new Date() ? 'Active' : 'Ended'}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <a
                        href={`/contests/${participation.contest?._id}`}
                        className="px-4 py-2 text-sm font-medium text-[#4a37d8] hover:text-[#3b2db0] transition-colors"
                      >
                        View Details
                      </a>
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

export default UserDashboard;

