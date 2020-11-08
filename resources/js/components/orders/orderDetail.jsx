import React, { Component } from "react";
class CustomerDetail extends Component {
    constructor(props) {
        super(props);
    }
    state = {};
    render() {
        const { order } = this.props;
        const { deliPrice } = order;
        return (
            <div>
                <br />

                <label>Your contact number: &nbsp;{order.contactPhone}</label>

                <br />
                <label> {order.isDeli ? "Delivery" : "Self Collection"}</label>
                <br />
                {order.isDeli ? (
                    order.isDeli && (
                        <>
                            <label>
                                Delivery address: &nbsp;
                                {order.deliAddr}
                            </label>
                            <br />
                        </>
                    )
                ) : (
                    <div> {""}</div>
                )}
                {deliPrice == "max" && order.isDeli && (
                    <label className="text-warning ">
                        Make sure the delivery address is agreed with the shop.
                        And the delivery price may vary.
                        <br />
                    </label>
                )}

                {order.isDeli && order.addrError == "NOT_FOUND" && (
                    <label className="text-danger">
                        Make sure the address is deliverable. And the delivery
                        price may vary.
                        <br />
                    </label>
                )}

                <label>
                    Pay method:&nbsp;{order.cardPay ? "By card" : "By cash"}
                </label>
                <br />
                {order.cardPay ? (
                    <label>
                        Total paid amount : &nbsp;
                        {order.paidAmt}Eur
                    </label>
                ) : (
                    <label>
                        Total amount to pay: &nbsp;
                        {order.amtToPay}Eur
                    </label>
                )}
                <br />

                {order.order_msg && (
                    <label>Message to shop: &nbsp;{order.order_msg}</label>
                )}
                <hr />
            </div>
        );
    }
}

export default CustomerDetail;
