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

      //the content of the info window*/
      contentString = '<div class="box"><span class="title">' + vm.businessName() + '</span><img class="rating" src=' + vm.businessRating() + '><div class="line"></div><img class="biz-pic" src=' + vm.businessPic() + '><div class="biz-info"><span>' + vm.businessPhone() + '</span><span>' + vm.businessAddress() + '</span><span>' + vm.businessType() + '</span>';
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

  var fourSquareString;
  $.ajax({
       url:url,
       dataType: 'jsonp',
       success:function(json){

        this.Business = json.response.venues;

        console.log(json);

        fourSquareString = '<div class="line"></div><span class="other-biz">' + this.Business[1].name + '</span><span class="other-biz">' + this.Business[2].name + '</span><span class="other-biz">' + this.Business[3].name + '</span></div></div>';
        infoWindowContent = contentString.concat(fourSquareString);

        infoWindow.setContent(infoWindowContent);

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