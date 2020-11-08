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
import UpdateOrderMobl from "./updateOrderMobile";
import { isEmpty } from "lodash";
class UpdateProm extends Component {
    constructor(props) {
        super(props);
        //const { shop } = this.props;
        this.state = {
            inputs: {},
            // inputs: {
            //     cterMobl: "",
            //     promTxt1: "",
            //     promTxt2: "",
            //     promTxt3: "",
            //     offer: null
            // },

            // selectedFile: null,
            promPic: null,
            promPic2: null,
            promPic3: null,
            errors: {
                offer: "",
                cterMobl: "",
                orderMobl: "",

                promTxt1: "",
                promTxt2: "",
                promTxt3: ""
            }
        };
    }
    componentDidMount() {
        //console.log("default" + this.props.shop);
        let inputs = {};

        inputs.promTxt1 = this.props.shop.promTxt1;
        inputs.promTxt2 = this.props.shop.promTxt2;
        inputs.promTxt3 = this.props.shop.promTxt3;
        inputs.offer = this.props.shop.offer;
        this.setState({ inputs });
    }

    handleChange = event => {
        const { name, value } = event.target;
        var inputs = { ...this.state.inputs };
        inputs[name] = value;

        this.setState({ inputs });
    };
    // handleOfferChange = event => {
    //     this.setState({ offer: event.target.value });
    // };
    onPromChange = event => {
        this.setState({
            promPic: event.target.files[0]
            //loaded: 0
        });
    };
    onPromChange2 = event => {
        this.setState({
            promPic2: event.target.files[0]
            //loaded: 0
        });
    };
    onPromChange3 = event => {
        this.setState({
            promPic3: event.target.files[0]
            //loaded: 0
        });
    };
    handleSubmit = event => {
        event.preventDefault();

        //setErrors(validate());
        //axios.post("api/clientForm", this.state).then(response => {});
        const data = new FormData();
        // for (var x = 0; x < this.state.selectedFile.length; x++) {
        //     data.append("image", this.state.selectedFile[x]);
        // }
        // data.append("image", this.state.selectedFile);
        if (this.state.promPic) data.append("promPic", this.state.promPic);
        if (this.state.promPic2) data.append("promPic2", this.state.promPic2);
        if (this.state.promPic3) data.append("promPic3", this.state.promPic3);
        if (this.props.shop.id) data.append("id", this.props.shop.id);
        const o = Object.keys(this.state.inputs);
        for (let i = 0; i <= o.length - 1; i++) {
            data.set(o[i], this.state.inputs[o[i]]);
        }
        //data["orderMobl"] = this.state.inputs.orderMobl;
        // if (this.state.offer) {
        //     data["offer"] = this.state.offer;
        // }
        //console.log("dddd" + JSON.stringify(data.promTxt2));

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
    };

    render() {
        const { errors, inputs } = this.state;
        const { shop } = this.props;

        //console.log("indefault" + JSON.stringify(this.props.shop));

        return (
            <div style={{ backgroundColor: "#f2f1eb" }}>
                {Object.keys(inputs).length > 0 ? (
                    <div>
                        <br />

                        <form
                            id="promForm"
                            onSubmit={this.handleSubmit}
                            className="form-horizontal"
                        >
                            <div className="form-group">
                                <label className="control-label">
                                    Promtion text 1:
                                    <input
                                        name="promTxt1"
                                        type="text"
                                        value={inputs.promTxt1}
                                        onChange={this.handleChange}
                                    />
                                </label>

                                {errors.promTxt1 && (
                                    <p className="text-danger">
                                        {errors.promTxt1}
                                    </p>
                                )}
                            </div>
                            <div className="form-group">
                                <label className="control-label">
                                    Promtion text 2:
                                    <input
                                        name="promTxt2"
                                        type="text"
                                        value={inputs.promTxt2}
                                        onChange={this.handleChange}
                                    />
                                </label>

                                {errors.promTxt2 && (
                                    <p className="text-danger">
                                        {errors.promTxt2}
                                    </p>
                                )}
                            </div>
                            <div className="form-group">
                                <label className="control-label">
                                    Promtion text 3:
                                    <input
                                        name="promTxt3"
                                        type="text"
                                        value={inputs.promTxt3}
                                        onChange={this.handleChange}
                                    />
                                </label>

                                {errors.promTxt3 && (
                                    <p className="text-danger">
                                        {errors.promTxt3}
                                    </p>
                                )}
                            </div>
                            <label>Edit Photos :</label>
                            <br />

                            <label className="control-label">
                                Promotion photo 1:
                                <img
                                    src={`/storage/shop_img/${this.props.shop.img1}`}
                                    style={{ height: "70px", width: "105px" }}
                                />
                                <input
                                    type="file"
                                    name="promPic"
                                    onChange={this.onPromChange}
                                />
                            </label>
                            <br />

                            <label className="control-label">
                                Promotion photo 2:
                                <img
                                    src={`/storage/shop_img/${this.props.shop.img2}`}
                                    style={{ height: "70px", width: "105px" }}
                                />
                                <input
                                    type="file"
                                    name="promPic2"
                                    onChange={this.onPromChange2}
                                />
                            </label>
                            <br />
                            <label className="control-label">
                                Promotion photo 3:
                                <img
                                    src={`/storage/shop_img/${this.props.shop.img3}`}
                                    style={{ height: "70px", width: "105px" }}
                                />
                                <input
                                    type="file"
                                    name="promPic3"
                                    onChange={this.onPromChange3}
                                />
                            </label>
                            <br />
                            <br />
                            <div className="form-group">
                                <label className="control-label">
                                    If you want offer the customers a certain
                                    price off, you can set its percentage for
                                    all food here.
                                    <br />
                                    Offer :
                                    <input
                                        name="offer"
                                        type="number"
                                        size="5"
                                        min="1"
                                        max="40"
                                        className="ml-2"
                                        value={inputs.offer}
                                        onChange={this.handleChange}
                                    />
                                    <span>%</span>
                                </label>

                                {errors.offer && (
                                    <p className="text-danger">
                                        {errors.offer}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                form="promForm"
                                className="btn btn-info"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                ) : (
                    "No shop data"
                )}
            </div>
        );
        //} else return "" + JSON.stringify(this.state.inputs);
        //+ JSON.stringify(this.props.shop.img);
    }
}

export default UpdateProm;
