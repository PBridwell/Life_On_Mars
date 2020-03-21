var queryURLWeather = "https://api.nasa.gov/insight_weather/?api_key=ZK4mjkTl6hvHYomrpaYgyuaAcecSsbTwNeaF3abB&feedtype=json&ver=1.0";

// Make the AJAX request to the API - GETs the JSON data at the queryURL.
// The data then gets passed as an argument to the updatePage function
$.ajax({
  url: queryURLWeather,
  method: "GET"
}).then(function(response){

  console.log(response);
  
  //get object of available sols 
  var sols = response.sol_keys;

  // call 7 sols available DATE-SEASON-TEMP-AM
  for (var i = 0; i < sols.length; i++){
    console.log("Date: " + (response[sols[i]].Last_UTC).slice(0,10));
    console.log("Season: " + response[sols[i]].Season);
    console.log("Degrees in Celsius: " + response[sols[i]].AT.av);
    console.log("Atmospheric pressure in Pascals: " + response[sols[i]].PRE.av);
    console.log("Wind speed in metres per second: " + response[sols[i]].HWS.av);
  }

})

var queryURLImages = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2016-10-30&api_key=eEbMOIDyKxBlDGl2ggUdMiMKyzdqwqjDBxMYcLZK";

// Make the AJAX request to the API - GETs the JSON data at the queryURL.
// The data then gets passed as an argument to the updatePage function
$.ajax({
  url: queryURLImages,
  method: "GET"
}).then(function(response){
    console.log(response);
<<<<<<< HEAD
    // var photo = $("<img>");
    // photo.attr("src",response.photos[3].img_src);
    // $("#marsPhoto").append(photo);
=======
    var photo = $("<img>");
    photo.attr('width', '250px')
    photo.attr('height', '250px')
    photo.attr("src",response.photos[3].img_src);
    $("#marsPhoto").append(photo);
>>>>>>> master



   
})

