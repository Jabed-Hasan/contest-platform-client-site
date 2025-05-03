import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('')
  const [transactionId, setTransactionId] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [cart, refetch] = useCart();
  const navigate = useNavigate();




  const totalPrice = cart.reduce((total, item) => total + item.price, 0)

  useEffect(() => {
    if (totalPrice > 0) {
        axiosSecure.post('/create-payment-intent', { price: totalPrice })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
            .catch(error => {
                console.error('Error fetching client secret:', error);
                setClientSecret(null);  // Set to null or handle error appropriately
            });
    }
}, [axiosSecure, totalPrice]);



// ... (your other imports)

const handleSubmit = async (event) => {
  event.preventDefault();

  if (!stripe || !elements || !clientSecret) {
    return;
  }

  const card = elements.getElement(CardElement);

  if (card === null) {
    return;
  }

  try {
    // create a payment method
    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });

    if (paymentMethodError) {
      console.error('Payment Method Error:', paymentMethodError);
      setError(paymentMethodError.message || 'An error occurred during payment method creation');
      return;
    }

    // confirm the payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
      billing_details: {
        email: user?.email || 'anonymous',
        name: user?.displayName || 'anonymous'
      }
    });

    if (confirmError) {
      console.error('Confirm Error:', confirmError);
      setError(confirmError.message || 'An error occurred during payment confirmation');
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      console.log('Transaction ID:', paymentIntent.id);

      // now save the payment in the database
      const payment = {
        email: user.email,
        price: totalPrice,
        transactionId: paymentIntent.id,
        date: new Date(),
        cartIds: cart.map(item => item._id),
        menuItemIds: cart.map(item => item.menuId),
        status: 'pending'
      }

      const res = await axiosSecure.post('/payments', payment);
      console.log('Payment Saved:', res.data);
      refetch();

      if (res.data?.paymentResult?.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Payment Successful',
          text: 'Thank you for the taka paisa!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          navigate('/dashboard/paymentHistory');
        });
      }
    }
  } catch (error) {
    console.error('Unhandled Error:', error);
    setError('An unexpected error occurred');
  }
}

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || clientSecret}>
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
    </form>
  );
};

export default CheckoutForm;