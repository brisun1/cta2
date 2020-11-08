import React, { Component } from "react";
class CustomerDetail extends Component {
    state = {};
    render() {
        const { custData } = this.props;
        const { deliPrice } = custData;
        return (
            <div>
                <h6>The order information you provide is as following:</h6>
                <br />

                <label>Your contact number: &nbsp;{custData.custPhone}</label>

                <br />
                <label>
                    {" "}
                    {custData.isDeli ? "Delivery" : "Self Collection"}
                </label>
                <br />
                {custData.isDeli ? (
                    custData.isDeli && (
                        <label>
                            Delivery address: &nbsp;
                            {custData.custAddr}
                        </label>
                    )
                ) : (
                    <div> {""}</div>
                )}
                {deliPrice == "max" && custData.isDeli && (
                    <label className="text-warning ">
                        Make sure the delivery address is agreed with the shop.
                        And the delivery price may vary.
                    </label>
                )}
                <br />
                {custData.isDeli && custData.addrError == "NOT_FOUND" && (
                    <label className="text-danger">
                        Make sure the address is deliverable. And the delivery
                        price may vary.
                    </label>
                )}
                <br />

                <label>
                    Total amount to pay: &nbsp;
                    {this.props.getTotal().toFixed(2)}Eur
                </label>
                <br />
                <label>
                    Pay method:&nbsp;{custData.cardPay ? "By card" : "By cash"}
                </label>
                <br />
                <label>Message to shop: &nbsp;{custData.orderMsg}</label>
                <hr />
            </div>
        );
    }
}

export default CustomerDetail;
