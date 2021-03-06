import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import formValidate from "../validation/formValidate";
//import allValidateErrors from "./allValidateErrors";

export default class BankForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reged: true,
            isValid: false,
            inputs: {
                acName: "",
                ownerName: "",
                ownerPh: "",
                contactPh: "",
                sortCode: "",
                account: "",
                iban: ""
            },
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
            },
            touched: {
                acName: false,
                ownerName: false,
                ownerPh: false,
                contactPh: false,
                sortCode: false,
                account: false,
                iban: false
            }
        };
    }
    componentDidMount() {
        axios.get("api/bank/show").then(res => {
            //if (res.data)
            //console.log("in bank reg" + JSON.stringify(res.data));
            // if (res.data.meta.shop_id === this.props.shop.id)
            if (res.data === "no bank")
                this.setState({
                    reged: false
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
    };

    // validateError = (input, value) => {
    //     // let errors = this.state.errors;

    //     switch (input) {
    //         case "acName":
    //             if (value.length === 0)
    //                 return "Name on the account can't be empty!";
    //             if (value.length < 5)
    //                 return "Name on the account must be less 5 characters!";
    //             break;
    //         case "ownerName":
    //             if (value.length === 0) return "Owner's name  can't be empty!";
    //             if (value.length < 5) return "Owner's name must be full name!";
    //             break;
    //         case "ownerPh":
    //             if (value.length === 0)
    //                 return "Owner's phone number is required!";
    //             if (value.length < 10)
    //                 return "Owner's phone number must be at leat 10 digits!";
    //             break;
    //         case "contactPh":
    //             if (0 < value.length && value.length < 10)
    //                 return "Contact phone number must be at leat 10 digits!";
    //             break;
    //         case "sortCode":
    //             if (value.length === 0) return "Sort code is required!";
    //             if (value.length < 6)
    //                 return "Sort code  must be at leat 6 numbers!";
    //             if (value.length > 8)
    //                 return "Sort code  must be not more 8 numbers!";

    //             break;
    //         case "account":
    //             if (value.length === 0) return "Account number is required!";
    //             if (value.length < 7)
    //                 return "Account number  must be at leat 7 numbers!";
    //             break;
    //         case "iban":
    //             if (value.length === 0) return "Iban is required!";
    //             if (value.length < 7) return "Iban  must be at leat 7 numbers!";
    //             break;
    //         default:
    //             return "";
    //             break;
    //     }

    // this.setState({ errors, [name]: value }, () => {
    // console.log(errors);
    //});
    // };

    // setError = () => {
    //     const { name, value } = event.target;
    //     const error = this.validateError(name, value);

    //     const errors = { ...this.state.errors };
    //     // if (error) {
    //     errors[name] = error;
    //     this.setState({ errors });
    //     // }
    // };
    validateInput = () => {
        let errors = { ...this.state.errors };
        if (!event.target.checkValidity()) {
            errors[name] = event.target.validationMessage;
            console.log("in blur");
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

    handleSubmit = async event => {
        event.preventDefault();
        let errors = formValidate();
        if (errors) this.setState({ errors });
        else {
            //if (this.state.isValid) {
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

            // const config = {
            //     headers: {
            //         "content-type": "application/x-www-form-urlencoded"
            //     }
            // };
            //console.log("dddd" + JSON.stringify(data));
            try {
                let res = await axios.post("api/bank/store", data, {});
                if (res.status === 200 && res.data == "bank store success")
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
            //////
            // axios
            //     .post("api/bank/store", data, {})

            //     .then(res => {
            //         // console.log("datadata" + data);

            //         if (res.data == "bank store success")
            //             window.location.replace("/dashBoard");
            //     });
        }
    };

    render() {
        const { inputs, errors } = this.state;
        if (this.state.reged) {
            return (
                <div className="text-warning">
                    You have registered your bank account already!
                </div>
            );
        } else
            return (
                <div>
                    <br />
                    <h6 className="text-center">Bank Account Registration</h6>
                    <h6 className="text-center">登记表</h6>
                    <hr />
                    <form noValidate onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className="control-label">
                                Company Name for the Account:
                                <input
                                    name="acName"
                                    type="text"
                                    id="acName"
                                    minLength={5}
                                    maxLength={30}
                                    placeholder="company name"
                                    value={this.state.inputs.acName}
                                    onChange={this.handleChange}
                                    onBlur={this.validateInput}
                                    required
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
                                    name="ownerName"
                                    type="text"
                                    id="ownerName"
                                    placeholder="owner name"
                                    value={this.state.inputs.ownerName}
                                    onChange={this.handleChange}
                                    onBlur={this.validateInput}
                                    minLength={5}
                                    maxLength={30}
                                    required
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
                                    type="tel"
                                    placeholder="contact phone number"
                                    value={this.state.inputs.contactPh}
                                    onChange={this.handleChange}
                                    onBlur={this.validateInput}
                                    minLength={10}
                                    maxLength={30}
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
                                    onBlur={this.validateInput}
                                    required
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
                                    name="sortCode"
                                    type="text"
                                    placeholder="sort code"
                                    value={inputs.sortCode}
                                    onChange={this.handleChange}
                                    onBlur={this.validateInput}
                                    minLength={6}
                                    maxLength={8}
                                    required
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
                                    pattern="\d*"
                                    placeholder="account"
                                    value={inputs.account}
                                    onChange={this.handleChange}
                                    onBlur={this.validateInput}
                                    minLength={8}
                                    maxLength={30}
                                    required
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
                        <input
                            type="submit"
                            value="Submit"
                            className="btn btn-info"
                        />
                    </form>
                </div>
            );
    }
}
