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
const stripePromise = loadStripe(
    "pk_test_51GuqPBLx5fJpovNG2twYeFlvOXiLvK9qq8jLsqtRHt6cShmWDjFJB9Q0WsoDkGgSGtLDwVgtSupt7rtQ0yDyxzge00nlKJLCYM"
);
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
    let [tip, setTip] = useState();

    useEffect(() => {
        axios
            .get("api/stripe/intent/" + props.orderTblString, { baseURL: "/" })
            .then(res => {
                //console.log("cardddddddddd" + JSON.stringify(res));
                setPaymentIntent(res.data);
            });
    }, []);
    // const stripePromise = loadStripe(
    //     "pk_test_51GuqPBLx5fJpovNG2twYeFlvOXiLvK9qq8jLsqtRHt6cShmWDjFJB9Q0WsoDkGgSGtLDwVgtSupt7rtQ0yDyxzge00nlKJLCYM"
    // );
    const handleChange = () => {
        setTip(event.target.value);
    };
    const total = () => {
        let t = props.getTotal();
        if (tip) {
            if (!props.tipError) t += Number(tip);
        }
        //console.log("in card" + t);
        return t;
    };
    return (
        <div className="App">
            <div className="row">
                <div className="col">
                    {" "}
                    Total amount to pay: &nbsp;{total().toFixed(2)}
                    Eur
                </div>
                <div className="col float-right">
                    <label>
                        Tipping for delivery:
                        <input
                            name="tip"
                            type="number"
                            className="ml-2"
                            step={0.5}
                            min={1}
                            max={50}
                            // value={tip}
                            // readOnly
                            onChange={handleChange}
                            onBlur={props.validateInput}
                        />
                        Eur
                    </label>
                    <br />
                    {props.tipError && (
                        <p className="text-danger">{props.tipError}</p>
                    )}
                </div>
            </div>
            <Elements stripe={stripePromise}>
                <CheckoutForm
                    paymentIntent={paymentIntent}
                    handleNextStep={props.handleNextStep}
                    handlePrevStep={props.handlePrevStep}
                    // handleSubmitFoodForm={props.handleSubmitFoodForm}
                    total={total()}
                    custAddr={props.custAddr}
                    custUpdate={props.custUpdate}
                    tipError={props.tipError}
                />
            </Elements>
            <hr />
        </div>
    );
}
