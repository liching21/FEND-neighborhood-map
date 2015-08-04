/**
 *	Author: Liching Yew
 * 	Description: app.js
 */

 /** Code fo the ViewModel */
function AppViewModel() {

  var self = this;

  //Center of map location is Circular Quay
  var centerLat = ko.observable(-33.8578066);
  var centerLang = ko.observable(151.2082002);

  var mapCenter = new google.maps.LatLng(centerLat(), centerLang());

  self.businessName = ko.observable("Business Name");
  self.businessRating = ko.observable();
  self.businessPic = ko.observable();
  self.businessPhone = ko.observable();
  self.businessAddress = ko.observable();// a function to join the address
  self.businessIsOpen = ko.observable();
  self.businessShow = ko.observable(false);
  self.query = ko.observable();

  /** creating an array of location pins */
  self.pins = ko.observableArray([
    {
      //BAR 100
      name: "BAR 100",
      lat: -33.858218,
      lang: 151.209388,
      type: 'Food',
      icon: "img/green_MarkerA.png",
      phoneNum: "+61280709311",
      markerPoint: null
    },
    {
      //Pancakes on the Rocks
      name: "Pancakes on the Rocks",
      lat: -33.8571762,
      lang: 151.2088311,
      type: 'Food',
      icon: "img/green_MarkerB.png",
      phoneNum: "+61292476371",
      markerPoint: null
    },
    {
      //Caminetto Restaurant
      name: "Caminetto Restaurant",
      lat: -33.8588066,
      lang: 151.2082002,
      type: 'Food',
      icon: "img/green_MarkerC.png",
      phoneNum: "+610292475787",
      markerPoint: null
    },
    {
      //La Renaissance Cafe
      name: "La Renaissance Cafe",
      lat: -33.859403,
      lang: 151.20842,
      type: 'Food',
      icon: "img/green_MarkerD.png",
      phoneNum: "+610292414878",
      markerPoint: null
    },
    {
      //Barcycle Cafe and Store
      name: "Barcycle Cafe and Store",
      lat: -33.8539691,
      lang: 151.2083385,
      type: 'Food',
      icon: "img/green_MarkerE.png",
      phoneNum: "+610292470772",
      markerPoint: null
    },
    {
      //Shangri-La Hotel, Sydney
      name: "Shangri-La Hotel, Sydney",
      lat: -33.86141,
      lang: 151.206457,
      type: 'Accomodation',
      icon: "img/blue_MarkerA.png",
      phoneNum: "+610292506000",
      markerPoint: null
    },
    {
      //Park Hyatt Sydney
      name: "Park Hyatt Sydney",
      lat: -33.8556346,
      lang: 151.2098274,
      type: 'Accomodation',
      icon: "img/blue_MarkerB.png",
      phoneNum: "+610292561234",
      markerPoint: null
    },
    {
      //The Australian Heritage Hotel
      name: "The Australian Heritage Hotel",
      lat: -33.8595267,
      lang: 151.2070303,
      type: 'Accomodation',
      icon: "img/blue_MarkerC.png",
      phoneNum: "+610292472229",
      markerPoint: null
    },
    {
      //Rendezvous Hotel Sydney The Rocks
      name: "Rendezvous Hotel Sydney The Rocks",
      lat: -33.8600823,
      lang: 151.2078215,
      type: 'Accomodation',
      icon: "img/blue_MarkerD.png",
      phoneNum: "+610292516711",
      markerPoint: null
    },
    {
      //Four Seasons Hotel
      name: "Four Seasons Hotel",
      lat: -33.861667,
      lang: 151.207666,
      type: 'Accomodation',
      icon: "img/blue_MarkerE.png",
      phoneNum: "+610292380000",
      markerPoint: null
    },
    {
      //BridgeClimb Sydney
      name: "BridgeClimb Sydney",
      lat: -33.8574281,
      lang: 151.2077354,
      type: 'Activity',
      icon: "img/orange_MarkerA.png",
      phoneNum: "+610282747777",
      markerPoint: null
    },
    {
      //Sydney Observatory
      name: "Sydney Observatory",
      lat: -33.8587909,
      lang: 151.2051614,
      type: 'Activity',
      icon: "img/orange_MarkerB.png",
      phoneNum: "+610292170341",
      markerPoint: null
    },
    {
      //Bonza Bike Tours
      name: "Bonza Bike Tours",
      lat: -33.859414,
      lang: 151.208107,
      type: 'Activity',
      icon: "img/orange_MarkerC.png",
      phoneNum: "+610292478800",
      markerPoint: null
    },
    {
      //Museum Of Contemporary Art
      name: "Museum Of Contemporary Art",
      lat: -33.860046,
      lang: 151.20897,
      type: 'Activity',
      icon: "img/orange_MarkerD.png",
      phoneNum: "+610292452400",
      markerPoint: null
    },
    {
      //PaniQ Room
      name: "PaniQ Room",
      lat: -33.859413,
      lang: 151.207348,
      type: 'Activity',
      icon: "img/orange_MarkerE.png",
      phoneNum: "+610414468430",
      markerPoint: null
    }

    //ADD: List Functionality
    //ADD: Search functionality
  ]);

  //create pins LatLng, using that to create and add Marker to the pins array
  var mappedPins = ko.observableArray();
  var pinPoint, pinMarker;
  for ( var i = 0; i < self.pins().length; i++){

    pinPoint = new google.maps.LatLng(self.pins()[i].lat,self.pins()[i].lang);
    pinMarker = new google.maps.Marker({
      position: pinPoint,
      icon: self.pins()[i].icon,
      //animation:google.maps.Animation.BOUNCE  to make the marker bounce
      //title: "hello world!"
    });

    self.pins()[i].markerPoint = pinMarker;
  }

  var map;

  function initialize() {

    //Setting the map
    map = new google.maps.Map(document.getElementById('map-canvas'), {

      center: mapCenter,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      panControl: false,
      mapTypeControlOptions: {
        position:google.maps.ControlPosition.BOTTOM_CENTER
      }

    });

    //adding Markers to the map
    for ( var i = 0; i < self.pins().length; i++){
      self.pins()[i].markerPoint.setMap(map);
      showBizInfo(self.pins()[i].markerPoint, i);

    }
  }

  function showBizInfo(marker, num) {

    //remove the map info window
    /*var message = pins()[num].type;
    var infowindow = new google.maps.InfoWindow({
      content: message
    });*/

    google.maps.event.addListener(marker, 'click', function() {

      clearYelp();

      // if marker is bouncing - stop bouncing
      if (marker.getAnimation() != null) {
        marker.setAnimation(null);
      }
      // else - stop all markers from bouncing, and marker that is clicked on will bounce
      else {
        for ( var i = 0; i < self.pins().length; i++){
          var thisMarker = self.pins()[i].markerPoint;
          thisMarker.setAnimation(null);
        }
        marker.setAnimation(google.maps.Animation.BOUNCE);
        loadYelp(self.pins()[num].phoneNum, num);
      }

    });
  }

  //TODO: implement a search bar

  self.query = ko.observable("");
  self.pinsArray = ko.observableArray(this.pins());
  this.search = ko.computed(function(value){
    self.pinsArray([]);
    for (var x in self.pinsArray()){
      if(pins()[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        viewModel.pinsArray().push(pins()[x]);
        console.log(this);
      }
    }
  }, this);


  /*this.query = ko.pureComputed({

  });*/

  google.maps.event.addDomListener(window, 'load', initialize);

}

// Activates knockout.js
window.vm = new AppViewModel();
ko.applyBindings(vm);

//test
window.vm.query.subscribe(window.vm.search);


//highlights the marker list when hovered
$(".marker-list li").click(function(e){

  $(".highlighted").removeClass("highlighted");

  $(this).toggleClass("highlighted");

  // get this li's text
  var text = $(this).text();
  var pins = window.vm.pins();
  // for every marker
  var marker;
  for (var i = 0; i < pins.length; i++){
    marker = pins[i];

    if(text == marker.name){
      console.log("the marker is " + marker.name);
      new google.maps.event.trigger( marker.markerPoint, 'click' );
    }
  }

});



