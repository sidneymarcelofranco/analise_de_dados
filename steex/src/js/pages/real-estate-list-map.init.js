/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: real estate list map Init Js File
*/

// leaflet-map-group-control
var cities = L.layerGroup();

L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.').addTo(cities),
    L.marker([39.63, -105.09]).bindPopup('This is Littleton, CO.').addTo(cities),
    L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.').addTo(cities),
    L.marker([39.77, -105.01]).bindPopup('This is Denver, CO.').addTo(cities),
    L.marker([39.90, -105.03]).bindPopup('This is Denver, CO.').addTo(cities),
    L.marker([39.96, -105.04]).bindPopup('This is Denver, CO.').addTo(cities),
    L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.').addTo(cities),
    L.marker([39.70, -104.9]).bindPopup('This is Aurora, CO.').addTo(cities),
    L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.').addTo(cities),
    L.marker([39.80, -105.01]).bindPopup('This is Golden, CO.').addTo(cities),
    L.marker([39.95, -105.09]).bindPopup('This is Golden, CO.').addTo(cities);


var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGhlbWVzYnJhbmQiLCJhIjoiY2xmbmc3bTV4MGw1ejNzbnJqOWpubzhnciJ9.DNkdZVKLnQ6I9NOz7EED-w';

var grayscale = L.tileLayer(mbUrl, {
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1,
    attribution: mbAttr
}),
    streets = L.tileLayer(mbUrl, {
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        attribution: mbAttr
    });

var layergroupcontrolmap = L.map('leaflet-map-group-control', {
    center: [39.73, -104.99],
    zoom: 10,
    layers: [streets, cities]
});

var baseLayers = {
    "Grayscale": grayscale,
    "Streets": streets
};

var overlays = {
    "Cities": cities
};

L.control.layers(baseLayers, overlays).addTo(layergroupcontrolmap);

// Dropzone
var dropzonePreviewNode = document.querySelector("#property-preview-list");
dropzonePreviewNode.id = "";
if (dropzonePreviewNode) {
    var previewTemplate = dropzonePreviewNode.parentNode.innerHTML;
    dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode);
    var dropzone = new Dropzone(".property-dropzone", {
        url: 'https://httpbin.org/post',
        method: "post",
        previewTemplate: previewTemplate,
        previewsContainer: "#property-preview",
    });
}