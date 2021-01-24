import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import formValidate from "../validation/formValidate";
export default class DeliUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delivery: {
                // dist1: "",
                // dist15: "",
                // dist2: "",
                // dist25: "",
                // dist3: "",
                // dist4: "",
                // servLimit: ""
            },
            errors: {
                dist1: "",
                dist15: "",
                dist2: "",
                dist25: "",
                dist3: "",
                dist4: "",
                servLimit: ""
            }
        };
    }
    componentDidMount() {
        axios.get("api/delivery/show").then(res => {
            // if (res.data) console.log("in delishow" + JSON.stringify(res.data));
            if (res.data.meta.shop_id === this.props.shop.id)
                this.setState({
                    delivery: res.data.data
                });
        });
    }
    handleChange = event => {
        const { name, value } = event.target;
        const delivery = { ...this.state.delivery };
        delivery[name] = value;
        this.setState({ delivery });
        const { errors } = this.state;
        if (errors[name]) this.validateInput();
    };
    validateInput = () => {
        const { name } = event.target;
        let errors = { ...this.state.errors };
        if (!event.target.checkValidity()) {
            errors[name] = event.target.validationMessage;
            //console.log("in blur");
            this.setState({ errors });
        } else {
            errors[name] = "";
            this.setState({ errors });
        }
    };
    handleSubmit = async event => {
        event.preventDefault();
        let errors = formValidate();
        if (errors) this.setState({ errors });
        else {
            try {
                let res = await axios.post(
                    "api/delivery/update",
                    this.state.delivery,
                    {
                        params: {
                            _method: "PUT"
                        }
                    }
                );
                if (res.status === 200 && res.data == "delivery update success")
                    window.location.replace("/dashBoard");
            } catch (error) {
                let errs = { ...this.state.errors };
                let newErrors = error.response.data.errors;

                //console.log("errors" + JSON.stringify(error.response.data));
                for (const key in newErrors) {
                    errs[key] = newErrors[key][0];
                }
                this.setState({ errors: errs });
            }

            // axios
            //     .post("api/delivery/update", this.state.delivery, {
            //         params: {
            //             _method: "PUT"
            //         }
            //     })

            //     .then(res => {
            //         // then print response status
            //         console.log(
            //             "in deliupdate, res=" + JSON.stringify(res.data)
            //         );
            //         if (res.data == "delivery update success")
            //             window.location.replace("/dashBoard");
            //     });
        }
    };

    render() {
        const { delivery, errors } = this.state;
        return (
            <div>
                {Object.keys(delivery).length > 0 ? (
                    <div>
                        <br />
                        <h5 className="text-center">Edit Delivery Price </h5>
                        <h6 className="text-center">修改送餐价格</h6>
                        <hr />
                        <form noValidate onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label className="control-label">
                                    Distance 1km:
                                    <input
                                        name="dist1"
                                        placeholder="€ price"
                                        value={this.state.delivery.dist1}
                                        onChange={this.handleChange}
                                        type="number"
                                        min={1}
                                        max={20}
                                        step={0.1}
                                        onBlur={this.validateInput}
                                        required
                                    />
                                </label>
                                {errors.dist1 && (
                                    <p className="text-danger">
                                        {errors.dist1}
                                    </p>
                                )}
                            </div>
                            <div className="form-group">
                                <label className="control-label">
                                    Distance 1.5 km:
                                    <input
                                        name="dist15"
                                        type="text"
                                        placeholder="€ price"
                                        value={this.state.delivery.dist15}
                                        onChange={this.handleChange}
                                        type="number"
                                        min={1}
                                        max={20}
                                        step={0.1}
                                        onBlur={this.validateInput}
                                        required
                                    />
                                </label>
                                {errors.dist15 && (
                                    <p className="text-danger">
                                        {errors.dist15}
                                    </p>
                                )}
                            </div>
                            <div className="form-group">
                                <label className="control-label">
                                    Distance 2 km:
                                    <input
                                        name="dist2"
                                        placeholder="€ price"
                                        value={delivery.dist2}
                                        onChange={this.handleChange}
                                        type="number"
                                        min={1}
                                        max={20}
                                        step={0.1}
                                        onBlur={this.validateInput}
                                        required
                                    />
                                </label>
                                {errors.dist2 && (
                                    <p className="text-danger">
                                        {errors.dist2}
                                    </p>
                                )}
                            </div>
                            <div className="form-group">
                                <label className="control-label">
                                    Distance 2.5 km:
                                    <input
                                        name="dist25"
                                        placeholder="€ price"
                                        value={delivery.dist25}
                                        onChange={this.handleChange}
                                        type="number"
                                        min={1}
                                        max={20}
                                        step={0.1}
                                        onBlur={this.validateInput}
                                        required
                                    />
                                </label>
                                {errors.dist25 && (
                                    <p className="text-danger">
                                        {errors.dist25}
                                    </p>
                                )}
                            </div>
                            <div className="form-group">
                                <label className="control-label">
                                    Distance 3 km:
                                    <input
                                        name="dist3"
                                        placeholder="€ price"
                                        value={delivery.dist3}
                                        onChange={this.handleChange}
                                        type="number"
                                        min={1}
                                        max={20}
                                        step={0.1}
                                        onBlur={this.validateInput}
                                        required
                                    />
                                </label>
                                {errors.dist3 && (
                                    <p className="text-danger">
                                        {errors.dist3}
                                    </p>
                                )}
                            </div>
                            <div className="form-group">
                                <label className="control-label">
                                    Distance 4km:
                                    <input
                                        name="dist4"
                                        placeholder="€ price"
                                        value={delivery.dist4}
                                        onChange={this.handleChange}
                                        type="number"
                                        min={1}
                                        max={20}
                                        step={0.1}
                                        onBlur={this.validateInput}
                                        required
                                    />
                                </label>
                                {errors.dist4 && (
                                    <p className="text-danger">
                                        {errors.dist4}
                                    </p>
                                )}
                            </div>
                            <div className="form-group">
                                <label className="control-label">
                                    Served area distance limit: km <br />
                                    最远服务距离：公里
                                    <input
                                        name="servLimit"
                                        placeholder="km distance"
                                        value={delivery.servLimit}
                                        onChange={this.handleChange}
                                        type="number"
                                        min={1}
                                        max={20}
                                        step={0.5}
                                        onBlur={this.validateInput}
                                        required
                                    />
                                </label>
                                {errors.servLimit && (
                                    <p className="text-danger">
                                        {errors.servLimit}
                                    </p>
                                )}
                            </div>
                            <input
                                type="submit"
                                value="Submit"
                                className="btn btn-info"
                            />
                        </form>
                    </div>
                ) : (
                    <div>No delivery price found</div>
                )}
            </div>
        );
        // if (Object.keys(delivery).length > 0)
        //     return (
        //         <div>
        //             <br />
        //             <h5 className="text-center">Edit Delivery Price </h5>
        //             <h6 className="text-center">修改送餐价格</h6>
        //             <hr />
        //             <form onSubmit={this.handleSubmit}>
        //                 <div className="form-group">
        //                     <label className="control-label">
        //                         Distance 1km:
        //                         <input
        //                             name="dist1"
        //                             type="text"
        //                             placeholder="€ price"
        //                             value={this.state.delivery.dis1}
        //                             onChange={this.handleChange}
        //                         />
        //                     </label>
        //                     {errors.dist1 && (
        //                         <p className="text-danger">{errors.dist1}</p>
        //                     )}
        //                 </div>
        //                 <div className="form-group">
        //                     <label className="control-label">
        //                         Distance 1.5 km:
        //                         <input
        //                             name="dist15"
        //                             type="text"
        //                             placeholder="€ price"
        //                             value={this.state.delivery.dis15}
        //                             onChange={this.handleChange}
        //                         />
        //                     </label>
        //                     {errors.dist15 && (
        //                         <p className="text-danger">{errors.dist15}</p>
        //                     )}
        //                 </div>
        //                 <div className="form-group">
        //                     <label className="control-label">
        //                         Distance 2 km:
        //                         <input
        //                             name="dist2"
        //                             type="text"
        //                             placeholder="€ price"
        //                             value={delivery.dis2}
        //                             onChange={this.handleChange}
        //                         />
        //                     </label>
        //                     {errors.dist2 && (
        //                         <p className="text-danger">{errors.dist2}</p>
        //                     )}
        //                 </div>
        //                 <div className="form-group">
        //                     <label className="control-label">
        //                         Distance 2.5 km:
        //                         <input
        //                             name="dist25"
        //                             type="text"
        //                             placeholder="€ price"
        //                             value={delivery.dist25}
        //                             onChange={this.handleChange}
        //                         />
        //                     </label>
        //                     {errors.dist25 && (
        //                         <p className="text-danger">{errors.dist25}</p>
        //                     )}
        //                 </div>
        //                 <div className="form-group">
        //                     <label className="control-label">
        //                         Distance 3 km:
        //                         <input
        //                             name="dist3"
        //                             type="text"
        //                             placeholder="€ price"
        //                             value={delivery.dist3}
        //                             onChange={this.handleChange}
        //                         />
        //                     </label>
        //                     {errors.dist3 && (
        //                         <p className="text-danger">{errors.dist3}</p>
        //                     )}
        //                 </div>
        //                 <div className="form-group">
        //                     <label className="control-label">
        //                         Distance 4km:
        //                         <input
        //                             name="dist4"
        //                             type="text"
        //                             placeholder="€ price"
        //                             value={delivery.dist4}
        //                             onChange={this.handleChange}
        //                         />
        //                     </label>
        //                     {errors.dist4 && (
        //                         <p className="text-danger">{errors.dist4}</p>
        //                     )}
        //                 </div>
        //                 <div className="form-group">
        //                     <label className="control-label">
        //                         Served area distance limit: km <br />
        //                         最远服务距离：公里
        //                         <input
        //                             name="servLimit"
        //                             type="text"
        //                             placeholder="km distance"
        //                             value={delivery.servLimit}
        //                             onChange={this.handleChange}
        //                         />
        //                     </label>
        //                     {errors.servLimit && (
        //                         <p className="text-danger">
        //                             {errors.servLimit}
        //                         </p>
        //                     )}
        //                 </div>
        //                 <input
        //                     type="submit"
        //                     value="Submit"
        //                     className="btn btn-info"
        //                 />
        //             </form>
        //         </div>
        //     );
    }
}
