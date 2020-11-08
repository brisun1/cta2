import React, { Component } from "react";

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapIsReady: false
        };
    }

    componentDidMount() {
        const ApiKey = "AIzaSyBD6bth8x9c4ekzB3kBkAV288r1ir5PIwc";
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${ApiKey}`;
        script.async = true;
        script.defer = true;
        script.addEventListener("load", () => {
            this.setState({ mapIsReady: true });
        });

        document.body.appendChild(script);
    }

    componentDidUpdate() {
        if (this.state.mapIsReady) {
            // Display the map
            this.map = new window.google.maps.Map(
                document.getElementById("map"),
                {
                    center: { lat: -34.397, lng: 150.644 },
                    zoom: 12,
                    mapTypeId: "roadmap"
                }
            );
            //marker
            var uluru = { lat: -25.344, lng: 131.036 };
            var u2 = { lat: -22.344, lng: 131.036 };
            var marker = new window.google.maps.Marker({
                position: uluru,
                u2,
                map: this.map
            });
        }
    }

    render() {
        return <div style={{ width: "88vw", height: "55vh" }} id="map" />;
    }
}
