import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
//import getDist from "../maps/getDist";
//import { withRouter } from "react-router";

import "../../../css/style.css";
import "../modals/orderPh/index.css";
import PhModal from "../modals/orderPh/phModal";
//import { Container } from "../modals/orderPh/Container";
//import OrderPhModal from "../modals/orderPh/orderPhModal";
class Checkout extends Component {
    constructor(props) {
        super(props);
        let sum = this.props.menu.reduce((sum, a) => {
            return sum + a.subTotal;
        }, 0);
        this.state = {
            // isShown: false,
            shop: this.props.shop,
            menu: this.props.menu,
            sum: sum,
            phModalOpen: false,
            phonePwd: null
            // delivery: [],
            // deliPrice: "",
            // isDeli: true,
            // custPhone: "",
            // custAddr: "",
            // addrError: "",
            // dist: "",
            // cardPay: null
            //cashConfirmed:false
        };
    }

    handleContinue = e => {
        const { cardPay } = this.props.custData;

        this.handleSubmit(e);

        if (cardPay) {
            this.props.handleNextStep();
        } else {
            this.props.handleCashConfirm();

            this.setState({ phModalOpen: true });
            this.showModal(event);
        }
    };

    handleSubmit = event => {
        event.preventDefault();
        const { cardPay, btnClicked } = this.props.custData;
        if (cardPay == false) {
            this.props.handleBtnClicked();
        }
        let bool = false;
        const c = this.props.custData.btnClicked;
        if (btnClicked.length > 5) {
            let b = btnClicked.slice(-6);
            let miniutes = (b[5] - b[0]) / 6000;
            if (!cardPay && miniutes < 15) {
                bool = true;
            }
        }

        if (bool) {
            alert(
                "You have clicked 'Continue' too many time, please try again after a while."
            );
        } else {
            //console.log("srefpppppp" + JSON.stringify(this.props));

            // const { fid, fname, price, note, cat } = this.state.inpVal;
            // const data = {
            //     cat: cat,
            //     isMain: this.state.isMains,
            //     fid: fid.val,
            //     fname: fname.val,
            //     price: price.val,
            //     catNum: fname.catNum,
            //     note: note.val,
            //     frice: this.state.frice
            // };
            const data = this.props.custData;
            data.sum = this.state.sum;
            //const { shop } = this.props;
            //const tblString=this.props.custData.orderTblString;

            axios

                //.post("api/menu/store/?shop_id=" + this.props.shopId, data, {})
                .post(
                    "api/order/store/" + this.props.custData.orderTblString,
                    data,
                    { baseURL: "/" }
                )

                .then(res => {
                    // then print response status
                    console.log("check responnn" + res.data);
                    if (res.data == "order success") {
                        console.log(res.statusText);
                        const { cardPay } = this.props.custData;

                        if (cardPay) {
                            this.props.handleNextStep();
                        } else {
                            this.props.handleCashConfirm();

                            this.setState({ phModalOpen: true });
                            this.showModal(event);
                        }
                    }
                });
        }
    };
    handlePhonePwdChange = e => {
        this.setState({ phonePwd: e.target.value });
    };
    handleSubmitPwd = e => {
        e.preventDefault();
        let data = { phonePwd: this.state.phonePwd };
        axios
            .post(
                "api/order/matchPwd/" + this.props.custData.orderTblString,
                data,
                {
                    baseURL: "/"
                }
            )
            .then(res => {
                console.log("pwddddddddd" + JSON.stringify(res));
                if (res.data == "pwd matched") {
                    this.props.handleSubmitFoodForm(e);
                    // if (this.props.custData.foodSubmited == true) {
                    // this.props.handleNextStep();
                    // this.props.handleNextStep();
                    // }
                }
            });
    };

