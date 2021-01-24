import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import formValidate from "../validation/formValidate";
//import useParams from "react-router-dom";
//it is menu.js in cta
class EditMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menu: [],
            cats: [],
            isMains: [],
            frPrice: "",
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
            phpErrors: {},
            errors: {
                cat: [],
                fid: [],
                fname: [],
                price: [],
                note: [],
                frPrice: ""
            }
        };
    }
    componentDidMount() {
        // const { shop } = this.props;
        // let str_tbl = shop.name + shop.area + shop.id;

        //dilivery price should be passed in controller
        axios.get(`api/menu/show/${this.props.tblString}`).then(res => {
            let sData = res.data;
            // console.log("whyres" + JSON.stringify(res.data));
            if (sData.length != 0) {
                let menu = sData.data;
                let cats = [];
                let isMains = [];
                let catErrors = [];
                let frPrice = null;
                //let errs = {};
                let fidErrs = [];
                let fnameErrs = [];
                let priceErrs = [];
                let noteErrs = [];
                // console.log("from menu didM" + JSON.stringify(menu));
                menu.forEach(el => {
                    if (el.cat != "addition") {
                        cats[el.catNum] = el.cat;
                        catErrors[el.catNum] = "";

                        isMains[el.catNum] = el.isMain;
                        fidErrs.push("");
                        fnameErrs.push("");
                        priceErrs.push("");
                        noteErrs.push("");
                    } else {
                        frPrice = el.price;
                    }
                });
                //let attach = menu.pop();
                //console.log("value of catErr" + JSON.stringify(catErrors));
                // //cats.pop();
                // console.log("value of cats" + JSON.stringify(cats));
                // isMains.pop();
                //console.log("catnnn" + JSON.stringify(cats));
                //let initialId = menu[0].id;
                // if (menu[0].id > 1) {
                //     for (let i = 0; i < initialId - 1; i++) {
                //         menu.unshift({
                //             id: i + 1,
                //             fid: "",
                //             fname: "",
                //             price: "",
                //             note: "",
                //             cat: "",
                //             catNum: ""
                //         });
                //     }
                // }
                this.setState({
                    menu: menu,
                    cats: cats,
                    isMains: isMains,
                    frPrice: frPrice,
                    errors: {
                        fid: fidErrs,
                        fname: fnameErrs,
                        price: priceErrs,
                        note: noteErrs,
                        cat: catErrors
                    }
                });
            }
        });
    }

    addInputs = (e, ci) => {
        const menu = [...this.state.menu];
        const { cats } = this.state;
        const newLine = {
            id: menu.length + 1,
            fid: "",
            fname: "",
            price: "",
            note: "",
            cat: cats[ci],
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
        //let cats = [...this.state.cats];

        // let i = cats.length + 1;

        this.setState({ cats: [...this.state.cats, ""] });
        // const inpVal = { ...this.state.inpVal };
        // inpVal.cat.push("");
        // this.setState({ inpVal });

        let { isMains } = this.state;

        isMains.push(false);
        this.setState({ isMains });
        const errors = { ...this.state.errors };
        errors.cat.push("");
        errors.fid.push([]);
        errors.fname.push([]);
        errors.price.push([]);
        errors.note.push([]);
        this.setState({ errors });
        this.addInputs(event, this.state.cats.length);
    };
    // addCat = () => {
    //     let cats = [...this.state.cats];

    //     let i = cats.length + 1;

    //     this.setState({ cats: [...this.state.cats, ""] });

    // };

    // addCat = () => {
    //     let cats = [...this.state.cats];

    //     let i = cats.length + 1;

    //     this.setState({ cats: [...this.state.cats, i] });
    //     const inpVal = { ...this.state.inpVal };
    //     inpVal.cat.push("");
    //     this.setState({ inpVal });
    // };
    handleChange = (e, index) => {
        const menu = [...this.state.menu];
        const { name, value } = e.target;
        //console.log("from handel chang" + index);
        menu[index][name] = value;

        this.setState({ menu });
    };
    // handleChange = (e, mid) => {
    //     const inpVal = { ...this.state.inpVal };
    //     const { name, value } = e.target;

    //     inpVal[name].catNum[index] = ci;
    //     inpVal[name].val[index] = value;
    //     this.setState({ inpVal });
    // };
    validateInput = (c, i) => {
        const { name } = event.target;
        let errors = { ...this.state.errors };
        if (!event.target.checkValidity()) {
            let error = event.target.validationMessage;
            if (typeof i !== undefined) {
                errors[name][i] = error;
            }
            if (typeof c !== undefined) {
                errors[name][c] = error;
            }
            // if (c === undefined) {
            //     errors[name] = error;
            // } else  else {
            //     errors[name][c][i] = error;
            // }
            this.setState({ errors });
        } else {
            if (c) {
                errors[name][c] = "";
            } else if (i) {
                errors[name][i] = "";
            }
            this.setState({ errors });
            // errors[name][c][i] = "";
            // this.setState({ errors });
        }
    };

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
        const isMains = [...this.state.isMains];
        isMains[ci] = !isMains[ci];
        // const inpVal = { ...this.state.inpVal };
        // inpVal.isMain[ci] = !inpVal.isMain[ci];
        this.setState({ isMains });
        //this.setState({ inpVal });
    };
    handleFrice = e => {
        this.setState({ frPrice: e.target.value });
    };
    handleSubmit = async event => {
        event.preventDefault();
        let errors = formValidate();
        // let fval = this.state.inpVal.fname.val;
        // let otherErrors = [];
        // let count = 0;
        // for (let i = 0; i < fval.length; i++) {
        //     if (fval[i] != "") count++;
        // }
        // if (count < 5) {
        //     otherErrors.push(
        //         "You have not filled enough food items. Please filled out more"
        //     );

        //     this.setState({ otherErrors });
        // } else {
        //     this.setState({ otherErrors: [] });
        // }
        if (!errors) {
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
            const data = { ...this.state };
            //let menud = this.state.menu;
            //console.log("dshfjcdshjfsdhdshj");
            let menu = data.menu.filter(el => {
                return (
                    el.fname != "" && el.fname != "Fried rice with main food"
                );
            });
            data["menu"] = menu;

            try {
                let res = await axios.post(
                    "api/menu/update/" + this.props.tblString,
                    data,
                    {
                        //params: { _method: "PUT" }
                    }
                );
                if (res.status === 200 && res.data == "menu update success")
                    // console.log("succes");
                    //console.log("in updatemenu" + JSON.stringify(data));
                    window.location.replace("/dashBoard");
            } catch (error) {
                let errs = {};
                let newErrors = error.response.data.errors;
                if (newErrors) {
                    this.setState({ phpErrors: {} });
                    // console.log(
                    //     "errors" + JSON.stringify(error.response.data.errors)
                    // );
                    for (const key in newErrors) {
                        let newkey = key;
                        if (newkey.includes("menu."))
                            newkey = newkey.replace("menu.", "No.");
                        if (newkey.includes("cats."))
                            newkey = newkey.replace("cats", " Category");
                        if (newkey.includes(".fid"))
                            newkey = newkey.replace(".fid", "  Food Id");

                        if (newkey.includes(".fname"))
                            newkey = newkey.replace(".fname", " Food Name");
                        if (newkey.includes(".note"))
                            newkey = newkey.replace(".note", " Note");
                        if (newkey.includes(".price"))
                            newkey = newkey.replace(".price", " Price");
                        errs[newkey] = newErrors[key][0];
                    }

                    this.setState({ phpErrors: errs });
                }
            }
            ////
            // axios

            //     .post("api/menu/update/" + this.props.tblString, this.state, {
            //         // params: {
            //         //     _method: "PUT"
            //         // }
            //     })

            //     .then(res => {
            //         console.log("reshhhhhh" + JSON.stringify(res.data));
            //         if (res.data == "menu update success")
            //             window.location.replace("/dashBoard");
            //     });
        }
    };

    showPhpErrs = () => {
        const { phpErrors } = this.state;
        if (phpErrors) {
            return Object.keys(phpErrors).map(key => {
                return (
                    <div className="text-danger" key={key}>
                        {key + ": " + phpErrors[key]}
                    </div>
                );
            });
        }
        // for (var key in phpErrors) {
        //     // check if the property/key is defined in the object itself, not in parent
        //     //if (phpErrors.hasOwnProperty(key)) {
        //     <div className="text-danger" key={key}>
        //         {key + ":" + phpErrors[key]}
        //     </div>;
        //     //console.log(key, dictionary[key]);
        // }
        //}
        // return Object.entries(phpErrors).map(([key, value], i) => {
        //     return (
        //         <div className="text-danger" key={key}>
        //             {value.id}
        //             {value.name}
        //         </div>
        //     );
        // }
    };
    render() {
        const { errors } = this.state;
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
                                        onBlur={() => this.validateInput(ci)}
                                        minLength={3}
                                        maxLength={30}
                                        required
                                    />
                                    {errors.cat[ci] && (
                                        <p className="text-danger">
                                            {errors.cat[ci]}
                                        </p>
                                    )}
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

                                    if (m.catNum === ci) {
                                        return (
                                            <div
                                                key={"key" + ci + index}
                                                className="row "
                                            >
                                                <label className="col-sm-2">
                                                    <input
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
                                                        type="text"
                                                        placeholder="  编   号"
                                                        value={m.fid}
                                                        onChange={e =>
                                                            this.handleChange(
                                                                e,
                                                                index
                                                            )
                                                        }
                                                        onBlur={() =>
                                                            this.validateInput(
                                                                null,
                                                                index
                                                            )
                                                        }
                                                        maxLength={30}
                                                    />
                                                    {errors.fid[index] && (
                                                        <div className="text-danger">
                                                            {errors.fid[index]}
                                                        </div>
                                                    )}
                                                </label>
                                                <label className="col-sm-4">
                                                    <input
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
                                                        type="text"
                                                        value={m.fname}
                                                        placeholder="  菜   名"
                                                        onChange={e =>
                                                            this.handleChange(
                                                                e,
                                                                index
                                                            )
                                                        }
                                                        onBlur={() =>
                                                            this.validateInput(
                                                                null,
                                                                index
                                                            )
                                                        }
                                                        maxLength={30}
                                                    />
                                                    {errors.fname[index] && (
                                                        <div className="text-danger">
                                                            {
                                                                errors.fname[
                                                                    index
                                                                ]
                                                            }
                                                        </div>
                                                    )}
                                                </label>
                                                <label className="col-sm-2">
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
                                                        type="number"
                                                        step={0.01}
                                                        min={0}
                                                        max={200}
                                                        value={m.price}
                                                        placeholder="  价   格"
                                                        onChange={e =>
                                                            this.handleChange(
                                                                e,
                                                                index
                                                            )
                                                        }
                                                        onBlur={() =>
                                                            this.validateInput(
                                                                null,
                                                                index
                                                            )
                                                        }
                                                    />
                                                    {errors.price[index] && (
                                                        <div className="text-danger">
                                                            {
                                                                errors.price[
                                                                    index
                                                                ]
                                                            }
                                                        </div>
                                                    )}
                                                </label>
                                                <label className="col-sm-3">
                                                    <input
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
                                                        type="text"
                                                        value={
                                                            m.note != null
                                                                ? m.note
                                                                : ""
                                                        }
                                                        placeholder="  备   注"
                                                        onChange={e =>
                                                            this.handleChange(
                                                                e,
                                                                index
                                                            )
                                                        }
                                                        onBlur={() =>
                                                            this.validateInput(
                                                                null,
                                                                index
                                                            )
                                                        }
                                                        maxLength={30}
                                                    />
                                                    {errors.note[index] && (
                                                        <div className="text-danger">
                                                            {errors.note[index]}
                                                        </div>
                                                    )}
                                                </label>
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
                                name="frPrice"
                                type="number"
                                step={0.01}
                                max={10}
                                className="ml-2"
                                value={this.state.frPrice}
                                placeholder="  价   格"
                                onChange={e => this.handleFrice(e)}
                                onBlur={() => this.validateInput()}
                            />
                        </label>
                        {errors.frPrice && (
                            <div className="text-danger">{errors.frPrice}</div>
                        )}
                    </div>
                    <div>{this.showPhpErrs()}</div>
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
