import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

export default class DeliveryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delivery: {
                dist1: "",
                dist15: "",
                dist2: "",
                dist25: "",
                dist3: "",
                dist4: "",
                servLimit: ""
            },
            errors: {
                dist1: "",
                dist15: "",
                dist2: "",
                dist25: "",
                dist3: "",
                dist4: "",
                servLimit: ""
            }
        };
    }

    handleChange = event => {
        const { name, value } = event.target;
        const delivery = { ...this.state.delivery };
        delivery[name] = value;
        this.setState({ delivery });

        let errors = this.state.errors;

        switch (name) {
            case "dist1":
                errors.dist1 =
                    value.length > 5
                        ? "Address must be less 5 characters!"
                        : "";
                break;
            case "dist15":
                errors.addr =
                    value.length > 5
                        ? "Address must be 5 characters long!"
                        : "";
                break;
            case "dist2":
                errors.addr =
                    value.length > 5
                        ? "Address must be 5 characters long!"
                        : "";
                break;
            case "dist25":
                errors.addr =
                    value.length > 5
                        ? "Address must be 5 characters long!"
                        : "";
                break;
            case "dist3":
                errors.addr =
                    value.length > 5
                        ? "Address must be 5 characters long!"
                        : "";
                break;
            case "dist4":
                errors.addr =
                    value.length > 5
                        ? "Address must be 5 characters long!"
                        : "";
                break;
            case "servLimit":
                errors.addr =
                    value.length > 5
                        ? "Address must be 5 characters long!"
                        : "";
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value }, () => {
            console.log(errors);
        });
    };

    handleSubmit = event => {
        alert("shop name was submitted22222: ");
        event.preventDefault();

        axios
            .post(
                "api/delivery/store/" + this.props.shop.id,
                this.state.delivery
            )

            .then(res => {
                // then print response status
                if (res.data == "delivery success") window.location.reload();
            });
    };

    render() {
        const { delivery, errors } = this.state;
        return (
            <div>
                <br />
                <h6 className="text-center">Delivery Price Registration</h6>
                <h6 className="text-center">送餐价格登记表</h6>
                <hr />
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label className="control-label">
                            Distance 1km:
                            <input
                                name="dist1"
                                type="text"
                                placeholder="€ price"
                                value={this.state.delivery.dis1}
                                onChange={this.handleChange}
                            />
                        </label>
                        {errors.dist1 && (
                            <p className="text-danger">{errors.dist1}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="control-label">
                            Distance 1.5 km:
                            <input
                                name="dist15"
                                type="text"
                                placeholder="€ price"
                                value={this.state.delivery.dis15}
                                onChange={this.handleChange}
                            />
                        </label>
                        {errors.dist15 && (
                            <p className="text-danger">{errors.dist15}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="control-label">
                            Distance 2 km:
                            <input
                                name="dist2"
                                type="text"
                                placeholder="€ price"
                                value={delivery.dis2}
                                onChange={this.handleChange}
                            />
                        </label>
                        {errors.dist2 && (
                            <p className="text-danger">{errors.dist2}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="control-label">
                            Distance 2.5 km:
                            <input
                                name="dist25"
                                type="text"
                                placeholder="€ price"
                                value={delivery.dist25}
                                onChange={this.handleChange}
                            />
                        </label>
                        {errors.dist25 && (
                            <p className="text-danger">{errors.dist25}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="control-label">
                            Distance 3 km:
                            <input
                                name="dist3"
                                type="text"
                                placeholder="€ price"
                                value={delivery.dist3}
                                onChange={this.handleChange}
                            />
                        </label>
                        {errors.dist3 && (
                            <p className="text-danger">{errors.dist3}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="control-label">
                            Distance 4km:
                            <input
                                name="dist4"
                                type="text"
                                placeholder="€ price"
                                value={delivery.dist4}
                                onChange={this.handleChange}
                            />
                        </label>
                        {errors.dist4 && (
                            <p className="text-danger">{errors.dist4}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="control-label">
                            Served area distance limit: km <br />
                            最远服务距离：公里
                            <input
                                name="servLimit"
                                type="text"
                                placeholder="km distance"
                                value={delivery.servLimit}
                                onChange={this.handleChange}
                            />
                        </label>
                        {errors.servLimit && (
                            <p className="text-danger">{errors.servLimit}</p>
                        )}
                    </div>
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

// if (document.getElementById("shopForm")) {
//     ReactDOM.render(<CreateShop />, document.getElementById("shopForm"));
// }
