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

      	//console.log(thisBusiness.rating_img_url);
				window.vm.businessName(thisBusiness.name);
				window.vm.businessRating(thisBusiness.rating_img_url);

        console.log("app view model biz name is " + window.vm.businessName());

     },
     error:function(){
         alert("Error");
     }
 })
}