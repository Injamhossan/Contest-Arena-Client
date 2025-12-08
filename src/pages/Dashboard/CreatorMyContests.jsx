import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { Edit, Trash2, Eye, PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';

const CreatorMyContests = () => {
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        fetchMyContests();
    }, []);

    const fetchMyContests = async () => {
        try {
            setLoading(true);
            const response = await api.get('/contests/my-created');
            if (response.data.success) {
                setContests(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching my contests:', error);
            // toast.error('Failed to load contests');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (contestId) => {
        if (!window.confirm('Are you sure you want to delete this contest?')) return;

        try {
            await api.delete(`/contests/${contestId}`);
            toast.success('Contest deleted successfully');
            setContests(contests.filter(c => c._id !== contestId));
        } catch (error) {
            console.error('Error deleting contest:', error);
            toast.error(error.response?.data?.message || 'Failed to delete contest');
        }
    };

    if (loading) {
        return (
             <DashboardLayout>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4a37d8]"></div>
                </div>
             </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center flex-wrap gap-4">
                    <h2 className="text-xl font-bold text-gray-900">My Contests</h2>
                    <Link 
                        to="/contests/create" 
                        className="flex items-center gap-2 px-4 py-2 bg-[#4a37d8] text-white rounded-lg hover:bg-[#3b2db0] transition-colors font-medium text-sm"
                    >
                        <PlusCircle className="w-4 h-4" />
                        Add New Contest
                    </Link>
                </div>
                
                {contests.length === 0 ? (
                    <div className="p-12 text-center h-64 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Eye className="h-8 w-8 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No contests created yet</h3>
                        <p className="text-gray-500 mt-1">Start by creating your first contest!</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contest Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {contests.map((contest) => (
                                    <tr key={contest._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 shrink-0">
                                                    <img className="h-10 w-10 rounded-lg object-cover" src={contest.image} alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{contest.name}</div>
                                                    <div className="text-xs text-gray-500">Deadline: {new Date(contest.deadline).toLocaleDateString()}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 uppercase">
                                                {contest.contestType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            ${contest.price}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                contest.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {contest.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                {contest.status === 'pending' && (
                                                    <>
                                                        <Link 
                                                            to={`/dashboard/update-contest/${contest._id}`}
                                                            className="text-indigo-600 hover:text-indigo-900 p-1 hover:bg-indigo-50 rounded"
                                                            title="Edit"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </Link>
                                                        <button 
                                                            onClick={() => handleDelete(contest._id)}
                                                            className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                                {contest.status === 'confirmed' && (
                                                     <Link 
                                                        to={`/contests/${contest._id}`} 
                                                        className="text-gray-400 hover:text-gray-600 p-1"
                                                        title="View"
                                                     >
                                                        <Eye className="w-4 h-4" />
                                                     </Link>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default CreatorMyContests;
