import React, { Component } from "react";

import ReactDOM from "react-dom";

//import { Link } from "react-router-dom";
class BankShow extends Component {
    constructor() {
        super();
        this.state = { bank: {} };
    }

    componentDidMount() {
        axios.get("api/bank/show").then(res => {
            if (res.data)
                //console.log("in bankshow" + JSON.stringify(res.data));
                this.setState({
                    bank: res.data
                });
        });
    }
    render() {
        let { bank } = this.state;
        console.log("bank show  rendering" + JSON.stringify(bank));
        //console.log(this.props);
        if (bank) {
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

export default BankShow;
// if (document.getElementById("shopDetail")) {
//     ReactDOM.render(<ShopDetail />, document.getElementById("shopDetail"));
// }
