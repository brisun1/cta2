import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import formValidate from "../validation/formValidate";
//import { useFormik } from "formik";

export default class CreateShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                shopName: "",
                addr: "",
                area: "",
                phone: "",
                ownerName: "",
                ownerMobl: "",
                cterMobl: "",
                orderMobl: "",

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
            },
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
        const { errors } = this.state;
        if (errors[name]) this.validateInput();
        //this.setState({errors});
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
    handleSubmit = async event => {
        event.preventDefault();
        let errors = formValidate();
        if (errors) this.setState({ errors });
        else {
            //setErrors(validate());
            //axios.post("api/clientForm", this.state).then(response => {});
            const data = new FormData();
            // for (var x = 0; x < this.state.selectedFile.length; x++) {
            //     data.append("image", this.state.selectedFile[x]);
            // }
            data.append("image", this.state.selectedFile);
            if (this.state.promPic) data.append("promPic", this.state.promPic);
            if (this.state.promPic2)
                data.append("promPic2", this.state.promPic2);
            if (this.state.promPic3)
                data.append("promPic3", this.state.promPic3);
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
            ////
            try {
                let res = await axios.post("api/shop/store", data, {});
                if (res.status === 200 && res.data == "shop success")
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
            ////
            // axios
            //     .post("api/shop/store", data, {})

            //     .then(res => {
            //         if (res.status === 422) {
            //             //console.log("errordata" + data);
            //         }
            //         // then print response status
            //         //console.log("datadata" + data);
            //         //console.log(res);
            //         if (res.status === 200 && res.data == "shop success")
            //              window.location.replace("/dashBoard");
            //     });
        }
    };

    render() {
        const { inputs, errors } = this.state;
        return (
            <div>
                <br />
                <br />
                <h5 className="text-center">Shop Registration Form</h5>
                <hr />
                <form
                    noValidate
                    onSubmit={this.handleSubmit}
                    className="form-horizontal"
                >
                    <div className="form-group">
                        <label className="control-label">
                            Shop name:
                            <input
                                name="shopName"
                                type="text"
                                value={inputs.shopName}
                                onChange={this.handleChange}
                                onBlur={this.validateInput}
                                minLength={2}
                                maxLength={30}
                                required
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
                                onBlur={this.validateInput}
                                minLength={5}
                                maxLength={60}
                                required
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
                                onBlur={this.validateInput}
                                minLength={2}
                                maxLength={30}
                                required
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
                                type="tel"
                                value={inputs.phone}
                                onChange={this.handleChange}
                                onBlur={this.validateInput}
                                minLength={10}
                                maxLength={30}
                                required
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
                                onBlur={this.validateInput}
                                minLength={5}
                                maxLength={30}
                                required
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
                                type="tel"
                                value={inputs.ownerMobl}
                                onChange={this.handleChange}
                                onBlur={this.validateInput}
                                minLength={10}
                                maxLength={30}
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
                                type="tel"
                                value={inputs.cterMobl}
                                onChange={this.handleChange}
                                onBlur={this.validateInput}
                                minLength={10}
                                maxLength={30}
                                required
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
                                type="tel"
                                placeholder="optional"
                                value={inputs.orderMobl}
                                onChange={this.handleChange}
                                onBlur={this.validateInput}
                                minLength={10}
                                maxLength={30}
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
                                onBlur={this.validateInput}
                                // minLength={5}
                                // maxLength={30}
                                required
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
                                onBlur={this.validateInput}
                                // minLength={5}
                                // maxLength={30}
                                required
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
                                onBlur={this.validateInput}
                                // minLength={5}
                                // maxLength={30}
                                required
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
                                onBlur={this.validateInput}
                                // minLength={5}
                                // maxLength={30}
                                required
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
                                onBlur={this.validateInput}
                                // minLength={5}
                                // maxLength={30}
                                required
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
                                onBlur={this.validateInput}
                                // minLength={5}
                                // maxLength={30}
                                required
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
                                onBlur={this.validateInput}
                                // minLength={5}
                                // maxLength={30}
                                required
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
                                onBlur={this.validateInput}
                                // minLength={5}
                                // maxLength={30}
                                required
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
                                onBlur={this.validateInput}
                                maxLength={120}
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
                                onBlur={this.validateInput}
                                maxLength={120}
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
                                maxLength={120}
                            />
                        </label>

                        {errors.promTxt3 && (
                            <p className="text-danger">{errors.promTxt3}</p>
                        )}
                    </div>
                    <label>Photos upload:</label>
                    <label className="control-label">
                        Shop facia photo:
                        <input
                            type="file"
                            name="image"
                            onChange={this.onFileChange}
                        />
                    </label>
                    <br />

                    <label className="control-label">
                        Promotion and offers photo 1:
                        <input
                            type="file"
                            name="promPic"
                            onChange={this.onPromChange}
                        />
                    </label>
                    <br />

                    <label className="control-label">
                        Promotion and offers photo 2:
                        <input
                            type="file"
                            name="promPic2"
                            onChange={this.onPromChange2}
                        />
                    </label>
                    <br />
                    <label className="control-label">
                        Promotion and offers photo 3:
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
                        value="Submit"
                    />
                </form>
            </div>
        );
    }
}
