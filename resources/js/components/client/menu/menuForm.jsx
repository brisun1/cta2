import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import formValidate from "../validation/formValidate";
//import useParams from "react-router-dom";
//it is menu.js in cta
class MenuForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            frice: 2,
            cats: ["", ""],
            isMains: [false, false],
            inputs: [1, 2, 3, 4, 5],
            inpVal: {
                fid: {
                    id: null,
                    val: ["", "", "", "", ""],
                    catNum: [0, 0, 0, 1, 1]
                },

                // { id: null, inpVal: null },
                fname: {
                    id: null,
                    val: ["", "", "", "", ""],
                    catNum: [0, 0, 0, 1, 1]
                },
                price: {
                    id: null,
                    val: ["", "", "", "", ""],
                    catNum: [0, 0, 0, 1, 1]
                },
                isMain: [false, false, false, false, false],
                note: {
                    id: null,
                    val: ["", "", "", "", ""],
                    catNum: [0, 0, 0, 1, 1]
                },
                cat: ["", ""]
            },
            phpErrors: {},
            otherErrors: [],
            errors: {
                cat: ["", ""],
                fid: [
                    ["", "", ""],
                    ["", ""]
                ],
                fname: [
                    ["", "", ""],
                    ["", ""]
                ],
                price: [
                    ["", "", ""],
                    ["", ""]
                ],
                note: [
                    ["", "", ""],
                    ["", ""]
                ],
                frPrice: ""
            }
        };
    }
    addInputs = (e, ci) => {
        this.setState({ inputs: [...this.state.inputs, ci] });
        const inpVal = { ...this.state.inpVal };
        // Object.values(inpVal).forEach(function(item){
        //         //cat has no val property
        //         item.val.push("");

        // });

        inpVal.fname.catNum.push(ci);
        inpVal.fid.val.push("");
        inpVal.fname.val.push("");
        inpVal.price.val.push("");
        inpVal.note.val.push("");
        this.setState({ inpVal });
        const errors = { ...this.state.errors };
        errors.fid[ci].push("");
        errors.fname[ci].push("");
        errors.price[ci].push("");
        errors.note[ci].push("");
        this.setState({ errors });
    };
    addCat = () => {
        let { cats } = this.state;

        let i = cats.length;

        this.setState({ cats: [...this.state.cats, i + 1] });
        const inpVal = { ...this.state.inpVal };
        inpVal.cat.push("");
        this.setState({ inpVal });

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
        this.addInputs(event, i);
    };
    handleChange = (e, ci, index) => {
        //console.log("in handle change");
        const inpVal = { ...this.state.inpVal };
        const { name, value } = e.target;

        inpVal[name].catNum[index] = ci;
        inpVal[name].val[index] = value;
        this.setState({ inpVal });
        const { errors } = this.state;
        if (errors[name][ci][index]) this.validateInput(ci, index);
    };
    handleFrice = e => {
        const { errors } = this.state;
        this.setState({ frice: e.target.value });
        if (errors.frPrice) this.validateInput();
    };
    handleCat = (e, ci) => {
        const inpVal = { ...this.state.inpVal };
        inpVal.cat[ci] = e.target.value;
        this.setState({ inpVal });
        const { errors } = this.state;
        if (errors.cat[ci]) this.validateInput(ci);
    };
    handleIsMain = (e, ci) => {
        // this.setState({
        //     deliPrice: event.target.value,
        //     isDeli: !this.state.isDeli
        // });
        const isMains = [...this.state.isMains];
        isMains[ci] = !isMains[ci];
        const inpVal = { ...this.state.inpVal };
        inpVal.isMain[ci] = !inpVal.isMain[ci];
        this.setState({ isMains });
        this.setState({ inpVal });
    };
    validateInput = (c, i) => {
        const { name } = event.target;
        let errors = { ...this.state.errors };
        if (!event.target.checkValidity()) {
            let error = event.target.validationMessage;

            if (c === undefined) {
                errors[name] = error;
            } else if (i === undefined) {
                errors[name][c] = error;
            } else {
                errors[name][c][i] = error;
            }
            this.setState({ errors });
        } else {
            if (c === undefined) {
                errors[name] = "";
            } else if (i === undefined) {
                errors[name][c] = "";
            } else {
                errors[name][c][i] = "";
            }

            this.setState({ errors });
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
    };
    handleSubmit = async event => {
        event.preventDefault();
        let errors = formValidate();
        let fval = this.state.inpVal.fname.val;
        let otherErrors = [];
        let count = 0;
        for (let i = 0; i < fval.length; i++) {
            if (fval[i] != "") count++;
        }
        if (count < 5) {
            otherErrors.push(
                "You have not filled enough food items. Please filled out more"
            );

            this.setState({ otherErrors });
        } else {
            this.setState({ otherErrors: [] });
        }
        if (!errors && otherErrors.length === 0) {
            // alert(
            //     "Some fields were  filled in incorrectly. Please correct first! "
            // );
            //const tblName = this.props.computedParams.sref;
            // console.log("srefpppppp" + this.props);
            //setErrors(validate());
            //axios.post("api/clientForm", this.state).then(response => {});

            // const o = Object.keys(this.state.inputs);
            // for (let i = 0; i <= o.length - 1; i++) {
            //     data.set(o[i], this.state.inputs[o[i]]);
            // }
            //filter off empty value for fname.It caused troubl for php validation
            let fname = [...this.state.inpVal.fname.val];
            let fid = [...this.state.inpVal.fid.val];
            let price = [...this.state.inpVal.price.val];
            let note = [...this.state.inpVal.note.val];
            for (let i = 0; i < fname.length; i++) {
                if (fname[i] === "") {
                    fname.splice(i, 1);
                    fid.splice(i, 1);
                    price.splice(i, 1);
                    note.splice(i, 1);
                }
            }
            // fname = fname.filter(el => {
            //     return el != null;
            // });

            const data = {
                cat: this.state.inpVal.cat,
                isMain: this.state.isMains,
                fid: fid,
                fname: fname,
                price: price,
                catNum: [...this.state.inpVal.fname.catNum],
                note: note,
                frice: this.state.frice
            };

            //dilivery price should be passed in controller
            //axios.get("api/menu/show/" + { str_tbl });
            //alert("sending data" + JSON.stringify(data));
            //console.log("in createmenu" + JSON.stringify(data));
            try {
                let res = await axios.post(
                    "api/menu/store/" + this.props.tblString,
                    data,
                    {}
                );
                if (res.status === 200 && res.data === "menu success")
                    //console.log("succes");
                    //console.log("in updatemenu" + JSON.stringify(data));
                    window.location.replace("/dashBoard");
            } catch (error) {
                let errs = {};
                this.setState({ phpErrors: {} });
                let newErrors = error.response.data.errors;
                if (newErrors) {
                    //this.setState({ phpErrors: {} });
                    // console.log(
                    //     "errors" + JSON.stringify(error.response.data.errors)
                    // );
                    for (const key in newErrors) {
                        let newkey = key;
                        if (newkey.includes("cat."))
                            newkey = newkey.replace("cat.", "Category No. ");
                        if (newkey.includes("fid."))
                            newkey = newkey.replace("fid.", "Food ID No. ");
                        if (newkey.includes("fname."))
                            newkey = newkey.replace("fname.", "Food Name No. ");
                        // if (newkey.includes(".fid"))
                        //     newkey = newkey.replace(".fid", "  Food Id");

                        // if (newkey.includes(".fname"))
                        //     newkey = newkey.replace(".fname", " Food Name");
                        if (newkey.includes("note."))
                            newkey = newkey.replace("note.", "Note No. ");
                        if (newkey.includes("price."))
                            newkey = newkey.replace("price.", " Price No. ");
                        if (newkey.includes("frPrice."))
                            newkey = newkey.replace(
                                "frPrice.",
                                "Fried Rice Price No. "
                            );
                        if (newkey.includes("catNum."))
                            newkey = newkey.replace(
                                "catNum.",
                                " Category Number No. "
                            );
                        errs[newkey] = newErrors[key][0];
                    }

                    this.setState({ phpErrors: errs });
                }
            }

            // axios

            //     .post("api/menu/store/" + this.props.tblString, data, {})

            //     .then(res => {

            //         if (res.data == "menu success")
            //             window.location.replace("/dashBoard");

            //     });
        }
    };

    render() {
        const { errors, otherErrors } = this.state;
        return (
            //noValidate
            <form onSubmit={this.handleSubmit}>
                <br />
                <br />
                <h5 className="text-center">Menu Register Form</h5>
                <h6 className="text-center">菜单登记表</h6>
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
                                    <input
                                        key={"c" + ci}
                                        id={"cat" + ci}
                                        name="cat"
                                        type="text"
                                        className="ml-2"
                                        value={this.state.inpVal.cat[ci]}
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
                                </label>
                                <label className="ml-2">
                                    Is main food:
                                    <input
                                        name="isMain"
                                        type="checkbox"
                                        className="ml-2"
                                        //onChange={event => this.handleRadio(event)}

                                        value={this.state.inpVal.isMain[ci]}
                                        checked={this.state.isMains[ci] == true}
                                        onChange={e => this.handleIsMain(e, ci)}
                                    />
                                </label>
                            </Fragment>

                            {this.state.inputs.map((input, index) => {
                                //where catnum==1

                                if (
                                    this.state.inpVal.fname.catNum[index] == ci
                                ) {
                                    return (
                                        <div
                                            key={"key" + ci + index}
                                            className="row"
                                        >
                                            <div
                                                key={"fidd" + ci + "" + index}
                                                className="col-sm-2"
                                            >
                                                <input
                                                    key={
                                                        "fid" + ci + "" + index
                                                    }
                                                    id={
                                                        "fid" + ci + "0" + index
                                                    }
                                                    name="fid"
                                                    type="text"
                                                    placeholder="  编   号"
                                                    value={
                                                        this.state.inpVal.fid
                                                            .val[index]
                                                    }
                                                    onChange={e =>
                                                        this.handleChange(
                                                            e,
                                                            ci,
                                                            index
                                                        )
                                                    }
                                                    onBlur={() =>
                                                        this.validateInput(
                                                            ci,
                                                            index
                                                        )
                                                    }
                                                    minLength={3}
                                                    maxLength={9}
                                                />
                                                {errors.fid[ci][index] && (
                                                    <div className="text-danger">
                                                        <br />
                                                        {errors.fid[ci][index]}
                                                    </div>
                                                )}
                                            </div>
                                            <div
                                                key={"fnd" + ci + "" + index}
                                                className="col-sm-4"
                                            >
                                                <input
                                                    key={"fn" + ci + "" + index}
                                                    id={"fn" + ci + "0" + index}
                                                    name="fname"
                                                    type="text"
                                                    value={
                                                        this.state.inpVal.fname
                                                            .val[index]
                                                    }
                                                    placeholder="  菜   名"
                                                    onChange={e =>
                                                        this.handleChange(
                                                            e,
                                                            ci,
                                                            index
                                                        )
                                                    }
                                                    onBlur={() =>
                                                        this.validateInput(
                                                            ci,
                                                            index
                                                        )
                                                    }
                                                    minLength={3}
                                                    maxLength={30}
                                                />
                                                {errors.fname[ci][index] && (
                                                    <div className="text-danger">
                                                        {
                                                            errors.fname[ci][
                                                                index
                                                            ]
                                                        }
                                                    </div>
                                                )}
                                            </div>
                                            <div
                                                key={"priced" + ci + "" + index}
                                                className="col-sm-2"
                                            >
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
                                                    value={
                                                        this.state.inpVal.price
                                                            .val[index]
                                                    }
                                                    placeholder="  价   格"
                                                    onChange={e =>
                                                        this.handleChange(
                                                            e,
                                                            ci,
                                                            index
                                                        )
                                                    }
                                                    onBlur={() =>
                                                        this.validateInput(
                                                            ci,
                                                            index
                                                        )
                                                    }
                                                    min={0}
                                                    max={250}
                                                    //required
                                                />
                                                {errors.price[ci][index] && (
                                                    <div>
                                                        <br />
                                                        <div className="text-danger">
                                                            {
                                                                errors.price[
                                                                    ci
                                                                ][index]
                                                            }
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div
                                                key={"noted" + ci + "" + index}
                                                className="col-sm-3"
                                            >
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
                                                    value={
                                                        this.state.inpVal.note
                                                            .val[index]
                                                    }
                                                    placeholder="备   注"
                                                    onChange={e =>
                                                        this.handleChange(
                                                            e,
                                                            ci,
                                                            index
                                                        )
                                                    }
                                                    onBlur={() =>
                                                        this.validateInput(
                                                            ci,
                                                            index
                                                        )
                                                    }
                                                    maxLength={30}
                                                />
                                                {errors.note[ci][index] && (
                                                    <div className="text-danger">
                                                        {errors.note[ci][index]}
                                                    </div>
                                                )}
                                            </div>
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
                        Price for fried rice going with main food:
                        <input
                            key="frPrice"
                            id="frPrice"
                            name="frPrice"
                            type="number"
                            step={0.01}
                            className="ml-2"
                            value={this.state.frice}
                            placeholder="  价   格"
                            onChange={e => this.handleFrice(e)}
                            onBlur={() => this.validateInput()}
                            min={0}
                            max={10}
                            required
                        />
                        {errors.frPrice && (
                            <p className="text-danger">{errors.frPrice}</p>
                        )}
                    </label>
                </div>
                {otherErrors.length > 0 && (
                    <div className="text-danger">
                        {otherErrors.map(err => {
                            return err;
                        })}
                    </div>
                )}
                <div>{this.showPhpErrs()}</div>
                <input
                    key="submitk"
                    type="submit"
                    className="btn btn-success ml-1"
                    value="Submit"
                />
            </form>
        );
    }
}

export default MenuForm;
// if (document.getElementById("menu")) {
//     ReactDOM.render(<MenuForm />, document.getElementById("menu"));
// }
