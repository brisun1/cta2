import React, { useState } from "react";

export const OrderPhForm = ({
    submitOrderPh,
    custPhone,
    orderMobile,
    handleOrderMobileChange,
    errors,
    validateInput
}) => {
    // const [orderMobile, setOrderMobile] = useState(custPhone);
    // function handleOrderMobileChange() {
    //     setOrderMobile(event.target.value);
    // }
    return (
        <form noValidate onSubmit={submitOrderPh}>
            <label>
                To confirm your order, we need send a code to your mobile phone.
                And you just fill it in on the next page.
                <br />
                The phone number we will send to is {custPhone}.
                <br />
            </label>
            <div className="form-group">
                <label
                    // htmlFor="orderMobile"
                    className="text-primary control-label"
                >
                    If it is different, please fill in here:
                    <input
                        name="orderMobile"
                        type="tel"
                        className="form-control"
                        id="orderMobile"
                        value={orderMobile}
                        onChange={handleOrderMobileChange}
                        onBlur={validateInput}
                        minLength={10}
                        maxLength={30}
                    />
                </label>
                {errors.orderMobile && (
                    <p className="text-danger">{errors.orderMobile}</p>
                )}
                <button className="btn btn-primary ml-4" type="submit">
                    Send me a code
                </button>
            </div>

            {/* <div className="form-group">
                        <label className="control-label">
                            Shop name:
                            <input
                                name="shopName"
                                type="text"
                                value={inputs.shopName}
                                onChange={this.handleChange}
                                onBlur={this.validateInput}
                                minLength={2}
                                maxLength={30}
                                required
                            />
                        </label>

                        {errors.shopName && (
                            <p className="text-danger">{errors.shopName}</p>
                        )}
                    </div> */}

            {/* <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                />
            </div> */}
        </form>
    );
};
export default OrderPhForm;
