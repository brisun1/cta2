import React, { Component } from "react";
import CustomerDetail from "./customerDetail";
class CashOrderConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phonePwd: null
        };
    }
    handlePhonePwdChange = e => {
        this.setState({ phonePwd: e.target.value });
    };
    handleSubmitPwd = e => {
        e.preventDefault(e);
        //this.props.handleSubmitFoodForm(e);
        let data = { phonePwd: this.state.phonePwd };
        axios
            .post(
                "api/order/matchPwd/" + this.props.custData.orderTblString,
                data,
                {
                    baseURL: "/"
                }
            )
            .then(res => {
                //console.log("pwddddddddd" + JSON.stringify(res));
                if (res.data == "pwd matched") {
                    //
                    // if (this.props.custData.foodSubmited == true) {
                    this.props.handleNextStep();
                    // this.props.handleNextStep();
                    // }
                }
            });
    };

    render() {
        const { custData } = this.props;
        // if (custData.cashConfirm)
        return (
            <>
                <button
                    onClick={this.props.handlePrevStep}
                    className="btn btn-secondary"
                >
                    {"< "}Back
                </button>
                <h5 className="text-center">Order Confirmation</h5>
                <hr />
                <form onSubmit={this.handleSubmitPwd}>
                    <label htmlFor="pwd" className="">
                        Confirmation Code:
                    </label>
                    <input
                        className="ml-1"
                        id="pwd"
                        size={12}
                        onChange={this.handlePhonePwdChange}
                    />
                    <button
                        type="submit"
                        //onClick={this.handleSubmitPwd}
                        className="btn btn-primary ml-2"
                    >
                        Confirm
                    </button>
                </form>
                <hr />
                <CustomerDetail
                    custData={custData}
                    getTotal={this.props.getTotal}
                />
            </>
        );
    }
}

export default CashOrderConfirm;
