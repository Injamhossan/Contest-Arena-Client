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

                if (user) {
                    try {
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
            <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    if (!contest) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-black gap-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Contest Not Found</h2>
                <Link to="/all-contests" className="btn btn-primary">Back to Contests</Link>
            </div>
        );
    }

    const formatTime = (value) => (value < 10 ? `0${value}` : value);
    const limit = contest.participationLimit > 0 ? contest.participationLimit : 750;
    const progressPercentage = Math.min((contest.participantsCount / limit) * 100, 100);
    const isFull = contest.participationLimit > 0 && contest.participantsCount >= contest.participationLimit;

    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url)
            .then(() => toast.success('Link copied to clipboard!'))
            .catch(() => toast.error('Failed to copy link'));
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black font-urbanist pb-12 transition-colors duration-300">
            {/* Header Banner - Image Background */}
            <div className="h-64 md:h-80 w-full relative group">
                <img 
                    src={contest.image} 
                    alt={contest.name} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                
                {/* Navbar area Placeholder padding if needed, assuming global navbar is fixed or above */}
                <div className="absolute top-24 left-4 md:left-8">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full transition-all text-sm font-semibold border border-white/10"
                    >
                        <ArrowLeft size={16} /> Back to Contests
                    </button>
                </div>

                <div className="absolute top-24 right-4 md:right-8 flex gap-3">
                    <button className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full transition-all border border-white/10">
                        <Share2 size={20} />
                    </button>
                    <button className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full transition-all border border-white/10">
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
                        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-xs border border-gray-100 dark:border-gray-800">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 text-xs font-bold rounded-full uppercase tracking-wider">
                                    {contest.contestType}
                                </span>
                                <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider border ${
                                    contest.winnerUserId ? 'border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20' : 
                                    contest.status === 'confirmed' ? 'border-green-200 dark:border-green-900 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' : 'border-yellow-200 dark:border-yellow-900 text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
                                }`}>
                                    {contest.winnerUserId ? 'Contest Closed' : (contest.status === 'confirmed' ? 'Active' : contest.status)}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
                                {contest.name}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                                {contest.description}
                            </p>

                            {/* Winner Section */}
                            {contest.winnerUserId && (
                                <div className="mb-8 bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-100 dark:border-amber-800 rounded-2xl p-6 flex items-center gap-6 shadow-xs relative overflow-hidden">
                                     <div className="absolute -right-4 -top-4 text-amber-100 dark:text-amber-900/20 rotate-12">
                                        <Trophy size={120} />
                                    </div>
                                    <div className="relative z-10 shrink-0">
                                        <div className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-800 shadow-md overflow-hidden bg-gray-200 dark:bg-gray-700">
                                            {contest.winnerPhotoURL ? (
                                                <img src={contest.winnerPhotoURL} alt="Winner" className="w-full h-full object-cover" />
                                            ) : (
                                                <UserCircle className="w-full h-full text-gray-400" />
                                            )}
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white p-1.5 rounded-full border-2 border-white dark:border-gray-800 shadow-sm">
                                            <Trophy size={14} />
                                        </div>
                                    </div>
                                    <div className="relative z-10">
                                        <div className="text-amber-600 dark:text-amber-400 text-sm font-bold uppercase tracking-wider mb-1">Winner Declared</div>
                                        <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{contest.winnerName}</div>
                                        <p className="text-amber-700/80 dark:text-amber-400/80 text-sm mt-1">Congratulations on winning ${contest.prizeMoney}!</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-2 mb-8">
                                {['digital', 'illustration', '3D'].map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* Host Info */}
                            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                                {contest.creatorId?.photoURL ? (
                                    <img src={contest.creatorId.photoURL} alt="Host" className="w-12 h-12 rounded-full object-cover" />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        <UserCircle size={24}/>
                                    </div>
                                )}
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold">Hosted by</p>
                                    <p className="text-base font-bold text-gray-900 dark:text-white">{contest.creatorId?.name || "Unknown Creator"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Guidelines Card */}
                        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-xs border border-gray-100 dark:border-gray-800">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contest Guidelines</h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3 text-gray-600 dark:text-gray-400">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span>All submissions must be original work created specifically for this contest.</span>
                                </li>
                                <li className="flex gap-3 text-gray-600 dark:text-gray-400">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span>Participants can submit up to 3 entries.</span>
                                </li>
                                <li className="flex gap-3 text-gray-600 dark:text-gray-400">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span>Submissions must be in high-resolution format (minimum 2000px).</span>
                                </li>
                                <li className="flex gap-3 text-gray-600 dark:text-gray-400">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span>Winner will be announced within 7 days of contest ending.</span>
                                </li>
                                <li className="flex gap-3 text-gray-600 dark:text-gray-400">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span>Prize money will be transferred within 14 business days.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-lg border border-yellow-100 dark:border-gray-800 sticky top-24">
                            {/* Prize Header */}
                            <div className="flex flex-col items-center text-center mb-8 bg-yellow-50/50 dark:bg-yellow-900/10 p-6 rounded-2xl border border-yellow-100 dark:border-yellow-900/30">
                                <Trophy className="w-10 h-10 text-yellow-500 mb-2" />
                                <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-500 uppercase tracking-widest">Prize Pool</span>
                                <span className="text-4xl font-extrabold text-yellow-500">${contest.prizeMoney.toLocaleString()}</span>
                            </div>

                            {/* Timer */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-3 text-gray-500 dark:text-gray-400 text-sm font-medium">
                                    <Clock size={16} /> Time Remaining
                                </div>
                                <div className="grid grid-cols-4 gap-2 text-center">
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2 border border-gray-100 dark:border-gray-700">
                                        <div className="text-xl font-bold text-gray-800 dark:text-white">{formatTime(timeLeft.days)}</div>
                                        <div className="text-[10px] text-gray-400 font-bold uppercase">Days</div>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2 border border-gray-100 dark:border-gray-700">
                                        <div className="text-xl font-bold text-gray-800 dark:text-white">{formatTime(timeLeft.hours)}</div>
                                        <div className="text-[10px] text-gray-400 font-bold uppercase">Hours</div>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2 border border-gray-100 dark:border-gray-700">
                                        <div className="text-xl font-bold text-gray-800 dark:text-white">{formatTime(timeLeft.minutes)}</div>
                                        <div className="text-[10px] text-gray-400 font-bold uppercase">Mins</div>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2 border border-gray-100 dark:border-gray-700">
                                        <div className="text-xl font-bold text-gray-800 dark:text-white">{formatTime(timeLeft.seconds)}</div>
                                        <div className="text-[10px] text-gray-400 font-bold uppercase">Secs</div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="space-y-4 mb-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2"><span className="text-lg text-gray-400">$</span> Entry Fee</span>
                                    <span className="font-bold text-gray-900 dark:text-white text-lg">${contest.price}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2"><Users size={18} className="text-gray-400"/> Participants</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{contest.participantsCount}/{limit}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2"><Calendar size={18} className="text-gray-400"/> Deadline</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{new Date(contest.deadline).toLocaleDateString()}</span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-8">
                                <div className="flex justify-between text-xs mb-1 font-medium">
                                    <span className="text-gray-500 dark:text-gray-400">Spots Filled</span>
                                    <span className="text-gray-900 dark:text-white">{Math.round(progressPercentage)}%</span>
                                </div>
                                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
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
                                    disabled={isFull || contest.winnerUserId}
                                    onClick={() => {
                                        if (isFull || contest.winnerUserId) return;
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
                                    className={`w-full btn border-none text-white font-bold rounded-xl h-14 normal-case text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
                                        isFull || contest.winnerUserId
                                          ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400' 
                                          : 'bg-linear-to-r from-[#4a37d8] to-[#6928d9] hover:bg-cyan-500 hover:shadow-xl'
                                    }`}
                                >
                                    {contest.winnerUserId ? 'CONTEST CLOSED' : (isFull ? 'CONTEST FULL' : `REGISTER & PAY $${contest.price}`)}
                                </button>
                            )}
                            
                            <SubmissionModal
                                isOpen={isSubmissionModalOpen}
                                onClose={() => setIsSubmissionModalOpen(false)}
                                submission={userSubmission}
                                onSuccess={() => {
                                    // Optionally refresh to get updated submission status if needed
                                }}
                            />

                            <p className="text-center text-[10px] text-gray-400 mt-4">
                                Secure payment powered by Stripe
                            </p>
                        </div>

                        {/* Share Contest Card */}
                        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 mt-6 shadow-xs border border-gray-100 dark:border-gray-800 text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-4">Share this contest</p>
                            <button 
                                onClick={handleShare}
                                className="w-full py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                            >
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