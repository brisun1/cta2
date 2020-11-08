import React from "react";
export const Shop = ({ shop }) => {
    //const { shop } = props;
    return (
        <div>
            <h6>The shop you order to:</h6>
            <div>{shop.shopName}</div>
            <div>{shop.area}</div>
            <div>{shop.phone}</div>
        </div>
    );
};
export default Shop;
