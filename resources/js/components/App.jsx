import React, { Component } from "react";
import Shops from "./shop/shops";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import MenuOrder from "./menu/menuOrder";
import Msg from "./client/shop/msg";
class App extends Component {
    //const favourite = null;
    state = {
        chosen: null,
        shops: []
    };

    componentDidMount() {
        axios.get("api/shop/index").then(res => {
            console.log("from did mount");
            this.setState({
                shops: res.data
            });
            if (null == this.state.chosen) {
                let rand = Math.floor(Math.random() * this.state.shops.length);

                this.setState({
                    chosen: rand
                });
            }
        });
    }
    render() {
        return (
            <>
                <div>for socket</div>
                <Router>
                    <Link to="/">Home</Link>
                    <Msg />
                    <Switch>
                        <Route exact path="/orderMenu/:id">
                            <MenuOrder shops={this.state.shops} />
                        </Route>
                        <Route exact path="/">
                            <Shops data={this.state} />
                        </Route>
                    </Switch>
                </Router>
            </>
        );
    }
}

export default App;
if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}
