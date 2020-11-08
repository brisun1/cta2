import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import Echo from "laravel-echo";
import Socketio from "socket.io-client";
import FoodDetail2 from "./foodDetail2";
import CustomerDetail from "./customerDetail";

function NewOrder(props) {
    const ref = useRef(false);
    //const { data, setData } = useState[""];
    const [customer, setCustomer] = useState([]);
    const [food, setFood] = useState([]);
    const [clientRes, setClientRes] = useState([]);
    const [play, setPlay] = useState(true);
    const [sound, setSound] = useState(true);
    let echo = new Echo({
        broadcaster: "socket.io",

        host: window.location.hostname + ":6001"
    });

    echo.private("order." + props.user_id)
        // .notification(notification => {
        //     console.log("note" + JSON.stringify(notification));
        // })
        .listen(".UserEvent", e => {
            // console.log(
            //     "fff" + ref.current + "in neworder" + JSON.stringify(e.customer)
            // );
            if (ref.current === true) {
                let custm = [...customer];
                custm.unshift(e.customer);
                if (e.customer.clientRes === 0) {
                    let crd = [...clientRes];
                    crd.unshift(false);
                    setClientRes(crd);
                }
                setCustomer(custm);
                let foo = [...food];
                foo.unshift(e.food.data);
                setFood(foo);
                // playAudio();

                //     var x = document.getElementById("dashAudio");
                //    // let x = new Audio("storage/sound.mp3");
                //     x.muted = true;
                //     x.play();
                //     x.muted = false;

                // x.muted = false;
                //x.play();
                //x.muted = false;
            }
        });
    function playAudio() {
        //this.setState({ clicked: true });
        var x = document.getElementById("newAudio");
        if (x) {
            console.log("in neworder" + x.muted);
            x.muted = true;
            x.play();
            x.muted = false;
        }
    }

    pauseAudio = () => {
        var x = document.getElementById("newAudio");
        x.pause();
        x.muted = false;
    };
    //const [audio, setAudio] = useState(new Audio("storage/sound.mp3"));
    useEffect(() => {
        //prevent state updating when unmounted
        ref.current = true;
        // setAudio(new Audio("storage/sound.mp3"));
        // audio.load();
        //var x = document.getElementById("newAudio");

        // console.log("in neworder" + x.muted);
        // x.muted = true;
        // console.log("in neworder2" + x.muted);
        // if (play === true) {
        //     x.play();
        //     setPlay(false);
        // }
        // console.log("in neworder3" + x.muted + "auto" + x.autoplay);
        // x.volume = 0.5;
        //x.muted = false;
        // }
        return () => {
            //at the end of useEffect, this component is unmounted
            ref.current = false;
        };
    }, []);

    const newOrderClicked = (i, orderFoodTbl) => {
        if (clientRes[i] === false) {
            let data = { clientRes: true };
            axios
                .post("api/order/clientUpdate/" + orderFoodTbl, data, {
                    baseURL: "/",
                    params: {
                        _method: "PUT"
                    }
                })

                .then(res => {
                    console.log("clientRes" + res.data);
                    if (res.data == "clientRes success") {
                        let cr = [...clientRes];
                        cr[i] = true;
                        setClientRes(cr);
                        pauseAudio();
                    }
                });
        }
    };
    function playAudio() {
        //this.setState({ clicked: true });
        var x = document.getElementById("newAudio");
        if (x) {
            x.play();
            x.muted = false;
            setTimeout(() => x.pause(), 25 * 60 * 1000);
        }
    }

    function pauseAudio() {
        var x = document.getElementById("newAudio");
        x.pause();
    }
    // const { customer, food } = props;

    if (customer.length > 0) {
        return (
            <div>
                <div>
                    <iframe
                        src="storage/bell.mp3"
                        allow="autoplay"
                        style={{ display: "none" }}
                        id="iframeAudioNew"
                    ></iframe>

                    <audio id="newAudio" autoPlay={false} muted="muted" loop>
                        <source src="storage/bell.mp3" type="audio/wav" />
                        Your browser does not support the audio element.
                    </audio>
                    {playAudio()}
                </div>
                {customer.map((cust, i) => {
                    if (Object.keys(cust).length > 0) {
                        // console.log("food" + food[i]);
                        return (
                            <div
                                id={"neworder" + i}
                                key={"neworder" + i}
                                className={clientRes[i] ? "" : "bg-warning"}
                                // style={{ backgroundColor: "#FF0000" }}
                                onClick={() =>
                                    newOrderClicked(i, cust.orderFoodTbl)
                                }
                            >
                                <h6 style={{ textDecoration: "underline" }}>
                                    New order:
                                </h6>
                                <div>
                                    Order No.:
                                    <span className="text-success">
                                        &nbsp;{cust.id}
                                    </span>
                                    <span className="float-right font-italics">
                                        {cust.created_at.substring(11, 16)}
                                    </span>
                                </div>
                                <FoodDetail2 foods={food[i]} />
                                <CustomerDetail order={cust} />
                            </div>
                        );
                    }
                })}
            </div>
        );
    } else
        return (
            <div>
                <br />
                <div>Waiting for new order . . . . . .</div>
                <hr />
            </div>
        );
}

export default NewOrder;
// if (document.getElementById("socket")) {
//     ReactDOM.render(<NewOrder />, document.getElementById("socket"));
// }
