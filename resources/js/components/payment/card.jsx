import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "./checkoutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe(
//     "pk_test_51GuqPBLx5fJpovNG2twYeFlvOXiLvK9qq8jLsqtRHt6cShmWDjFJB9Q0WsoDkGgSGtLDwVgtSupt7rtQ0yDyxzge00nlKJLCYM"
// );

export default function Card(props) {
    // ComponentDidMount=()=>{
    //     var response = fetch('/secret').then(function(response) {
    //         return response.json();
    //       }).then(function(responseJson) {
    //         var clientSecret = responseJson.client_secret;
    //         // Call stripe.confirmCardPayment() with the client secret.
    //       });
    // }
    // handleSubmit(){
    //     // Call stripe.confirmCardPayment() with the client secret.
    // }
    const [paymentIntent, setPaymentIntent] = useState();
    useEffect(() => {
        axios
            .get("api/stripe/intent/" + props.orderTblString, { baseURL: "/" })
            .then(res => {
                console.log("cardddddddddd" + JSON.stringify(res));
                setPaymentIntent(res.data);
            });
    }, []);
    const stripePromise = loadStripe(
        "pk_test_51GuqPBLx5fJpovNG2twYeFlvOXiLvK9qq8jLsqtRHt6cShmWDjFJB9Q0WsoDkGgSGtLDwVgtSupt7rtQ0yDyxzge00nlKJLCYM"
    );
    const total = props.getTotal().toFixed(2);
    return (
        <div className="App">
            <div> Total amount to pay: {total}Euro</div>
            <Elements stripe={stripePromise}>
                <CheckoutForm
                    paymentIntent={paymentIntent}
                    handleNextStep={props.handleNextStep}
                    handlePrevStep={props.handlePrevStep}
                    handleSubmitFoodForm={props.handleSubmitFoodForm}
                    total={total}
                    custUpdate={props.custUpdate}
                />
            </Elements>
            <hr />
        </div>
    );
}
