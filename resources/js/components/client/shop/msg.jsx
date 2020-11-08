import React, { useState, useEffect } from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    withRouter,
    Redirect
} from "react-router-dom";

//import MenuForm from "../menu/menuForm";
import Echo from "laravel-echo";

import history from "../../history";
function Msg(props) {
    //_isMounted = false;
    //console.log("propsssss" + props.location);
    const [orderMsg, setOrderMsg] = useState([]);
    const [userId, setUserId] = useState();

    let echo = new Echo({
        broadcaster: "socket.io",

        host: window.location.hostname + ":6001"
    });
    if (userId) {
        echo.private("order." + userId).notification(notification => {
            console.log("note in cindex" + JSON.stringify(notification));
            if (notification) {
                let msgd = [...orderMsg];
                msgd.push(notification.orderId);
                // msgd.msg = notification.msg;
                // msgd.orderId = notification.orderId;

                setOrderMsg(msgd);
            }
        });
    }
    function playAudio() {
        //this.setState({ clicked: true });
        var x = document.getElementById("msgAudio");
        //let x = new Audio("storage/sound.mp3");
        if (x) {
            console.log("in msg" + x.muted);
            //x.muted = true;
            x.play();
            x.muted = false;
            setTimeout(() => x.pause(), 25 * 60 * 1000);
        }
    }
    useEffect(() => {
        // console.log(
        //     "from Shopapp ui DidM" + JSON.stringify(props.history.location)
        // );
        axios
            .get("api/shop/user")
            .then(res => {
                if (res.data.id) setUserId(res.data.id);
            })
            .catch(error => {
                if (error.response.status === 401) {
                    console.clear();
                    return;
                } else console(error);
            });
    });

    function redirectToOrder() {
        history.push("/dashBoard");
        //console.log("in shop app" + JSON.stringify(props.history));
    }

    return (
        <div>
            <br />
            {orderMsg.length > 0 && (
                <div className="bg-warning">
                    <iframe
                        src="storage/bell.mp3"
                        allow="autoplay"
                        style={{ display: "none" }}
                        id="iframeAudioNew"
                    ></iframe>
                    <audio id="msgAudio" autoPlay={true} muted={true} loop>
                        <source src="storage/bell.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    {playAudio()}
                    {orderMsg.map((el, i) => {
                        return (
                            <div key={"msg" + i}>
                                <br />
                                You have a new order no. {el}! &nbsp;Please
                                check your Orders Page.
                                <span>
                                    <button
                                        className="btn btn-primary float-right"
                                        onClick={redirectToOrder}
                                    >
                                        Go to Orders
                                    </button>
                                </span>
                                <hr />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default withRouter(Msg);
