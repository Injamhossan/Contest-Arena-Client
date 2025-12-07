import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Trophy, Users, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const RoleSelectionModal = ({ isOpen, onClose }) => {
  const { updateUserRole, user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = async (role) => {
    if (!user?._id) {
      toast.error('User not found. Please try again.');
      return;
    }

    setLoading(true);
    try {
      await updateUserRole(role);
      onClose();
      // Refresh the page to update dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error updating role:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Choose Your Path
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Are you here to join contests or create them?
        </p>

        <div className="space-y-4">
          {/* User/Contestant Option */}
          <button
            onClick={() => handleRoleSelect('user')}
            disabled={loading}
            className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-[#4a37d8] hover:bg-[#4a37d8]/5 transition-all duration-200 text-left group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#4a37d8]/10 rounded-lg group-hover:bg-[#4a37d8] transition-colors">
                <Trophy className="h-6 w-6 text-[#4a37d8] group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg">Join Contests</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Participate in contests and compete for prizes
                </p>
              </div>
            </div>
          </button>

          {/* Creator Option */}
          <button
            onClick={() => handleRoleSelect('creator')}
            disabled={loading}
            className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-[#6928d9] hover:bg-[#6928d9]/5 transition-all duration-200 text-left group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#6928d9]/10 rounded-lg group-hover:bg-[#6928d9] transition-colors">
                <Users className="h-6 w-6 text-[#6928d9] group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg">Create Contests</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Host contests and find talented participants
                </p>
              </div>
            </div>
          </button>
        </div>

        {loading && (
          <div className="mt-4 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#4a37d8]"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleSelectionModal;

