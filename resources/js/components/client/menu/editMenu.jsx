import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
//import useParams from "react-router-dom";
//it is menu.js in cta
class EditMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menu: {},
            cats: ["", ""],
            isMains: ["", ""],
            frice: ""
            // inputs: [1, 2, 3, 4, 5],
            // inpVal: {
            //     fid: {
            //         id: null,
            //         val: ["", "", "", "", ""],
            //         catNum: [0, 0, 0, 1, 1]
            //     },

            //     fname: {
            //         id: null,
            //         val: ["", "", "", "", ""],
            //         catNum: [0, 0, 0, 1, 1]
            //     },
            //     price: {
            //         id: null,
            //         val: ["", "", "", "", ""],
            //         catNum: [0, 0, 0, 1, 1]
            //     },
            //     note: {
            //         id: null,
            //         val: ["", "", "", "", ""],
            //         catNum: [0, 0, 0, 1, 1]
            //     },
            //     cat: ["", ""]
            // }
        };
    }
    componentDidMount() {
        // const { shop } = this.props;
        // let str_tbl = shop.name + shop.area + shop.id;

        //dilivery price should be passed in controller
        axios.get(`api/menu/show/${this.props.tblString}`).then(res => {
            let sData = res.data;
            console.log("whyres" + JSON.stringify(res.data));
            if (sData.length != 0) {
                let menu = sData.data;
                let cats = [];
                let isMains = [];
                console.log("from menu didM" + JSON.stringify(menu));
                menu.forEach(el => {
                    cats[el.catNum] = el.cat;
                    isMains[el.catNum] = el.isMain;
                });
                let attach = menu.pop();
                cats.pop();
                isMains.pop();
                //console.log("catnnn" + JSON.stringify(cats));
                this.setState({
                    menu: menu,
                    cats: cats,
                    isMains: isMains,
                    frice: attach.price
                });
            }
        });
    }

    addInputs = (e, ci) => {
        const menu = [...this.state.menu];
        const cats = this.state.cats;
        const newLine = {
            id: menu.length + 1,
            fid: "",
            fname: "",
            price: "",
            note: "",
            catNum: ci
            //cat: cats[ci]
        };
        menu.push(newLine);
        this.setState({ menu });
    };
    // addInputs = (e, ci) => {
    //     this.setState({ inputs: [...this.state.inputs, ci] });
    //     const inpVal = { ...this.state.inpVal };
    //     // Object.values(inpVal).forEach(function(item){
    //     //         //cat has no val property
    //     //         item.val.push("");

    //     // });

    //     inpVal.fname.catNum.push(ci);
    //     inpVal.fid.val.push("");
    //     inpVal.fname.val.push("");
    //     inpVal.price.val.push("");
    //     inpVal.note.val.push("");
    //     this.setState({ inpVal });
    // };
    addCat = () => {
        let cats = [...this.state.cats];

        let i = cats.length + 1;

        this.setState({ cats: [...this.state.cats, ""] });
        // const inpVal = { ...this.state.inpVal };
        // inpVal.cat.push("");
        // this.setState({ inpVal });
    };
    // addCat = () => {
    //     let cats = [...this.state.cats];

    //     let i = cats.length + 1;

    //     this.setState({ cats: [...this.state.cats, i] });
    //     const inpVal = { ...this.state.inpVal };
    //     inpVal.cat.push("");
    //     this.setState({ inpVal });
    // };
    handleChange = (e, mid) => {
        const menu = [...this.state.menu];
        const { name, value } = e.target;
        console.log("from handel chang" + menu[mid - 1][name]);
        menu[mid - 1][name] = value;

        this.setState({ menu });
    };
    // handleChange = (e, mid) => {
    //     const inpVal = { ...this.state.inpVal };
    //     const { name, value } = e.target;

    //     inpVal[name].catNum[index] = ci;
    //     inpVal[name].val[index] = value;
    //     this.setState({ inpVal });
    // };
    handleCat = (e, ci) => {
        const cats = [...this.state.cats];
        // console.log("handle cat" + cats[ci]);
        cats[ci] = e.target.value;
        this.setState({ cats });
    };
    // handleCat = (e, ci) => {
    //     const inpVal = { ...this.state.inpVal };
    //     inpVal.cat[ci] = e.target.value;
    //     this.setState({ inpVal });
    // };
    handleIsMain = (e, ci) => {
        const isMains = { ...this.state.isMains };
        isMains[ci] = !isMains[ci];
        // const inpVal = { ...this.state.inpVal };
        // inpVal.isMain[ci] = !inpVal.isMain[ci];
        this.setState({ isMains });
        //this.setState({ inpVal });
    };
    handleFrice = e => {
        this.setState({ frice: e.target.value });
    };
    handleSubmit = event => {
        event.preventDefault();

        console.log("srefpppppp" + this.props);
        //setErrors(validate());

        // const { fid, fname, price, note, cat } = this.state.inpVal;
        // const data = {
        //     cat: cat,
        //     fid: fid.val,
        //     fname: fname.val,
        //     price: price.val,
        //     catNum: fname.catNum,
        //     note: note.val
        // };

        axios

            .post("api/menu/update/" + this.props.tblString, this.state, {
                // params: {
                //     _method: "PUT"
                // }
            })

            .then(res => {
                console.log("reshhhhhh" + JSON.stringify(res.data));
                if (res.data == "menu update success")
                    window.location.replace("/dashBoard");
            });
    };

    render() {
        if (this.state.menu.length > 0) {
            return (
                <form onSubmit={this.handleSubmit}>
                    <br />
                    <br />
                    <h5 className="text-center">Edit Menu </h5>
                    <h6 className="text-center">Menu R</h6>
                    <hr />

                    <div className="row">
                        <div className="col-sm">Food ID No.</div>
                        <div className="col-sm">Food Name</div>
                        <div className="col-sm">Food Price</div>
                        <div className="col-sm">
                            <label>Note</label>
                            <p className="text-warning">optinal</p>
                        </div>
                    </div>

                    {this.state.cats.map((cat, ci) => {
                        return (
                            <div key={"divk" + ci}>
                                <Fragment>
                                    <label className="text-info">
                                        Category {ci + 1}:
                                    </label>
                                    <input
                                        key={"c" + ci}
                                        id={"cat" + ci}
                                        name="cat"
                                        className="ml-2"
                                        value={cat}
                                        onChange={e => this.handleCat(e, ci)}
                                    />
                                    <label className="ml-2">
                                        Is main food:
                                        <input
                                            name="isMain"
                                            type="checkbox"
                                            className="ml-2"
                                            //onChange={event => this.handleRadio(event)}

                                            value={this.state.isMains[ci]}
                                            checked={
                                                this.state.isMains[ci] == true
                                            }
                                            onChange={e =>
                                                this.handleIsMain(e, ci)
                                            }
                                        />
                                    </label>
                                </Fragment>

                                {this.state.menu.map((m, index) => {
                                    //where catnum==1

                                    if (m.catNum == ci) {
                                        return (
                                            <div
                                                key={"key" + ci + index}
                                                className="row"
                                            >
                                                <input
                                                    key={
                                                        "fid" + ci + "" + index
                                                    }
                                                    id={
                                                        "fid" + ci + "0" + index
                                                    }
                                                    name="fid"
                                                    className="col"
                                                    placeholder="  编   号"
                                                    value={m.fid}
                                                    onChange={e =>
                                                        this.handleChange(
                                                            e,
                                                            m.id
                                                        )
                                                    }
                                                />
                                                <input
                                                    key={"fn" + ci + "" + index}
                                                    id={"fn" + ci + "0" + index}
                                                    name="fname"
                                                    className="col"
                                                    value={m.fname}
                                                    placeholder="  菜   名"
                                                    onChange={e =>
                                                        this.handleChange(
                                                            e,
                                                            m.id
                                                        )
                                                    }
                                                />
                                                <input
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
                                                    className="col"
                                                    value={m.price}
                                                    placeholder="  价   格"
                                                    onChange={e =>
                                                        this.handleChange(
                                                            e,
                                                            m.id
                                                        )
                                                    }
                                                />
                                                <input
                                                    key={
                                                        "note" + ci + "" + index
                                                    }
                                                    id={
                                                        "note" +
                                                        ci +
                                                        "0" +
                                                        index
                                                    }
                                                    name="note"
                                                    className="col"
                                                    value={
                                                        m.note != null
                                                            ? m.note
                                                            : ""
                                                    }
                                                    placeholder="  备   注"
                                                    onChange={e =>
                                                        this.handleChange(
                                                            e,
                                                            m.id
                                                        )
                                                    }
                                                />
                                            </div>
                                        );
                                    }
                                })}
                                <input
                                    key={"bti".ci}
                                    type="button"
                                    className="btn btn-light mt-1 ml-1 font-weight-bold"
                                    value="Add Input line"
                                    onClick={e => this.addInputs(e, ci)}
                                />
                            </div>
                        );
                    })}
                    <input
                        key="addC"
                        type="button"
                        className="btn btn-info mt-1 ml-1"
                        value="Add Category"
                        onClick={e => this.addCat(e)}
                    />
                    <hr />
                    <div className="form-group">
                        <label className="control-label">
                            Fried rice goes with main food:
                            <input
                                key="frPrice"
                                id="frPrice"
                                name="price"
                                className="ml-2"
                                value={this.state.frice}
                                placeholder="  价   格"
                                onChange={e => this.handleFrice(e)}
                            />
                        </label>
                    </div>
                    <input
                        key="submitk"
                        type="submit"
                        className="btn btn-success ml-1"
                        value="Submit"
                    />
                </form>
            );
        } else return <div>The page is loading... </div>;
    }
}

export default EditMenu;
