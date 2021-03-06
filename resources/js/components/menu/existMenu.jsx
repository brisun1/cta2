import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
//import getDist from "../maps/getDist";
import { withRouter } from "react-router";
//import Modal from "../others/modal";
import "../../../css/style.css";
import AModal from "../modals/mainAttachModal/aModal";
import "../modals/orderPh/index.css";
class ExistMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //shop: this.props.shop,
            menu: this.props.menu,
            cats: this.props.cats,
            modalOpen: false,
            modalChecked: ""
        };
    }

    handleRadio = event => {
        this.setState({
            deliPrice: event.target.value,
            isDeli: !this.state.isDeli
        });
    };

    // showModal = () => {
    //     this.setState(
    //         { modalOpen: true }
    //         //     , () => {
    //         //     this.closeButton.focus();
    //         // }
    //     );
    //     this.toggleScrollLock();
    // };
    // closeModal = event => {
    //     event.preventDefault();
    //     this.setState({ modalOpen: false });
    //     // this.TriggerButton.focus();
    //     this.toggleScrollLock();
    // };
    onKeyDown = event => {
        if (event.keyCode === 27) {
            this.props.closeModal(event);
        }
    };
    onClickOutside = event => {
        if (this.modal && this.modal.contains(event.target)) return;
        this.props.closeModal(event);
    };

    // toggleScrollLock = () => {
    //     document.querySelector("html").classList.toggle("scroll-lock");
    // };
    //sendRes = (i, orderFoodTbl) => {
    sendRes = () => {
        console.log("in sen res");
        //if (clientRes[i] === false) {
        // let data = { clientRes: true };
        axios
            .post("api/order/test/2", 3, {
                baseURL: "/"
                // params: {
                //     _method: "PUT"
                // }
            })

            .then(res => {
                console.log("clientRes" + res.data);
                // if (res.data == "clientRes success") {
                //     let cr = [...clientRes];
                //     cr[i] = true;
                //     setClientRes(cr);
                //     pauseAudio();
                // }
            });
        //}
    };
    render() {
        const { menu } = this.state;
        const { modalOpen } = this.props;
        // console.log(
        //     "menu twsttttttttttttttttttt" +
        //         this.props.menu.find(el => el.orderQty > 0) ==
        //         undefined
        // );
        const styleMenu = modalOpen ? { backgroundColor: "#A9A9A9" } : null;
        const styleBtn = modalOpen ? { opacity: 0.4 } : null;
        //const styleOrdered = { backgroundColor: "#c4f5d8" };
        if (menu.length == 0) {
            return (
                <div>
                    <div>This shop has no menu yet</div>
                </div>
            );
        } else
            return (
                <div className="menu" style={styleMenu}>
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
                    {modalOpen ? (
                        <div>
                            <AModal
                                //modalChecked={this.state.modalChecked}
                                frPrice={this.props.frice}
                                handleModalRadio={e =>
                                    this.props.handleModalRadio(e)
                                }
                                //closeModal={this.props.handleCloseModal}
                                modalOpen={this.props.modalOpen}
                                modalRef={n => (this.modal = n)}
                                buttonRef={n => (this.closeButton = n)}
                                closeModal={this.props.closeModal}
                                onKeyDown={this.onKeyDown}
                                onClickOutside={this.onClickOutside}
                                confirmSelect={modalChecked =>
                                    this.props.handleConfirmSelect(
                                        modalChecked,
                                        this.props.modalOpen
                                    )
                                }
                            />
                        </div>
                    ) : null}
                    <h5 className="text-center">Menu</h5>
                    <button onClick={() => this.sendRes()}>
                        {/* <button onClick={() => this.sendRes(i, cust.orderFoodTbl)}> */}
                        send Res
                    </button>
                    <hr />
                    <form onSubmit={this.props.handleSubmitFoodForm}>
                        <table className="table table-bordered" boder={1}>
                            <thead>
                                <tr className="">
                                    <td></td>
                                    <td>Name</td>
                                    <td>Rate</td>
                                    <td>Note</td>
                                    <td>Qty</td>
                                    <td>Price</td>

                                    <td style={{ width: 155 }}></td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.cats.map((cat, ci) => {
                                    return (
                                        <Fragment key={"divk" + ci}>
                                            <tr className="">
                                                <td
                                                    key={"c" + ci}
                                                    id={"cat" + ci}
                                                    name="cat"
                                                    className="text-center"
                                                    colSpan={4}
                                                >
                                                    {cat}
                                                </td>
                                            </tr>

                                            {menu.map((food, index) => {
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
                                                                style={
                                                                    food.orderQty >
                                                                    0
                                                                        ? {
                                                                              backgroundColor:
                                                                                  "#c4f5d8"
                                                                          }
                                                                        : null
                                                                }
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
                                                                style={
                                                                    food.orderQty >
                                                                    0
                                                                        ? {
                                                                              backgroundColor:
                                                                                  "#c4f5d8"
                                                                          }
                                                                        : null
                                                                }
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
                                                                style={
                                                                    food.orderQty >
                                                                    0
                                                                        ? {
                                                                              backgroundColor:
                                                                                  "#c4f5d8"
                                                                          }
                                                                        : null
                                                                }
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
                                                                style={
                                                                    food.orderQty >
                                                                    0
                                                                        ? {
                                                                              backgroundColor:
                                                                                  "#c4f5d8"
                                                                          }
                                                                        : null
                                                                }
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
                                                                {food.subTotal &&
                                                                    Math.round(
                                                                        food.subTotal *
                                                                            100
                                                                    ) / 100}
                                                            </td>
                                                            <td>
                                                                <button
                                                                    type="button"
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
                                                                        this.props.handleOrder(
                                                                            e,

                                                                            index
                                                                        )
                                                                    }
                                                                    style={
                                                                        styleBtn
                                                                    }
                                                                    disabled={
                                                                        modalOpen |
                                                                        (food.orderQty >
                                                                            0) |
                                                                        (food.orderQty >
                                                                            49)
                                                                    }
                                                                >
                                                                    order
                                                                </button>

                                                                <button
                                                                    type="button"
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
                                                                        this.props.handleAdd(
                                                                            e,
                                                                            index
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        modalOpen |
                                                                        (food.orderQty <
                                                                            1) |
                                                                        (food.orderQty >
                                                                            50)
                                                                    }
                                                                >
                                                                    +
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="ml-2 mr-0 text-danger"
                                                                    onClick={e =>
                                                                        this.props.handleDelete(
                                                                            e,
                                                                            index
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        modalOpen |
                                                                        (food.orderQty ==
                                                                            0)
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
                                    <td colSpan={5}>
                                        Total:
                                        <span className="float-right">
                                            {this.props.getTotal()
                                                ? this.props
                                                      .getTotal()
                                                      .toFixed(2)
                                                : null}
                                        </span>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </form>
                    <div>
                        {/* <label>
                            <input
                                type="radio"
                                id="deli"
                                name="deli"
                                value={this.props.getDeliPrice()}
                                checked={this.state.isDeli == true}
                                onChange={this.props.handleRadio}
                            />
                            Delivery
                        </label> */}
                        {/* <label>
                            <input
                                type="radio"
                                id="colle"
                                name="deli"
                                value={""}
                                checked={this.state.isDeli == false}
                                onChange={event =>
                                    this.props.handleRadio(event)
                                }
                            />
                            Collection
                        </label> */}
                        {/* <div>{this.state.deliPrice}</div> */}
                        <br />
                        Please enter your delivery address
                        {/* <input
                            type="text"
                            value={this.state.custAddr}
                            onChange={e => this.props.handleCustAddr(e)}
                        />
                        <input */}
                        {/* type="text"
                            value={this.state.custAddr}
                            onChange={e => this.props.handleCustAddr(e)}
                        /> */}
                    </div>
                    {!this.props.menu.find(el => el.orderQty > 0) ? null : (
                        <button
                            onClick={this.props.handleNextStep}
                            className="btn btn-primary float-right"
                        >
                            Checkout
                        </button>
                    )}
                </div>
            );
    }
}

export default withRouter(ExistMenu);
