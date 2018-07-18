//should be good
//this page is linked to our html and to jquery
var APIKey = "166a433c57516f51dfab1f7edaed8413";

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
  "q=Phoenix,Burundi&units=imperial&appid=" + APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function (response) {

    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);

    // Transfer content to HTML
    $("#city").html("<h1>" + response.name + " Weather</h1>");
    $("#wind").text("Wind Speed: " + response.wind.speed);
    $("#humidity").text("Humidity: " + response.main.humidity);
    $("#temp").text("Temperature (F) " + response.main.temp);

    // Log the data in the console as well
    console.log("Wind Speed: " + response.wind.speed);
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (F): " + response.main.temp);
  });

// This is our API key
var tmAPIKey = "nXFGaGABlnZ60ow3g6mS88ZUNZD5Zp5A";

// Here we are building the URL we need to query the database
var input = "";
$("#run-search").on("click", function (event) {
  event.preventDefault();
  var userInput = $("#search-term").val().trim();
  input = userInput;
  console.log(input);
  searchBandsInTown();
});

var lng = 0;
var lat = 0;

function searchBandsInTown(artist) {

  // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
  var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&keyword=" + input + "&city=phoenix&apikey=nXFGaGABlnZ60ow3g6mS88ZUNZD5Zp5A";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    // Printing the entire object to console
    console.log(response);
    console.log(response._embedded.events[0]._embedded.venues[0].name);
    console.log(Object.values(response._embedded.events[0]._embedded.venues[0].location));
    console.log(Object.values(response._embedded.events[0]._embedded.venues[0].location.longitude));
    
    var longitude = Object.values(response._embedded.events[0]._embedded.venues[0].location.longitude);
    console.log(Object.values(response._embedded.events[0]._embedded.venues[0].location.latitude));
    var latitude = Object.values(response._embedded.events[0]._embedded.venues[0].location.latitude);
    lng = parseFloat(longitude.join(''));
    console.log(lng);

    lat = parseFloat(latitude.join(''));
    console.log(lat);
    
    $("#map").empty();
    venueMap();

    //establish values for variables that need to be passed into the html page
    var artistName = Object.values(response._embedded.events[0].name);
    var name = artistName.join('');
    
    var venueName = Object.values(response._embedded.events[0]._embedded.venues[0].name);
    var venue = venueName.join('');
    
    var venueAddress = Object.values(response._embedded.events[0]._embedded.venues[0].address);
    var address = venueAddress.join('');
    
    var eventDates = Object.values(response._embedded.events[0].dates.start.localDate);
    var eventTime = Object.values(response._embedded.events[0].dates.start.localTime);
    var edate = eventDates.join('');
    var etime = eventTime.join('');
    var sched = "Date: " + edate + "  Time: " + etime;
    var eventUrl = Object.values(response._embedded.events[0].url);
    var site = eventUrl.join('');


    console.log(name);
    console.log(venue);
    console.log(address);
    console.log(sched);
    console.log(site);


    console.log()
    // Empty the contents of the artist-div, append the new artist content
    $("#results").empty();
    $("#results").append(name, venue, address, sched, site);
    // var res = json.data;
    // var resultsDiv = $("<div>");
    // console.log(res);
    // var p = $("<p>").text(res);
    // resultsDiv.append(p);
    // console.log("result: " + resultsDiv)
    // console.log("p: " + p);
    // $("#results").text("results" + response.name);

    //   console.log(time-zone);
    // Parse the response.
    // Do other things.
  });
};


function venueMap(maps) {

  // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
  var queryURL = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lng + "&zoom=14&size=400x400&markers=colors:red&key=AIzaSyC3uNKNlSkGIG_BWclJcoLZOdEZj3yPhr8";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(queryURL);
    $("#map").attr("src", queryURL)

  })
}

// src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC3uNKNlSkGIG_BWclJcoLZOdEZj3yPhr8&callback=initMap">
//https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=14&size=400x400&key=YOUR_API_KEY
