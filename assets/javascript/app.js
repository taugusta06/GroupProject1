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

    // Constructing HTML containing the artist information
    var artistName = $("<h1>").text(response.name);
    var artistURL = $("<a>").attr("href", response.url).append(artistName);
    var artistImage = $("<img>").attr("src", response.thumb_url);
    var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
    var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
    var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

    // Empty the contents of the artist-div, append the new artist content
    $("#artist-div").empty();
    $("#artist-div").append(artistURL, artistImage, trackerCount, upcomingEvents, goToArtist);
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
  var queryURL = "https://maps.googleapis.com/maps/api/staticmap?" + input + "&city=phoenix&apikey=nXFGaGABlnZ60ow3g6mS88ZUNZD5Zp5A";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {


  })
}