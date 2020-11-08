import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
//import { useFormik } from "formik";

class EditShop extends Component {
    constructor(props) {
        super(props);
        //const { shop } = this.props;
        this.state = {
            //ownerName: this.props.ownerName,
            //cterMobl: this.props.cterMobl,
            inputs: this.props.shop,
            //{
            // shopName: shop.name,
            // addr: shop.addr,
            // area: shop.area,
            // phone: shop.phone,
            // ownerName: shop.owner_name,
            // ownerMobl: shop.owner_mobl,
            // cterMobl: shop.cter_mobl,
            // orderMobl: shop.order_mobl,

            // weekOpen: shop.weekOpen,
            // weekClose: shop.weekClose,
            // friOpen: shop.friOpen,
            // friClose: shop.friClose,
            // satOpen: shop.satOpen,
            // satClose: shop.satClose,
            // sunOpen: shop.sunOpen,
            // sunClose: shop.sunClose,
            // promTxt1: shop.promTxt1,
            // promTxt2: shop.promTxt2,
            // promTxt3: shop.promTxt3
            // },
            selectedFile: null,
            promPic: null,
            promPic2: null,
            promPic3: null,
            errors: {
                shopName: "",
                addr: "",
                area: "",
                phone: "",
                ownerName: "",
                ownerMobl: "",
                cterMobl: "",
                orderMobl: "",
                // img: "",
                // img2: "",
                // img1: "",
                // img3: "",
                weekOpen: "",
                weekClose: "",
                friOpen: "",
                friClose: "",
                friOpen: "",
                satClose: "",
                satOpen: "",
                satClose: "",
                sunOpen: "",
                sunClose: "",
                promTxt1: "",
                promTxt2: "",
                promTxt3: ""
            }
        };
    }

