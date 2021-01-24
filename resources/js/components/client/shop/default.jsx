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
import UpdateProm from "./UpdateProm";

class Default extends Component {
    state = {
        orderMFShow: false,
        promFShow: false
    };

    changeOrderMFShow = () => {
        this.setState({ promFShow: false });
        this.setState({ orderMFShow: !this.state.orderMFShow });
    };
    changePromFShow = () => {
        this.setState({ orderMFShow: false });
        this.setState({ promFShow: !this.state.promFShow });
    };
    // handleChange = event => {
    //     const { name, value } = event.target;
    //     var inputs = { ...this.state.inputs };
    //     inputs[name] = value;

    //     this.setState({ inputs });
    // };

    getLinks = () => {
        return (
            <>
                <NavLink
                    key="es"
                    to="/editShop"
                    className="mr-5"
                    activeClassName="bg-warning pl-3 pr-3"
                >
                    Edit Shop
                </NavLink>
                <NavLink
                    key="em"
                    to="/editMenu"
                    className="mr-5"
                    activeClassName="bg-warning pl-3 pr-3"
                >
                    Edit Menu
                </NavLink>

                <div className="nav-item dropdown">
                    <div
                        className="nav-link dropdown-toggle"
                        //href="#"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        Delivery Price
                    </div>
                    <div
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                    >
                        <NavLink
                            key="dst"
                            to="/createDeli"
                            className="dropdown-item text-primary"
                            activeClassName="bg-warning pl-3 pr-3"
                        >
                            Register Delivery Price
                        </NavLink>
                        <NavLink
                            key="delishow"
                            to="/deliShow"
                            className="dropdown-item text-primary"
                            activeClassName="bg-warning pl-3 pr-3"
                        >
                            Delivery Price List
                        </NavLink>
                        <NavLink
                            key="ed"
                            to="/deliUpdate"
                            className="dropdown-item text-primary"
                            activeClassName="bg-warning pl-3 pr-3"
                        >
                            Edit Delivery Price
                        </NavLink>
                    </div>
                </div>
                <div className="nav-item dropdown ">
                    <div
                        className="nav-link dropdown-toggle"
                        //href="#"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        Bank Account
                    </div>
                    <div
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                    >
                        <NavLink
                            key="bst"
                            to="/createBank"
                            className="dropdown-item text-primary"
                            activeClassName="bg-warning pl-3 pr-3"
                        >
                            Register Bank Account
                        </NavLink>
                        <NavLink
                            key="bsh"
                            to="/bankShow"
                            className="dropdown-item text-primary"
                            activeClassName="bg-warning pl-3 pr-3"
                        >
                            View Bank Account
                        </NavLink>
                        <NavLink
                            key="bu"
                            to="/bankUpdate"
                            className="dropdown-item text-primary mr-5"
                            activeClassName="bg-warning pl-3 pr-3"
                        >
                            Edit Bank Account
                        </NavLink>
                    </div>
                </div>
            </>
        );
    };

    render() {
        const { errors, inputs } = this.state;
        const { shop } = this.props;

        return (
            <div>
                {this.props.shop ? (
                    <div>
                        <h5 className="text-center"> Shop Administration</h5>
                        <hr />
                        <div className="font-italic">
                            {shop.shopName + "  " + shop.area}
                        </div>
                        <br />
                        <div>
                            <h6 className=""> Update Order Mobile</h6>
                            <p>
                                Once you have a new order, we'll send a text
                                message to your mobile phone(no garantee
                                received). The best place to see your order is
                                still to log in this website. If the number is
                                different, you can update it here. Please remind
                                your next new counter for this as well.
                            </p>
                            <div>
                                Your current order mobile:{" "}
                                {shop.orderMobl
                                    ? shop.orderMobl
                                    : shop.cterMobl}{" "}
                                <span>
                                    <button
                                        className="btn btn-primary ml-3"
                                        onClick={() => this.changeOrderMFShow()}
                                    >
                                        {this.state.orderMFShow && "Don't"}{" "}
                                        Update
                                    </button>
                                </span>
                            </div>

                            {this.state.orderMFShow && (
                                <UpdateOrderMobl
                                    id={shop.id}
                                    orderMobl={
                                        shop.orderMobl
                                            ? shop.orderMobl
                                            : shop.cterMobl
                                    }
                                    changeOrderMFShow={this.changeOrderMFShow}
                                />
                            )}
                        </div>
                        <div>
                            <hr />
                            <h6>Promotion and Offer</h6>
                            <p>
                                {" "}
                                You may have seasonal promotion and offer
                                sometimes. If you want to grab the customers
                                attention, click the button below to modify this
                                space in your shop facia,even when you have some
                                new food.
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={this.changePromFShow}
                            >
                                {this.state.promFShow && "Don't "}
                                Change
                            </button>
                            {this.state.promFShow && (
                                <UpdateProm shop={this.props.shop} />
                            )}
                        </div>

                        <hr />
                        <h6>Other nav links:</h6>
                        <div name="links">{this.getLinks()}</div>
                    </div>
                ) : (
                    <div>No shop data</div>
                )}
            </div>
        );
    }
}

export default Default;
