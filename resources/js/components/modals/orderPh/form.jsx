import React from "react";

export const Form = ({ onSubmit, custPhone }) => {
    return (
        <form onSubmit={onSubmit}>
            <label>
                To confirm the order, we will send a code to your moble phone.
                And you fill in this code on the top of the page.
                <br />
                The phone number we will send to is {custPhone}.
                <br />
            </label>
            <div className="form-group">
                <label htmlFor="orderMobile" className="text-primary">
                    If it is different, please fill in here
                </label>
                <input
                    name="orderMobile"
                    className="form-control"
                    id="orderMobile"
                />
            </div>
            {/* <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                />
            </div> */}
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">
                    Send me a code
                </button>
            </div>
        </form>
    );
};
export default Form;
