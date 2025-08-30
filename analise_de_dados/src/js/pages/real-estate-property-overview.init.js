/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: real estate Property Overview Init Js File
*/

function toggleElementClass(elementId, className) {
    const element = document.getElementById(elementId);
    if (element.classList.contains(className)) {
        element.classList.remove(className);
    } else {
        element.classList.add(className);
    }
}

document.getElementById("agent-chat").addEventListener('click', function () {
    toggleElementClass("emailchat-detailElem", "d-block");
});

document.getElementById("emailchat-btn-close").addEventListener('click', function () {
    toggleElementClass("emailchat-detailElem", "d-block");
});

//Property Slider
var swiper = new Swiper(".property-slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    }
});

// leaflet-map-group-control
var cities = L.layerGroup();

L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.').addTo(cities);

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

var layerGroupControlMap = L.map('leaflet-map-group-control', {
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

L.control.layers(baseLayers, overlays).addTo(layerGroupControlMap);