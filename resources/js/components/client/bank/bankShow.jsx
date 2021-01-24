import React, { Component } from "react";

import ReactDOM from "react-dom";

import { withRouter } from "react-router-dom";
class BankShow extends Component {
    constructor() {
        super();
        this.state = { bank: {} };
    }

    componentDidMount() {
        axios.get("api/bank/show").then(res => {
            if (res.data != "no bank")
                //console.log("in bankshow" + JSON.stringify(res.data));
                this.setState({
                    bank: res.data
                });
        });
    }
    gotoRegisterBank = () => {
        this.props.history.push("/createBank");
    };
    render() {
        let { bank } = this.state;
        console.log("bank show  rendering" + JSON.stringify(bank));
        //console.log(this.props);
        if (Object.keys(bank).length === 0)
            return (
                <>
                    <div className="text-warning">
                        You don't have your bank account with us. Please
                        register first!
                    </div>
                    <br />
                    <button
                        onClick={this.gotoRegisterBank}
                        className="btn btn-primary"
                    >
                        Register Bank Account
                    </button>
                    <br />
                </>
            );
        else {
            return (
                <div>
                    <br />
                    <h6 className="text-center">Bank Account Detail</h6>
                    <h6 className="text-center">登记表</h6>
                    <hr />
                    <div>
                        <div className="">
                            Company Name for the Account:{bank.ac_name}
                        </div>
                        <br />
                        <div className="">
                            Shop owner's Name :{bank.owner_name}
                        </div>
                        <br />
                        <div className="">
                            Contact Phone Number:
                            {bank.contactPh}
                        </div>
                        <br />
                        <div className="">
                            Owner's Phone Number:
                            {bank.ownerPh}
                        </div>
                        <br />
                        <div className="">
                            Sort Code:
                            {bank.sort_code}
                        </div>
                        <br />
                        <div className="">
                            Account Number:
                            {bank.account}
                        </div>
                        <br />
                        <div className="">
                            Iban:
                            {bank.iban}
                        </div>

                        <div className="">
                            Shop License:
                            <br />
                            <img
                                src={"storage/bank_img/" + bank.license}
                                style={{ height: "225px", width: "auto" }}
                            />
                        </div>
                        <div className="">
                            Bank Statement:
                            <br />
                            <img
                                src={"storage/bank_img/" + bank.statemt}
                                style={{ height: "225px", width: "auto" }}
                            />
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default withRouter(BankShow);
// if (document.getElementById("shopDetail")) {
//     ReactDOM.render(<ShopDetail />, document.getElementById("shopDetail"));
// }
