/**
 * Author: Liching Yew
 * Description: JS for Ajax Request
 */

function loadYelp(phoneNum, num){
  var wysid = "PQXe6tR4soI4wciLUzWKfQ";

  var url = "http://api.yelp.com/phone_search?phone=" + phoneNum + "&ywsid=" + wysid;

  $.ajax({
     url:url,
     dataType: 'jsonp',
     success:function(json){

      //Update the ko observable based on the information received
      console.log(json);
      var thisBusiness = json.businesses[0];

    	window.vm.businessShow(true);
			window.vm.businessName(thisBusiness.name);
			window.vm.businessRating(thisBusiness.rating_img_url);
			window.vm.businessPic(thisBusiness.photo_url);
			window.vm.businessPhone("Phone: " + thisBusiness.phone);
			window.vm.businessAddress("Address: " + thisBusiness.address1);
			window.vm.businessIsOpen("Is Open: " + thisBusiness.is_closed); //TODO: check if it is the opposite

       console.log("app view model biz name is " + window.vm.businessName());
     },
     error:function(){
         alert("Error");
     }
 })
}

function clearYelp(){
	window.vm.businessShow(false);
}



// link the bisiness list to the marker
function linkListToMarker() {

}