    submitOrderPh = event => {
        event.preventDefault(event);
        //console.log("from modal" + event.target.orderMobile.value);

        this.props.handleOrderMobile(event);
        //send sms
        let rand = Array(5)
            .fill(
                "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
            )
            .map(function(x) {
                return x[Math.floor(Math.random() * x.length)];
            })
            .join("");
        let data = {};
        let orderMobile = "";
        if (event.target.orderMobile.value) {
            orderMobile = event.target.orderMobile.value;
        } else {
            orderMobile = this.props.custData.custPhone;
        }
        data.orderMobile = orderMobile;
        data.orderPwd = rand;
        data.pwdTimeStamp = new Date();
        this.props.custUpdate(data);
        this.setState({ cashConfirmed: true });
        //there is event
        this.closeModal(event);
        this.props.handleSubmitFoodForm(event);
        this.props.handleNextStep();
    };
    // custUpdate = data => {
    //     event.preventDefault();
    //     axios
    //         .post(
    //             "api/order/update/" + this.props.custData.orderTblString,
    //             data,
    //             {
    //                 baseURL: "/",
    //                 params: {
    //                     _method: "PUT"
    //                 }
    //             }
    //         )

    //         .then(res => {
    //             // then print response status
    //             console.log("update responnn" + res.data);
    //             if (res.data == "order update success") {
    //                 console.log(res.statusText);
    //             }
    //         });
    // };
    showModal = () => {
        this.setState(
            { phModalOpen: true }
            //     , () => {
            //     this.closeButton.focus();
            // }
        );
        this.toggleScrollLock();
    };
    closeModal = event => {
        event.preventDefault();
        this.setState({ phModalOpen: false });
        // this.TriggerButton.focus();
        this.toggleScrollLock();
    };
    onKeyDown = event => {
        if (event.keyCode === 27) {
            this.closeModal(event);
        }
    };
    onClickOutside = event => {
        if (this.modal && this.modal.contains(event.target)) return;
        this.closeModal(event);
    };

