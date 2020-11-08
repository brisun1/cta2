import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Facia from "./facia";
import MenuShow from "../menu/menuShow";
import Map from "../maps/map";
import "../../../css/style.css";
import FavorShop from "./favorShop";
class Shops extends Component {
    constructor(props) {
        super(props);
        //const favourite = null;
        this.state = {
            // chosen: null,
            // shop: []
        };
    }

    // componentDidMount() {
    //     axios.get("api/shop/index").then(res => {
    //         console.log("from did mount");
    //         this.setState({
    //             shop: res.data
    //         });
    //         if (null == this.state.chosen) {
    //             let rand = Math.floor(Math.random() * this.state.shop.length);

    //             this.setState({
    //                 chosen: rand
    //             });
    //         }
    //     });
    // }

    // chosenShop = () => {
    //     const { chosen, shop } = this.state;
    //     let i = 0;
    //     // console.log("shop index" + JSON.stringify(shop[3]));
    //     // const shop3 = shop[3];
    //     // console.log("this is id:" + shop3.id);

    //     if (shop.length > 0) {
    //         const index = shop.findIndex(x => x.id == 16);
    //         return (
    //             <div>
    //                 <div>show me</div>
    //                 <Facia shop={shop[index]} num={i} style="" />
    //                 {/* <MenuShow shop={shop[index]} /> */}
    //                 <Map center={shop[index].addr} />
    //                 <div>
    //                     {console.log("from chosenshop funct" + shop[index])}
    //                 </div>
    //             </div>
    //         );
    //     }
    // };

    render() {
        // console.log("from app render");
        const { shops, chosen } = this.props.data;
        const favor = shops.find(shop => shop.id === 16);

        return (
            <Fragment>
                <FavorShop shop={favor} />

                {/* <Map shops={shops} /> */}
                <div>any</div>
                {shops.map((s, i) =>
                    s.id != chosen ? (
                        <div key={"shop" + i}>
                            <div>App page</div>
                            <Facia shop={s} num={i} />
                        </div>
                    ) : null
                )}
            </Fragment>
        );
    }
}

export default Shops;
// if (document.getElementById("root")) {
//     ReactDOM.render(<App />, document.getElementById("root"));
// }
