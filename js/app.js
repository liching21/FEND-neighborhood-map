/**
 *  Author: Liching Yew
 *  Description: the javascript for the application
 *  Date: 23rd August 2015
 */
/** Code for the ViewModel */
function AppViewModel() {

  var self = this;

  // Set the center location of the map
  var centerLat = -33.8578066;
  var centerLang = 151.2082002;
  var mapCenter = new google.maps.LatLng(centerLat, centerLang);

  // The business information observabales
  // each time a new business is selected is would be updated and displayed
  self.businessName = ko.observable();
  self.businessRating = ko.observable();
  self.businessPic = ko.observable();
  self.businessPhone = ko.observable();
  self.businessType = ko.observable();
  self.businessAddress = ko.observable(); // a function to join the address
  self.businessShow = ko.observable(false);

  var contentString = " ";

  // creating an array of location pins (points)
  var pins = [{
    name: "BAR 100",
    lat: -33.858218,
    lang: 151.209388,
    type: 'Food',
    icon: "img/green_MarkerA.png",
    phoneNum: "+61280709311",
    markerPoint: null
  }, {
    name: "Pancakes on the Rocks",
    lat: -33.8571762,
    lang: 151.2088311,
    type: 'Food',
    icon: "img/green_MarkerB.png",
    phoneNum: "+61292476371",
    markerPoint: null
  }, {
    name: "Caminetto Restaurant",
    lat: -33.8588066,
    lang: 151.2082002,
    type: 'Food',
    icon: "img/green_MarkerC.png",
    phoneNum: "+610292475787",
    markerPoint: null
  }, {
    name: "La Renaissance Cafe",
    lat: -33.859403,
    lang: 151.20842,
    type: 'Food',
    icon: "img/green_MarkerD.png",
    phoneNum: "+610292414878",
    markerPoint: null
  }, {
    name: "Barcycle Cafe and Store",
    lat: -33.8539691,
    lang: 151.2083385,
    type: 'Food',
    icon: "img/green_MarkerE.png",
    phoneNum: "+610292470772",
    markerPoint: null
  }, {
    name: "Shangri-La Hotel, Sydney",
    lat: -33.86141,
    lang: 151.206457,
    type: 'Accomodation',
    icon: "img/blue_MarkerA.png",
    phoneNum: "+610292506000",
    markerPoint: null
  }, {
    name: "Park Hyatt Sydney",
    lat: -33.8556346,
    lang: 151.2098274,
    type: 'Accomodation',
    icon: "img/blue_MarkerB.png",
    phoneNum: "+610292561234",
    markerPoint: null
  }, {
    name: "The Australian Heritage Hotel",
    lat: -33.8595267,
    lang: 151.2070303,
    type: 'Accomodation',
    icon: "img/blue_MarkerC.png",
    phoneNum: "+610292472229",
    markerPoint: null
  }, {
    name: "Rendezvous Hotel Sydney The Rocks",
    lat: -33.8600823,
    lang: 151.2078215,
    type: 'Accomodation',
    icon: "img/blue_MarkerD.png",
    phoneNum: "+610292516711",
    markerPoint: null
  }, {
    name: "Four Seasons Hotel",
    lat: -33.861667,
    lang: 151.207666,
    type: 'Accomodation',
    icon: "img/blue_MarkerE.png",
    phoneNum: "+610292380000",
    markerPoint: null
  }, {
    name: "BridgeClimb Sydney",
    lat: -33.8574281,
    lang: 151.2077354,
    type: 'Activity',
    icon: "img/orange_MarkerA.png",
    phoneNum: "+610282747777",
    markerPoint: null
  }, {
    name: "Sydney Observatory",
    lat: -33.8587909,
    lang: 151.2051614,
    type: 'Activity',
    icon: "img/orange_MarkerB.png",
    phoneNum: "+610292170341",
    markerPoint: null
  }, {
    name: "Bonza Bike Tours",
    lat: -33.859414,
    lang: 151.208107,
    type: 'Activity',
    icon: "img/orange_MarkerC.png",
    phoneNum: "+610292478800",
    markerPoint: null
  }, {
    name: "Museum Of Contemporary Art",
    lat: -33.860046,
    lang: 151.20897,
    type: 'Activity',
    icon: "img/orange_MarkerD.png",
    phoneNum: "+610292452400",
    markerPoint: null
  }, {
    name: "PaniQ Room",
    lat: -33.859413,
    lang: 151.207348,
    type: 'Activity',
    icon: "img/orange_MarkerE.png",
    phoneNum: "+610414468430",
    markerPoint: null
  }];

  //initiating the search query and the results in the form of an Array
  self.query = ko.observable("");
  self.resultsArray = ko.observableArray(pins);
  self.resultsArrayLength = ko.observable(self.resultsArray().length);

  //create pins LatLng, using that to create and add Marker to the pins array
  //var mappedPins = ko.observableArray();
  var pinPoint, pinMarker;
  for (var i = 0; i < pins.length; i++) {

    pinPoint = new google.maps.LatLng(pins[i].lat, pins[i].lang);
    pinMarker = new google.maps.Marker({
      position: pinPoint,
      // giving each pin a unique icon
      icon: pins[i].icon
    });

    pins[i].markerPoint = pinMarker;
  }

  var map;
  initialize();

  var InfoWindow;

  // Initialising the map
  function initialize() {
    //Setting the map
    map = new google.maps.Map(document.getElementById('map-canvas'), {

      center: mapCenter,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      panControl: false,
      mapTypeControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_CENTER
      },
      // Styling the map, code from Snazzy Maps
      styles: [{
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
          "lightness": 100
        }, {
          "visibility": "simplified"
        }]
      }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
          "visibility": "on"
        }, {
          "color": "#C6E2FF"
        }]
      }, {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#C5E3BF"
        }]
      }, {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#D1D1B8"
        }]
      }]
    });

    //creating an info window
    infoWindow = new google.maps.InfoWindow({
      content: contentString
    });
  }

  // Showing the businesss information
  function showBizInfo(marker, num) {

    //var currentMarker;

    google.maps.event.addListener(marker, 'click', function() {

      // clear previous display (if there is any)
      currentMarker = this;
      clearYelp();
      $(".highlighted").removeClass("highlighted");

      // if marker is bouncing - stop bouncing
      if (marker.getAnimation() != null) {
        marker.setAnimation(null);
        infoWindow.close();
      }
      // else - stop all markers from bouncing, and marker that is clicked will bounce,
      // list item will be highlighted and show business information
      else {
        var thisMarker;

        var resultsArrayLength = self.resultsArray().length;
        for (var i = 0; i < resultsArrayLength; i++) {
          thisMarker = self.resultsArray()[i].markerPoint;
          thisMarker.setAnimation(null);
        }
        marker.setAnimation(google.maps.Animation.BOUNCE);
        loadYelp(self.resultsArray()[num].phoneNum, num);
        $("#" + num).toggleClass("highlighted");
        infoWindow.open(map, marker); //open the infoWindow
      }
    });

    // add an event listener when the infowindow is closed trigger the current marker
    google.maps.event.addListener(infoWindow, 'closeclick', function() {
      google.maps.event.trigger(currentMarker, 'click');
    });
  }

  // updating the resultArray, based on the query
  self.result = ko.pureComputed(function() {

    var a = this.query().toLowerCase();

    // deleting exisiting markers, and remove event listeners
    var resultsArrayLength = self.resultsArray().length;
    for (var i = 0; i < resultsArrayLength; i++) {
      google.maps.event.clearListeners(self.resultsArray()[i].markerPoint, 'click');
      self.resultsArray()[i].markerPoint.setMap(null);
    }

    //clear the resultsArray()
    this.resultsArray([]);

    // for each pin that satisfy the query, add it to the resultsArray
    for (var j in pins) {
      if (pins[j].name.toLowerCase().indexOf(a) >= 0) {
        this.resultsArray.push(pins[j]);
      }
    }

    //Set the markePoint and call the ShowBizInfo function
    resultsArrayLength = self.resultsArray().length;
    for (i = 0; i < resultsArrayLength; i++) {
      self.resultsArray()[i].markerPoint.setMap(map);
      showBizInfo(self.resultsArray()[i].markerPoint, i);
    }
  }, this);


  // this function is called when the list item is clicked
  self.clickedFunction = function(data, event) {

    //get the name of the business
    var listItem = event.target;
    var text = $(listItem).text();

    // for every marker compare the business name to the one clicked to trigger
    // the corresponding marker and the load the business info
    var marker;
    var resultsArrayLength = self.resultsArray().length;
    for (var i = 0; i < resultsArrayLength; i++) {
      marker = self.resultsArray()[i];

      if (text == marker.name) {
        console.log(self.resultsArray()[i]);
        google.maps.event.trigger(marker.markerPoint, 'click');
        loadYelp(self.resultsArray()[i].phoneNum, i);
      }
    }
  };
}

// Activates knockout.js
window.vm = new AppViewModel();
ko.applyBindings(vm);