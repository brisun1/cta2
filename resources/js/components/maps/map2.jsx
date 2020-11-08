// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import "../../../css/style.css";

// class Map extends Component {
//     componentDidMount() {
//         this.renderMap();
//     }

//     renderMap = () => {
//         loadScript(
//             "https://maps.googleapis.com/maps/api/js?key=AIzaSyBD6bth8x9c4ekzB3kBkAV288r1ir5PIwc&callback=initMap&libraries=&v=weekly"
//         );
//         window.initMap = this.initMap;
//     };

//     initMap = () => {
//         // Create A Map
//         var map = new window.google.maps.Map(document.getElementById("map"), {
//             center: { lat: -34.397, lng: 150.644 },
//             zoom: 8
//         });

//         // Create An InfoWindow
//         console.log("mymmmmmmmmmmmmmmmmmap" + map);
//         // Display Dynamic Markers
//     };

//     render() {
//         return (
//             <main>
//                 <div id="map"></div>
//             </main>
//         );
//     }
// }

// function loadScript(url) {
//     var index = window.document.getElementsByTagName("script")[0];
//     var script = window.document.createElement("script");
//     script.src = url;
//     script.async = true;
//     script.defer = true;
//     index.parentNode.insertBefore(script, index);
// }

// export default Map;

// // }
