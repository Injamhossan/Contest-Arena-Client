import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { X } from 'lucide-react';

const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(key || "pk_test_51QToAqP3jRjWv3u5d7q8vX8u9z6y5t4w3v2u1t0s9r8q7p6o5n4m3l2k1j0");

const PaymentModal = ({ isOpen, onClose, contestId, price, onSuccess }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in duration-200">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors z-10"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>
                
                <div className="p-6 bg-gradient-to-r from-[#4a37d8] to-[#6928d9] text-white text-center">
                    <h3 className="text-xl font-bold">Update Fee Required</h3>
                    <p className="text-indigo-100 text-sm mt-1">Pay ${price} to update this contest</p>
                </div>

                <div className="p-6">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm 
                            contestId={contestId} 
                            price={price} 
                            onSuccess={onSuccess} 
                        />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
