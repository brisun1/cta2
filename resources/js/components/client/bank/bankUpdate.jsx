import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

export default class BankUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {},
            licenseFile: null,
            statemtFile: null,
            errors: {
                acName: "",
                ownerName: "",
                ownerPh: "",
                contactPh: "",
                sortCode: "",
                account: "",
                iban: ""
            }
        };
    }
    componentDidMount() {
        axios.get("api/bank/show").then(res => {
            if (res.data)
                this.setState({
                    inputs: res.data
                });
        });
    }
    handleChange = event => {
        const { name, value } = event.target;
        const inputs = { ...this.state.inputs };
        inputs[name] = value;
        this.setState({ inputs });

        let errors = this.state.errors;

        this.setState({ errors, [name]: value }, () => {
            console.log(errors);
        });
    };
    onFileChange = event => {
        this.setState({
            licenseFile: event.target.files[0],
            loaded: 0
        });
    };
    onStatemtChange = event => {
        this.setState({
            statemtFile: event.target.files[0]
            //loaded: 0
        });
    };
    handleSubmit = event => {
        event.preventDefault();

        //setErrors(validate());

        const data = new FormData();

        data.append("image", this.state.selectedFile);
        if (this.state.licenseFile)
            data.append("licenseFile", this.state.licenseFile);
        if (this.state.statemtFile)
            data.append("statemtFile", this.state.statemtFile);

        //data.append("image1", this.state.selectedFiles);
        // for (let [key, value] of Object.entries(this.state.ninput)) {
        //     data.set("${key}", "${value}");
        // }
        const o = Object.keys(this.state.inputs);
        for (let i = 0; i <= o.length - 1; i++) {
            data.set(o[i], this.state.inputs[o[i]]);
        }

        console.log("in bank update" + JSON.stringify(data));

        axios
            .post("api/bank/update", data, {
                params: {
                    _method: "PUT"
                }
            })

            .then(res => {
                // then print response status
                console.log("datadata" + data);
                console.log(res);
                if (res.data == "bank update success")
                    window.location.replace("/dashBoard");
            });
    };

    render() {
        const { inputs, errors } = this.state;
        if (inputs.approved === 0) {
            return (
                <div>
                    <br />
                    <h6 className="text-center">Edit Bank Account</h6>
                    <h6 className="text-center">登记表</h6>
                    <hr />
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className="control-label">
                                Company Name for the Account:
                                <input
                                    name="ac_name"
                                    type="text"
                                    placeholder="company name"
                                    value={this.state.inputs.ac_name}
                                    onChange={this.handleChange}
                                />
                            </label>
                            {errors.acName && (
                                <p className="text-danger">{errors.acName}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <label className="control-label">
                                Shop owner's Name :
                                <input
                                    name="owner_name"
                                    type="text"
                                    placeholder="owner name"
                                    value={this.state.inputs.owner_name}
                                    onChange={this.handleChange}
                                />
                            </label>
                            {errors.ownerName && (
                                <p className="text-danger">
                                    {errors.ownerName}
                                </p>
                            )}
                        </div>
                        <div className="form-group">
                            <label className="control-label">
                                Contact Phone Number:
                                <input
                                    name="contactPh"
                                    type="text"
                                    placeholder="contact phone number"
                                    value={this.state.inputs.contactPh}
                                    onChange={this.handleChange}
                                />
                            </label>
                            {errors.contactPh && (
                                <p className="text-danger">
                                    {errors.contactPh}
                                </p>
                            )}
                        </div>
                        <div className="form-group">
                            <label className="control-label">
                                Owner's Phone Number:
                                <input
                                    name="ownerPh"
                                    type="text"
                                    placeholder="phone number"
                                    value={this.state.inputs.ownerPh}
                                    onChange={this.handleChange}
                                />
                            </label>
                            {errors.ownerPh && (
                                <p className="text-danger">{errors.ownerPh}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <label className="control-label">
                                Sort Code:
                                <input
                                    name="sort_code"
                                    type="text"
                                    placeholder="sort code"
                                    value={inputs.sort_code}
                                    onChange={this.handleChange}
                                />
                            </label>
                            {errors.sortCode && (
                                <p className="text-danger">{errors.sortCode}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <label className="control-label">
                                Account Number:
                                <input
                                    name="account"
                                    type="text"
                                    placeholder="account"
                                    value={inputs.account}
                                    onChange={this.handleChange}
                                />
                            </label>
                            {errors.account && (
                                <p className="text-danger">{errors.account}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <label className="control-label">
                                Iban:
                                <input
                                    name="iban"
                                    type="text"
                                    placeholder="Iban"
                                    value={inputs.iban}
                                    onChange={this.handleChange}
                                />
                            </label>
                            {errors.iban && (
                                <p className="text-danger">{errors.iban}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Photos upload:</label>
                            <br />
                            <label className="control-label">
                                Shop License:
                                <input
                                    type="file"
                                    name="licenseFile"
                                    onChange={this.onFileChange}
                                />
                            </label>
                            <br />
                            <label className="control-label">
                                Bank Statement:
                                <input
                                    type="file"
                                    name="statemtFile"
                                    onChange={this.onStatemtChange}
                                />
                            </label>
                        </div>
                        <input
                            type="submit"
                            value="Submit"
                            className="btn btn-info"
                        />
                    </form>
                </div>
            );
        } else return <>Please contact us for Bank Account Modification</>;
    }
}
