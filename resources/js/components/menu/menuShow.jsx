import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
//import getDist from "../maps/getDist";
import { withRouter } from "react-router";
import Modal from "../others/modal";
import "../../../css/style.css";
class MenuShow extends Component {
    constructor(props) {
        super(props);

        const shop = this.props.shops.find(
            shop => shop.id == this.props.match.params.id
        );

        this.state = {
            shop: shop,
            menu: [],
            cats: [],
            frice: null,
            delivery: [],
            deliPrice: 2.5,
            isDeli: true,
            custAddr: "66 malahide road, dublin",
            modalOpen: false,
            //modalRadio: false,
            modalChecked: "",
            dist: ""
        };
    }
    // componentDidMount() {
    //     axios.get("/oauth/personal-access-tokens").then(response => {
    //         console.log(response.data);
    //     });
    // }
    handleOrder = (e, i) => {
        const menu = [...this.state.menu];

        menu[i].orderQty = 1;
        menu[i].subTotal = parseFloat(menu[i].price);
        this.setState({ menu });
        if (menu[i].isMain) {
            this.setState({ modalOpen: i + 1 });
        }
        //for modal
        //e.target.className += "disabled";

        // this.ref.current.style.backgroundColor = "#A9A9A9";
    };
    handleAdd = (e, i) => {
        const menu = [...this.state.menu];

        menu[i].orderQty++;
        menu[i].subTotal = menu[i].subTotal + parseFloat(menu[i].price);
        this.setState({ menu });
        if (menu[i].isMain) {
            this.setState({ modalOpen: i + 1 });
        }
    };
    handleDelete = (e, i) => {
        const menu = [...this.state.menu];
        menu[i].orderQty = null;
        menu[i].subTotal = null;
        menu[i].mainAttach = ["", "", "", ""];
        this.setState({ menu });
    };
    getDeliPrice = () => {
        // const url="https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=enc:_kjwFjtsbMt%60EgnKcqLcaOzkGari%40naPxhVg%7CJjjb%40cqLcaOzkGari%40naPxhV:&key=YOUR_API_KEY"
        // axios.get(url).then(
        //const { addr } = this.props.shop;
        //get distance from google map
        //get price from deliver array
        //maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=enc:_kjwFjtsbMt%60EgnKcqLcaOzkGari%40naPxhVg%7CJjjb%40cqLcaOzkGari%40naPxhV:&key=YOUR_API_KEY
        // https:
        return 2.5;
    };
    // googleDis = () => {
    //     var origin1 = new google.maps.LatLng(55.930385, -3.118425);
    //     var origin2 = "Greenwich, England";
    //     var destinationA = "Stockholm, Sweden";
    //     var destinationB = new google.maps.LatLng(50.087692, 14.42115);

    //     var service = new google.maps.DistanceMatrixService();
    //     service.getDist(
    //         {
    //             origins: [origin1, origin2],
    //             destinations: [destinationA, destinationB],
    //             travelMode: "DRIVING",

    //             unitSystem: google.maps.UnitSystem.METRIC,
    //             avoidHighways: false,
    //             avoidTolls: false
    //         },
    //         callback
    //     );

    //      function callback(response, status) {
    //         if (status !== "OK") {
    //             alert("Error was: " + status);
    //         } else {
    //             console.log("respppppp" + response);
    //         }
    //     }
    // };
    // googleTest = () => {
    //     const origin = "10 walkinstown avenue, dublin 12";
    //     const destination = "5 dame street,dublin 2";
    //     const url =
    //         "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" +
    //         origin +
    //         "&destination=" +
    //         destination +
    //         ":&key=AIzaSyBD6bth8x9c4ekzB3kBkAV288r1ir5PIwc";
    //     axios.get(url).then(res => {
    //         console.log("googlemm" + JSON.stringify(res));
    //     });
    // };
    // handleModal = (e, i) => {
    //     const { menu } = this.state;
    //     menu[i].mainAttach = e.target.value;
    //     this.setState({
    //         menu
    //     });
    // };
    handleRadio = event => {
        this.setState({
            deliPrice: event.target.value,
            isDeli: !this.state.isDeli
        });
    };
    getTotal = () => {
        const { menu } = this.state;
        let total = menu.reduce((total, a) => {
            return total + a.subTotal;
        }, 0);
        if (total) return total + Number(this.state.deliPrice);
    };
    // handleCustAddr = e => {
    //     this.setState({ custAddr: e.target.value });
    // };

