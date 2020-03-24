// global variables

// API URLS to nasa for Mars weather and images of Mars
var queryURLWeather = "https://api.nasa.gov/insight_weather/?api_key=ZK4mjkTl6hvHYomrpaYgyuaAcecSsbTwNeaF3abB&feedtype=json&ver=1.0";
var queryURLImages = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2016-10-30&api_key=eEbMOIDyKxBlDGl2ggUdMiMKyzdqwqjDBxMYcLZK";

// metric vs. imperial
var system = 'metric';


// Make the AJAX request to the API - GETs the JSON data at the queryURL.
$.ajax({
  url: queryURLWeather,
  method: "GET"
}).then(function(response){

  //get object of available sols 
  var sols = response.sol_keys;
  $("#season").text("It's currently " + response[sols["0"]].Season + " on Mars");

  // call 7 sols available DATE-SEASON-TEMP
  if (system === "imperial"){
    for (var i = 2; i < sols.length; i++){
      $("#date"+ i).text("Date: " + (response[sols[i]].Last_UTC).slice(6,10));
      $("#temp"+ i).text("Temp: " + (((response[sols[i]].AT.av)*9/5)+32).toFixed(1) + " F");
      $("#ws" + i).text("WS: " + ((response[sols[i]].HWS.av)*2.237).toFixed(1) + " MPH");
  }}
  else{
    for (var i = 2; i < sols.length; i++){
      $("#date"+ i).text("Date: " + (response[sols[i]].Last_UTC).slice(6,10));
      $("#temp"+ i).text("Temp: " + (response[sols[i]].AT.av).toFixed(1) + " C");
      $("#ws" + i).text("WS: " + (response[sols[i]].HWS.av).toFixed(1) + " m/s");
    }}
})



// Make the AJAX request to the API - GETs the JSON data at the queryURL.
// The data then gets passed as an argument to the updatePage function
$.ajax({
  url: queryURLImages,
  method: "GET"
}).then(function(response){
    console.log(response);
    var photo = $("<img>");
    photo.attr('width', '250px')
    photo.attr('height', '250px')
    photo.attr("src",response.photos[3].img_src);
    $("#marsPhoto").append(photo);



   
})


$(document).ready(function(){
  $('.datepicker').datepicker();
});
        

