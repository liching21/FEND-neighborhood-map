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

      //Update the ko observable based on the information received
      //console.log(json);
      //infoWindow.setContent("<h1>" + this.Business[1].name + "</h1>");

      var thisBusiness = json.businesses[0];

    	vm.businessShow(true);
			vm.businessName(thisBusiness.name);
			vm.businessRating(thisBusiness.rating_img_url);
			vm.businessPic(thisBusiness.photo_url);
			vm.businessPhone("Phone: " + thisBusiness.phone);
			vm.businessAddress("Address: " + thisBusiness.address1);
      vm.businessType("Type: " + vm.resultsArray()[num].type);

      //the content of the info window*/
      contentString = '<div class="box"><span class="title">' + vm.businessName() + '</span><img class="rating" src=' + vm.businessRating() + '><div class="line"></div><img class="biz-pic" src=' + vm.businessPic() + '><div class="biz-info"><span>' + vm.businessPhone() + '</span><span>' + vm.businessAddress() + '</span><span>' + vm.businessType() + '</span></div></div>';

      infoWindow.setContent(contentString);
     },
     error:function(){
         alert("Error, ajax request failed");
     }
  });
  loadFourSquare(num);
}

// AJAX request to FourSquare to access further business information
function loadFourSquare(num){

  var clientId = "YSJ15TUOHFH3DACTYK4DQIZSYXNNNO3QHJGEOMQCQA3Q5L5B"; // provided by FourSquare
  var clientSecret = "HE4GEXN5J4M2KQHY0GXSIGQ3NWPT3L0U2KDEKLXPWWEOPBCR"; // provided by FourSquare
  var version = "20150816" //the date yyyy/mm/dd
  var url = "https://api.foursquare.com/v2/venues/search?ll=" + window.vm.resultsArray()[num].lat + "," + window.vm.resultsArray()[num].lang + "&client_id=" + clientId + "&client_secret="+ clientSecret+ "&v=" + version;

  $.ajax({
       url:url,
       dataType: 'jsonp',
       success:function(json){

        this.Business = json.response.venues;

        //Trying to find out the names of the API's returned
        /*
        console.log(json);
        console.log(this.Business[0].name);
        console.log("name 1 is = " + this.Business[1].name);
        console.log(this.Business[2].name);
        console.log(this.Business[4].name);
        console.log(this.Business[5].name);
        console.log(this.Business[6].name);
        console.log(this.Business[7].name);
        console.log(this.Business[8].name);*/

       },
       error:function(){
           alert("Error, ajax request failed");
       }
   });
}

// hide the business information panel
function clearYelp(){
	window.vm.businessShow(false);
}