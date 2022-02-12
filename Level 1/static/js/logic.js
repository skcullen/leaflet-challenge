

//get data
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Define a map object.
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });

// Create the tile layer that will be the background of our map.
var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

d3.json(queryUrl,function(data) {
    function eqColor(depth) {
        switch (true) {
            case depth > 5:
              return "red";
            case depth > 4:
              return "orangered";
            case depth > 3:
              return "orange";
            case depth > 2:
              return "gold";
            case depth > 1:
              return "yellow";
            default:
              return "green";
        }
    };
    function eqSize(magni) {
        return magni * 3;
    };

    L.geoJSON(data, {
        pointToLayer: function(latlng,feature) {
            return L.circleMarker(latlng, {
                stroke: true,
                fillOpacity: 0.75,
                color: eqColor(feature.geometry[2]),
                fillColor: eqColor(feature.geometry[2]),
                radius: eqSize(feature.properties.mag)
            });
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
        }
    }).addto(myMap);

    // Create a legend to display information about our map.
    var info = L.control({
        position: "bottomright"
    });
    // // When the layer control is added, insert a div with the class of "legend".
    // info.onAdd = function() {
    //     var div = L.DomUtil.create("div", "info legend");
    //     var badness =[-10,10,30,50,70,90];
    //     var colors =["green","yellow","gold","orange","orangered","red"],

    //     for (var i = 0; i < badness.length; i++) {
    //         div.innerHTML =+
    //             "<i style='background: " + colors[i] + "'></i> " +
    //             badness[i] + (badness[i + 1] ? "&ndash;" + badness[i + 1] + "<br>" : "+");
    //     }

    //     return div;
    // };
    // info,addTo(myMap);

    // Create a baseMaps object.
    var baseMaps = {
        "Street Map": street,
    };
    // Pass our map layers to our layer control.
    // Add the layer control to the map.
    L.control.layers(baseMaps, {
        collapsed: false
    }).addTo(myMap);
  
})