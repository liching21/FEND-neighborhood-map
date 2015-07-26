/**
 *	Author: Liching Yew
 * 	Description: app.js
 */

 /** Code fo the ViewModel */
function AppViewModel() {

//Center of map location is Circular Quay
var centerLat = ko.observable(-33.8618579);
var centerLang = ko.observable(151.2105461);

var mapCenter = new google.maps.LatLng(centerLat(), centerLang());

/** creating an array of location pins */
var pins = ko.observableArray([
  {
    lat: -40.8674869,
    lang: 161.2069902,
    type: 'Food',
    pinLatLang: null
  },
  {
    lat: -33.8674869,
    lang: 151.2069902,
    type: 'Accomodation',
    pinLatLang: null
  }
]);

//create mapped pins and add it to the pins array
var mappedPins = ko.observableArray();
var pinPoint;
for ( var i = 0; i < pins().length; i++){

  pinPoint = new google.maps.LatLng(pins()[i].lat,pins()[i].lang);


  pins()[i].pinLatLang = pinPoint;
}

var map;

function initialize() {

  //Setting the map
  map = new google.maps.Map(document.getElementById('map-canvas'), {

    center: mapCenter,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP

  });

  //Setting the markers
  var marker = new google.maps.Marker({
    position: pins()[1].pinLatLang,
    //animation:google.maps.Animation.BOUNCE  to make the marker bounce
    title: "hello world!"
  });

  marker.setMap(map);

}

google.maps.event.addDomListener(window, 'load', initialize);

}


// Activates knockout.js
ko.applyBindings(new AppViewModel());


