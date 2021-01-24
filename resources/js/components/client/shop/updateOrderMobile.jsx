import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import formValidate from "../validation/formValidate";
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     NavLink,
//     Redirect
//     //useRouteMatch
// } from "react-router-dom";

class UpdateOrderMobile extends Component {
    constructor(props) {
        super(props);
        //const { shop } = this.props;
        this.state = {
            orderMobl: "",

            errors: {
                orderMobl: ""
            }
        };
    }
    componentDidMount() {
        // console.log("default" + this.props.shop);

        this.setState({ orderMobl: this.props.orderMobl });
    }
    handleChange = event => {
        let { errors } = this.state;
        this.setState({ orderMobl: event.target.value });
        if (errors[event.target.name]) this.validateInput();
    };
    validateInput = () => {
        const { name } = event.target;
        let errors = { ...this.state.errors };
        if (!event.target.checkValidity()) {
            errors[name] = event.target.validationMessage;
            //console.log("in blur");
            this.setState({ errors });
        } else {
            errors[name] = "";
            this.setState({ errors });
        }
    };
    handleOrderMobileSubmit = event => {
        event.preventDefault();
        let errors = formValidate();
        //console.log("err" + errors);
        if (errors) this.setState({ errors });
        else {
            //setErrors(validate());
            //axios.post("api/clientForm", this.state).then(response => {});
            // const data = new FormData();
            // for (var x = 0; x < this.state.selectedFile.length; x++) {
            //     data.append("image", this.state.selectedFile[x]);
            // }
            // data.append("image", this.state.selectedFile);
            let data = {
                id: this.props.id,
                orderMobl: this.state.orderMobl
            };
            axios
                .post("api/shop/minorUpdate", data, {
                    params: {
                        _method: "PUT"
                    }
                })

                .then(res => {
                    //console.log("res" + JSON.stringify(res));
                    if (res.data == "shop minorUpdate success") {
                        window.location.replace("/dashBoard");
                    }
                });
        }
    };

    render() {
        const { errors, orderMobl } = this.state;

        return (
            <div>
                <div style={{ backgroundColor: "#f2f1eb" }}>
                    <br />

                    <h6>Update the order mobile:</h6>
                    <form
                        noValidate
                        id="orderMobileForm"
                        onSubmit={this.handleOrderMobileSubmit}
                        className="form-horizontal"
                    >
                        <div className="form-group">
                            <label className="control-label">
                                Mobile number:
                                <input
                                    name="orderMobl"
                                    type="tel"
                                    value={orderMobl}
                                    onChange={this.handleChange}
                                    onBlur={this.validateInput}
                                    minLength={10}
                                    maxLength={30}
                                    required
                                />
                            </label>

                            {errors.orderMobl && (
                                <p className="text-danger">
                                    {errors.orderMobl}
                                </p>
                            )}
                        </div>
                        <input
                            type="submit"
                            // form="orderMobileForm"
                            className="btn btn-info"
                            value="Submit"
                        />
                    </form>
                </div>
            </div>
        );
    }
}

export default UpdateOrderMobile;
