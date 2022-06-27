import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import store from "../state/GlobalState";
import payment from "../styles/payment.module.css";




const CheckoutForm = ({submit}) =>{
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();


  async function getClientSecret()
    {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(store.getState())
        });
        const response = await res.json();
        setClientSecret(response.clientSecret)
    }



  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    getClientSecret()
  }, []);


  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        "::placeholder": {
          color: "#32325d"
        },
 
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const cardElementStyle = {
    borderRadius: "4px",
    padding: "12px",
    border: "2px solid rgba(50, 50, 93, 0.1)",
    maxHeight: "44px",
    background: "white",
    boxSizing: "border-box"
  }

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      receipt_email: store.getState().customer.email,
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });
    console.log(payload)
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      submit();
    }
  };

  return (
    <form className="ml-2 mr-2 form-group text-center" onSubmit={handleSubmit}>

    <div className="text-left pb-2">Enter payment information:</div>
    <div className="form-group" style={cardElementStyle}>
        <CardElement  options={cardStyle} onChange={handleChange} />
    </div>
      <button
        className="btn btn-danger text-align-center block"
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            <div className={`${payment.spinner}`} id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="text-danger" role="alert">
          {error}
        </div>
      )}
    </form>
  );
}

export default CheckoutForm
