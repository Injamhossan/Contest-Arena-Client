import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
    Clock, 
    Users, 
    Calendar, 
    Trophy, 
    ArrowLeft,
    Share2,
    Heart,
    CheckCircle,
    UserCircle,
    MapPin,
    Upload
} from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import SubmissionModal from '../../components/Dashboard/SubmissionModal';

const ContestDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [contest, setContest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);
    const [userSubmission, setUserSubmission] = useState(null);
    const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const fetchContestAndStatus = async () => {
            try {
                // Fetch Contest Details
                const response = await api.get(`/contests/${id}`);
                setContest(response.data.contest || response.data.data);

                // Check Registration Status (if user is logged in)
                if (user) {
                    try {
                        // We can check /participations/me and filter, OR a check endpoint
                        // Since we don't have a direct check endpoint, fetching my participations is safer
                        const participationResponse = await api.get('/participations/me');
                         if (participationResponse.data.success) {
                            const myParticipations = participationResponse.data.data;
                            const participation = myParticipations.find(p => p.contestId._id === id || p.contestId === id);
                            if (participation) {
                                setIsRegistered(true);
                                setUserSubmission(participation);
                            }
                         }
                    } catch (err) {
                        console.error("Error checking registration status", err);
                    }
                }

            } catch (error) {
                console.error('Error fetching contest:', error);
                toast.error('Failed to load contest details');
            } finally {
                setLoading(false);
            }
        };

        fetchContestAndStatus();
    }, [id, user]);

    useEffect(() => {
        if (!contest?.deadline) return;

        const calculateTimeLeft = () => {
            const difference = +new Date(contest.deadline) - +new Date();
            let timeLeft = {};

            if (difference > 0) {
                timeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            } else {
                timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }
            return timeLeft;
        };

        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [contest]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    if (!contest) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Contest Not Found</h2>
                <Link to="/all-contests" className="btn btn-primary">Back to Contests</Link>
            </div>
        );
    }

    const formatTime = (value) => (value < 10 ? `0${value}` : value);
    const progressPercentage = Math.min((contest.participantsCount / 750) * 100, 100);

    return (
        <div className="min-h-screen bg-gray-50 font-urbanist pb-12">
            {/* Header Banner - Gradient Background */}
            <div className="h-64 md:h-80 w-full bg-linear-to-r from-[#FF9860] via-[#FF8C96] to-[#A06AF9] relative">
                {/* Navbar area Placeholder padding if needed, assuming global navbar is fixed or above */}
                <div className="absolute top-24 left-4 md:left-8">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full transition-all text-sm font-semibold"
                    >
                        <ArrowLeft size={16} /> Back to Contests
                    </button>
                </div>

                <div className="absolute top-24 right-4 md:right-8 flex gap-3">
                    <button className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full transition-all">
                        <Share2 size={20} />
                    </button>
                    <button className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full transition-all">
                        <Heart size={20} />
                    </button>
                </div>
            </div>

            {/* Main Content Container - Overlapping the banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 md:-mt-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column (Details) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title Card */}
                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-gray-100">
                             <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 bg-cyan-50 text-cyan-600 text-xs font-bold rounded-full uppercase tracking-wider">
                                    {contest.contestType}
                                </span>
                                <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider border ${
                                    contest.status === 'confirmed' ? 'border-green-200 text-green-600 bg-green-50' : 'border-yellow-200 text-yellow-600 bg-yellow-50'
                                }`}>
                                    {contest.status === 'confirmed' ? 'Active' : contest.status}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                                {contest.name}
                            </h1>
                            
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                {contest.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {['digital', 'illustration', '3D'].map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-sm font-medium border border-gray-200">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* Host Info */}
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                                {contest.creatorId?.photoURL ? (
                                    <img src={contest.creatorId.photoURL} alt="Host" className="w-12 h-12 rounded-full object-cover" />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <UserCircle size={24}/>
                                    </div>
                                )}
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Hosted by</p>
                                    <p className="text-base font-bold text-gray-900">{contest.creatorId?.name || "Unknown Creator"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Guidelines Card */}
                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Contest Guidelines</h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3 text-gray-600">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span>All submissions must be original work created specifically for this contest.</span>
                                </li>
                                <li className="flex gap-3 text-gray-600">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span>Participants can submit up to 3 entries.</span>
                                </li>
                                <li className="flex gap-3 text-gray-600">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span>Submissions must be in high-resolution format (minimum 2000px).</span>
                                </li>
                                <li className="flex gap-3 text-gray-600">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span>Winner will be announced within 7 days of contest ending.</span>
                                </li>
                                <li className="flex gap-3 text-gray-600">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span>Prize money will be transferred within 14 business days.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl p-6 shadow-lg border border-yellow-100 sticky top-24">
                            {/* Prize Header */}
                            <div className="flex flex-col items-center text-center mb-8 bg-yellow-50/50 p-6 rounded-2xl border border-yellow-100">
                                <Trophy className="w-10 h-10 text-yellow-500 mb-2" />
                                <span className="text-sm font-semibold text-yellow-600 uppercase tracking-widest">Prize Pool</span>
                                <span className="text-4xl font-extrabold text-yellow-500">${contest.prizeMoney.toLocaleString()}</span>
                            </div>

                            {/* Timer */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-3 text-gray-500 text-sm font-medium">
                                    <Clock size={16} /> Time Remaining
                                </div>
                                <div className="grid grid-cols-4 gap-2 text-center">
                                    <div className="bg-gray-50 rounded-xl p-2 border border-gray-100">
                                        <div className="text-xl font-bold text-gray-800">{formatTime(timeLeft.days)}</div>
                                        <div className="text-[10px] text-gray-400 font-bold uppercase">Days</div>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-2 border border-gray-100">
                                        <div className="text-xl font-bold text-gray-800">{formatTime(timeLeft.hours)}</div>
                                        <div className="text-[10px] text-gray-400 font-bold uppercase">Hours</div>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-2 border border-gray-100">
                                        <div className="text-xl font-bold text-gray-800">{formatTime(timeLeft.minutes)}</div>
                                        <div className="text-[10px] text-gray-400 font-bold uppercase">Mins</div>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-2 border border-gray-100">
                                        <div className="text-xl font-bold text-gray-800">{formatTime(timeLeft.seconds)}</div>
                                        <div className="text-[10px] text-gray-400 font-bold uppercase">Secs</div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="space-y-4 mb-6 pt-6 border-t border-gray-100">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500 flex items-center gap-2"><span className="text-lg text-gray-400">$</span> Entry Fee</span>
                                    <span className="font-bold text-gray-900 text-lg">${contest.price}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500 flex items-center gap-2"><Users size={18} className="text-gray-400"/> Participants</span>
                                    <span className="font-bold text-gray-900">{contest.participantsCount}/750</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500 flex items-center gap-2"><Calendar size={18} className="text-gray-400"/> Deadline</span>
                                    <span className="font-bold text-gray-900">{new Date(contest.deadline).toLocaleDateString()}</span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-8">
                                <div className="flex justify-between text-xs mb-1 font-medium">
                                    <span className="text-gray-500">Spots Filled</span>
                                    <span className="text-gray-900">{Math.round(progressPercentage)}%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                    <div 
                                        className="bg-cyan-400 h-full rounded-full transition-all duration-500" 
                                        style={{ width: `${progressPercentage}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            {isRegistered ? (
                                <button 
                                    onClick={() => setIsSubmissionModalOpen(true)}
                                    className="w-full btn bg-green-500 hover:bg-green-600 border-none text-white font-bold rounded-xl h-14 normal-case text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                >
                                    <Upload className="w-6 h-6" />
                                    SUBMIT PROJECT
                                </button>
                            ) : (
                                <button 
                                    onClick={() => {
                                        if (!user) {
                                            navigate('/login');
                                            return;
                                        }
                                        if (user.role === 'admin') {
                                            toast.error("You are admin you are not join in contest now");
                                            return;
                                        }
                                        if (user.role === 'creator') {
                                            toast.error("You are creator you are not join in contest now");
                                            return;
                                        }
                                        navigate(`/payment/${contest._id}`);
                                    }}
                                    className="w-full btn bg-cyan-400 hover:bg-cyan-500 border-none text-white font-bold rounded-xl h-14 normal-case text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                >
                                    REGISTER & PAY ${contest.price}
                                </button>
                            )}
                            
                            <SubmissionModal
                                isOpen={isSubmissionModalOpen}
                                onClose={() => setIsSubmissionModalOpen(false)}
                                submission={userSubmission}
                                onSuccess={() => {
                                    // Optionally refresh to get updated submission status if needed
                                    // For now just closing is enough as toast shows success
                                }}
                            />

                            <p className="text-center text-[10px] text-gray-400 mt-4">
                                Secure payment powered by Stripe
                            </p>
                        </div>

                        {/* Share Contest Card */}
                        <div className="bg-white rounded-3xl p-6 mt-6 shadow-xs border border-gray-100 text-center">
                            <p className="text-sm text-gray-600 font-medium mb-4">Share this contest</p>
                            <button className="w-full py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                <Share2 size={16} /> Copy Link
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContestDetails;