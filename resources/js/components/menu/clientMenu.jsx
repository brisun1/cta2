import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
//import GetDist from "../maps/getDist";
class ClientMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menu: [],
            cats: [],
            isMains: []
        };
    }
    // componentDidMount() {
    //     axios.get("/oauth/personal-access-tokens").then(response => {
    //         console.log(response.data);
    //     });
    // }

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

    componentDidMount() {
        // const { shop } = this.props;
        // let str_tbl = shop.name + shop.area + shop.id;
        console.log("params string" + this.props.tblString);
        //dilivery price should be passed in controller
        axios.get(`api/menu/show/${this.props.tblString}`).then(res => {
            let sData = res.data;
            console.log("whyres" + JSON.stringify(res.data));
            if (sData.length != 0) {
                let menu = sData.data;
                let cats = [];
                let isMains = [];

                menu.forEach(el => {
                    cats[el.catNum] = el.cat;
                    isMains[el.catNum] = el.isMain;
                });
                //console.log("catnnn" + JSON.stringify(cats));
                this.setState({
                    menu: menu,
                    cats: cats,
                    isMains: isMains
                });
            }
        });
    }

    render() {
        console.log("menu render state" + this.state.menu);
        const { menu } = this.state;
        if (menu.length == 0) {
            return (
                <div>
                    <div>pls up ur menu</div>
                </div>
            );
        } else
            return (
                <div>
                    <br />
                    <h5 className="text-center">Menu</h5>
                    <hr />
                    <table className="table ">
                        <thead>
                            <tr>
                                <td scope="col">Number</td>
                                <td scope="col">Name</td>
                                <td scope="col">Rate</td>
                                <td scope="col">Note</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.cats.map((cat, ci) => {
                                return (
                                    <Fragment key={"divk" + ci}>
                                        <tr className="">
                                            <td></td>

                                            <td
                                                key={"c" + ci}
                                                id={"cat" + ci}
                                                name="cat"
                                                className="font-weight-bold"
                                            >
                                                {cat}
                                                {this.state.isMains[ci] ? (
                                                    <span className=" ml-2 font-italic text-warning">
                                                        main
                                                    </span>
                                                ) : null}
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
                                                        className=""
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
                                                            className=""
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
                                                    </tr>
                                                );
                                            }
                                        })}
                                    </Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                    <Link to="editMenu">
                        <button className="btn btn-primary">Edit Menu</button>
                    </Link>
                </div>
            );
    }
}

export default ClientMenu;
// if (document.getElementById("shopDetail")) {
//     ReactDOM.render(<ShopDetail />, document.getElementById("shopDetail"));
// }
