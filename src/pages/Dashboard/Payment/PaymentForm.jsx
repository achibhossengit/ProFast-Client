import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState();
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [paymentLoading, setPaymentLoading] = useState(false);

  const { data: parcel = {}, isPending } = useQuery({
    queryKey: ["parcel", [parcelId]],
    queryFn: async () => {
      const res = await axiosSecure.get(`parcels/${parcelId}`);
      return res.data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPaymentLoading(true);

    if (!stripe || !elements) {
      setPaymentLoading(false);
      return;
    }
    const card = elements.getElement(CardElement);

    if (!card) {
      setPaymentLoading(false);
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
      setMessage(error.message);
      setPaymentLoading(false);
    } else {
      setMessage("");

      // fetch secret key
      const amountInCents = parcel.cost * 100;
      const res = await axiosSecure.post("create-payment-intent", {
        amountInCents,
        parcelId,
      });

      const clientSecret = res.data.clientSecret;

      // confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        // Show error to your customer
        setMessage(result.error.message);
      } else {
        // Save payment history
        const res = await axiosSecure.post("payments", {
          parcelId,
          transactionId: result.paymentIntent.id,
          amount: parcel.cost,
          currency: result.paymentIntent.currency,
          status: result.paymentIntent.status,
          paymentMethod: result.paymentIntent.payment_method_types[0],
        });
        if (res.data.insertedId) {
          setPaymentLoading(false);
          Swal.fire({
            title: "Good job!",
            text: "Payment is getting successfully. Redirect to Myparcel page.",
            icon: "success",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/dashboard/my-parcels");
            }
          });
        }
      }
    }
  };

  if (isPending) return <LoadingSpinner></LoadingSpinner>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto border rounded-md  p-5 my-5 space-y-5"
    >
      <CardElement></CardElement>
      <button
        className="btn btn-primary w-full"
        type="submit"
        disabled={paymentLoading}
      >
        {paymentLoading ? "Payment Processing..." : `Pay $${parcel.cost}`}
      </button>
      <p className="text-red-500 text-sm">{message}</p>
    </form>
  );
};

export default PaymentForm;
