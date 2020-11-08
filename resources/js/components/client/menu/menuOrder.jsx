import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
//import getDist from "../maps/getDist";
import { withRouter } from "react-router";
import Modal from "../others/modal";
import "../../../css/style.css";
import ExistMenu from "./existMenu";
import Checkout from "../orders/checkout";
import Card from "../payment/card";
import OrderSuccess from "../orders/orderSuccess";
import CashOrderConfirm from "../orders/cashOrderConfirm";

class MenuOrder extends Component {
    constructor(props) {
        super(props);

        const shop = this.props.shops.find(
            shop => shop.id == this.props.match.params.id
        );
        const orderTblString =
            shop.id +
            "_" +
            shop.shopName +
            shop.area +
            "_" +
            new Date().valueOf();

        this.state = {
            step: 1,
            shop: shop,
            menu: [],
            order: [],
            cats: [],
            frice: null,
            delivery: [],
            // deliPrice: null,
            // isDeli: true,
            // custAddr: "",
            // custPhone: "",
            // addrError: "",
            modalOpen: false,
            //modalRadio: false,
            modalChecked: "",
            dist: "",
            // CardPay: true,
            total: null,
            custData: {
                deliPrice: null,
                isDeli: true,
                deliPrice: null,
                custAddr: "",
                custPhone: "",
                orderMobile: "",
                orderMsg: "",
                addrError: "",
                cardPay: true,
                total: null,
                orderTblString: orderTblString,
                cashConfirm: false,
                foodSubmited: false,
                btnClicked: []
            }
        };
    }
    handleNextStep = () => {
        const { step } = this.state;
        console.log("stepppppppppppp" + step);
        this.setState({ step: step + 1 });
    };
    handlePrevStep = () => {
        const { step } = this.state;
        this.setState({ step: step - 1 });
    };
    handleOrder = (e, i) => {
        const menu = [...this.state.menu];

        menu[i].orderQty = 1;
        menu[i].subTotal = parseFloat(menu[i].price);
        this.setState({ menu });
        if (menu[i].isMain) {
            this.showModal(i);
            //this.setState({ modalOpen: i + 1 });
        }
    };
    handleAdd = (e, i) => {
        const menu = [...this.state.menu];

        menu[i].orderQty++;
        menu[i].subTotal = menu[i].subTotal + parseFloat(menu[i].price);
        this.setState({ menu });
        if (menu[i].isMain) {
            this.showModal(i);
        }
    };
    handleDelete = (e, i) => {
        const menu = [...this.state.menu];
        menu[i].orderQty = null;
        menu[i].subTotal = null;
        menu[i].mainAttach = ["", "", "", ""];
        this.setState({ menu });
    };

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
        let { deliPrice } = this.state.custData;
        if (deliPrice === "max") {
            deliPrice = 2.5;
        }

