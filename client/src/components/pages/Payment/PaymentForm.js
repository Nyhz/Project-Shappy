
import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import PaymentService from './../../../services/payment.services'
import axios from "axios";
import './PaymentForm.css'


export const PaymentForm = (loggedUser) => {
    const stripe = useStripe();
    const elements = useElements();
    const paymentService = new PaymentService
    let redirect = false

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (!error) {
            const { id } = paymentMethod
            const e = document.getElementById('amount')

            axios.post(
                "http://localhost:5005/api/stripe/charge",
                {
                    amount: e.options[e.selectedIndex].value,
                    id
                })
                .then(response => {
                    if (response.data.success) {
                        paymentService.addCoins(response.data.amount)
                            .then(() => {
                                console.log(redirect);
                                redirect = true
                                console.log(redirect);
                            })
                    }
                })
                .catch(err => console.log("Error | ", err))
        }
    }

    const ELEMENT_OPTIONS = {
        iconStyle: "solid",
        hidePostalCode: true,
        style: {
            base: {
                iconColor: "rgb(240, 57, 122)",
                color: "rgb(240, 57, 122)",
                fontSize: "25px",


            },
            invalid: {
                color: "#e5424d",
            }
        }
    }


    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400 }} >
            <CardElement options={ELEMENT_OPTIONS} className='card-element' />
            <select className='select-element' name="amount" id="amount">
                <option value="99">10 coins = 0.99€</option>
                <option value="499">50 + 10 FREE coins = 4.99€</option>
                <option value="999">100 + 50 FREE coins = 9.99€</option>
                <option value="1999">200 + 150 FREE coins = 19.99€</option>
                <option value="4999">500 + 500 FREE coins = 49.99€</option>
            </select>
            <button>Pay</button>

        </form >
    );
};

export default PaymentForm