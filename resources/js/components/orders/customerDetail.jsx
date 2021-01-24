import React, { Component } from "react";
class CustomerDetail extends Component {
    state = {};
    render() {
        const { custData } = this.props;
        const { deliPrice } = custData;
        return (
            <div>
                <h6>The order information you provide is as following:</h6>

                <div>Your contact number: &nbsp;{custData.custPhone}</div>

                <div> {custData.isDeli ? "Delivery" : "Self Collection"}</div>

                {custData.isDeli && (
                    <div>
                        Delivery address: &nbsp;
                        {custData.custAddr}
                    </div>
                )}
                {deliPrice == "max" && custData.isDeli && (
                    <div className="text-warning ">
                        Make sure the delivery address is agreed with the shop.
                        And the delivery price may vary.
                    </div>
                )}

                {custData.isDeli && custData.addrError == "NOT_FOUND" && (
                    <div className="text-danger">
                        Make sure the address is deliverable. And the delivery
                        price may vary.
                    </div>
                )}

                <div>
                    Total amount to pay: &nbsp;
                    {this.props.getTotal().toFixed(2)}Eur
                </div>

                <div>
                    Pay method:&nbsp;{custData.cardPay ? "By card" : "By cash"}
                </div>

                <div>Message to shop: &nbsp;{custData.orderMsg}</div>
                <hr />
            </div>
        );
    }
}

export default CustomerDetail;
