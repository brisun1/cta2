import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import formValidate from "../validation/formValidate";

import { withRouter } from "react-router-dom";
class BankUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {},
            licenseFile: null,
            statemtFile: null,
            errors: {
                ac_name: "",
                ownerName: "",
                ownerPh: "",
                contactPh: "",
                sort_code: "",
                account: "",
                iban: ""
            }
        };
    }
    componentDidMount() {
        axios.get("api/bank/show").then(res => {
            if (res.data != "no bank")
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
        const { errors } = this.state;
        if (errors[name]) this.validateInput();
        // let errors = this.state.errors;

        // this.setState({ errors, [name]: value });
    };
    validateInput = () => {
        //we need to extract specific properties in Constraint Validation API using this code snippet
        const { name } = event.target;
        let errors = { ...this.state.errors };
        if (!event.target.checkValidity()) {
            errors[name] = event.target.validationMessage;
            console.log("in blur" + event.target.validationMessage);
            this.setState({ errors });
        } else {
            errors[name] = "";
            this.setState({ errors });
        }
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
    gotoRegisterBank = () => {
        this.props.history.push("/createBank");
    };
    handleSubmit = async event => {
        event.preventDefault();

        //setErrors(validate());
        let errors = formValidate();
        if (errors) this.setState({ errors });
        else {
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

            // console.log("in bank update" + JSON.stringify(data));
            try {
                let res = await axios.post("api/bank/update", data, {
                    params: {
                        _method: "PUT"
                    }
                });
                if (res.status === 200 && res.data == "bank update success")
                    window.location.replace("/dashBoard");
            } catch (error) {
                let errs = { ...this.state.errors };
                let newErrors = error.response.data.errors;

                console.log("errors" + JSON.stringify(error.response.data));
                for (const key in newErrors) {
                    errs[key] = newErrors[key][0];
                }
                this.setState({ errors: errs });
            }
            /////
            // axios
            //     .post("api/bank/update", data, {
            //         params: {
            //             _method: "PUT"
            //         }
            //     })

            //     .then(res => {
            //         // then print response status
            //         console.log("datadata" + data);
            //         console.log(res);
            //         if (res.data == "bank update success")
            //             window.location.replace("/dashBoard");
            //     });
        }
    };

    render() {
        const { inputs, errors } = this.state;
        if (Object.keys(inputs).length === 0) {
            return (
                <>
                    <br />
                    <h6 className="text-center">Edit Bank Account</h6>
                    <h6 className="text-center">修改银行帐号</h6>
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
        } else {
            if (inputs.approved === 0) {
                return (
                    <div>
                        <br />
                        <h6 className="text-center">Edit Bank Account</h6>
                        <h6 className="text-center">修改银行帐号</h6>
                        <hr />
                        <form noValidate onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label className="control-label">
                                    Company Name for the Account:
                                    <input
                                        name="ac_name"
                                        type="text"
                                        placeholder="company name"
                                        value={this.state.inputs.ac_name}
                                        onChange={this.handleChange}
                                        minLength={5}
                                        maxLength={30}
                                        onBlur={this.validateInput}
                                        required
                                    />
                                </label>
                                {errors.ac_name && (
                                    <p className="text-danger">
                                        {errors.ac_name}
                                    </p>
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
                                        minLength={5}
                                        maxLength={30}
                                        onBlur={this.validateInput}
                                        required
                                    />
                                </label>
                                {errors.owner_name && (
                                    <p className="text-danger">
                                        {errors.owner_name}
                                    </p>
                                )}
                            </div>
                            <div className="form-group">
                                <label className="control-label">
                                    Contact Phone Number:
                                    <input
                                        name="contactPh"
                                        type="tel"
                                        placeholder="contact phone number"
                                        value={this.state.inputs.contactPh}
                                        onChange={this.handleChange}
                                        onBlur={this.validateInput}
                                        minLength={5}
                                        maxLength={30}
                                        required
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
                                        type="tel"
                                        placeholder="phone number"
                                        value={this.state.inputs.ownerPh}
                                        onChange={this.handleChange}
                                        minLength={10}
                                        maxLength={30}
                                        onBlur={this.validateInput}
                                        required
                                    />
                                </label>
                                {errors.ownerPh && (
                                    <p className="text-danger">
                                        {errors.ownerPh}
                                    </p>
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
                                        minLength={6}
                                        maxLength={8}
                                        onBlur={this.validateInput}
                                        required
                                    />
                                </label>
                                {errors.sort_code && (
                                    <p className="text-danger">
                                        {errors.sort_code}
                                    </p>
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
                                        minLength={8}
                                        maxLength={30}
                                        onBlur={this.validateInput}
                                        required
                                    />
                                </label>
                                {errors.account && (
                                    <p className="text-danger">
                                        {errors.account}
                                    </p>
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
                                        onBlur={this.validateInput}
                                        minLength={16}
                                        maxLength={40}
                                        required
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
}
export default withRouter(BankUpdate);
