import React, { useEffect, useState } from "react";

import {
    //BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from "react-router-dom";
import ReactDOM from "react-dom";
import ClientApp from "./client/clientApp";
//import Order from "./client/order";
//import ClientShops from "./shop/clientShops";
import ShopIndex from "./client/shop/shopIndex";
import { Icon } from "@iconify/react";
import homeIcon from "@iconify/icons-mdi-light/home";

import axios from "axios";
import { Router } from "react-router";
import history from "./history";
//import { createBrowserHistory } from "history";

//const history = createBrowserHistory();
function ClientIndex() {
    // const [orderMsg, setOrderMsg] = useState([]);
    // const [userId, setUserId] = useState();

    // let echo = new Echo({
    //     broadcaster: "socket.io",

    //     host: window.location.hostname + ":6001"
    // });

    // echo.private("order." + userId).notification(notification => {
    //     console.log("note in cindex" + JSON.stringify(notification));
    //     if (notification) {
    //         //let note = [...notn];
    //         //     note.push(notification);
    //         //     setNotn(note);
    //         let msgd = [...orderMsg];
    //         msgd.push(notification);
    //         // msgd.msg = notification.msg;
    //         // msgd.orderId = notification.orderId;

    //         setOrderMsg(msgd);
    //     }
    // });
    // const clearNote = () => {
    //     setOrderMsg([]);
    // };
    // useEffect(() => {
    //     axios.get("api/shop/user").then(res => {
    //         //console.log(res.data);
    //         setUserId(res.data);
    //     });
    // });
    //render() {
    return (
        <div>
            <a href="/">
                <Icon
                    icon={homeIcon}
                    style={{ fontSize: 30, color: "#f59542" }}
                />
                Home
            </a>
            <Router history={history}>
                <nav className="d-flex justify-content-around bg-success">
                    <NavLink
                        to="/dashBoard"
                        activeClassName="bg-warning pl-3 pr-3"
                    >
                        Orders
                    </NavLink>
                    <NavLink
                        to="/clientShops"
                        activeClassName="bg-warning pl-3 pr-3"
                    >
                        Shops
                    </NavLink>
                </nav>
                <Switch>
                    <Route path="/dashBoard">
                        <ClientApp />
                    </Route>
                    <Route exact path="/clientShops">
                        <ShopIndex />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
    //}
}

export default ClientIndex;
if (document.getElementById("client")) {
    ReactDOM.render(<ClientIndex />, document.getElementById("client"));
}
