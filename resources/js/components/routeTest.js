import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    Redirect
} from "react-router-dom";
import ReactDOM from "react-dom";
function RouteTest() {
    return (
        <Router>
            <nav>
                <NavLink to="/page1">page1</NavLink>
                <NavLink to="/page2">page2</NavLink>
                <NavLink to="/page3">page3</NavLink>
            </nav>
            <Switch>
                <Route path="/dashBoard">
                    <Page2 />
                </Route>
                <Route path="/page2">
                    <Page2 />
                </Route>
                <Route path="/page1">
                    <Page1 />
                </Route>
                <Route path="/page3">
                    {1 < 2 ? <Redirect to="/page1" /> : <Page2 />}
                </Route>
            </Switch>
        </Router>
    );
}

export default RouteTest;
//ReactDOM.render(<RouteTest />, document.getElementById("client2"));
function Page1() {
    return <div>page 1111</div>;
}
function Page2() {
    return <div>page 22222</div>;
}
