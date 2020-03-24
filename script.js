
// global variables


// API URLS to nasa for Mars weather and images of Mars
var queryURLWeather = "https://api.nasa.gov/insight_weather/?api_key=ZK4mjkTl6hvHYomrpaYgyuaAcecSsbTwNeaF3abB&feedtype=json&ver=1.0";
var queryURLImages = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2016-10-30&api_key=eEbMOIDyKxBlDGl2ggUdMiMKyzdqwqjDBxMYcLZK";

// false = metric & true = imperial
var system = false;

// document ready function
$(document).ready(function(){

// call mars weather api and post to screen
getWeather();

  // on change event for switcher - let the user decide on metric/imperial
$("#switcher").on("change", function(){
    if ($(this).is(":checked")){
      system = $(this).is(":checked");
    }
    else{
      system = $(this).is(':checked');
    }
    getWeather();
})

// Make the AJAX request to the API - GETs the JSON data at the queryURL.
function getWeather(){
$.ajax({
  url: queryURLWeather,
  method: "GET"
}).then(function(response){

  //get object of available sols 
  var sols = response.sol_keys;

  // post season
  $("#season").text("It's currently " + response[sols["0"]].Season + " on Mars");

  // call 7 sols available DATE-SEASON-TEMP
  if (system === true){
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
})}


// Make the AJAX request to the API - GETs the JSON data at the queryURL.
function generatePhoto() {
$.ajax({
  url: queryURLImages,
  method: "GET"
}).then(function(response){

  // clear current photos
  $("#marsPhoto").text("");

  // post 2 random photos from the day to the page
  for (var i = 0; i < 2; i++){
    console.log(response);
    var photo = $("<img>");
    var imgArr = response.photos;
    var n = imgArr.length;
    console.log(n);
    var imgIndex = Math.floor(Math.random() * n);
    console.log(imgIndex)
    photo.attr('width', '250px')
    photo.attr('height', '250px')
    photo.attr("src",response.photos[imgIndex].img_src);
    $("#marsPhoto").append(photo);   
  }
})}


// Initializes datepicker widget 
$('.datepicker').datepicker();

// Event Listener for photo button
$(".btn").on("click", function(){
    generatePhoto()
    
});
});



 


