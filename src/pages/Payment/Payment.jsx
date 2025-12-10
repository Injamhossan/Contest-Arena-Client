import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import { ArrowLeft } from 'lucide-react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import api from '../../utils/api';
import toast from 'react-hot-toast';

// TODO: Move key to .env
const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
console.log("Stripe Key loaded:", key ? "Yes (starts with " + key.substring(0, 7) + ")" : "No, using fallback");
const stripePromise = loadStripe(key || "pk_test_51QToAqP3jRjWv3u5d7q8vX8u9z6y5t4w3v2u1t0s9r8q7p6o5n4m3l2k1j0"); 

const Payment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contest, setContest] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContest = async () => {
            try {
                const response = await api.get(`/contests/${id}`);
                const data = response.data.contest || response.data.data;
                if (!data) throw new Error("Contest not found");
                setContest(data);
            } catch (error) {
                console.error("Error fetching contest for payment:", error);
                toast.error("Failed to load payment details");
                navigate('/all-contests');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchContest();
        }
    }, [id, navigate]);

    if (loading) {
        return (
             <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    if (!contest) return null;

    return (
        <DashboardLayout>
        <div className="py-12 px-4 sm:px-6 lg:px-8 dark:bg-black min-h-screen">
            <div className="max-w-lg mx-auto">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back
                </button>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Complete Payment</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Secure your spot in <span className="font-bold">{contest.name}</span></p>
                    <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800 inline-block">
                         <span className="text-sm text-purple-600 dark:text-purple-400 uppercase tracking-wide font-semibold">Total to Pay</span>
                         <div className="text-3xl font-extrabold text-purple-700 dark:text-purple-300">${contest.price}</div>
                    </div>
                </div>

                <Elements stripe={stripePromise}>
                    <CheckoutForm 
                        contestId={id} 
                        price={contest.price} 
                        onSuccess={async (paymentId) => {
                            try {
                                // Check if user is the creator (Paying for creation)
                                // We might not have 'user' in scope here easily if we didn't use useAuth
                                // Let's check api response or just try to join.
                                // Actually better to check if this is a participation payment.
                                // If I am the creator, I shouldn't be "joining" my own contest as a participant usually?
                                // Let's assume if it's NOT my contest, I am joining.
                                
                                // Fetch user from api or context. 
                                // But simpler: The backend createParticipation won't allow creators to join? 
                                // Actually backend createParticipation doesn't block creators, but usually creators don't pay entrance fee.
                                // Wait, creator PAID the fee shown. 
                                // If it is "Creation Fee", creator is paying.
                                // If it is "Participation Fee", user is paying.
                                
                                // Let's rely on the contest creatorId vs current user.
                                const userRes = await api.get('/auth/me'); // Or use useAuth() if available
                                const currentUser = userRes.data.data;
                                
                                if (contest.creatorId === currentUser?._id || contest.creatorId?._id === currentUser?._id) {
                                    // It's the creator paying for their contest
                                    toast.success("Contest fee paid successfully!");
                                } else {
                                    // It's a user joining
                                    await api.post('/participations', {
                                        contestId: id,
                                        paymentId: paymentId
                                    });
                                    toast.success("Successfully registered for contest!");
                                }
                                navigate('/dashboard');
                            } catch (error) {
                                console.error("Post-payment error:", error);
                                toast.error("Payment successful, but failed to register participation. Please contact support.");
                                navigate('/dashboard');
                            }
                        }}
                    />
                </Elements>
            </div>
        </div>
        </DashboardLayout>
    );
};

export default Payment;
