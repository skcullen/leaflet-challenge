# leaflet-challenge

<img width="826" alt="image" src="https://user-images.githubusercontent.com/87721070/153729082-a21f5581-6ac7-457c-a701-ca13312f3bfe.png">

In this assignment, we were asked to create two maps with earthquake data from the USGS GeoJSON Feed and tectonic plate data from https://github.com/fraxen/tectonicplates.

In the first map, we were asked to use only one map layer. This map took the USGS GeoJSON data and plot a marker for each earthquake recorded. The size of the marker corresponded to the depth of the earthquake, while the color reflected the magnitude. For each marker, we were asked to have a pop-up with more information about that specific earthquake. Finally, this map had to include a legend.

For the second map, we took the first map and added the tectonic plate data in order to compare earthquake activity with tectonic plates. This map had to include a control with which you could switch between different kinds of maps, I used a street map, and a topographic map, as well as be able to see the different layers at will. This map is pictured above.

I had quite a bit of trouble getting these maps to work. I had a couple of things in the wrong spot and had to rewrite a few functions in a different format, but the thing that really caused me problems was getting the markers to show the size and color properly. I left some of the old code in to show where it was originally located, but it is commented out.