    handleChange = event => {
        const { name, value } = event.target;
        var inputs = { ...this.state.inputs };
        inputs[name] = value;

        this.setState({ inputs });

        let errors = this.state.errors;

        switch (name) {
            case "shopName":
                errors.shopName =
                    value.length < 5
                        ? "Full Name must be 5 characters long!"
                        : "";
                break;
            case "addr":
                errors.addr =
                    value.length < 5
                        ? "Address must be 5 characters long!"
                        : "";
                break;
            case "area":
                errors.area =
                    value.length < 5 ? "Area must be 5 characters long!" : "";
                break;
            case "phone":
                errors.phone =
                    value.length < 5 ? "phone must be 5 characters long!" : "";
                break;
            case "ownerName":
                errors.ownerName =
                    value.length < 5
                        ? "ownerName must be 5 characters long!"
                        : "";
                break;
            case "ownerMobl":
                errors.ownerMobl =
                    value.length < 5
                        ? "ownerMobl must be 5 characters long!"
                        : "";
                break;
            case "cterMobl":
                errors.cterMobl =
                    value.length < 5
                        ? " counter Mobl must be 5 characters long!"
                        : "";
                break;
            case "orderMobl":
                errors.orderMobl =
                    value.length < 5
                        ? "orderMobl must be 5 characters long!"
                        : "";
                break;

            case "weekOpen":
                errors.weekOpen =
                    value.length < 2
                        ? "Open at must be 2 characters long!"
                        : "";
                break;
            case "weekClose":
                errors.weekClose =
                    value.length < 2
                        ? "closeAt must be 2 characters long!"
                        : "";
                break;
            case "friOpen":
                errors.friOpen =
                    value.length < 2
                        ? "Open at must be 2 characters long!"
                        : "";
                break;
            case "friClose":
                errors.friClose =
                    value.length < 2
                        ? "closeAt must be 2 characters long!"
                        : "";
                break;
            case "satOpen":
                errors.satOpen =
                    value.length < 2
                        ? "Open at must be 2 characters long!"
                        : "";
                break;
            case "satClose":
                errors.satClose =
                    value.length < 2
                        ? "closeAt must be 2 characters long!"
                        : "";
                break;
            case "sunOpen":
                errors.sunOpen =
                    value.length < 2
                        ? "Open at must be 2 characters long!"
                        : "";
                break;
            case "sunClose":
                errors.sunClose =
                    value.length < 2
                        ? "closeAt must be 2 characters long!"
                        : "";
                break;

            default:
                break;
        }

        this.setState({ errors, [name]: value }, () => {
            console.log(errors);
        });
    };
    onFileChange = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0
        });
    };

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
        data.append("image", this.state.selectedFile);
        if (this.state.promPic) data.append("promPic", this.state.promPic);
        if (this.state.promPic2) data.append("promPic2", this.state.promPic2);
        if (this.state.promPic3) data.append("promPic3", this.state.promPic3);
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
        console.log("dddd" + JSON.stringify(data));

        axios
            .post("api/shop/update", data, {
                params: {
                    _method: "PUT"
                }
            })

            .then(res => {
                // then print response status

                //console.log("res" + JSON.stringify(res));
                if (res.data == "shop success")
                    window.location.replace("/dashBoard");
            });
    };

    render() {
        const { inputs, errors } = this.state;
        return (
            <div>
                <br />
                <br />
                <h5 className="text-center">Edit Shop</h5>
                <hr />
                <form onSubmit={this.handleSubmit} className="form-horizontal">
                    <div className="form-group">
                        <label className="control-label">
                            Shop name:
                            <input
                                name="shopName"
                                type="text"
                                value={inputs.shopName}
                                onChange={this.handleChange}
                            />
                        </label>

                        {errors.shopName && (
                            <p className="text-danger">{errors.shopName}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="control-label">
                            Shop address:
                            <input
                                name="addr"
                                type="text"
                                value={inputs.addr}
                                onChange={this.handleChange}
                            />
                        </label>

                        {errors.addr && (
                            <p className="text-danger">{errors.addr}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="control-label">
                            Shop area:
                            <input
                                name="area"
                                type="text"
                                value={inputs.area}
                                onChange={this.handleChange}
                            />
                        </label>

                        {errors.area && (
                            <p className="text-danger">{errors.area}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="control-label">
                            Shop phone:
                            <input
                                name="phone"
                                type="text"
                                value={inputs.phone}
                                onChange={this.handleChange}
                            />
                        </label>

                        {errors.phone && (
                            <p className="text-danger">{errors.phone}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="control-label">
                            Shop owner's name:
                            <input
                                name="ownerName"
                                type="text"
                                value={inputs.ownerName}
                                onChange={this.handleChange}
                            />
                        </label>
                        {errors.ownerName && (
                            <p className="text-danger">{errors.ownerName}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="control-label">
                            Shop owner's mobile:
                            <input
                                name="ownerMobl"
                                type="text"
                                value={inputs.ownerMobl}
                                onChange={this.handleChange}
                            />
                        </label>

                        {errors.ownerMobl && (
                            <p className="text-danger">{errors.ownerMobl}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="control-label">
                            Counter's mobile:
                            <input
                                name="cterMobl"
                                type="text"
                                value={inputs.cterMobl}
                                onChange={this.handleChange}
                            />
                        </label>

                        {errors.cterMobl && (
                            <p className="text-danger">{errors.cterMobl}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="control-label">
                            Order mobile for web use:
                            <input
                                name="orderMobl"
                                type="text"
                                value={inputs.orderMobl}
                                onChange={this.handleChange}
                            />
                        </label>

                        {errors.orderMobl && (
                            <p className="text-danger">{errors.orderMobl}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="control-label">
                            Monday-Thursday open time:
                            <input
                                name="weekOpen"
                                type="time"
                                value={inputs.weekOpen}
                                onChange={this.handleChange}
                            />
                        </label>

                        {errors.weekOpen && (
                            <p className="text-danger">{errors.weekOpen}</p>
                        )}

                        <label className="control-label ml-3">
                            close time:
                            <input
                                name="weekClose"
                                type="time"
                                value={inputs.weekClose}
                                onChange={this.handleChange}
                            />
                        </label>
                        {errors.weekClose && (
                            <p className="text-danger">{errors.weekClose}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="control-label">
                            Friday open time:
                            <input
                                name="friOpen"
                                type="time"
                                value={inputs.friOpen}
                                onChange={this.handleChange}
                            />
                        </label>

                        {errors.friOpen && (
                            <p className="text-danger">{errors.friOpen}</p>
                        )}

                        <label className="control-label ml-3">
                            close time:
                            <input
                                name="friClose"
                                type="time"
                                value={inputs.friClose}
                                onChange={this.handleChange}
                            />
                        </label>
                        {errors.friClose && (
                            <p className="text-danger">{errors.friClose}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="control-label">
                            Saturday open time:
                            <input
                                name="satOpen"
                                type="time"
                                value={inputs.satOpen}
                                onChange={this.handleChange}
                            />
                        </label>

                        {errors.satOpen && (
                            <p className="text-danger">{errors.satOpen}</p>
                        )}

                        <label className="control-label ml-3">
                            close time:
                            <input
                                name="satClose"
                                type="time"
                                value={inputs.satClose}
                                onChange={this.handleChange}
                            />
                        </label>
                        {errors.satClose && (
                            <p className="text-danger">{errors.satClose}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="control-label">
                            Sunday open time:
                            <input
                                name="sunOpen"
                                type="time"
                                value={inputs.sunOpen}
                                onChange={this.handleChange}
                            />
                        </label>

                        {errors.sunOpen && (
                            <p className="text-danger">{errors.sunOpen}</p>
                        )}
                        <label className="control-label ml-3">
                            close time:
                            <input
                                name="sunClose"
                                type="time"
                                value={inputs.sunClose}
                                onChange={this.handleChange}
                            />
                        </label>
                        {errors.sunClose && (
                            <p className="text-danger">{errors.sunClose}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="control-label">
                            Promtion and offers text 1:
                            <input
                                name="promTxt1"
                                type="text"
                                value={inputs.promTxt1}
                                onChange={this.handleChange}
                            />
                        </label>

                        {errors.promTxt1 && (
                            <p className="text-danger">{errors.promTxt1}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="control-label">
                            Promtion and offers text 2:
                            <input
                                name="promTxt2"
                                type="text"
                                value={inputs.promTxt2}
                                onChange={this.handleChange}
                            />
                        </label>

                        {errors.promTxt2 && (
                            <p className="text-danger">{errors.promTxt2}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="control-label">
                            Promtion and offers text 3:
                            <input
                                name="promTxt3"
                                type="text"
                                value={inputs.promTxt3}
                                onChange={this.handleChange}
                            />
                        </label>

                        {errors.promTxt3 && (
                            <p className="text-danger">{errors.promTxt3}</p>
                        )}
                    </div>
                    <label>Edit Photos :</label>
                    <br />
                    <label className="control-label">
                        Shop facia photo:
                        <img
                            src={`/storage/shop_img/${this.props.shop.img}`}
                            style={{ height: "100px", width: "200px" }}
                        />
                        <input
                            type="file"
                            name="image"
                            onChange={this.onFileChange}
                        />
                    </label>
                    <br />

                    <label className="control-label">
                        Promotion and offers photo 1:
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
                        Promotion and offers photo 2:
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
                        Promotion and offers photo 3:
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
                    <input
                        type="submit"
                        className="btn btn-info"
                        value="Update"
                    />
                </form>
            </div>
        );
    }
}
export default EditShop;
