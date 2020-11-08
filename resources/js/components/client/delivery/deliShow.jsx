import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

export default class DeliShow extends Component {
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
            }
        };
    }

    componentDidMount() {
        axios.get("api/delivery/show").then(res => {
            // if (res.data) console.log("in delishow" + JSON.stringify(res.data));
            if (res.data.meta.shop_id === this.props.shop.id)
                this.setState({
                    delivery: res.data.data
                });
        });
    }
    render() {
        const { delivery } = this.state;
        return (
            <div>
                <h6 className="text-center">Delivery Price List</h6>
                <h6 className="text-center">送餐价格表</h6>
                <hr />
                <table className="table table-bordeed">
                    <thead>
                        <tr>
                            <td>{"  "}</td>
                            <td>Distance</td>
                            <td>Price(€)</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>1 km</td>
                            <td>{delivery.dist1}</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>1.5km</td>
                            <td>{delivery.dist15}</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>2km</td>
                            <td>{delivery.dist2}</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>2.5km</td>
                            <td>{delivery.dist25}</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>3km</td>
                            <td>{delivery.dist3}</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>4km</td>
                            <td>{delivery.dist4}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Served area distance limit</td>
                            <td>{delivery.servLimit}km</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
