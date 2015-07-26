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
      //55 Harrington street
      lat: -33.859257,
      lang: 151.207849,
      type: 'Food',
      icon: "img/green_MarkerA.png",
      markerPoint: null
    },
    {
      // the rocks
      lat: -33.8674869,
      lang: 151.2069902,
      type: 'Accomodation',
      icon: "img/blue_MarkerA.png",
      markerPoint: null
    },
    {
      //88 Cumberland Street
      lat: -33.8582199,
      lang: 151.2074979,
      type: 'Accomodation',
      icon: "img/orange_MarkerA.png",
      markerPoint: null
    }
  ]);

  //create pins LatLng, using that to create and add Marker to the pins array
  var mappedPins = ko.observableArray();
  var pinPoint, pinMarker;
  for ( var i = 0; i < pins().length; i++){

    pinPoint = new google.maps.LatLng(pins()[i].lat,pins()[i].lang);
    pinMarker = new google.maps.Marker({
      position: pinPoint,
      icon: pins()[i].icon,
      //animation:google.maps.Animation.BOUNCE  to make the marker bounce
      //title: "hello world!"
    });

    pins()[i].markerPoint = pinMarker;
  }

  var map;

  function initialize() {

    //Setting the map
    map = new google.maps.Map(document.getElementById('map-canvas'), {

      center: mapCenter,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      panControl: false,
      mapTypeControlOptions: {
        position:google.maps.ControlPosition.BOTTOM_CENTER
      }

    });

    //adding Markers to the map
    for ( var i = 0; i < pins().length; i++){
      pins()[i].markerPoint.setMap(map);
    }
  }

  google.maps.event.addDomListener(window, 'load', initialize);

}


// Activates knockout.js
ko.applyBindings(new AppViewModel());


