import React, { Component } from "react";
import ReactDOM from "react-dom";
class CallTest extends Component {
    state = {};
    componentDidMount() {
        console.log("in child didMount");
    }
    // axios.get("api/menu/show").then(res => {
    //     let sData = res.data;
    //     //console.log("whyres" + JSON.stringify(sData.data));
    //     let menu = sData.data;
    render() {
        console.log("test render");
        return (
            <div>
                <table className="table-bordered">
                    <div>ggggg</div>
                    <tr>
                        <td>1ffff</td>
                        <td>1ffffkkkkkkkkk</td>
                        <td>1f</td>
                    </tr>
                    <tr>
                        <td>2ffff</td>
                        <td>2ffffkkkkkkkkk</td>
                        <td>2f</td>
                    </tr>
                    <tr>
                        <td>3ffff</td>
                        <td>3ff</td>
                        <td>3fkkkkkkkkkkkkkkkk</td>
                    </tr>
                    <div>ggggg33333333</div>
                    <tr>
                        <td>1ffff</td>
                        <td>1ffffkkkkkkkkk</td>
                        <td>1f</td>
                    </tr>
                    <tr>
                        <td>2ffff</td>
                        <td>2ffffkkkkkkkkk</td>
                        <td>2f</td>
                    </tr>
                    <tr>
                        <td>3ffff</td>
                        <td>3ff</td>
                        <td>3fkkkkkkkkkkkkkkkk</td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default CallTest;
//ReactDOM.render(<CallTest />, document.getElementById("test"));
