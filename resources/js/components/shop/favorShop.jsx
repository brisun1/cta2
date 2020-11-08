import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Icon, InlineIcon } from "@iconify/react";
import phoneIcon from "@iconify/icons-mdi-light/phone";
import { Link } from "react-router-dom";
class FavorShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shop: this.props.shop
        };
    }

    // componentDidMount() {
    //     axios.get("api/shop/show").then(res => {
    //         this.setState({
    //             shop: res.data
    //         });
    //     });
    // }
    render() {
        let { shop } = this.props;

        //console.log("shopDetail rendering" + this.props);
        //console.log(this.props);
        if (shop) {
            console.log("gggggggbefore return" + shop.id);
            return (
                <div key="shop" className="row">
                    <br />

                    {console.log("gggggggafter return" + shop.id)}

                    <div className="col-md-6">
                        <Link to={`/orderMenu/${shop.id}`}>
                            <img
                                src={`/storage/shop_img/${shop.img}`}
                                style={{ maxHeight: 170, width: "100%" }}
                            />
                            <br />
                            <div id="shop_txt" className="d-flex">
                                <div className="bg-light mr-4">
                                    {shop.shopName}
                                </div>

                                <div className="bg-light mr-4">
                                    Address:{shop.addr}
                                </div>

                                <div>
                                    <Icon
                                        icon={phoneIcon}
                                        style={{ fontSize: 24 }}
                                    />
                                    : {shop.phone}
                                </div>
                            </div>
                            <div id="otherDetail" className="">
                                <div>
                                    Opening hours(Mon-Thu):{shop.week_open}to
                                    {shop.week_close}
                                </div>
                                <div>
                                    (Fri):{shop.fri_open}to
                                    {shop.fri_close}
                                </div>
                                <div>(Sat):</div>
                                <div>(Sun):</div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-6 ">
                        <div className="d-flex">
                            {shop.img1 ? (
                                <img
                                    src={`/storage/shop_img/${shop.img1}`}
                                    style={{ height: "130px", width: "200px" }}
                                />
                            ) : null}

                            <div className=" bg-light ml-3">
                                {" "}
                                {shop.promTxt1}
                            </div>
                        </div>
                        <div className="d-flex">
                            {shop.img2 ? (
                                <img
                                    src={`/storage/shop_img/${shop.img2}`}
                                    style={{ height: "130px", width: "200px" }}
                                />
                            ) : null}
                            <div className="bg-light ml-3">
                                {" "}
                                {shop.promTxt2}
                            </div>
                        </div>
                    </div>

                    <hr />
                </div>
            );
        } else return "no shop chosen";
    }
}

export default FavorShop;
// if (document.getElementById("shopDetail")) {
//     ReactDOM.render(<ShopDetail />, document.getElementById("shopDetail"));
// }
