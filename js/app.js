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

  this.businessName = ko.observable("Business Name");
  this.businessRating = ko.observable();
  this.businessPic = ko.observable();
  this.businessType = ko.observable();
  this.businessPhone = ko.observable();
  this.businessAddress = ko.observable();// a function to join the address
  this.businessIsOpen = ko.observable();

  /** creating an array of location pins */
  var pins = ko.observableArray([
    {
      //BAR 100
      lat: -33.858218,
      lang: 151.209388,
      type: 'Food',
      icon: "img/green_MarkerA.png",
      phoneNum: "+61280709311",
      markerPoint: null
    },
    {
      //Pancakes on the Rocks
      lat: -33.8571762,
      lang: 151.2088311,
      type: 'Food',
      icon: "img/green_MarkerB.png",
      phoneNum: "+61292476371",
      markerPoint: null
    },
    {
      //Caminetto Restaurant
      lat: -33.8588066,
      lang: 151.2082002,
      type: 'Food',
      icon: "img/green_MarkerC.png",
      phoneNum: "+610292475787",
      markerPoint: null
    },
    {
      //La Renaissance Cafe
      lat: -33.859403,
      lang: 151.20842,
      type: 'Food',
      icon: "img/green_MarkerD.png",
      phoneNum: "+610292414878",
      markerPoint: null
    },
    {
      //Barcycle Cafe and Store
      lat: -33.8539691,
      lang: 151.2083385,
      type: 'Food',
      icon: "img/green_MarkerE.png",
      phoneNum: "+610292470772",
      markerPoint: null
    }/**,
    {
      // the rocks
      lat: -33.8674869,
      lang: 151.2069902,
      type: 'accomodation',
      icon: "img/blue_MarkerA.png",
      markerPoint: null
    },
    {
      //88 Cumberland Street
      lat: -33.8582199,
      lang: 151.2074979,
      type: 'Activity',
      icon: "img/orange_MarkerA.png",
      markerPoint: null
    }*/
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
      showBizInfo(pins()[i].markerPoint, i);
    }
  }

  function showBizInfo(marker, num) {

    var message = pins()[num].type;
    var infowindow = new google.maps.InfoWindow({
      content: message
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(marker.get('map'), marker);
      loadYelp(pins()[num].phoneNum);
    });
  }

  google.maps.event.addDomListener(window, 'load', initialize);



}

// Activates knockout.js
window.vm = new AppViewModel();
ko.applyBindings(vm);

//ko.applyBindings(new AppViewModel());


