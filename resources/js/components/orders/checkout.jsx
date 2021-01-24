import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import formValidate from "../client/validation/formValidate";
//import getDist from "../maps/getDist";
//import { withRouter } from "react-router";
import OrderPhForm from "./orderPhForm";
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

            //phModalOpen: false,

            phonePwd: null,
            phpErrors: {}

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
    // validateInput = () => {
    //     const { name } = event.target;
    //     let errors = { ...this.state.errors };
    //     if (!event.target.checkValidity()) {
    //         errors[name] = event.target.validationMessage;
    //         //console.log("in blur");
    //         this.setState({ errors });
    //     } else {
    //         errors[name] = "";
    //         this.setState({ errors });
    //     }
    // };
    handleSubmit = async e => {
        e.preventDefault();
        const { cardPay, btnClicked } = this.props.custData;
        let errors = formValidate();
        if (errors) this.props.handleInputErrors(errors);
        else {
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
                try {
                    let res = await axios.post(
                        "api/order/store/" + this.props.custData.orderTblString,
                        data,
                        { baseURL: "/" }
                    );
                    if (res.status === 200 && res.data == "order success")
                        this.props.handleSubmitFoodForm(e);
                    const { cardPay } = this.props.custData;
                    if (!cardPay) this.props.handleCashConfirm();
                    else this.props.handleNextStep();
                } catch (error) {
                    let errs = { ...this.state.errors };
                    let newErrors = error.response.data.errors;

                    console.log("errors" + JSON.stringify(error.response.data));
                    for (const key in newErrors) {
                        errs[key] = newErrors[key][0];
                    }
                    this.setState({ phpErrors: errs });
                }

                //         // console.log("check responnn" + res.data);
                //         if (res.data == "order success") {
                //             console.log(res.statusText);
                //             const { cardPay } = this.props.custData;
                //             this.props.handleSubmitFoodForm(event);
                //             if (!cardPay) {
                //                 //this.props.handleNextStep();
                //                 this.props.handleCashConfirm();

                //                 // if (
                //                 //     Object.keys(this.props.phpErrors).length === 0
                //                 // ) {
                //                 //     this.props.handleShowOrderPhForm();
                //                 //this.setState({ showOrderPhForm: true });
                //                 //this.setState({ phModalOpen: true });
                //                 //this.showModal(event);
                //                 //}
                //             }
                //       }
                //  });
            }
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
                // console.log("pwddddddddd" + JSON.stringify(res));
                if (res.data == "pwd matched") {
                    this.props.handleSubmitFoodForm(e);
                    // if (this.props.custData.foodSubmited == true) {

                    // }
                }
            });
    };
    showPhpErrs = () => {
        //const { phpErrors } = this.props;

        if (Object.keys(this.props.phpErrors).length > 0) {
            // return Object.keys(phpErrors).map(key => {
            //     return (
            //         <div className="text-danger" key={key}>
            //             {key + ": " + phpErrors[key]}
            //         </div>
            //     );
            // });
            return (
                <div className="text-danger">
                    A system error occured. Please go back and make a new order!
                </div>
            );
        }
    };

    // handleOrderMobileChange = () => {
    //     this.setState({ orderMobile: event.target.value });
    // };
    orderPhpErrs = () => {
        const { phpErrors } = this.state;

        if (Object.keys(phpErrors).length > 0) {
            return Object.keys(phpErrors).map(key => {
                return (
                    <div className="text-danger" key={key}>
                        {phpErrors[key]}
                    </div>
                );
            });
        }
    };
    submitOrderPh = event => {
        event.preventDefault(event);
        //console.log("from modal" + event.target.orderMobile.value);
        if (!this.props.errors.orderMobile) {
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
            // let orderMobile = "";
            // if (event.target.orderMobile.value) {
            //     orderMobile = event.target.orderMobile.value;
            // } else {
            //     orderMobile = this.props.custData.custPhone;
            // }
            data.orderMobile = this.props.custData.orderMobile;
            data.orderPwd = rand;
            data.pwdTimeStamp = new Date();
            this.props.custUpdate(data);
            this.setState({ cashConfirmed: true });
            //there is event
            //this.closeModal(event);
            //this.props.handleSubmitFoodForm(event);

            this.props.handleNextStep();
        }
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
        // console.log("menu render state" + this.state.menu);

        const { menu } = this.state;
        const { custData } = this.props;
        const { errors } = this.props;
        const { deliPrice } = custData;
        const cats = [];

        menu.forEach(el => {
            cats[el.catNum] = el.cat;
        });

        if (menu.length == 0) {
            return (
                <div>
                    <div>The menu for this shop is not available</div>
                </div>
            );
        } else
            return (
                <div className="menu">
                    <h4 className="text-center">Checkout Page</h4>
                    <hr />
                    <label>The food you have ordered is as below:</label>

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
                    <form noValidate onSubmit={this.handleSubmit}>
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
                                type="tel"
                                name="custPhone"
                                className="ml-2"
                                value={custData.custPhone}
                                onChange={this.props.handlePhone}
                                onBlur={this.props.validateInput}
                                minLength={10}
                                maxLength={30}
                                required
                            />
                        </label>
                        {errors.custPhone && (
                            <p className="text-danger">{errors.custPhone}</p>
                        )}

                        {custData.isDeli && (
                            <div>
                                <label>
                                    Your delivery address:
                                    <input
                                        type="text"
                                        name="custAddr"
                                        className="ml-2"
                                        size={38}
                                        value={custData.custAddr}
                                        onChange={this.props.handleCustAddr}
                                        onBlur={this.props.validateAddr}
                                        minLength={5}
                                        maxLength={60}
                                        required
                                    />
                                </label>
                            </div>
                        )}
                        {custData.isDeli && errors.custAddr && (
                            <p className="text-danger">{errors.custAddr}</p>
                        )}
                        {custData.isDeli && custData.addrError == "NOT_FOUND" && (
                            <div className="text-danger font-weight-light font-italic">
                                <div>
                                    We didn't find your address on Google Maps .
                                    Make sure the food is deliverable !
                                </div>
                                <div>And the delivery price may vary.</div>
                            </div>
                        )}
                        {custData.isDeli && (
                            <div className="">
                                Delivery Price:{" "}
                                {deliPrice !== "max" && deliPrice}
                            </div>
                        )}
                        {deliPrice == "max" && custData.isDeli && (
                            <div className="text-warning float-right">
                                The delivery address might be too far to serve.
                                Please contact the shop.
                            </div>
                        )}

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
                                onBlur={this.props.validateInput}
                                //minLength={5}
                                maxLength={120}
                            />
                        </label>
                        {errors.orderMsg && (
                            <p className="text-danger">{errors.orderMsg}</p>
                        )}
                        <hr />
                        <button
                            onClick={this.props.handlePrevStep}
                            className="btn btn-secondary"
                        >
                            {"< "}Back
                        </button>
                        {/* {console.log(
                            "php errors" + JSON.stringify(this.props.phpErrors)
                        )} */}
                        {this.orderPhpErrs()}

                        <button
                            type="submit"
                            //onClick={this.handleContinue}
                            disabled={custData.isDeli && !deliPrice}
                            className="btn btn-primary float-right"
                        >
                            Continue
                        </button>
                    </form>
                    {!custData.cardPay && this.props.showOrderPhForm && (
                        <>
                            <hr />
                            <OrderPhForm
                                submitOrderPh={this.submitOrderPh}
                                custPhone={custData.custPhone}
                                orderMobile={custData.orderMobile}
                                handleOrderMobileChange={
                                    this.props.handleOrderMobileChange
                                }
                                errors={this.props.errors}
                                validateInput={this.props.validateInput}
                            />
                        </>
                    )}
                </div>
            );
    }
}
//handleSubmitFoodForm for cash is in the modal, for card is in handleSubmit
export default Checkout;
