import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    Redirect
    //useRouteMatch
} from "react-router-dom";
import { isEmpty } from "lodash";
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
        console.log("default" + this.props.shop);
        // let inputs = {};
        // inputs.orderMobl = this.props.shop.orderMobl;
        // inputs.promTxt1 = this.props.shop.promTxt1;
        // inputs.promTxt2 = this.props.shop.promTxt2;
        // inputs.promTxt3 = this.props.shop.promTxt3;
        // inputs.offer = "";
        this.setState({ orderMobl: this.props.orderMobl });
    }
    handleChange = event => {
        // const { name, value } = event.target;
        // var inputs = { ...this.state.inputs };
        // inputs[name] = value;

        this.setState({ orderMobl: event.target.value });
    };
    // handleOfferChange = event => {
    //     this.setState({ offer: event.target.value });
    // };

    handleOrderMobileSubmit = event => {
        event.preventDefault();

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
                console.log("res" + JSON.stringify(res));
                if (res.data == "shop minorUpdate success") {
                    window.location.replace("/dashBoard");
                }
            });
    };

    render() {
        const { errors, inputs } = this.state;
        //const { shop } = this.props;
        // const inputs = this.props.shop;
        //console.log("indefault" + JSON.stringify(this.props.shop));
        //if (isEmpty) {
        return (
            <div>
                <div style={{ backgroundColor: "#f2f1eb" }}>
                    <br />

                    <h6>Update the order mobile:</h6>
                    <form
                        id="orderMobileForm"
                        onSubmit={this.handleOrderMobileSubmit}
                        className="form-horizontal"
                    >
                        <div className="form-group">
                            <label className="control-label">
                                Mobile number:
                                <input
                                    name="orderMobl"
                                    type="text"
                                    value={this.state.orderMobl}
                                    onChange={this.handleChange}
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
        //} else return "" + JSON.stringify(this.state.inputs);
        //+ JSON.stringify(this.props.shop.img);
    }
}

export default UpdateOrderMobile;
