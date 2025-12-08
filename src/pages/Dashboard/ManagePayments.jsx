import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { CreditCard, Calendar, CheckCircle, XCircle, Clock, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const ManagePayments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            setLoading(true);
            const response = await api.get('/payments');
            setPayments(response.data.data || []);
        } catch (error) {
            console.error('Error fetching payments:', error);
            // toast.error('Failed to load payments');
        } finally {
            setLoading(false);
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
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">All Payments</h2>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        Total: {payments.length}
                    </span>
                </div>
                
                {payments.length === 0 ? (
                    <div className="p-12 text-center h-64 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <CreditCard className="h-8 w-8 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No payments found</h3>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contest</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {payments.map((payment) => {
                                    const isCreationFee = payment.userId?._id === payment.contestId?.creatorId;
                                    return (
                                    <tr key={payment._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{payment.userId?.name || 'Unknown'}</div>
                                            <div className="text-xs text-gray-500">{payment.userId?.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{payment.contestId?.name || 'Deleted Contest'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                isCreationFee ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                                            }`}>
                                                {isCreationFee ? 'Creation Fee' : 'Participation'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-900">${payment.amount}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                payment.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' : 
                                                payment.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {payment.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                                            {new Date(payment.createdAt).toLocaleDateString()}
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

export default ManagePayments;