    toggleScrollLock = () => {
        document.querySelector("html").classList.toggle("scroll-lock");
    };
    // componentDidMount() {}
    // getModalClass = () => {
    //     let classes = "modal";
    //     if (this.state.phModalOpen) {
    //         classes += "d-block";
    //     }
    //     return classes;
    // };
    render() {
        console.log("menu render state" + this.state.menu);

        const { menu } = this.state;
        const { custData } = this.props;
        const { deliPrice } = custData;
        const cats = [];

        menu.forEach(el => {
            cats[el.catNum] = el.cat;
        });

        if (menu.length == 0) {
            return (
                <div>
                    <div>pls up ur menu</div>
                </div>
            );
        } else
            return (
                <div className="menu">
                    <h4 className="text-center">Checkout Page</h4>
                    <hr />
                    <label>The food you have ordered is as below:</label>
                    <button onClick={this.showModal}>show Modal</button>
                    {this.state.phModalOpen ? (
                        <PhModal
                            submitOrderPh={this.submitOrderPh}
                            modalRef={n => (this.modal = n)}
                            buttonRef={n => (this.closeButton = n)}
                            closeModal={this.closeModal}
                            onKeyDown={this.onKeyDown}
                            onClickOutside={this.onClickOutside}
                            custPhone={custData.custPhone}
                            handleOrderMobile={this.props.handleOrderMobile}
                        />
                    ) : null}
                    {/* <OrderPhModal openModal={this.openModal} /> */}
                    {/* <Container
                        triggerText="open modal"
                        onSubmit={this.openModal}
                    /> */}
                    {/* <button
                        onClick={
                            this.getDist
                            // this.state.shop.addr,
                            // this.state.custAddr
                        } */}
                    {/* >
                        googl
                    </button> */}

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
                    {/* {this.state.phModalOpen ? (
                        <div>
                            <Modal
                                //modalChecked={this.state.modalChecked}
                                frPrice={this.state.frice}
                                handleModalRadio={e => this.handleModalRadio(e)}
                                closeModal={this.handleCloseModal}
                                confirmSelect={modalChecked =>
                                    this.handleConfirmSelect(
                                        modalChecked,
                                        this.state.phModalOpen
                                    )
                                }
                            />
                        </div>
                    ) : null} */}
                    <h6 className="text-center">Menu</h6>

                    <table className="table table-bordered">
                        <thead>
                            <tr className="">
                                <td></td>
                                <td>Name</td>
                                <td>Rate</td>
                                <td>Note</td>
                                <td>Qty</td>
                                <td>Price</td>
                            </tr>
                        </thead>
                        <tbody>
                            {cats.map((cat, ci) => {
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
                                            const s =
                                                Math.round(
                                                    food.subTotal * 100
                                                ) / 100;
                                            let subTotal = s.toFixed(2);
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
                                                            {subTotal}
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
                                <td>Sum:</td>
                                <td></td>
                                <td></td>

                                <td></td>
                                <td>{this.state.sum.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <form onSubmit={this.handleSubmit}>
                        <label className="text-danger font-weight-bold">
                            Please provide the following infomation to proceed.
                        </label>
                        <br />
                        <label>
                            Delivery
                            <input
                                type="checkbox"
                                id="deli"
                                name="deli"
                                className="ml-2"
                                //value={this.getDeliPrice}
                                value={true}
                                checked={custData.isDeli == true}
                                onChange={this.props.handleDeliCheck}
                            />
                        </label>

                        <label className="ml-3">
                            Collection
                            <input
                                type="checkbox"
                                id="colle"
                                name="deli"
                                className="ml-2"
                                value={false}
                                checked={custData.isDeli == false}
                                onChange={this.props.handleDeliCheck}
                            />
                        </label>

                        <br />

                        <label>
                            Your contact number:
                            <input
                                type="text"
                                name="custph"
                                className="ml-2"
                                value={custData.custPhone}
                                onChange={this.props.handlePhone}
                            />
                        </label>
                        <br />
                        {custData.isDeli ? (
                            custData.isDeli && (
                                <label>
                                    Your delivery address:
                                    <input
                                        type="text"
                                        className="ml-2"
                                        size={38}
                                        value={custData.custAddr}
                                        onChange={this.props.handleCustAddr}
                                    />
                                </label>
                            )
                        ) : (
                            <div> {""}</div>
                        )}
                        {deliPrice == "max"
                            ? custData.isDeli && (
                                  <div className="text-warning float-right">
                                      The delivery address might be too far to
                                      serve. Please contact the shop.
                                  </div>
                              )
                            : custData.isDeli &&
                              deliPrice > 0 && (
                                  <div className="">
                                      Delivery Price: {deliPrice}
                                  </div>
                              )}
                        {custData.isDeli && custData.addrError == "NOT_FOUND" && (
                            <div className="text-danger font-weight-light font-italic">
                                <div>
                                    We didn't find your address on google map .
                                    Make sure the food is deliverable !
                                </div>
                                <div>And the delivery price may vary.</div>
                            </div>
                        )}
                        <br />

                        <div className="d-flex ">
                            <div>Total to pay:</div>

                            <div className="ml-3">
                                {this.props.getTotal().toFixed(2)}Eur
                            </div>
                        </div>
                        <br />

                        <label>
                            Card pay
                            <input
                                type="checkbox"
                                id="card"
                                name="payMethod"
                                className="ml-2"
                                value={custData.cardPay}
                                checked={custData.cardPay == true}
                                onChange={this.props.handlePayMethod}
                            />
                        </label>
                        <label className="ml-4">
                            Cash pay
                            <input
                                type="checkbox"
                                id="cash"
                                name="payMethod"
                                className="ml-2"
                                value={custData.cardPay}
                                checked={custData.cardPay == false}
                                onChange={this.props.handlePayMethod}
                            />
                        </label>
                        <br />
                        <label htmlFor="orderMsg" className="formGroup">
                            Message to the shop( optional ):
                            <br />
                            <textarea
                                rows="3"
                                cols="50"
                                type="textarea"
                                id="msg"
                                name="orderMsg"
                                className="formControl"
                                value={custData.orderMsg}
                                onChange={this.props.handleOrderMsg}
                            />
                        </label>
                        <hr />
                        <button
                            onClick={this.props.handlePrevStep}
                            className="btn btn-secondary"
                        >
                            {"< "}Back
                        </button>
                        <button
                            type="submit"
                            //onClick={this.handleContinue}
                            className="btn btn-primary float-right"
                        >
                            Continue
                        </button>
                    </form>
                </div>
            );
    }
}

export default Checkout;
