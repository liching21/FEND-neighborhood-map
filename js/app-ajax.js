/**
 * Author: Liching Yew
 * Description: JS for Ajax Request
 */

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
      var thisBusiness = json.businesses[0];

    	window.vm.businessShow(true);
			window.vm.businessName(thisBusiness.name);
			window.vm.businessRating(thisBusiness.rating_img_url);
			window.vm.businessPic(thisBusiness.photo_url);
			window.vm.businessPhone("Phone: " + thisBusiness.phone);
			window.vm.businessAddress("Address: " + thisBusiness.address1);
      window.vm.businessType("Type: " + window.vm.resultsArray()[num].type);
     },
     error:function(){
         alert("Error, ajax request failed");
     }
  });
}

// AJAX request to FourSquare to access further business information
/**
function loadFourSquare(num){

  var clientId = "YSJ15TUOHFH3DACTYK4DQIZSYXNNNO3QHJGEOMQCQA3Q5L5B"; // provided by FourSquare
  var clientSecret = "HE4GEXN5J4M2KQHY0GXSIGQ3NWPT3L0U2KDEKLXPWWEOPBCR"; // provided by FourSquare
  var version = "20150816" //the date yyyy/mm/dd
  var url = "https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=" + clientId + "&client_secret=" + clientSecret+ "&v=" + version;

  $.ajax({
       url:url,
       dataType: 'jsonp',
       success:function(json){

        console.log("test");

       },
       error:function(){
           alert("Error, ajax request failed");
       }
   });
}*/

// hide the business information panel
function clearYelp(){
	window.vm.businessShow(false);
}