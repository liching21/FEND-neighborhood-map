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
        business = thisBusiness.name;

        //json.businesses[0];
        console.log("the business is " + business);
        //$nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
     },
     error:function(){
         alert("Error");
     }
 })
}