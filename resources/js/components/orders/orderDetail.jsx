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
                <div>Your contact number: &nbsp;{order.contactPhone}</div>

                <div> {order.isDeli ? "Delivery" : "Self Collection"}</div>

                {order.isDeli ? (
                    <>
                        <div>
                            Delivery address: &nbsp;
                            {order.deliAddr}
                        </div>
                    </>
                ) : null}
                {deliPrice == "max" && order.isDeli && (
                    <div className="text-warning ">
                        Make sure the delivery address is agreed with the shop.
                        And the delivery price may vary.
                    </div>
                )}

                {order.isDeli && order.addrError == "NOT_FOUND" ? (
                    <div className="text-danger">
                        Make sure the address is deliverable. And the delivery
                        price may vary.
                    </div>
                ) : null}

                <div>
                    Pay method:&nbsp;{order.cardPay ? "By card" : "By cash"}
                </div>

                {order.cardPay ? (
                    <div>
                        Total paid amount : &nbsp;
                        {order.paidAmt}Eur
                    </div>
                ) : (
                    <div>
                        Total amount to pay: &nbsp;
                        {order.amtToPay}Eur
                    </div>
                )}

                {order.order_msg && (
                    <div>Message to shop: &nbsp;{order.order_msg}</div>
                )}
                <hr />
            </div>
        );
    }
}

export default CustomerDetail;
