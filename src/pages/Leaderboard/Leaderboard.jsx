import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Crown, TrendingUp, Filter, Search, Star } from 'lucide-react';
import api from '../../utils/api';

import { useQuery } from '@tanstack/react-query';

const Leaderboard = () => {
    // const axiosPublic = useAxiosPublic(); // Removed
    const [filter, setFilter] = useState('all-time');
    const [searchTerm, setSearchTerm] = useState('');

    const { data: leaderboardData = [], isLoading: loading } = useQuery({
        queryKey: ['leaderboard'],
        queryFn: async () => {
            const response = await api.get('/users/leaderboard');
            if (response.data.success) {
                return response.data.data.map((user, index) => ({
                    rank: index + 1,
                    name: user.name,
                    score: user.winsCount * 100, // Derived score
                    contests: user.participationsCount || 0,
                    wins: user.winsCount,
                    avatar: user.name.substring(0, 2).toUpperCase(),
                    badge: index < 3 ? (index === 0 ? 'gold' : index === 1 ? 'silver' : 'bronze') : null,
                    photoURL: user.photoURL
                }));
            }
            return [];
        }
    });

    const filters = [
        { id: 'all-time', label: 'All Time' },
        { id: 'this-month', label: 'This Month' },
        { id: 'this-week', label: 'This Week' },
    ];

    const getRankIcon = (rank) => {
        if (rank === 1) return <Crown className="text-yellow-500" size={24} />;
        if (rank === 2) return <Medal className="text-gray-400" size={24} />;
        if (rank === 3) return <Medal className="text-amber-600" size={24} />;
        return <span className="text-gray-400 font-bold text-lg">#{rank}</span>;
    };

    const getRankBadgeColor = (rank) => {
        if (rank === 1) return 'from-yellow-400 to-yellow-600';
        if (rank === 2) return 'from-gray-300 to-gray-500';
        if (rank === 3) return 'from-amber-500 to-amber-700';
        return 'from-gray-100 to-gray-200';
    };

    const topThree = leaderboardData.slice(0, 3);
    const restOfLeaderboard = leaderboardData.slice(3);

    const filteredData = leaderboardData.filter(user =>
        user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50">
            {/* Hero Section */}
            <section className="relative py-16 px-4 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto max-w-7xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold mb-6 font-urbanist"
                        >
                            <span className="text-gray-900">Leader</span>
                            <span className="bg-linear-to-r from-[#4a37d8] via-[#6928d9] to-[#1f3092] bg-clip-text text-transparent">board</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl text-gray-600 max-w-3xl mx-auto"
                        >
                            See where you stand among the best creators in the arena
                        </motion.p>
                    </motion.div>

                    {/* Filters and Search */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center"
                    >
                        <div className="flex gap-2 bg-white/60 backdrop-blur-sm p-2 rounded-xl border border-gray-100 shadow-sm">
                            {filters.map((filterOption) => (
                                <button
                                    key={filterOption.id}
                                    onClick={() => setFilter(filterOption.id)}
                                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                                        filter === filterOption.id
                                            ? 'bg-linear-to-r from-[#4a37d8] to-[#6928d9] text-white shadow-md'
                                            : 'text-black hover:bg-gray-100'
                                    }`}
                                >
                                    {filterOption.label}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full md:w-auto">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2.5 w-full md:w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a37d8] focus:border-transparent outline-none bg-white/60 backdrop-blur-sm text-black"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Top 3 Podium */}
            <section className="py-12 px-4">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <h2 className="text-3xl font-bold text-center mb-8 font-urbanist">
                            <span className="text-gray-900">Top </span>
                            <span className="bg-linear-to-r from-[#4a37d8] to-[#6928d9] bg-clip-text text-transparent">Performers</span>
                        </h2>
                        
                        <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-6 max-w-5xl mx-auto">
                            {/* 2nd Place */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="flex-1 max-w-[200px] order-2 md:order-1"
                            >
                                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all text-center">
                                    <div className="relative mb-4">
                                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-white text-2xl font-bold mb-2 overflow-hidden">
                                            {topThree[1]?.photoURL ? <img src={topThree[1].photoURL} alt="" className="w-full h-full object-cover"/> : topThree[1]?.avatar}
                                        </div>
                                        <div className="absolute -top-2 -right-2 bg-gray-400 text-white rounded-full p-1">
                                            <Medal size={20} />
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-400 mb-1">2nd</div>
                                    <h3 className="font-bold text-gray-900 mb-1">{topThree[1]?.name}</h3>
                                    <div className="text-lg font-semibold text-gray-600 mb-2">{topThree[1]?.score.toLocaleString()}</div>
                                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                                        <span>{topThree[1]?.wins} Wins</span>
                                        <span>•</span>
                                        <span>{topThree[1]?.contests} Contests</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* 1st Place */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="flex-1 max-w-[250px] order-1 md:order-2"
                            >
                                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 border-2 border-yellow-300 shadow-2xl hover:shadow-3xl transition-all text-center relative">
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <div className="bg-yellow-500 text-white rounded-full p-2">
                                            <Crown size={24} />
                                        </div>
                                    </div>
                                    <div className="relative mb-4 mt-4">
                                        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white text-3xl font-bold mb-2 shadow-lg overflow-hidden">
                                            {topThree[0]?.photoURL ? <img src={topThree[0].photoURL} alt="" className="w-full h-full object-cover"/> : topThree[0]?.avatar}
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold text-yellow-600 mb-1">1st</div>
                                    <h3 className="font-bold text-gray-900 mb-1 text-lg">{topThree[0]?.name}</h3>
                                    <div className="text-2xl font-semibold text-yellow-600 mb-2">{topThree[0]?.score.toLocaleString()}</div>
                                    <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                                        <span className="font-semibold">{topThree[0]?.wins} Wins</span>
                                        <span>•</span>
                                        <span className="font-semibold">{topThree[0]?.contests} Contests</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* 3rd Place */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="flex-1 max-w-[200px] order-3"
                            >
                                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all text-center">
                                    <div className="relative mb-4">
                                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white text-2xl font-bold mb-2 overflow-hidden">
                                            {topThree[2]?.photoURL ? <img src={topThree[2].photoURL} alt="" className="w-full h-full object-cover"/> : topThree[2]?.avatar}
                                        </div>
                                        <div className="absolute -top-2 -right-2 bg-amber-600 text-white rounded-full p-1">
                                            <Medal size={20} />
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold text-amber-600 mb-1">3rd</div>
                                    <h3 className="font-bold text-gray-900 mb-1">{topThree[2]?.name}</h3>
                                    <div className="text-lg font-semibold text-gray-600 mb-2">{topThree[2]?.score.toLocaleString()}</div>
                                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                                        <span>{topThree[2]?.wins} Wins</span>
                                        <span>•</span>
                                        <span>{topThree[2]?.contests} Contests</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Full Leaderboard Table */}
            <section className="py-12 px-4">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg overflow-hidden"
                    >
                        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#4a37d8] to-[#6928d9]">
                            <h2 className="text-2xl font-bold text-white font-urbanist">Full Rankings</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rank</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Participant</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Score</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Wins</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Contests</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredData.map((user, index) => (
                                        <motion.tr
                                            key={user.rank}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: index * 0.05 }}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    {getRankIcon(user.rank)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getRankBadgeColor(user.rank)} flex items-center justify-center text-white font-bold text-sm shadow-md overflow-hidden`}>
                                                        {user.photoURL ? (
                                                            <img src={user.photoURL} alt={user.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            user.avatar
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900">{user.name}</div>
                                                        {user.badge && (
                                                            <div className="text-xs text-gray-500 flex items-center gap-1">
                                                                <Star size={12} className="text-yellow-500" />
                                                                Top Performer
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="font-bold text-gray-900">{user.score.toLocaleString()}</div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                    <Trophy size={14} />
                                                    {user.wins}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="text-gray-600 font-medium">{user.contests}</div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 px-4">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                            <TrendingUp className="text-[#4a37d8] mx-auto mb-3" size={32} />
                            <div className="text-3xl font-bold text-gray-900 mb-1">12,450+</div>
                            <div className="text-gray-600">Total Participants</div>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                            <Award className="text-[#6928d9] mx-auto mb-3" size={32} />
                            <div className="text-3xl font-bold text-gray-900 mb-1">2,340+</div>
                            <div className="text-gray-600">Total Winners</div>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                            <Trophy className="text-amber-500 mx-auto mb-3" size={32} />
                            <div className="text-3xl font-bold text-gray-900 mb-1">$1.2M+</div>
                            <div className="text-gray-600">Prizes Awarded</div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Leaderboard;
