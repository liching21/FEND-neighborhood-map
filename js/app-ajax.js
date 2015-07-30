/**
 * Author: Liching Yew
 * Description: JS for Ajax Request
 */

function loadYelp(phoneNum){
  var wysid = "PQXe6tR4soI4wciLUzWKfQ";

  var url = "http://api.yelp.com/phone_search?phone=" + phoneNum + "&ywsid=" + wysid;

  $.ajax({
     url:url,
     dataType: 'jsonp',
     success:function(json){
         // do stuff with json (in this case an array)
      console.log(json);
      var thisBusiness = json.businesses[0];

				window.vm.businessName(thisBusiness.name);
				window.vm.businessRating(thisBusiness.rating_img_url);

				window.vm.businessPic(thisBusiness.photo_url);
				window.vm.businessType("Type: " + "Food"); //TODO: update this
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