import React, { Component } from "react";
import CustomerDetail from "./customerDetail";
class CashOrderConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phonePwd: null,
            phpError: ""
        };
    }
    handlePhonePwdChange = e => {
        this.setState({ phonePwd: e.target.value });
    };
    handleSubmitPwd = async e => {
        e.preventDefault(e);
        //this.props.handleSubmitFoodForm(e);
        let data = { phonePwd: this.state.phonePwd };
        try {
            let res = await axios.post(
                "api/order/matchPwd/" + this.props.custData.orderTblString,
                data,
                {
                    baseURL: "/"
                }
            );
            if (res.status === 200 && res.data == "pwd matched")
                this.props.handleNextStep();
        } catch (error) {
            let phpError = { ...this.state.phpError };
            let newErrors = error.response.data.errors;

            phpError = newErrors["phonePwd"][0];
            this.setState({ phpError });
        }
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
                <form noValidate onSubmit={this.handleSubmitPwd}>
                    <label htmlFor="pwd" className="">
                        Confirmation Code:
                    </label>
                    <input
                        className="ml-1"
                        id="pwd"
                        name="pwd"
                        type="text"
                        size={12}
                        onChange={this.handlePhonePwdChange}
                        onBlur={this.props.validateInput}
                        pattern=".{5,}"
                        // minLength={5}
                        // maxLength={5}
                        required
                    />

                    <button
                        type="submit"
                        //onClick={this.handleSubmitPwd}
                        className="btn btn-primary ml-2"
                    >
                        Confirm
                    </button>
                    {this.state.phpError && (
                        <div className="text-danger">{this.state.phpError}</div>
                    )}
                    <div className="text-danger">{this.props.pwdError}</div>
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
