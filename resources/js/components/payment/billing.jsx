import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
export default function Billing(props) {
    let [show, setShow] = useState(false);
    function handleShow() {
        setShow(!show);
    }
    return (
        <div>
            <label>
                If you like to get a receipt by email, please provide yur email
                address.
                <br />
                Email:
                <input
                    type="email"
                    name="email"
                    className="ml-2"
                    onChange={props.handleChange}
                />
            </label>
            <input
                type="button"
                className="btn"
                onClick={handleShow}
                value={show ? "Less ..." : "More ..."}
            />

            {show && (
                <div>
                    If you like to have more details appeared on the receipt,
                    please provide.
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            placeholder="Name on your Card"
                            className="ml-2"
                            onChange={props.handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Address:
                        <input
                            type="text"
                            name="addr"
                            className="ml-2"
                            defaultValue={props.custAddr}
                            onChange={props.handleChange}
                        />
                    </label>
                </div>
            )}
        </div>
    );
}
