
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../UI/Card/Card';
import { ArrowRight } from 'lucide-react';
import api from '../../utils/api';

import { useQuery } from '@tanstack/react-query';

const PopularContests = () => {
    const { data: contests = [], isLoading: loading } = useQuery({
        queryKey: ['popularContests'],
        queryFn: async () => {
            const response = await api.get('/contests/popular?limit=6');
            if (response.data.success) {
                return response.data.data;
            }
            return [];
        }
    });

    if (loading) {
        return <div className="py-20 text-center">Loading popular contests...</div>;
    }

    return (
        <section className="py-16 px-4 bg-gray-50/50 dark:bg-black transition-colors duration-300">
            <div className="container mx-auto max-w-7xl">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold font-urbanist mb-2 text-gray-900 dark:text-white">Popular Contests</h2>
                        <p className="text-gray-500 dark:text-gray-400">Join trending competitions and showcase your skills</p>
                    </div>
                    
                    <Link to="/all-contests" className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 transition-all font-medium group text-sm shadow-sm">
                        View All 
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {contests.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {contests.map(contest => (
                            <Card key={contest._id} item={contest} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                        <p className="text-gray-500 mb-4">No contests available yet.</p>
                        <Link to="/dashboard/add-contest" className="btn bg-blue-600 text-white hover:bg-blue-700 border-none">
                            Create Your First Contest
                        </Link>
                    </div>
                )}
                
                <div className="mt-8 md:hidden text-center">
                    <Link to="/all-contests" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all font-medium group text-sm shadow-sm">
                        View All 
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PopularContests;
