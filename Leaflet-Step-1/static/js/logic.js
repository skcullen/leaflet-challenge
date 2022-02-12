

//get data
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//create layer groups to build later
var eq = L.layerGroup();

// Create the tile layer that will be the background of our map.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create a baseMaps object.
var baseMaps = {
  "Street Map": street,
};

// Create an overlay object.
var overlayMaps = {
  "Earthquake": eq,
};

// Define a map object.
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers:[street, eq]
  });

 // Pass our map layers to our layer control.
// Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap); 

d3.json(queryUrl).then(function(data) {
    function eqColor(depth) {
        switch (true) {
            case depth > 90:
              return "red";
            case depth > 70:
              return "orangered";
            case depth > 50:
              return "orange";
            case depth > 30:
              return "gold";
            case depth > 10:
              return "yellow";
            default:
              return "green";
        }
    };
    function eqSize(magni) {
        return magni * 3;
    };

    function styleInfo(feature) {
      return {
        stroke: true,
        fillOpacity: 0.75,
        color: eqColor(feature.geometry.coordinates[2]),
        fillColor: eqColor(feature.geometry.coordinates[2]),
        radius: eqSize(feature.properties.mag)
      }
    }

    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
            //   {
            //     stroke: true,
            //     fillOpacity: 0.75,
            //     color: eqColor(feature.geometry[2]),
            //     fillColor: eqColor(feature.geometry[2]),
            //     radius: eqSize(feature.properties.mag)
            // });
        },
          style: styleInfo,
        onEachFeature: function(feature, layer) {
            layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
        }
    }).addTo(eq);
    eq.addTo(myMap)
  })

    // Create a legend to display information about our map.
    var legend = L.control({
        position: "bottomright"
    });
    // When the layer control is added, insert a div with the class of "legend".
    legend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "info legend");
        var badness =[-10,10,30,50,70,90];
        var colors =["green","yellow","gold","orange","orangered","red"];

        for (var i = 0; i < badness.length; i++) {
            div.innerHTML +=
                "<i style='background: " + colors[i] + "'></i> " +
                badness[i] + (badness[i + 1] ? "&ndash;" + badness[i + 1] + "<br>" : "+");
        }
        console.log(div)
        return div;
    };
    legend.addTo(myMap);

  
  
// })