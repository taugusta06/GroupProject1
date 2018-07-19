document.body.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/8/84/Phoenix_AZ_Downtown_from_airplane.jpg')";




//weather api
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


  $(document).on("click", ".btn", function(e){
    e.preventDefault();
    var id = $(this).data().id;
    if (id === "search"){
      pullSearch();
    }
    else if(id === "reset"){
      clear();
    }
    else if(id === "getMap"){
      venueMap($(this).data().coord);
    }
    
  });
  
  
  // $("#getMap").on("click", venueMap())

//function and click event for search button
var input = "";
function pullSearch(event) {
  var userInput = $("#search-term").val().trim();
  input = userInput;
  console.log(input);

  $("#results").empty();
  searchEventsInTown();
};

var lng = 0;
var lat = 0;
var tmAPIKey = "nXFGaGABlnZ60ow3g6mS88ZUNZD5Zp5A";
 


//function for ticketmaster search
function searchEventsInTown(event) {

  // Querying the ticketmaster api for the selected artist, the ?app_id parameter is required, but can equal anything
  var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&keyword=" + input + "&city=phoenix&apikey=nXFGaGABlnZ60ow3g6mS88ZUNZD5Zp5A";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    var searchAmount = parseInt($("#searchAmount").val());

    // Printing the entire object to console
    console.log(response);
    console.log(response._embedded.events[0]._embedded.venues[0].name);
    // console.log(Object.values(response._embedded.events[0]._embedded.venues[0].location));
    // console.log(response._embedded.events[0]._embedded.venues[0].location.longitude);
    // console.log(response._embedded.events[0]._embedded.venues[0].location.latitude);
    for (i = 0; i < searchAmount; i++) {


      //set and declare variables for longitute and lattitude for location sent to maps.
      lng = response._embedded.events[i]._embedded.venues[0].location.longitude;
      lat = response._embedded.events[i]._embedded.venues[0].location.latitude;


      //establish values for variables that need to be passed into the html page
      var name = response._embedded.events[i].name;
      var venue = response._embedded.events[i]._embedded.venues[0].name;
      var address = response._embedded.events[i]._embedded.venues[0].address.line1;
      console.log(address);
      var edate = response._embedded.events[i].dates.start.localDate;
      var etime = response._embedded.events[i].dates.start.localTime;
      var sched = "Date: " + edate + "  Time: " + etime;
      var eventUrl = response._embedded.events[i].url;

      var result = $("<div>");
      var title = $("<h4>").attr("id", "headline");
      var locale = $("<row>").attr("id", "details");
      var showtime = $("<p>").attr("id", "details");
      var buyNow = $("<a class='btn btn-primary'>").attr("data-id", "purchase").attr("href", eventUrl);
      var coord = {
        lat: lat,
        lng: lng
      }


      title.append(name);
      locale.append(venue + "<p>" + address);
      locale.attr("data-coord", JSON.stringify(coord)).attr("data-id", "getMap").attr("class", "btn");
      showtime.append(sched);
      buyNow.text("Buy Here!");
      



      //buynow button needs id for click event
      //also needs attribute of the url generated in site
      //also needs text to state buy here
      //venue also needs attribute of location lat and long to pass to maps and also needs to be clickable


      result.append(title, locale, showtime, buyNow);
      $("#results").append(result);

    }

    // $("#map").empty();
    // venueMap();

  });
};


function venueMap(coord) {

  console.log(coord.lat, coord.lng);
  // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
  var queryURL = "https://maps.googleapis.com/maps/api/staticmap?center=" + coord.lat + "," + coord.lng + "&zoom=14&size=400x400&markers=colors:red&key=AIzaSyC3uNKNlSkGIG_BWclJcoLZOdEZj3yPhr8";
  // $.ajax({
  //   url: queryURL,
  //   method: "GET"
  // }).then(function (response) {
    console.log(queryURL);
    $("#map").attr("src", queryURL)

  // })
}



// src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC3uNKNlSkGIG_BWclJcoLZOdEZj3yPhr8&callback=initMap">
//https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=14&size=400x400&key=YOUR_API_KEY

//clear button function and click event

function clear() {
  $("#results").empty();
  $("#map").attr("src", "assets/images/theMap.jpg")
}
