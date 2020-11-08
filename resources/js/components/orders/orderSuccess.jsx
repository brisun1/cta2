import React, { Component, useEffect } from "react";
import OrderDetail from "./orderDetail";
import FoodDetail from "./foodDetail";
import Shop from "./shop";
class OrderSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = { food: [], order: {} };
    }

    componentDidMount = () => {
        axios

            //.post("api/menu/store/?shop_id=" + this.props.shopId, data, {})
            .get(
                "api/order/custShow/" + this.props.orderTblString,

                { baseURL: "/" }
            )

            .then(res => {
                // then print response status
                console.log("show order data" + JSON.stringify(res.data));
                // if (res.data == "order success") {
                //     console.log(res.statusText);

                // }
                const { food } = res.data;
                const order = res.data.order.data;
                if (food.data) {
                    this.setState({ food: food.data });
                }
                if (order) {
                    this.setState({ order: order[0] });
                }
            });
    };

    render() {
        const { order } = this.state;
        const { shop } = this.props;
        return (
            <div>
                <h5>Order Success</h5>
                <hr />
                <div className="text-success">
                    You have ordered successfully!
                </div>
                {order.clientRes ? (
                    <h5>
                        {shop.shopName} says: They have received your order.
                        They will work on it a.s.a.p..
                    </h5>
                ) : (
                    <div>
                        You can check the {shop.shopName}'s response later. For
                        better ordering experience ...
                    </div>
                )}
                <hr />
                <div>Your order details:</div>
                <FoodDetail foods={this.state.food} />
                <OrderDetail order={order} />
                <Shop shop={this.props.shop} />
            </div>
        );
    }
}

export default OrderSuccess;
