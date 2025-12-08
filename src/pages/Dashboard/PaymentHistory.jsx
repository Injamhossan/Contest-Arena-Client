import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { CreditCard, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const [activeTab, setActiveTab] = useState('participants'); // 'participants' or 'my-payments'
    
    useEffect(() => {
        fetchPayments();
    }, [activeTab]);

    const fetchPayments = async () => {
        try {
            setLoading(true);
            const endpoint = activeTab === 'participants' ? '/payments/creator-users' : '/payments/me';
            const response = await api.get(endpoint);
            setPayments(response.data.data || []);
        } catch (error) {
            console.error('Error fetching payments:', error);
            // toast.error('Failed to load payment history');
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Payment History</h2>
                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            Total: {payments.length}
                        </span>
                    </div>

                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('participants')}
                            className={`pb-3 px-4 text-sm font-medium transition-all ${
                                activeTab === 'participants' 
                                ? 'text-[#4a37d8] border-b-2 border-[#4a37d8]' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Participant Payments
                        </button>
                        <button
                            onClick={() => setActiveTab('my-payments')}
                            className={`pb-3 px-4 text-sm font-medium transition-all ${
                                activeTab === 'my-payments' 
                                ? 'text-[#4a37d8] border-b-2 border-[#4a37d8]' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            My Payments
                        </button>
                    </div>
                </div>
                
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4a37d8]"></div>
                    </div>
                ) : payments.length === 0 ? (
                    <div className="p-12 text-center h-64 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <CreditCard className="h-8 w-8 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No payments found</h3>
                        <p className="text-gray-500 mt-1">
                            {activeTab === 'participants' 
                                ? "No one has joined your contests yet." 
                                : "You haven't made any payments yet."}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {activeTab === 'participants' ? 'User' : 'Contest'}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {payments.map((payment) => (
                                    <tr key={payment._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {activeTab === 'participants' ? (
                                                <div className="flex items-center">
                                                    <div className="h-8 w-8 flex-shrink-0 rounded-full overflow-hidden bg-gray-100">
                                                        {payment.userId?.photoURL ? (
                                                            <img className="h-8 w-8 object-cover" src={payment.userId.photoURL} alt="" />
                                                        ) : (
                                                            <div className="h-full w-full flex items-center justify-center font-bold text-gray-500">
                                                                {payment.userId?.name?.charAt(0) || 'U'}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="ml-3">
                                                        <div className="text-sm font-medium text-gray-900">{payment.userId?.name || 'Unknown User'}</div>
                                                        <div className="text-xs text-gray-500">{payment.contestId?.name}</div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                                        {payment.contestId?.image ? (
                                                            <img className="h-10 w-10 object-cover" src={payment.contestId.image} alt="" />
                                                        ) : (
                                                             <Calendar className="h-5 w-5 text-gray-400 m-auto mt-2" />
                                                        )}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{payment.contestId?.name || 'Deleted Contest'}</div>
                                                        <div className="text-xs text-gray-500">Fee</div>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-900">${payment.amount}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-xs font-mono bg-gray-100 px-2 py-1 rounded inline-block text-gray-600">
                                                {payment.transactionId}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                payment.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' : 
                                                payment.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {payment.paymentStatus === 'completed' && <CheckCircle className="w-3 h-3 mr-1 self-center" />}
                                                {payment.paymentStatus === 'failed' && <XCircle className="w-3 h-3 mr-1 self-center" />}
                                                {payment.paymentStatus === 'pending' && <Clock className="w-3 h-3 mr-1 self-center" />}
                                                {payment.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                                            {new Date(payment.createdAt).toLocaleDateString()}
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

export default PaymentHistory;