    handleCloseModal = () => {
        this.setState({ modalOpen: false });
    };
    handleConfirmSelect = (modalChecked, i) => {
        this.setState({ modalChecked });

        const menu = [...this.state.menu];

        switch (modalChecked) {
            case "chips":
                let undone = true;

                for (let j = 0; j < 3; j++) {
                    let k = 1;
                    if (menu[i - 1].mainAttach[j] == k + " chips ") {
                        menu[i - 1].mainAttach[j] = k + 1 + " chips ";
                        undone = false;
                    }
                }
                if (undone) {
                    for (let m = 0; m < 3; m++) {
                        if (menu[i - 1].mainAttach[m] == "") {
                            menu[i - 1].mainAttach[m] = "1 chips ";
                            break;
                        }
                    }
                }
                break;
            case "brice":
                let undonebr = true;

                for (let j = 0; j < 3; j++) {
                    let k = 1;
                    if (menu[i - 1].mainAttach[j] == k + " boiled rice ") {
                        menu[i - 1].mainAttach[j] = k + 1 + " boiled rice ";
                        undonebr = false;
                    }
                }
                if (undonebr) {
                    for (let m = 0; m < 3; m++) {
                        if (menu[i - 1].mainAttach[m] == "") {
                            menu[i - 1].mainAttach[m] = "1 boiled rice ";
                            break;
                        }
                    }
                }
                break;

            case "frice":
                let undonefr = true;

                for (let n = 0; n < 3; n++) {
                    let k = 1;
                    if (menu[i - 1].mainAttach[n] == k + " fried rice ") {
                        menu[i - 1].mainAttach[n] = k + 1 + " fried rice ";
                        undonefr = false;
                    }
                }
                if (undonefr) {
                    for (let m = 0; m < 3; m++) {
                        if (menu[i - 1].mainAttach[m] == "") {
                            menu[i - 1].mainAttach[m] = "1 fried rice ";
                            break;
                        }
                    }
                }

                menu[i - 1].subTotal += this.state.frice;
                break;
        }

        this.setState({ menu });
        this.setState({ modalOpen: false });
    };
    // getDeliPrice = () => {
    //     const dist = getDist(this.state.shop.addr, "66 malahide road, dublin");
    //     // console.log("goooggggggle" + dist);
    //     this.setState({ dist });
    //     //return dist;
    // };
    componentDidMount() {
        const shop1 = this.props.shops.find(
            shop => shop.id == this.props.match.params.id
        );
        // const str_tbl = this.props.match.params.id;
        console.log("stringtabhhhh" + JSON.stringify(shop1));
        const { shop } = this.state;
        let str_tbl = shop.shopName + shop.area + shop.id;
        //dilivery price should be passed in controller
        axios.get(`api/menu/show/${str_tbl}`, { baseURL: "/" }).then(res => {
            let sData = res.data;
            //console.log("whyresgggggg" + JSON.stringify(res.data));
            if (sData.length != 0) {
                let menu = sData.data;
                let cats = [];
                if (menu) {
                    if (menu.length > 2) {
                        console.log("from menu didM" + JSON.stringify(menu));
                        const attach = menu.pop();
                        menu.forEach(el => {
                            cats[el.catNum] = el.cat;
                            el.mainAttach = ["", "", "", ""];
                            el.orderQty = null;
                            el.subTotal = null;
                        });

                        //console.log("catnnn" + JSON.stringify(cats));
                        this.setState({
                            menu: menu,
                            cats: cats,
                            frice: parseFloat(attach.price)
                        });
                    }
                }
            }
        });
        //Delivery
        axios
            .get(`api/delivery/show/${this.state.shop.id}`, { baseURL: "/" })
            .then(res => {
                let dData = res.data;
                console.log("whyresggggggdelivery" + JSON.stringify(res.data));
                this.setState({ delivery: dDate });
                // if (sData.length != 0) {
                //     let menu = sData.data;
                //     let cats = [];
                //     if (menu) {
                //         if (menu.length > 2) {
                //             console.log("from menu didM" + JSON.stringify(menu));
                //             const attach = menu.pop();
                //             menu.forEach(el => {
                //                 cats[el.catNum] = el.cat;
                //                 el.mainAttach = ["", "", "", ""];
                //                 el.orderQty = null;
                //                 el.subTotal = null;
                //             });

                //             //console.log("catnnn" + JSON.stringify(cats));
                //             this.setState({
                //                 menu: menu,
                //                 cats: cats,
                //                 frice: parseFloat(attach.price)
                //             });

                //         }
                //     }
                // }
            });
    }

