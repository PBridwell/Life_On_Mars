
// global variables
var userDate = "";

// false = metric & true = imperial
var system = false;

// API URL to nasa for Mars weather
var queryURLWeather = "https://api.nasa.gov/insight_weather/?api_key=ZK4mjkTl6hvHYomrpaYgyuaAcecSsbTwNeaF3abB&feedtype=json&ver=1.0";

// DEFINING FUNCTIONS

// Make the AJAX request to the API - GETs the JSON data at the queryURL and posts to the page.
function getWeather(){
  $.ajax({
    url: queryURLWeather,
    method: "GET"
  }).then(function(response){
  
    //get object of available sols 
    var sols = response.sol_keys;
  
    // post season to the screen
    $("#season").text("It's currently " + response[sols["0"]].Season + " on Mars");
  
    // call 5 of 7 sols available DATE-SEASON-TEMP
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

// Make the AJAX request to the API - GETs the JSON data at the queryURL and posts photos to screen from user's date.
function generatePhoto(date) {
  var queryURLImages = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" + date + "&api_key=eEbMOIDyKxBlDGl2ggUdMiMKyzdqwqjDBxMYcLZK";

$.ajax({
  url: queryURLImages,
  method: "GET"
}).then(function(response){

  // clear current photos
  $("#marsPhoto").text("");

 // post 2 random photos from the day to the page
  for (var i = 0; i < 2; i++){
    var photo = $("<img>");
    var imgArr = response.photos;
    var n = imgArr.length;
    var imgIndex = Math.floor(Math.random() * n);
    photo.attr("width", "250px")
    photo.attr("height", "250px")
    photo.attr("src",response.photos[imgIndex].img_src);
    $("#marsPhoto").append(photo);   
  }
})}


// lastDate = (response.photos[0].rover.max_date);

// Main program logic
$(document).ready(function(){

// call mars weather function
getWeather();

// Initializes datepicker widget and sets parameters 
$(".datepicker").datepicker({
  format: "yyyy-mm-dd",
  defaultDate: new Date("2019-09-28"),
  minDate: new Date("2012-08-07"),
  maxDate: new Date("2019-09-28"),
});


// EVENT LISTENERS:
  // on change event for switcher - let the user decide on metric/imperial
$("#switcher").on("change", function(){
    if ($(this).is(":checked")){
      system = $(this).is(":checked");
    }
    else{
      system = $(this).is(":checked");
    }
    getWeather();
})

// on change of date selector generate photos with user's imput
$("#userDate").on("change", function(){
  userDate = ($(this)[0].value);
  generatePhoto(userDate);
})

// Event Listener for more photos button
$(".btn").on("click", function(){
  generatePhoto(userDate);  
});

});



 


