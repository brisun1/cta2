import React, { Component } from "react";
import FoodDetail2 from "../menu/foodDetail2";
import CustomerDetail from "./customerDetail";
import NewOrder from "./newOrder";
class Orders extends Component {
    constructor(props) {
        super(props);
        //console.log("propsppppp in constructor" + JSON.stringify(todayOrders));
        this.state = {
            // todayOrders: this.props.orders,
            user_id: this.props.user_id,
            week: 1,
            clicked: false
        };
    }
    playAudio = () => {
        //this.setState({ clicked: true });
        var x = document.getElementById("ordersAudio");
        //let x = new Audio("storage/sound.mp3");
        if (x) {
            console.log("in orders" + x.muted);
            x.play();
            // x.muted = false;
        }
    };

    pauseAudio = () => {
        var x = document.getElementById("myAudio");
        x.pause();
    };

    handlePrevious = () => {
        this.setState({ week: this.state.week - 1 });
    };
    handleNext = () => {
        this.setState({ week: this.state.week + 1 });
    };

    render() {
        let t = new Date();
        let today = new Date(t.getFullYear(), t.getMonth(), t.getDate(), -6);
        let dayAWeek = new Date(today.getTime() - 60 * 60 * 24 * 7 * 1000);
        let dayDWeek = new Date(today.getTime() - 60 * 60 * 24 * 7 * 1000 * 2);
        let dayTrWeek = new Date(today.getTime() - 60 * 60 * 24 * 7 * 1000 * 3);
        //let today=(now.getFullYear,);
        let todayOrders = [];
        let ordersAWeek = [];
        let ordersDWeek = [];
        let ordersTrWeek = [];
        //console.log("propsppppp in render D week" + JSON.stringify(dayDWeek));

        if (this.props.orders) {
            todayOrders = this.props.orders.filter(order => {
                let created_at = order.created_at;
                let y = created_at.substring(0, 4);
                let m = created_at.substring(5, 7);
                let d = created_at.substring(8, 10);
                let h = created_at.substring(11, 13);
                let timeStampdate = new Date(y, m - 1, d, h);
                //console.log("stamp" + JSON.stringify(timeStampdate));
                return timeStampdate.getTime() >= today.getTime();
            });
            ordersAWeek = this.props.orders.filter(order => {
                let created_at = order.created_at;
                let y = created_at.substring(0, 4);
                let m = created_at.substring(5, 7);
                let d = created_at.substring(8, 10);
                let h = created_at.substring(11, 13);
                let timeStampdate = new Date(y, m - 1, d, h);
                //console.log("stamp" + JSON.stringify(timeStampdate));
                return (
                    dayAWeek.getTime() <= timeStampdate.getTime() &&
                    timeStampdate.getTime() < today.getTime()
                );
            });
            ordersDWeek = this.props.orders.filter(order => {
                let created_at = order.created_at;
                let y = created_at.substring(0, 4);
                let m = created_at.substring(5, 7);
                let d = created_at.substring(8, 10);
                let h = created_at.substring(11, 13);
                let timeStampdate = new Date(y, m - 1, d, h);
                //console.log("stamp" + JSON.stringify(timeStampdate));
                return (
                    dayDWeek.getTime() <= timeStampdate.getTime() &&
                    timeStampdate.getTime() < dayAWeek.getTime()
                );
            });
            ordersTrWeek = this.props.orders.filter(order => {
                let created_at = order.created_at;
                let y = created_at.substring(0, 4);
                let m = created_at.substring(5, 7);
                let d = created_at.substring(8, 10);
                let h = created_at.substring(11, 13);
                let timeStampdate = new Date(y, m - 1, d, h);
                //console.log("stamp" + JSON.stringify(timeStampdate));
                return (
                    dayTrWeek.getTime() <= timeStampdate.getTime() &&
                    timeStampdate.getTime() < dayDWeek.getTime()
                );
            });
        }
        //console.log("d weekorders" + JSON.stringify(ordersDWeek));
        //console.log("today" + JSON.stringify(today));
        const { user_id } = this.props;

        return (
            <div>
                {todayOrders && (
                    <div>
                        <h6>Today's Order</h6>
                        <NewOrder
                            user_id={this.props.user_id}
                            customer={this.props.customer}
                            food={this.props.food}
                        />
                        {todayOrders.length > 0 ? (
                            todayOrders.map((order, i) => {
                                // const order = data[0];
                                // if (data.length > 0)
                                //put if here in case of the other shop
                                //has no order. It caused error!!!!!!
                                {
                                    return (
                                        <div
                                            key={"order" + i}
                                            className={
                                                order.clientRes[i]
                                                    ? ""
                                                    : "bg-warning"
                                            }
                                        >
                                            <div
                                                style={{
                                                    backgroundColor: "#e6e5e3",
                                                    height: 8
                                                }}
                                            >
                                                {"."}
                                            </div>
                                            <br />
                                            <div>
                                                Order No.:{order.id}
                                                <span className="float-right font-italics">
                                                    {order.created_at.substring(
                                                        11,
                                                        16
                                                    )}
                                                </span>
                                            </div>
                                            <FoodDetail2
                                                orderTblString={
                                                    order.orderFoodTbl
                                                }
                                            />
                                            <CustomerDetail order={order} />
                                            {/* <div>shop id:{order.shop_id}</div> */}
                                        </div>
                                    );
                                }
                            })
                        ) : (
                            <div>No order today</div>
                        )}
                        <div style={{ backgroundColor: "#6932a8" }}>_</div>
                    </div>
                )}
                {this.state.week === 1 && ordersAWeek && (
                    <div>
                        <h6>This Week</h6>
                        {ordersAWeek.length > 0 ? (
                            ordersAWeek.map((order, i) => {
                                return (
                                    <div key={"order" + i}>
                                        <div
                                            style={{
                                                backgroundColor: "#e6e5e3",
                                                height: 8
                                            }}
                                        >
                                            {"."}
                                        </div>
                                        <br />
                                        <div>Order No.:{order.id}</div>
                                        <div>
                                            {order.created_at.substring(0, 10)}

                                            <span className="float-right font-italics">
                                                {order.created_at.substring(
                                                    11,
                                                    16
                                                )}
                                            </span>
                                        </div>
                                        <FoodDetail2
                                            orderTblString={order.orderFoodTbl}
                                        />
                                        <CustomerDetail order={order} />
                                        {/* <div>shop id:{order.shop_id}</div> */}
                                    </div>
                                );
                            })
                        ) : (
                            <div>No order this week</div>
                        )}
                        <hr />
                    </div>
                )}
                {this.state.week === 2 && ordersDWeek && (
                    <div>
                        <h6>Last Week</h6>
                        {ordersDWeek.length > 0 ? (
                            ordersDWeek.map((order, i) => {
                                return (
                                    <div key={"order" + i}>
                                        <div
                                            style={{
                                                backgroundColor: "#e6e5e3",
                                                height: 8
                                            }}
                                        >
                                            {"."}
                                        </div>
                                        <br />
                                        <div>Order No.:{order.id}</div>
                                        <div className="">
                                            {order.created_at.substring(0, 10)}

                                            <span className="float-right font-italics ">
                                                {order.created_at.substring(
                                                    11,
                                                    16
                                                )}
                                            </span>
                                        </div>
                                        <FoodDetail2
                                            orderTblString={order.orderFoodTbl}
                                        />
                                        <CustomerDetail order={order} />
                                        {/* <div>shop id:{order.shop_id}</div> */}
                                    </div>
                                );
                            })
                        ) : (
                            <div>No order last week</div>
                        )}
                        <hr />
                    </div>
                )}
                {this.state.week === 3 && ordersTrWeek && (
                    <div>
                        <h6>The Week Before</h6>
                        {ordersTrWeek.length > 0 ? (
                            ordersTrWeek.map((order, i) => {
                                return (
                                    <div key={"order" + i}>
                                        <div
                                            style={{
                                                backgroundColor: "#e6e5e3",
                                                height: 8
                                            }}
                                        >
                                            {"."}
                                        </div>
                                        <br />
                                        <div>Order No.:{order.id}</div>
                                        <div className="">
                                            {order.created_at.substring(0, 10)}
                                        </div>
                                        <div className="float-right font-italics">
                                            {order.created_at.substring(11, 16)}
                                        </div>
                                        <FoodDetail2
                                            orderTblString={order.orderFoodTbl}
                                        />
                                        <CustomerDetail order={order} />
                                        {/* <div>shop id:{order.shop_id}</div> */}
                                    </div>
                                );
                            })
                        ) : (
                            <div>No order the week before</div>
                        )}
                        <hr />
                    </div>
                )}
                {this.state.week > 1 && (
                    <button
                        onClick={this.handlePrevious}
                        className="btn btn-primary mr-2"
                    >
                        {"<<<"}
                    </button>
                )}
                {this.state.week < 3 && (
                    <button
                        onClick={this.handleNext}
                        className="btn btn-primary"
                    >
                        {">>>"}
                    </button>
                )}
            </div>
        );
    }
}

export default Orders;
