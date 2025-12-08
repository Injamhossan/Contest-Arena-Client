import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../utils/api';
import { Plus, Calendar, Users, DollarSign, CheckCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import EditProfileModal from '../../components/Dashboard/EditProfileModal';

const CreatorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [stats, setStats] = useState({
    totalContests: 0,
    pendingContests: 0,
    confirmedContests: 0,
    totalParticipants: 0,
  });

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    try {
      setLoading(true);
      // Fetch specifically the creator's contests
      const response = await api.get('/contests/my-created?limit=100');
      const myContests = response.data.data || [];
      setContests(myContests);
      
      // Calculate stats
      const pending = myContests.filter(c => c.status === 'pending').length;
      const confirmed = myContests.filter(c => c.status === 'confirmed').length;
      
      // Get total participants from the contest object directly (avoiding N+1 API calls)
      const totalParticipants = myContests.reduce((sum, contest) => sum + (contest.participantsCount || 0), 0);
      
      setStats({
        totalContests: response.data.pagination?.total || myContests.length,
        pendingContests: pending,
        confirmedContests: confirmed,
        totalParticipants: totalParticipants,
      });
    } catch (error) {
      console.error('Error fetching contests:', error);
      // toast.error('Failed to load contests');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContest = async (contestId) => {
    if (!window.confirm('Are you sure you want to delete this contest?')) return;
    
    try {
      await api.delete(`/contests/${contestId}`);
      toast.success('Contest deleted successfully');
      fetchContests();
    } catch (error) {
      console.error('Error deleting contest:', error);
      toast.error(error.response?.data?.message || 'Failed to delete contest');
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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Creator Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your contests and participants</p>
          </div>
          <div className="flex gap-3">
             <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
            >
              Edit Profile
            </button>
            <button
                onClick={() => navigate('/contests/create')}
                className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-[#4a37d8] to-[#6928d9] text-white rounded-lg hover:from-[#3b2db0] hover:to-[#5722b5] transition-all"
            >
                <Plus className="h-5 w-5" />
                Create Contest
            </button>
          </div>
        </div>
        
        <EditProfileModal 
            isOpen={isEditModalOpen} 
            onClose={() => setIsEditModalOpen(false)} 
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Contests</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalContests}</p>
              </div>
              <div className="p-3 bg-[#4a37d8]/10 rounded-lg">
                <Calendar className="h-6 w-6 text-[#4a37d8]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pendingContests}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
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

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Participants</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalParticipants}</p>
              </div>
              <div className="p-3 bg-[#6928d9]/10 rounded-lg">
                <Users className="h-6 w-6 text-[#6928d9]" />
              </div>
            </div>
          </div>
        </div>

        {/* Contests List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">My Contests</h2>
          </div>
          
          {contests.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">You haven't created any contests yet</p>
              <button
                onClick={() => navigate('/contests/create')}
                className="inline-block px-6 py-3 bg-linear-to-r from-[#4a37d8] to-[#6928d9] text-white rounded-lg hover:from-[#3b2db0] hover:to-[#5722b5] transition-all"
              >
                Create Your First Contest
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {contests.map((contest) => (
                <div key={contest._id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {contest.name}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          contest.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800'
                            : contest.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {contest.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {contest.shortDescription}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Deadline: {new Date(contest.deadline).toLocaleDateString()}</span>
                        <span>Prize: ${contest.prizeMoney}</span>
                        <span>Participations: {contest.participantsCount || 0}</span>
                      </div>
                    </div>
                    <div className="ml-4 flex items-center gap-2">
                      <a
                        href={`/contests/${contest._id}`}
                        className="px-4 py-2 text-sm font-medium text-[#4a37d8] hover:text-[#3b2db0] transition-colors"
                      >
                        View
                      </a>
                      {contest.status === 'pending' && (
                        <button
                          onClick={() => handleDeleteContest(contest._id)}
                          className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      )}
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

export default CreatorDashboard;

