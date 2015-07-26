/**
 *	Author: Liching Yew
 * 	Description: app.js
 */

var map;
var myCenter = new google.maps.LatLng(-33.8674869,151.2069902);

function initialize() {
  map = new google.maps.Map(document.getElementById('map-canvas'), {

    center: myCenter,
    zoom: 15,
    //{lat: -34.397, lng: 150.644},
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var marker = new google.maps.Marker({
	  position: myCenter
	});

	marker.setMap(map);
}





google.maps.event.addDomListener(window, 'load', initialize);