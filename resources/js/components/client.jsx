import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from "react-router-dom";
import ReactDOM from "react-dom";
import Shopui from "../components/shopui";
import MenuForm from "../components/menu/menuForm";
import GetMenu from "../components/menu/getMenu";

function ClientApp() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/order"
                                activeStyle={{ color: "green" }}
                            >
                                Oreder
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/shopShow">Shop detail</NavLink>
                        </li>
                        <li>
                            <NavLink to="/menuShow">menu detail</NavLink>
                        </li>
                        <li>
                            <NavLink to="/createMenu">create menu</NavLink>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/createMenu" component={MenuForm}></Route>
                    <Route path="/shopShow" component={Shopui}>
                        {/* <ShopDetail /> */}
                    </Route>
                    <Route path="/menuShow" component={GetMenu}></Route>
                    <Route path="/order">
                        <Order />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function Home() {
    return <h2>Home</h2>;
}

function Order() {
    return <h2>Order</h2>;
}

//function ShopDetail() {
//     return <h2>shop dd</h2>;
// }
export default ClientApp;
if (document.getElementById("client")) {
    ReactDOM.render(<ClientApp />, document.getElementById("client"));
}
