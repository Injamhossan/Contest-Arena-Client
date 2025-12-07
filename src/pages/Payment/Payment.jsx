import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import { ArrowLeft } from 'lucide-react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

// TODO: Move key to .env
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_51QToAqP3jRjWv3u5d7q8vX8u9z6y5t4w3v2u1t0s9r8q7p6o5n4m3l2k1j0"); 

const Payment = () => {
    const [searchParams] = useSearchParams();
    const contestId = searchParams.get('contestId');
    const price = searchParams.get('price');
    const navigate = useNavigate();

    if (!contestId || !price) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-red-500">Invalid Payment Link</h2>
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="mt-4 text-[#4a37d8] hover:underline"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <DashboardLayout>
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto">
                <button 
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to Dashboard
                </button>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Complete Payment</h1>
                    <p className="mt-2 text-gray-600">Secure your contest by completing the payment.</p>
                </div>

                <Elements stripe={stripePromise}>
                    <CheckoutForm contestId={contestId} price={price} />
                </Elements>
            </div>
        </div>
        </DashboardLayout>
    );
};

export default Payment;
