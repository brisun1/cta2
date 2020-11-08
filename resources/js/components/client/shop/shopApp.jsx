import React, { useState, useEffect } from "react";
import ShopDetail from "./shopDetail";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    withRouter,
    Redirect
} from "react-router-dom";

import MenuForm from "../menu/menuForm";
import Echo from "laravel-echo";
//import ClientMenu from "../menu/clientMenu";
import Default from "./default";

import history from "../../history";
function ShopApp(props) {
    //_isMounted = false;

    // componentWillUnmount() {
    //     this._isMounted = false;
    // }
    console.log("in  shopapp1" + JSON.stringify(props.data));
    const { schedule } = props.data;
    // if (schedule.name == null) {
    //     //const Tag = schedule.name;
    //     //note: string :no"";
    //     const TagName = ClientMenu;
    //     return <TagName />;
    // } else
    //     return (
    //         <div>
    //             <div>loading default...</div>;
    //             {/* <Order data={this.state.order} /> */}
    //         </div>
    //     );
    return (
        <div>
            {schedule.name != null ? (
                <Redirect to={"/" + schedule.name} />
            ) : (
                <div>
                    {null != props.data.shop[0] && (
                        <Default shop={props.data.shop[0]} num={0} />
                    )}
                </div>
            )}
        </div>
    );
}

export default withRouter(ShopApp);
//export default ShopApp;