        if (total) {
            if (this.state.custData.isDeli) {
                return total + Number(deliPrice);
            } else {
                return total;
            }
        }
    };
    // handleCustAddr = e => {
    //     this.setState({ custAddr: e.target.value });
    // };
    // handleCloseModal = () => {
    //     this.setState({ modalOpen: false });
    // };
    showModal = i => {
        this.setState({ modalOpen: i + 1 });
        //     , () => {
        //     this.closeButton.focus();
        // }

        this.toggleScrollLock();
    };
    closeModal = event => {
        event.preventDefault();
        this.setState({ modalOpen: false });
        // this.TriggerButton.focus();
        this.toggleScrollLock();
    };
    toggleScrollLock = () => {
        document.querySelector("html").classList.toggle("scroll-lock");
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
        if (modalChecked) {
            this.closeModal(event);
        }
    };
    handleBtnClicked = () => {
        let d = new Date();
        let t = d.getTime();
        let btnClicked = [...this.state.custData.btnClicked];
        btnClicked.push(t);
        this.setState({ custData: { ...this.state.custData, btnClicked } });
    };
    componentDidMount() {
        const { shop } = this.state;
        let str_tbl = shop.shopName + shop.area + shop.id;
        axios
            .all([
                axios.get(`api/menu/show/${str_tbl}`, { baseURL: "/" }),
                axios.get(`api/delivery/show/${shop.id}`, { baseURL: "/" })
            ])
            .then(
                axios.spread((...res) => {
                    let sData = res[0].data;
                    console.log("whyresgggggg" + JSON.stringify(res[0].data));
                    if (sData.length != 0) {
                        let menu = sData.data;
                        let cats = [];
                        if (menu) {
                            if (menu.length > 2) {
                                console.log(
                                    "from menu didM" + JSON.stringify(menu)
                                );
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
                    ///Delivery
                    let dData = res[1].data;
                    // console.log(
                    //     "whyresggggggdelivery" + JSON.stringify(res.data)
                    // );
                    this.setState({ delivery: dData });
                })
            );
    }
    handleSubmitFoodForm = () => {
        event.preventDefault();
        const checkMenu = [];
        this.state.menu.forEach(el => {
            if (el.orderQty > 0) {
                checkMenu.push(el);
            }
        });
        axios
            .post(
                "api/order/storeFood/" + this.state.custData.orderTblString,
                checkMenu,
                { baseURL: "/" }
            )

            .then(res => {
                // console.log("food submit" + JSON.stringify(checkMenu));
                // console.log("food submit" + JSON.stringify(res));
                if (res.data === "storeFood success") {
                    this.setState({
                        custData: { ...this.state.custData, foodSubmited: true }
                    });
                    this.handleNextStep();
                    //this.props.handleNextStep();
                }
            });
    };
    handleCustAddr = e => {
        const custData = { ...this.state.custData };
        custData.custAddr = e.target.value;
        this.setState({ custData });

        setTimeout(() => {
            this.getDist();
        }, 2500);
    };
    handlePhone = e => {
        this.setState({
            custData: { ...this.state.custData, custPhone: e.target.value }
        });
    };
    handleOrderMobile = e => {
        this.setState({
            custData: {
                ...this.state.custData,
                orderMobile: e.target.orderMobile.value
            }
        });
    };
    getDist = () => {
        const origin = this.state.shop.addr;

        const destination = this.state.custData.custAddr;

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
                if (status !== "OK") {
                    alert("Error was: " + status);
                } else {
                    // console.log("respoooppppp" + d + o);

                    // console.log(
                    //     "resppppppppppoooo" +
                    //         (response.rows[0].elements[0].status ===
                    //             "NOT_FOUND")
                    // );
                    // console.log("resppppppppppoooo" + JSON.stringify(response));
                    const { status } = response.rows[0].elements[0];
                    const custData = { ...this.state.custData };

                    if ((status === "NOT_FOUND") | "ZERO_RESULTS") {
                        custData.addrError = "NOT_FOUND";
                        custData.deliPrice = 2.5;
                        this.setState({ custData });
                    } else if (status == "OK") {
                        custData.addrError = "";
                        this.setState({ custData });
                        const dist = response.rows[0].elements[0].distance.text;
                        if (dist) {
                            this.getDeliPrice(dist);
                        } else {
                            custData.deliPrice = 2.5;
                            this.setState({ custData });
                        }
                    }
                    //return dist;
                }
            }
        );
    };

    getDeliPrice = distkm => {
        let dist = parseFloat(distkm.slice(0, -2));

        let deliPrice;
        const deli = this.state.delivery;
        if (dist > this.state.delivery.servLimit) {
            deliPrice = "max";
        } else if (dist > 3) {
            deliPrice = deli.dist4;
        } else if (dist > 2.5) {
            deliPrice = deli.dist3;
        } else if (dist > 2) {
            deliPrice = deli.dist25;
        } else if (dist > 1.5) {
            deliPrice = deli.dist2;
        } else if (dist > 1) {
            deliPrice = deli.dist15;
        } else {
            deliPrice = deli.dist1;
        }
        const custData = { ...this.state.custData };
        custData.deliPrice = deliPrice;
        this.setState({ custData });
    };
    handleDeliCheck = () => {
        const custData = { ...this.state.custData };
        custData.isDeli = !this.state.custData.isDeli;
        this.setState({
            custData
        });
    };
    handlePayMethod = () => {
        this.setState({
            custData: {
                ...this.state.custData,
                cardPay: !this.state.custData.cardPay
            }
        });
    };
    handleOrderMsg = e => {
        this.setState({
            custData: {
                ...this.state.custData,
                orderMsg: e.target.value
            }
        });
    };
    custUpdate = data => {
        event.preventDefault();
        axios
            .post(
                "api/order/update/" + this.state.custData.orderTblString,
                data,
                {
                    baseURL: "/",
                    params: {
                        _method: "PUT"
                    }
                }
            )

            .then(res => {
                // then print response status
                console.log("update responnn" + res.data);
                if (res.data == "order update success") {
                    console.log(res.statusText);
                }
            });
    };
    handleCashConfirm = () => {
        this.setState({
            custData: {
                ...this.state.custData,
                cashConfirm: true
            }
        });
    };

    render() {
        const { shop, menu, step, custData } = this.state;
        const checkMenu = [];
        this.state.menu.forEach(el => {
            if (el.orderQty > 0) {
                checkMenu.push(el);
            }
        });
        return (
            <div>
                {step === 1 &&
                    (menu.length != 0 ? (
                        <div>
                            <ExistMenu
                                handleNextStep={this.handleNextStep}
                                //shop={this.state.shop}
                                menu={menu}
                                cats={this.state.cats}
                                frice={this.state.frice}
                                modalOpen={this.state.modalOpen}
                                modalChecked={this.state.modalChecked}
                                handleOrder={this.handleOrder}
                                handleAdd={this.handleAdd}
                                handleDelete={this.handleDelete}
                                //     //
                                //     closeModal={this.closeModal}
                                // onKeyDown={this.onKeyDown}
                                // onClickOutside={this.onClickOutside}
                                //handleCloseModal={this.handleCloseModal}
                                closeModal={this.closeModal}
                                handleConfirmSelect={modalChecked =>
                                    this.handleConfirmSelect(
                                        modalChecked,
                                        this.state.modalOpen
                                    )
                                }
                                getTotal={this.getTotal}
                                getDeliPrice={this.getDeliPrice}
                                handleSubmitFoodForm={this.handleSubmitFoodForm}
                            />
                        </div>
                    ) : (
                        <div>
                            <div>This shop has no menu yet</div>
                        </div>
                    ))}
                {step === 2 && checkMenu && (
                    <div>
                        <Checkout
                            handleNextStep={this.handleNextStep}
                            handlePrevStep={this.handlePrevStep}
                            shop={shop}
                            menu={checkMenu}
                            cats={this.state.cats}
                            handleCustAddr={this.handleCustAddr}
                            handlePhone={this.handlePhone}
                            handleOrderMobile={this.handleOrderMobile}
                            // deliPrice={this.state.deliPrice}
                            //getDist={this.getDist}
                            getTotal={this.getTotal}
                            isDeli={this.state.isDeli}
                            handleDeliCheck={this.handleDeliCheck}
                            getDeliPrice={this.getDeliPrice}
                            handlePayMethod={this.handlePayMethod}
                            handleOrderMsg={this.handleOrderMsg}
                            handleCashConfirm={this.handleCashConfirm}
                            // cardPay={this.state.cardPay}
                            custData={this.state.custData}
                            custUpdate={this.custUpdate}
                            handleSubmitFoodForm={this.handleSubmitFoodForm}
                            handleBtnClicked={this.handleBtnClicked}
                        />
                    </div>
                )}

                {step === 3 &&
                    (custData.cardPay ? (
                        <div>
                            {/* <CardMinimal />
                        <CardDetail /> */}
                            <Card
                                handleNextStep={this.handleNextStep}
                                handlePrevStep={this.handlePrevStep}
                                custUpdate={this.custUpdate}
                                handleSubmitFoodForm={this.handleSubmitFoodForm}
                                shopName={shop.shopName + "" + shop.area}
                                // menu={checkMenu}
                                // cats={this.state.cats}
                                custAddr={this.state.custData.custAddr}
                                custPhone={this.state.custData.custPhone}
                                // addrError={this.state.addrError}
                                // handleCustAddr={this.handleCustAddr}
                                // handlePhone={this.handlePhone}
                                deliPrice={this.state.custData.deliPrice}
                                //getDist={this.getDist}
                                getTotal={this.getTotal}
                                orderTblString={
                                    this.state.custData.orderTblString
                                }
                                // isDeli={this.state.isDeli}
                                // handleDeliCheck={this.handleDeliCheck}
                                // getDeliPrice={this.getDeliPrice}
                                // handlePayMethod={this.handlePayMethod}
                                // cardPay={this.state.cardPay}
                            />
                        </div>
                    ) : (
                        <CashOrderConfirm
                            handlePrevStep={this.handlePrevStep}
                            handleSubmitFoodForm={this.handleSubmitFoodForm}
                            custData={custData}
                            getTotal={this.getTotal}
                        />
                    ))}
                {step === 4 && (
                    <OrderSuccess
                        orderTblString={this.state.custData.orderTblString}
                        shop={shop}
                    />
                )}
            </div>
        );
    }
}

export default withRouter(MenuOrder);
