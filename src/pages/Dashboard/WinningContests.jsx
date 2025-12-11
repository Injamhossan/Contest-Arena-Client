import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Trophy, Calendar } from 'lucide-react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const WinningContests = () => {
    const [winningContests, setWinningContests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWinningContests();
    }, []);

    const fetchWinningContests = async () => {
        try {
            setLoading(true);
            const response = await api.get('/participations/me');
            if (response.data.success) {
                const wins = response.data.data.filter(p => p.contestId.winnerUserId === p.userId);
                setWinningContests(wins);
            }
        } catch (error) {
            console.error('Error fetching winning contests:', error);
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
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Winning Contests</h2>
                    <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs font-semibold px-2.5 py-0.5 rounded">
                        Total Wins: {winningContests.length}
                    </span>
                </div>
                
                {winningContests.length === 0 ? (
                    <div className="p-12 text-center h-64 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                            <Trophy className="h-8 w-8 text-gray-300 dark:text-gray-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No wins yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Keep participating to win awesome prizes!</p>
                        <a href="/all-contests" className="mt-4 text-[#4a37d8] dark:text-[#6f5ee8] font-medium hover:underline">
                            Browse Contests
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {winningContests.map((item) => (
                            <div key={item._id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-md transition-shadow group">
                                <div className="h-48 overflow-hidden relative">
                                    <img 
                                        src={item.contest?.image} 
                                        alt={item.contest?.name} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                                        <Trophy className="w-3 h-3" />
                                        WINNER
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{item.contest?.name}</h3>
                                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {new Date(item.contest?.deadline).toLocaleDateString()}
                                    </div>
                                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Prize Won</span>
                                        <span className="font-bold text-amber-600 dark:text-amber-400 text-lg">${item.contest?.prizeMoney}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default WinningContests;
