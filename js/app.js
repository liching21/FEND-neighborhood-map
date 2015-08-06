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

  self.businessName = ko.observable();
  self.businessRating = ko.observable();
  self.businessPic = ko.observable();
  self.businessPhone = ko.observable();
  self.businessAddress = ko.observable();// a function to join the address
  self.businessIsOpen = ko.observable();
  self.businessShow = ko.observable(false);
  self.query = ko.observable();

  /** creating an array of location pins */
  var pins = [
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
  ];

  self.resultsArray = ko.observableArray(pins);

  //create pins LatLng, using that to create and add Marker to the pins array
  var mappedPins = ko.observableArray();
  var pinPoint, pinMarker;
  for ( var i = 0; i < pins.length; i++){

    pinPoint = new google.maps.LatLng(pins[i].lat,pins[i].lang);
    pinMarker = new google.maps.Marker({
      position: pinPoint,
      icon: pins[i].icon,
      //animation:google.maps.Animation.BOUNCE  to make the marker bounce
      //title: "hello world!"
    });

    pins[i].markerPoint = pinMarker;
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
    for (var i in self.resultsArray()){
      self.resultsArray()[i].markerPoint.setMap(map);
      showBizInfo(self.resultsArray()[i].markerPoint, i);
    }
  }

  function showBizInfo(marker, num) {

    //remove the map info window
    /*var message = pins()[num].type;
    var infowindow = new google.maps.InfoWindow({
      content: message
    });*/

    google.maps.event.addListener(marker, 'click', function() {

      console.log("a marker is clicked: " + num);
      clearYelp();

      // if marker is bouncing - stop bouncing
      if (marker.getAnimation() != null) {
        marker.setAnimation(null);
      }
      // else - stop all markers from bouncing, and marker that is clicked on will bounce
      else {
        var thisMarker;

        for ( var i in self.resultsArray()){
          thisMarker = self.resultsArray()[i].markerPoint;
          thisMarker.setAnimation(null);
        }
        marker.setAnimation(google.maps.Animation.BOUNCE);
        loadYelp(self.resultsArray()[num].phoneNum, num);
      }

    });
  }

  //TODO: implement a search bar
  self.query = ko.observable("");

  self.result = ko.pureComputed(function() {
    // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
    var a = this.query().toLowerCase();

    // deleting markers
    for (var i = 0; i < self.resultsArray().length; i++) {
      google.maps.event.clearListeners(self.resultsArray()[i].markerPoint, 'click');
      self.resultsArray()[i].markerPoint.setMap(null);
    }

    this.resultsArray([]);

    for (var i in pins){
        if(pins[i].name.toLowerCase().indexOf(a) >= 0) {
        this.resultsArray.push(pins[i]);
      }
    }

    //adding Markers to the map
    for (var i in self.resultsArray()){
      self.resultsArray()[i].markerPoint.setMap(map);
      console.log("number i is before showBiz " + i);
      showBizInfo(self.resultsArray()[i].markerPoint, i);

    }

    console.log(this.resultsArray());
    //console.log(this.resultsArray());
    return this.query() + " yay!";
  }, this);


  //TODO: clickec function is a mess!
  //REVERT by removing this code and uncommeting code below
  //clicked function
  self.clickedFunction = function(data, event) {

      console.log(data);
      console.log(event);
      var listItem = event.target;

      //do normal action
      $(".highlighted").removeClass("highlighted");
      console.log("li was clicked");

      $(listItem).toggleClass("highlighted");

      // get this li's text
      var text = $(listItem).text();
      //console.log("the marker is " + marker.name + ", the text is = " + text);

      // for every marker
      var marker;
      for (var i in self.resultsArray()){
        marker = self.resultsArray()[i];

        if(text == marker.name){
          //console.log("the marker is " + marker.name + ", the text is = " + text);
          //new google.maps.event.trigger( marker.markerPoint, 'click' );
          console.log("loading yelp:");
          console.log(self.resultsArray()[i]);
          loadYelp(self.resultsArray()[i].phoneNum, i);
        }

      }
  };



  google.maps.event.addDomListener(window, 'load', initialize);

}

// Activates knockout.js
window.vm = new AppViewModel();
ko.applyBindings(vm);

//highlights the marker list when hovered
/*
$(".marker-list li").click(function(e){
    console.log("li was clicked");

    $(".highlighted").removeClass("highlighted");

    $(this).toggleClass("highlighted");

    // get this li's text
    var text = $(this).text();
    //console.log("the marker is " + marker.name + ", the text is = " + text);

    // for every marker
    var marker;
    for (var i in window.vm.resultsArray()){
      marker = window.vm.resultsArray()[i];

      if(text == marker.name){
        //console.log("the marker is " + marker.name + ", the text is = " + text);
        new google.maps.event.trigger( marker.markerPoint, 'click' );
      }
    }
});
*/


