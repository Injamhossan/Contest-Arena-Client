import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Trash2, CheckCircle, XCircle, Eye, Calendar, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const ManageContests = () => {
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);

    const [payments, setPayments] = useState([]);

    useEffect(() => {
        fetchContests();
        fetchPayments();
    }, []);

    const fetchContests = async () => {
        try {
            setLoading(true);
            const response = await api.get('/contests');
            setContests(response.data.data || []);
        } catch (error) {
            console.error('Error fetching contests:', error);
            // toast.error('Failed to load contests');
        } finally {
            setLoading(false);
        }
    };

    const fetchPayments = async () => {
        try {
            const response = await api.get('/payments');
            setPayments(response.data.data || []);
        } catch (error) {
            console.error('Error fetching payments:', error);
        }
    };

    const getPaymentStatus = (contestId) => {
        const payment = payments.find(p => p.contestId?._id === contestId || p.contestId === contestId);
        return payment?.paymentStatus === 'completed' ? 'Paid' : 'Unpaid';
    };

    const handleConfirm = async (contestId) => {
        const paymentStatus = getPaymentStatus(contestId);
        if (paymentStatus !== 'Paid') {
            toast.error('Cannot confirm unpaid contest');
            return;
        }

        try {
            await api.patch(`/contests/${contestId}/status`, { status: 'confirmed' });
            toast.success('Contest confirmed');
            fetchContests();
        } catch (error) {
            console.error('Error confirming contest:', error);
            toast.error('Failed to confirm contest');
        }
    };

    const handleDelete = async (contestId) => {
        if(!window.confirm('Are you sure you want to delete this contest?')) return;
        try {
            await api.delete(`/contests/${contestId}`);
            toast.success('Contest deleted');
            fetchContests();
        } catch (error) {
            console.error('Error deleting contest:', error);
            toast.error('Failed to delete contest');
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
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden transition-colors duration-300">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Manage Contests</h2>
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 text-xs font-semibold px-2.5 py-0.5 rounded">
                        Total: {contests.length}
                    </span>
                </div>
                
                {contests.length === 0 ? (
                    <div className="p-12 text-center h-64 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                            <Calendar className="h-8 w-8 text-gray-300 dark:text-gray-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No contest create yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Wait for creators to submit new contests.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contest Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Creator</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price / Prize</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Payment</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                                {contests.map((contest) => {
                                    const paymentStatus = getPaymentStatus(contest._id);
                                    return (
                                    <tr key={contest._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 shrink-0 rounded-lg overflow-hidden">
                                                    <img className="h-10 w-10 object-cover" src={contest.image} alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{contest.name}</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">{contest.contestType}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 dark:text-white">{contest.creatorId?.name || "Unknown"}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{contest.creatorId?.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 dark:text-white font-medium">${contest.price}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">Prize: ${contest.prizeMoney}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                contest.status === 'confirmed' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' : 
                                                'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                                            }`}>
                                                {contest.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                paymentStatus === 'Paid' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' : 
                                                'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                                            }`}>
                                                {paymentStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                {contest.status === 'pending' && (
                                                    <button 
                                                        onClick={() => handleConfirm(contest._id)}
                                                        disabled={paymentStatus !== 'Paid'}
                                                        className={`p-1 rounded transition-colors ${
                                                            paymentStatus === 'Paid' 
                                                            ? 'text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30' 
                                                            : 'text-gray-400 dark:text-gray-600 cursor-not-allowed bg-gray-100 dark:bg-gray-800'
                                                        }`}
                                                        title={paymentStatus === 'Paid' ? "Confirm" : "Payment Required"}
                                                    >
                                                        <CheckCircle className="w-5 h-5" />
                                                    </button>
                                                )}
                                                <button 
                                                    onClick={() => handleDelete(contest._id)}
                                                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 p-1 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default ManageContests;
