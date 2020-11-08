import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import CardSection from "./cardSection";

export default function CheckoutForm(props) {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMsg, setErrorMsg] = useState();

    const handleSubmit = async event => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        /////
        // var response = fetch("/stripe/intent")
        //     .then(function(response) {
        //         return response.json();
        //     })
        //     .then(function(responseJson) {
        //         let clientSecret = responseJson.client_secret;
        //         // Call stripe.confirmCardPayment() with the client secret.
        //         // const result = await stripe.confirmCardPayment(`${clientSecret}`, {
        //         //     payment_method: {
        //         //         card: elements.getElement(CardElement),
        //         //         billing_details: {
        //         //             name: "Jenny Rosen"
        //         //         }
        //         //     }
        //         // });
        //         // if (result.error) {
        //         //     // Show error to your customer (e.g., insufficient funds)
        //         //     console.log(result.error.message);
        //         // } else {
        //         //     // The payment has been processed!
        //         //     if (result.paymentIntent.status === "succeeded") {
        //         //         // Show a success message to your customer
        //         //         // There's a risk of the customer closing the window before callback
        //         //         // execution. Set up a webhook or plugin to listen for the
        //         //         // payment_intent.succeeded event that handles any business critical
        //         //         // post-payment actions.
        //         //     }
        //         // }
        //     });
        /////

        const result = await stripe.confirmCardPayment(
            `${props.paymentIntent.clientSecret}`,
            {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: "Jenny Rosen"
                    }
                }
            }
        );

        if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            setErrorMsg(result.error.message);
        } else {
            // The payment has been processed!
            if (result.paymentIntent.status === "succeeded") {
                // Show a success message to your customer
                // There's a risk of the customer closing the window before callback
                // execution. Set up a webhook or plugin to listen for the
                // payment_intent.succeeded event that handles any business critical
                // post-payment actions.
                console.log("paid resultttt" + result);
                props.handleSubmitFoodForm();
                //update paid amt
                let data = { paidAmt: props.total };
                props.custUpdate(data);
                //props.handleNextStep();
            }
        }
    };

    return (
        <>
            <br />
            <div className="text-danger">{errorMsg}</div>

            <form onSubmit={handleSubmit}>
                <CardSection />
                <br />

                <button className="btn btn-primary ml-7" disabled={!stripe}>
                    Pay now
                </button>
            </form>
            <br />
            <br />
            <button
                onClick={props.handlePrevStep}
                className="btn btn-secondary"
            >
                {"< "}Back
            </button>
        </>
    );
}
