import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

export default class Facia extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         //value: this.props.value,
    //         shop: []
    //     };
    // }

    render() {
        //console.log("oooooooooo" + JSON.stringify(this.props));
        const { shop, num } = this.props;

        return (
            <div key={"shopb" + num}>
                <Link to={`/orderMenu/${shop.id}`}>
                    <img
                        src={`/storage/shop_img/${shop.img}`}
                        style={{ maxHeight: 110, width: "50%" }}
                        className=" mx-auto d-block  "
                    />
                </Link>
                <div className=" d-flex justify-content-center">
                    <div key={"name" + num} className="bg-light">
                        {shop.shopName}
                    </div>
                    <div key={"addr" + num} className="bg-light ml-4">
                        Address:{shop.addr}
                    </div>
                    <div key={"ph" + num} className="bg-light ml-4">
                        Ph:{shop.phone}
                    </div>
                </div>

                <br />
                <br />
            </div>
        );
    }
}
