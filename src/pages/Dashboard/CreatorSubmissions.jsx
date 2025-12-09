import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Download, ExternalLink, Calendar, User } from 'lucide-react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import toast from 'react-hot-toast';

const CreatorSubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            setLoading(true);
            const response = await api.get('/participations/my-received');
            if (response.data.success) {
                setSubmissions(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching submissions:', error);
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

    const handleDeclareWinner = async (contestId, winnerUserId, winnerName) => {
        try {
            const response = await api.patch(`/contests/${contestId}/winner`, { winnerUserId });
            if (response.data.success) {
                // toast.success(`Winner declared: ${winnerName}`); // toast not imported but used in other files, assuming global or passed? 
                // Wait, toast is not imported in this file. I need to import it.
                // For now, I'll allow the user to add import if needed or simple alert, but I should probably add import.
                // Assuming I will add import in separate step or use window.alert if needed, but better to fetch again.
                fetchSubmissions();
            }
        } catch (error) {
            console.error('Error declaring winner:', error);
            toast.error(error.response?.data?.message || 'Failed to declare winner');
        }
    };

    return (
        <DashboardLayout>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* ... existing headers ... */}
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">Submitted Contests</h2>
                    <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        Total Submissions: {submissions.length}
                    </span>
                </div>
                
                {submissions.length === 0 ? (
                    <div className="p-12 text-center h-64 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Download className="h-8 w-8 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No submissions yet</h3>
                        <p className="text-gray-500 mt-1">Wait for users to join your contests!</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participant</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contest</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission Link</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {submissions.map((item) => {
                                    const contest = item.contestId || {};
                                    const isWinnerDeclared = !!contest.winnerUserId;
                                    const isThisWinner = contest.winnerUserId === item.userId?._id;
                                    const isDeadlinePassed = new Date() > new Date(contest.deadline);
                                    
                                    return (
                                    <tr key={item._id} className={`hover:bg-gray-50 transition-colors ${isThisWinner ? 'bg-green-50/50' : ''}`}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                                                    {item.userId?.photoURL ? (
                                                        <img src={item.userId.photoURL} alt="" className="h-full w-full object-cover" />
                                                    ) : (
                                                        <User className="h-4 w-4 text-gray-500" />
                                                    )}
                                                </div>
                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-gray-900">{item.userName}</div>
                                                    <div className="text-xs text-gray-500">{item.userEmail}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-gray-900">{contest.name}</span>
                                                <span className="text-xs text-gray-500">{isWinnerDeclared ? (isThisWinner ? 'Winner' : 'Winner Declared') : 'Pending Winner'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {item.submissionLink ? (
                                                <a 
                                                    href={item.submissionLink} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1 text-[#4a37d8] hover:underline text-sm"
                                                >
                                                    View Submission <ExternalLink className="w-3 h-3" />
                                                </a>
                                            ) : (
                                                <span className="text-gray-400 text-sm italic">Pending</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            {isThisWinner ? (
                                                <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    🏆 Winner
                                                </span>
                                            ) : !isWinnerDeclared ? (
                                                <div className="tooltip" data-tip={!isDeadlinePassed ? "Wait for contest deadline" : "Select as Winner"}>
                                                    <button
                                                        disabled={!isDeadlinePassed}
                                                        onClick={() => handleDeclareWinner(contest._id, item.userId._id, item.userName)}
                                                        className={`btn btn-xs ${!isDeadlinePassed ? 'btn-disabled bg-gray-300 text-gray-500' : 'bg-yellow-500 hover:bg-yellow-600 text-white border-none'}`}
                                                    >
                                                        Select Winner
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-gray-400">-</span>
                                            )}
                                        </td>
                                    </tr>
                                )})}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default CreatorSubmissions;
