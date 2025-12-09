import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import toast from "react-hot-toast";

const CheckoutForm = ({ contestId, price, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentId, setPaymentId] = useState("");
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (price && contestId) {
        api.post("/payments/create-intent", { 
            price: parseFloat(price), 
            contestId,
            paymentType: price === 10 ? 'update' : 'entry' // Auto-detect for now or pass as prop. Let's rely on price context or pass prop
            // Actually, better to pass a prop 'paymentType' to CheckoutForm.
        })
            .then((res) => {
                setClientSecret(res.data.clientSecret);
                setPaymentId(res.data.paymentId);
            })
            .catch((err) => {
                console.error("Error creating payment intent:", err);
                toast.error("Failed to initialize payment. " + (err.response?.data?.message || ""));
            });
    }
  }, [price, contestId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    setProcessing(true);
    setError("");

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
            card: card,
            billing_details: {
                // optionally add user details here
            }
        },
      }
    );

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
    } else {
      if (paymentIntent.status === "succeeded") {
        try {
            // Confirm payment on backend
            await api.post("/payments/confirm", { 
                paymentId,
                transactionId: paymentIntent.id 
            });
            
            if (onSuccess) {
                await onSuccess(paymentId);
            } else {
                toast.success("Payment successful! Your contest is now pending approval.");
                navigate("/dashboard");
            }
        } catch (backendError) {
            console.error("Backend confirmation failed:", backendError);
            toast.error("Payment succeeded but failed to update system. Please contact support.");
            navigate("/dashboard");
        }
      }
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
       <div className="mb-6 text-center">
            <h3 className="text-lg font-medium text-gray-900">Pay to Publish</h3>
            <p className="text-3xl font-bold text-[#4a37d8] mt-2">${price}</p>
       </div>
      
      <div className="mb-6 p-4 border border-gray-200 rounded-lg">
        <CardElement
            options={{
            style: {
                base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                    color: "#aab7c4",
                },
                },
                invalid: {
                color: "#9e2146",
                },
            },
            }}
        />
      </div>

      {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="w-full py-3 px-4 bg-gradient-to-r from-[#4a37d8] to-[#6928d9] text-white font-medium rounded-lg shadow-md hover:from-[#3b2db0] hover:to-[#5722b5] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {processing ? "Processing..." : `Pay $${price}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