    getDist = () => {
        const origin = this.state.shop.addr;
        const destination = this.state.custAddr;
        // const origin = "10 walkinstown avenue, dublin 12";
        // const destination = "5 dame street,dublin 2";
        // var origin = { lat: 55.93, lng: -3.118 };

        // var destination = "Stockholm, Sweden";
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [destination],
                travelMode: "DRIVING",
                unitSystem: google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false
            },
            (response, status) => {
                //function(response, status) {
                if (status !== "OK") {
                    alert("Error was: " + status);
                } else {
                    // console.log("respoooppppp" + d + o);
                    console.log(
                        "respppppp" + response.rows[0].elements[0].distance.text
                    );
                    const dist = response.rows[0].elements[0].distance.text;
                    this.setState({ dist });
                }
            }
        );
    };

    render() {
        console.log("menu render state" + this.state.menu);
        const { menu, modalOpen } = this.state;

        const styleMenu = modalOpen ? { backgroundColor: "#A9A9A9" } : null;
        const styleBtn = modalOpen ? { opacity: 0.4 } : null;
        if (menu.length == 0) {
            return (
                <div>
                    <div>pls up ur menu</div>
                </div>
            );
        } else
            return (
                <div className="menu" style={styleMenu}>
                    <button
                        onClick={
                            this.getDist
                            // this.state.shop.addr,
                            // this.state.custAddr
                        }
                    >
                        googl
                    </button>
                    <p>distance=========={this.state.dist}</p>
                    {/* <button
                        onClick={e =>
                            GetDist(this.state.shop.addr, this.state.custAddr)
                        }
                    >
                        googl compnent
                    </button>
                    <GetDist
                        addresses={[this.state.shop.addr, this.state.custAddr]}
                    /> */}
                    {this.state.modalOpen ? (
                        <div>
                            <Modal
                                //modalChecked={this.state.modalChecked}
                                frPrice={this.state.frice}
                                handleModalRadio={e => this.handleModalRadio(e)}
                                closeModal={this.handleCloseModal}
                                confirmSelect={modalChecked =>
                                    this.handleConfirmSelect(
                                        modalChecked,
                                        this.state.modalOpen
                                    )
                                }
                            />
                        </div>
                    ) : null}
                    <h6 className="text-center">Menu</h6>

                    <table className="table table-bordeed">
                        <thead>
                            <tr className="">
                                <td></td>
                                <td>Name</td>
                                <td>Rate</td>
                                <td>Note</td>
                                <td>Qty</td>
                                <td>Price</td>

                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.cats.map((cat, ci) => {
                                return (
                                    <Fragment key={"divk" + ci}>
                                        <tr className="">
                                            <td></td>
                                            <td></td>
                                            <td
                                                key={"c" + ci}
                                                id={"cat" + ci}
                                                name="cat"
                                                className=""
                                            >
                                                {cat}
                                            </td>
                                            <td></td>
                                        </tr>

                                        {this.state.menu.map((food, index) => {
                                            //where catnum==1

                                            if (food.catNum === ci) {
                                                return (
                                                    <tr
                                                        key={
                                                            "key" +
                                                            ci +
                                                            "-" +
                                                            index
                                                        }
                                                        id={
                                                            "row" +
                                                            ci +
                                                            "--" +
                                                            index
                                                        }
                                                        className={
                                                            food.orderQty > 0
                                                                ? "bg-info"
                                                                : ""
                                                        }
                                                    >
                                                        <td
                                                            key={
                                                                "fid" +
                                                                ci +
                                                                "" +
                                                                index
                                                            }
                                                            id={
                                                                "fid" +
                                                                ci +
                                                                "0" +
                                                                index
                                                            }
                                                            name="fid"
                                                        >
                                                            {food.fid}
                                                        </td>
                                                        <td
                                                            key={
                                                                "fn" +
                                                                ci +
                                                                "" +
                                                                index
                                                            }
                                                            id={
                                                                "fn" +
                                                                ci +
                                                                "0" +
                                                                index
                                                            }
                                                            name="fname"
                                                            className=""
                                                        >
                                                            {food.fname}

                                                            {food.isMain ? (
                                                                <span className="ml-2 text-danger font-italic">
                                                                    {
                                                                        food.mainAttach
                                                                    }
                                                                </span>
                                                            ) : null}
                                                        </td>
                                                        <td
                                                            key={
                                                                "price" +
                                                                ci +
                                                                "" +
                                                                index
                                                            }
                                                            id={
                                                                "price" +
                                                                ci +
                                                                "0" +
                                                                index
                                                            }
                                                            name="price"
                                                            className=""
                                                        >
                                                            {food.price}
                                                        </td>
                                                        <td
                                                            key={
                                                                "note" +
                                                                ci +
                                                                "" +
                                                                index
                                                            }
                                                            id={
                                                                "note" +
                                                                ci +
                                                                "0" +
                                                                index
                                                            }
                                                            name="note"
                                                            className=""
                                                        >
                                                            {food.note}
                                                        </td>
                                                        <td
                                                            key={
                                                                "qty" +
                                                                ci +
                                                                "" +
                                                                index
                                                            }
                                                            id={
                                                                "qty" +
                                                                ci +
                                                                "0" +
                                                                index
                                                            }
                                                            name="qty"
                                                            className=""
                                                        >
                                                            {food.orderQty}
                                                        </td>
                                                        <td
                                                            key={
                                                                "subtot" +
                                                                ci +
                                                                +index
                                                            }
                                                            id={
                                                                "subtot" +
                                                                ci +
                                                                "0" +
                                                                index
                                                            }
                                                            name="subTotal"
                                                            className=""
                                                        >
                                                            {Math.round(
                                                                food.subTotal *
                                                                    100
                                                            ) / 100}
                                                        </td>
                                                        <td>
                                                            <button
                                                                key={
                                                                    "btn" +
                                                                    ci +
                                                                    +index
                                                                }
                                                                id={
                                                                    "btn" +
                                                                    ci +
                                                                    "0" +
                                                                    index
                                                                }
                                                                name="order"
                                                                className=" btn btn-primary"
                                                                onClick={e =>
                                                                    this.handleOrder(
                                                                        e,

                                                                        index
                                                                    )
                                                                }
                                                                style={styleBtn}
                                                                disabled={
                                                                    this.state
                                                                        .modalOpen |
                                                                    food.orderQty
                                                                }
                                                            >
                                                                order
                                                            </button>

                                                            {/* <button
                                                                onClick={() =>
                                                                    this.handleOpenMadal(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                open modal
                                                                {index}
                                                            </button> */}

                                                            <button
                                                                key={
                                                                    "addbtn" +
                                                                    ci +
                                                                    +index
                                                                }
                                                                id={
                                                                    "addbtn" +
                                                                    ci +
                                                                    "0" +
                                                                    index
                                                                }
                                                                name="addorder"
                                                                className="ml-2 "
                                                                onClick={e =>
                                                                    this.handleAdd(
                                                                        e,
                                                                        index
                                                                    )
                                                                }
                                                                disabled={
                                                                    (food.orderQty <
                                                                        1) |
                                                                    (food.orderQty >
                                                                        50) |
                                                                    this.state
                                                                        .modalOpen
                                                                }
                                                            >
                                                                +
                                                            </button>
                                                            <button
                                                                className="ml-2 text-danger"
                                                                onClick={e =>
                                                                    this.handleDelete(
                                                                        e,
                                                                        index
                                                                    )
                                                                }
                                                                disabled={
                                                                    this.state
                                                                        .modalOpen
                                                                }
                                                            >
                                                                X
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        })}
                                    </Fragment>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td>Total:</td>
                                <td></td>
                                <td></td>

                                <td></td>
                                <td>
                                    {this.getTotal()
                                        ? this.getTotal().toFixed(2)
                                        : null}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <div>
                        <label>
                            <input
                                type="radio"
                                id="deli"
                                name="deli"
                                value={this.getDeliPrice()}
                                checked={this.state.isDeli == true}
                                onChange={this.handleRadio}
                            />
                            Delivery
                        </label>
                        <label>
                            <input
                                type="radio"
                                id="colle"
                                name="deli"
                                value={""}
                                checked={this.state.isDeli == false}
                                onChange={event => this.handleRadio(event)}
                            />
                            Collection
                        </label>
                        <div>{this.state.deliPrice}</div>
                        <br />
                        Please enter your delivery address
                        <input
                            type="text"
                            value={this.state.custAddr}
                            onChange={e => this.handleCustAddr(e)}
                        />
                        <input
                            type="text"
                            value={this.state.custAddr}
                            onChange={e => this.handleCustAddr(e)}
                        />
                    </div>
                </div>
            );
    }
}

export default withRouter(MenuShow);
