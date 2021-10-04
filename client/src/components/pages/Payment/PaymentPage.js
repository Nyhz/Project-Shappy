import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import PaymentForm from "./PaymentForm";

const stripeTestPromise = loadStripe('pk_test_51JgrliAZFWEha2CVxgSpbC06FhbHUiGg3CdiRV2jt2R6jtgreW3CFoVeO3ZPbsMt5P01qGzgqrio4XQWMVHoGVqK00tfSp8I6v');

const PaymentPage = (loggedUser) => {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm loggedUser={loggedUser} />
        </Elements>
    );
};

export default PaymentPage;