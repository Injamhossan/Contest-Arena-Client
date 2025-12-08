import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { Upload, DollarSign, Calendar, Type, FileText, ArrowLeft } from 'lucide-react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const UpdateContest = () => {
    const { id } = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContest = async () => {
            try {
                const response = await api.get(`/contests/${id}`);
                const contest = response.data.contest || response.data.data;
                // Format date for input
                if (contest.deadline) {
                    contest.deadline = new Date(contest.deadline).toISOString().split('T')[0];
                }
                reset(contest);
            } catch (error) {
                console.error('Error fetching contest:', error);
                toast.error('Failed to load contest details');
                navigate('/dashboard/my-contests');
            } finally {
                setFetching(false);
            }
        };
        fetchContest();
    }, [id, reset, navigate]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            // Ensure numbers are numbers
            const payload = {
                ...data,
                price: parseFloat(data.price),
                prizeMoney: parseFloat(data.prizeMoney),
            };

            const response = await api.put(`/contests/${id}`, payload);
            if (response.data.success) {
                toast.success('Contest updated successfully!');
                navigate('/dashboard/my-contests');
            }
        } catch (error) {
            console.error('Error updating contest:', error);
            toast.error(error.response?.data?.message || 'Failed to update contest');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
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
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                 <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to My Contests
                </button>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="px-8 py-6 bg-gradient-to-r from-[#4a37d8] to-[#6928d9]">
                        <h1 className="text-2xl font-bold text-white">Update Contest</h1>
                        <p className="text-indigo-100 mt-2">Edit your contest details</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                        <div className="space-y-6">
                            {/* Contest Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contest Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        {...register('name', { required: 'Contest name is required' })}
                                        className="w-full pl-4 pr-4 text-black py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a37d8] focus:border-transparent outline-none transition-all"
                                        placeholder="e.g., Ultimate Logo Design Challenge"
                                    />
                                </div>
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Upload className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="url"
                                        {...register('image', { 
                                            required: 'Image URL is required',
                                            pattern: {
                                                value: /^(http|https):\/\/[^ "]+$/,
                                                message: 'Please enter a valid URL starting with http/https'
                                            }
                                        })}
                                        className="w-full pl-10 pr-4 text-black py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a37d8] focus:border-transparent outline-none transition-all"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                                {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
                            </div>

                            {/* Contest Type & Deadline */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Contest Type</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Type className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <select
                                            {...register('contestType', { required: 'Contest type is required' })}
                                            className="w-full pl-10 pr-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a37d8] focus:border-transparent outline-none transition-all appearance-none bg-white"
                                        >
                                            <option value="">Select Type</option>
                                            <option value="Design">Design</option>
                                            <option value="Writing">Writing</option>
                                            <option value="Coding">Coding</option>
                                            <option value="Photography">Photography</option>
                                            <option value="Video">Video</option>
                                            <option value="Music">Music</option>
                                            <option value="Art">Art</option>
                                            <option value="Education">Education</option>
                                            <option value="Gaming">Gaming</option>
                                            <option value="Business">Business</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    {errors.contestType && <p className="text-red-500 text-xs mt-1">{errors.contestType.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Calendar className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="date"
                                            {...register('deadline', { required: 'Deadline is required' })}
                                            className="w-full pl-10 pr-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a37d8] focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                    {errors.deadline && <p className="text-red-500 text-xs mt-1">{errors.deadline.message}</p>}
                                </div>
                            </div>

                            {/* Price & Prize Money */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Entry Price ($)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <DollarSign className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="number"
                                            step="0.01"
                                            {...register('price', { required: 'Price is required', min: 0 })}
                                            className="w-full pl-10 pr-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a37d8] focus:border-transparent outline-none transition-all"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Prize Money ($)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <DollarSign className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="number"
                                            step="0.01"
                                            {...register('prizeMoney', { required: 'Prize money is required', min: 0 })}
                                            className="w-full pl-10 pr-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a37d8] focus:border-transparent outline-none transition-all"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    {errors.prizeMoney && <p className="text-red-500 text-xs mt-1">{errors.prizeMoney.message}</p>}
                                </div>
                            </div>

                            {/* Descriptions */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                                <input
                                    type="text"
                                    {...register('shortDescription', { required: 'Short description is required' })}
                                    className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a37d8] focus:border-transparent outline-none transition-all"
                                    placeholder="Brief overview of the contest"
                                />
                                {errors.shortDescription && <p className="text-red-500 text-xs mt-1">{errors.shortDescription.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
                                <div className="relative">
                                    <div className="absolute top-3 left-3 pointer-events-none">
                                        <FileText className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <textarea
                                        {...register('description', { required: 'Description is required' })}
                                        rows="4"
                                        className="w-full pl-10 pr-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a37d8] focus:border-transparent outline-none transition-all resize-none"
                                        placeholder="Full details about the contest..."
                                    />
                                </div>
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Task Instructions</label>
                                <textarea
                                    {...register('taskInstructions', { required: 'Instructions are required' })}
                                    rows="3"
                                    className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a37d8] focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="What exactly do participants need to submit?"
                                />
                                {errors.taskInstructions && <p className="text-red-500 text-xs mt-1">{errors.taskInstructions.message}</p>}
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#4a37d8] to-[#6928d9] hover:from-[#3b2db0] hover:to-[#5722b5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {loading ? 'Updating Contest...' : 'Update Contest'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </DashboardLayout>
    );
};

export default UpdateContest;
