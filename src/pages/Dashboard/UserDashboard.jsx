import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../utils/api';
import { Trophy, Calendar, Award, Target, Eye, Upload, Settings, TrendingUp as TrendingUpIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import EditProfileModal from '../../components/Dashboard/EditProfileModal';
import SubmissionModal from '../../components/Dashboard/SubmissionModal';

const UserDashboard = () => {
  const { user } = useAuth();
  const [participations, setParticipations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'won'
  
  // Stats state
  const [stats, setStats] = useState({
    totalParticipations: 0,
    activeContests: 0,
    wins: 0,
    winRate: 0,
    losses: 0
  });

  useEffect(() => {
    fetchParticipations();
  }, []);

  const fetchParticipations = async () => {
    try {
      setLoading(true);
      const response = await api.get('/participations/me?sort=deadline');
      if (response.data.success) {
        const data = response.data.data;
        setParticipations(data);
        
        // Calculate stats
        const total = data.length;
        const wins = data.filter(p => p.status === 'winner').length;
        const active = data.filter(p => 
          new Date(p.contestId?.deadline) > new Date() && p.status !== 'winner'
        ).length;
        const losses = total - wins - active; // Simplistic calculation
        const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;
        
        setStats({
          totalParticipations: total,
          activeContests: active,
          wins: wins,
          winRate: winRate,
          losses: losses
        });
      }
    } catch (error) {
      console.error('Error fetching participations:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Chart Data
  const chartData = [
    { name: 'Wins', value: stats.wins },
    { name: 'Losses', value: stats.losses }, // Using losses for the chart, or remaining
  ];
  const COLORS = ['#f59f0a', '#e5e7eb']; // Amber for wins, Gray for others

  const filteredParticipations = participations.filter(p => {
    if (activeTab === 'active') {
      return new Date(p.contestId?.deadline) > new Date() && p.status !== 'winner'; // Show current active ones
    }
    return p.status === 'winner';
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a37d8]"></div>
      </div>
    );
  }

  return (
    <div className="pb-12">
      {/* Top Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img 
                  src={user?.photoURL || "https://ui-avatars.com/api/?name=" + user?.name} 
                  alt={user?.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-gray-50 shadow-sm"
                />
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
                <p className="text-gray-500 text-sm mt-1">
                  Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors border border-gray-200"
              >
                <Settings className="w-4 h-4" />
                Edit Profile
              </button>
              <a 
                href="/all-contests"
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white font-bold rounded-lg hover:from-cyan-500 hover:to-cyan-600 transition-all shadow-md shadow-cyan-400/20"
              >
                + JOIN CONTEST
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Participated */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-blue-50 rounded-xl group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-blue-500" />
              </div>
              <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">
                All Time
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold text-gray-900">{stats.totalParticipations}</h3>
              <p className="text-gray-500 text-sm font-medium mt-1">Contests Participated</p>
            </div>
          </div>

          {/* Wins */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-amber-50 rounded-xl group-hover:scale-110 transition-transform">
                <Trophy className="w-6 h-6 text-amber-500" />
              </div>
              <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-full">
                Champion
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold text-gray-900">{stats.wins}</h3>
              <p className="text-gray-500 text-sm font-medium mt-1">Total Wins</p>
            </div>
          </div>

          {/* Win Rate */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-green-50 rounded-xl group-hover:scale-110 transition-transform">
                <TrendingUpIcon className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold text-gray-900">{stats.winRate}%</h3>
              <p className="text-gray-500 text-sm font-medium mt-1">Win Rate</p>
            </div>
          </div>

          {/* Active Contests */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-rose-50 rounded-xl group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6 text-rose-500" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold text-gray-900">{stats.activeContests}</h3>
              <p className="text-gray-500 text-sm font-medium mt-1">Active Contests</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Win Statistics Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Win Statistics</h3>
            <p className="text-sm text-gray-500 mb-6">Your overall performance</p>
            
            <div className="h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              {/* Centered Text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 {/* Optional: Add text in center manually if not using Recharts Label */}
              </div>
            </div>
            
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#f59f0a]"></span>
                <span className="text-sm text-gray-600">Wins ({stats.wins})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gray-200"></span>
                <span className="text-sm text-gray-600">Losses ({stats.losses})</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contests List */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">My Contests</h3>
                <p className="text-sm text-gray-500">Contests you're participating in</p>
              </div>
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('active')}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                    activeTab === 'active' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setActiveTab('won')}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                    activeTab === 'won' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Won
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredParticipations.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">No contests found</h3>
                  <p className="text-gray-500 mt-1">You don't have any {activeTab} contests yet.</p>
                  {activeTab === 'active' && (
                    <a
                      href="/all-contests"
                      className="inline-block mt-4 text-[#4a37d8] font-medium hover:underline"
                    >
                      Browse Contests
                    </a>
                  )}
                </div>
              ) : (
                filteredParticipations.map((item) => (
                  <div key={item._id} className="group flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.contestId?.image} 
                          alt={item.contestId?.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 group-hover:text-[#4a37d8] transition-colors line-clamp-1">
                          {item.contestId?.name}
                        </h4>
                        <span className="inline-block px-2 py-0.5 mt-1 bg-gray-200 text-gray-600 text-xs font-medium rounded">
                          {item.contestId?.contestType}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <a
                        href={`/contests/${item.contestId?._id}`}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </a>
                      {activeTab === 'active' && (
                        <button
                          onClick={() => {
                            setSelectedSubmission(item);
                            setIsSubmissionModalOpen(true);
                          }}
                          className="p-2 text-gray-400 hover:text-[#4a37d8] hover:bg-[#4a37d8]/5 rounded-full transition-colors"
                          title="Upload Submission"
                        >
                          <Upload className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <a 
                href="/all-contests"
                className="text-sm font-bold text-gray-900 hover:text-[#4a37d8] transition-colors"
              >
                View All Contests
              </a>
            </div>
          </div>
        </div>
      </div>

      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
      />
      
      <SubmissionModal
        isOpen={isSubmissionModalOpen}
        onClose={() => {
            setIsSubmissionModalOpen(false);
            setSelectedSubmission(null);
        }}
        submission={selectedSubmission}
        onSuccess={() => {
            fetchParticipations(); // Refresh to show any status changes if we had them or just freshness
        }}
      />
    </div>
  );
};

export default UserDashboard;
