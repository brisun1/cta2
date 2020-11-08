export default function getDist(o, d) {
    //const origin = "10 walkinstown avenue, dublin 12";
    //const destination = "5 dame street,dublin 2";
    // var origin = { lat: 55.93, lng: -3.118 };

    // var destination = "Stockholm, Sweden";
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
            origins: [o],
            destinations: [d],
            travelMode: "DRIVING",
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
        },
        function(response, status) {
            if (status !== "OK") {
                alert("Error was: " + status);
            } else {
                console.log("respoooppppp" + d + o);
                console.log(
                    "respppppp" + response.rows[0].elements[0].distance.text
                );
                return response.rows[0].elements[0].distance.text;
            }
        }
    );
}
