
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award } from 'lucide-react';
import api from '../../utils/api';

import { useQuery } from '@tanstack/react-query';

const RecentWinners = () => {
    const { data: winners = [], isLoading: loading } = useQuery({
        queryKey: ['recentWinners'],
        queryFn: async () => {
            const response = await api.get('/contests/winners/recent?limit=6');
            if (response.data.success) {
                return response.data.data;
            }
            return [];
        }
    });

    if (loading) {
        return <div className="py-20 text-center">Loading recent winners...</div>;
    }

    return (
        <section className="py-20 px-4 bg-white dark:bg-base-100 relative overflow-hidden">
             {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-5%] right-[-5%] w-[300px] h-[300px] bg-yellow-100/50 dark:bg-yellow-900/10 rounded-full blur-[80px]" />
                <div className="absolute bottom-[-5%] left-[-5%] w-[300px] h-[300px] bg-purple-100/50 dark:bg-purple-900/10 rounded-full blur-[80px]" />
            </div>

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="text-center mb-16">
                     <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-full text-sm font-bold mb-4 border border-yellow-100 dark:border-yellow-900/30">
                        <Trophy size={16} />
                        Recent Winners
                    </div>
                    <h2 className="text-4xl font-bold font-urbanist mb-4 text-gray-900 dark:text-white">Celebrating Excellence</h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                        Meet our recent champions who showcased exceptional talent and creativity
                    </p>
                </div>

                {winners.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {winners.map((contest, index) => (
                            <motion.div 
                                key={contest._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-white dark:bg-base-200 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-yellow-600" />
                                
                                <div className="p-8 text-center">
                                    <div className="relative w-24 h-24 mx-auto mb-6">
                                        <div className="w-full h-full rounded-full p-1 bg-gradient-to-br from-yellow-300 to-yellow-500">
                                            {contest.winnerUserId?.photoURL ? (
                                                <img 
                                                    src={contest.winnerUserId.photoURL} 
                                                    alt={contest.winnerUserId.name} 
                                                    className="w-full h-full rounded-full object-cover border-4 border-white"
                                                />
                                            ) : (
                                                 <div className="w-full h-full rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold text-2xl border-4 border-white">
                                                    {contest.winnerUserId?.name?.substring(0, 1).toUpperCase() || 'W'}
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-md">
                                            <div className="bg-yellow-500 rounded-full p-1.5 text-white">
                                                <Trophy size={14} />
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                        {contest.winnerUserId?.name || 'Unknown Winner'}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium flex items-center justify-center gap-1">
                                         <Award size={14} className="text-blue-500"/> 
                                         Won: <span className="text-blue-600 dark:text-blue-400">{contest.name}</span>
                                    </p>
                                    
                                    <div className="pt-4 border-t border-gray-100">
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Prize Won</div>
                                        <div className="text-2xl font-bold text-yellow-500">${contest.prizeMoney}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                     <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <Trophy size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500 text-lg">No winners announced yet. Be the first champion!</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default RecentWinners;
