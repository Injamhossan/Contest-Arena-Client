import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Settings, User, Mail, MapPin, Calendar } from 'lucide-react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import EditProfileModal from '../../components/Dashboard/EditProfileModal';

const MyProfile = () => {
    const { user } = useAuth();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                    <div className="h-32 bg-gradient-to-r from-[#4a37d8] to-[#3b2cb8]"></div>
                    <div className="px-8 pb-8">
                        <div className="relative flex justify-between items-end -mt-12 mb-6">
                            <div className="relative">
                                <img 
                                    src={user?.photoURL || "https://ui-avatars.com/api/?name=" + user?.name} 
                                    alt={user?.name}
                                    className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-md"
                                />
                            </div>
                            <button 
                                onClick={() => setIsEditModalOpen(true)}
                                className="mb-2 flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors border border-gray-200"
                            >
                                <Settings className="w-4 h-4" />
                                Edit Profile
                            </button>
                        </div>
                        
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
                            <p className="text-gray-500 mt-1 capitalize">{user?.role}</p>
                            {user?.bio && (
                                <p className="mt-4 text-gray-600 max-w-2xl">{user.bio}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Contact Information</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-gray-600">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-5 h-5 text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-semibold">Email Address</p>
                                    <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4 text-gray-600">
                                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-purple-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-semibold">Location</p>
                                    <p className="text-sm font-medium text-gray-900">{user?.address || 'Not set'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-gray-600">
                                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                                    <Calendar className="w-5 h-5 text-green-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-semibold">Joined</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Account Status</h3>
                        {/* Placeholder for future extended stats or account settings */}
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-600">Account Type</span>
                                <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded uppercase">{user?.role}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">Status</span>
                                <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded uppercase">Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <EditProfileModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
            />
        </DashboardLayout>
    );
};

export default MyProfile;
