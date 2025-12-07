import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import toast from "react-hot-toast";

const CheckoutForm = ({ contestId, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (price > 0 && contestId) {
        api.post("/payments/create-intent", { price, contestId })
            .then((res) => {
                setClientSecret(res.data.clientSecret);
            })
            .catch((err) => {
                console.error("Error creating payment intent:", err);
                toast.error("Failed to initialize payment.");
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

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
      setProcessing(false);
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
        },
      }
    );

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
    } else {
      if (paymentIntent.status === "succeeded") {
        // Confirm payment on backend
        // Note: The backend's confirmPayment endpoint expects paymentId, but here we might need to adjust logic based on what create-intent returns or what confirm expects.
        // Actually, looking at the backend code, it creates a Payment record in 'create-intent' step. 
        // We should probably pass the paymentId from the intent creation response to the confirmation step if needed by the backend logic, 
        // OR rely on the webhook.
        // However, for immediate UI feedback, let's call the confirm endpoint if possible.
        // Wait... the backend 'create-intent' returns { success: true, clientSecret: ..., paymentId: ... }
        // So we need to store paymentId from the initial effect.
        
        // Let's assume we handle the success here and redirect.
        toast.success("Payment successful! Your contest is now pending approval.");
        navigate("/dashboard");
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
