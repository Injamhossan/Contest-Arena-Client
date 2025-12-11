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
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden mb-8">
                    <div className="h-32 bg-linear-to-r from-[#4a37d8] to-[#3b2cb8]"></div>
                    <div className="px-8 pb-8">
                        <div className="relative flex justify-between items-end -mt-12 mb-6">
                            <div className="relative">
                                <img 
                                    src={user?.photoURL || "https://ui-avatars.com/api/?name=" + user?.name} 
                                    alt={user?.name}
                                    className="w-32 h-32 rounded-2xl object-cover border-4 border-white dark:border-gray-900 shadow-md"
                                />
                            </div>
                            <button 
                                onClick={() => setIsEditModalOpen(true)}
                                className="mb-2 flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
                            >
                                <Settings className="w-4 h-4" />
                                Edit Profile
                            </button>
                        </div>
                        
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user?.name}</h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-1 capitalize">{user?.role}</p>
                            {user?.bio && (
                                <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl">{user.bio}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                                    <Mail className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 uppercase font-semibold">Email Address</p>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.email}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                                <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center shrink-0">
                                    <MapPin className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 uppercase font-semibold">Location</p>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.address || 'Not set'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                                <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center shrink-0">
                                    <Calendar className="w-5 h-5 text-green-500 dark:text-green-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 uppercase font-semibold">Joined</p>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Account Status</h3>
                        {/* Placeholder for future extended stats or account settings */}
                        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Account Type</span>
                                <span className="text-xs font-bold px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded uppercase">{user?.role}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</span>
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
