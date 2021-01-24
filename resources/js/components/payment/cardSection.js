import React from "react";
import {
    CardElement,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    PaymentRequestButtonElement
} from "@stripe/react-stripe-js";
import "./cardSectionStyles.css";
//import "./stripeApp.css";
const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4"
            }
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
        }
    }
};

function CardSection() {
    return (
        // <label>
        //     Card details
        //     <CardElement options={CARD_ELEMENT_OPTIONS} />
        // </label>
        <div>
            Card Number:
            <br />
            <label>
                <CardNumberElement />
            </label>
            <br />
            Expiry Date:
            <br />
            <label>
                <CardExpiryElement />
            </label>
            <br />
            CVC:{" "}
            <span style={{ fontSize: 14 }}>
                (Last 3-4 digits on the back of your card.)
            </span>
            <br />
            <label>
                <CardCvcElement />
            </label>
            {/* <label>
                <PaymentRequestButtonElement />
            </label> */}
        </div>
    );
}

export default CardSection;
