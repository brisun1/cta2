import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    withRouter,
    Redirect
} from "react-router-dom";
import ReactDOM from "react-dom";
import Echo from "laravel-echo";
//import ClientShops from "./shop/client/clientShops";
//import CreateShop from "../components/shop/createShop";
import MenuForm from "./menu/menuForm";
import ClientMenu from "./menu/clientMenu";
import Orders from "./orders/orders";

//import FoodDetail from "./menu/foodDetail2";

const ClientApp = props => {
    console.log("in client app" + JSON.stringify(props));
    const [order, setOrder] = useState([]);
    const [userId, setUserId] = useState();
    const [redirect, setRedirect] = useState(false);
    const [customer, setCustomer] = useState([]);
    const [food, setFood] = useState([]);

    // let echo = new Echo({
    //     broadcaster: "socket.io",
    //     // client: Socketio,
    //     host: window.location.hostname + ":6001"
    // });

    // echo.private("order." + userId)
    //     // .notification(notification => {
    //     //     console.log("note" + JSON.stringify(notification));
    //     //     let note = [...notn];
    //     //     note.push(notification);
    //     //     setNotn(note);
    //     // })
    //     .listen(".UserEvent", e => {
    //         //if (props.history.location.pathname == "dashBoard") {
    //         let custm = [...customer];
    //         custm.push(e.customer);
    //         setCustomer(custm);
    //         let foo = [...food];
    //         foo.push(e.food.data);
    //         setFood(foo);
    //         //console.log("almosthere in cApp" + JSON.stringify(e));
    //         console.log(
    //             "alcustmer in capp" + JSON.stringify(props.history.location)
    //         );
    //         //}
    //     });
    useEffect(() => {
        (async () => {
            //console.log("from ui DidM");
            let res = await axios.get("api/order/show");
            //console.log("from ui DidM" + JSON.stringify(res.data));

            //console.log("client APP didm called" + this.state.order.length);
            const data = await res.data;
            if (data === "") {
                setRedirect(true);
            } else if (data.data.length > 0) {
                //console.log("from ui DidMddddd" + JSON.stringify(res.data));
                setOrder(data.data);
                setUserId(data.auth.user_id);
            }

            // axios.get("api/shop/show").then(res => {
            //     console.log("from ui DidM" + JSON.stringify(res));
            //     this.setState({
            //         shop: res.data
            //     });
            // });
        })();
    }, []);

    if (redirect)
        return (
            <Redirect
                to={{
                    pathname: "/clientShops",
                    state: { orderMsg: "testing msg hhh" }
                }}
            />
        );
    else {
        return (
            <div>
                <br />
                <h5 className="text-center">Order's Page</h5>
                {/* <NewOrder user_id={userId} /> */}
                {/* <div>{customer[0].contactPh}</div> */}
                <Orders
                    orders={order}
                    user_id={userId}
                    customer={customer}
                    food={food}
                />
            </div>
        );
    }

    // return
};

export default withRouter(ClientApp);
// if (document.getElementById("client222")) {
//     ReactDOM.render(<Client />, document.getElementById("client222"));
// }
