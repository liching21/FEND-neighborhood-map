/**
 * Author: Liching Yew
 * Description: JS for Ajax Request
 */

var vm = window.vm;
// AJAX request to Yelp using the phone number of the business to retrieve other business information from Yelp
function loadYelp(phoneNum, num){

  var wysid = "PQXe6tR4soI4wciLUzWKfQ"; // provided by Yelp

  var url = "http://api.yelp.com/phone_search?phone=" + phoneNum + "&ywsid=" + wysid;

  $.ajax({
     url:url,
     dataType: 'jsonp',
     success:function(json){

      var thisBusiness = json.businesses[0];

    	vm.businessShow(true);
			vm.businessName(thisBusiness.name);
			vm.businessRating(thisBusiness.rating_img_url);
			vm.businessPic(thisBusiness.photo_url);
			vm.businessPhone("Phone: " + thisBusiness.phone);
			vm.businessAddress("Address: " + thisBusiness.address1);
      vm.businessType("Type: " + vm.resultsArray()[num].type);

      loadFourSquare(num);

     },
     error:function(){
         alert("Error, ajax request failed");
     }
  });

}

// AJAX request to FourSquare to access further business information
function loadFourSquare(num){

  var clientId = "YSJ15TUOHFH3DACTYK4DQIZSYXNNNO3QHJGEOMQCQA3Q5L5B"; // provided by FourSquare
  var clientSecret = "HE4GEXN5J4M2KQHY0GXSIGQ3NWPT3L0U2KDEKLXPWWEOPBCR"; // provided by FourSquare
  var version = "20150816" //the date yyyy/mm/dd
  var url = "https://api.foursquare.com/v2/venues/search?ll=" + vm.resultsArray()[num].lat + "," + vm.resultsArray()[num].lang + "&client_id=" + clientId + "&client_secret="+ clientSecret+ "&v=" + version;

  $.ajax({
       url:url,
       dataType: 'jsonp',
       success:function(json){

        this.Business = json.response.venues;

        //Trying to find out the names of the API's returned

        console.log(json);
        /*console.log(this.Business[2].name);
        console.log(this.Business[4].name);
        console.log(this.Business[5].name);
        console.log(this.Business[6].name);
        console.log(this.Business[7].name);
        console.log(this.Business[8].name);*/
        //clear the nearbyPlaces array
        vm.nearbyPlaces([]);
        var i = 0;
        var counter = 0;
        while( counter < 4){
          //if (this.Business[i].url != null){
            vm.nearbyPlaces.push({name: this.Business[i].name});
            counter++;
            i++;
          //}
        }

        concatInfoWindowHTML();

       },
       error:function(){
           alert("Error, ajax request failed");
       }
   });
}

function concatInfoWindowHTML(){
  //the content of the info window*/

  console.log("length of nearby places " + vm.nearbyPlaces().length);
  contentString = '<div class="box"><span class="title">' + vm.businessName() + '</span><img class="rating" src=' + vm.businessRating() + '><div class="line"></div><img class="biz-pic" src=' + vm.businessPic() + '><div class="biz-info"><span>' + vm.businessPhone() + '</span><span>' + vm.businessAddress() + '</span><span>' + vm.businessType() + '</span><ul class="nearby-places" data-bind="foreach: nearbyPlaces"><li class="other-biz" data-bind="text: name"></li></ul></div></div>';

  infoWindow.setContent(contentString);
}

// hide the business information panel
function clearYelp(){
	vm.businessShow(false);
}