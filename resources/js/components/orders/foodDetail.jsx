import React, { Component } from "react";
export default function FoodDetail(props) {
    const foods = props.foods;
    let total = foods.reduce((total, a) => {
        return total + Number(a.price);
    }, 0);
    return (
        <>
            <table className="table table-bordered">
                <thead>
                    <tr className="">
                        <td></td>
                        <td>Name</td>
                        {/* <td>Rate</td> */}

                        <td>Qty</td>
                        <td>Price</td>
                    </tr>
                </thead>
                <tbody>
                    {foods.map((food, index) => {
                        //where catnum==1
                        //const s = Math.round(food.subTotal * 100) / 100;
                        //let subTotal = s.toFixed(2);

                        return (
                            <tr
                                key={"key" + "-" + index}
                                id={"row" + "--" + index}
                                className=""
                            >
                                <td
                                    key={"fid" + "" + index}
                                    id={"fid" + "0" + index}
                                    name="fid"
                                >
                                    {food.fid}
                                </td>
                                <td
                                    key={"fn" + "" + index}
                                    id={"fn" + "0" + index}
                                    name="fname"
                                    className=""
                                >
                                    {food.fname}

                                    {food.main_attach && (
                                        <span className="ml-2 text-success font-italic">
                                            with {food.main_attach}
                                        </span>
                                    )}
                                </td>

                                <td
                                    key={"qty" + "" + index}
                                    id={"qty" + "0" + index}
                                    name="qty"
                                    className=""
                                >
                                    {food.qty}
                                </td>
                                <td
                                    key={"price" + "" + index}
                                    id={"price" + "0" + index}
                                    name="price"
                                    className=""
                                >
                                    {food.price}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td>Sum:</td>
                        <td></td>
                        <td>{total}</td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
}
