document.body.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/8/84/Phoenix_AZ_Downtown_from_airplane.jpg')";
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
$("#run-search").on("click", function(event){
  event.preventDefault();
  var userInput = $("#search-term").val().trim();
  console.log(userInput);
  input = userInput;
  searchtm();
  console.log(input);
});


function searchtm(res){
// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  type: "GET",
  //   url:"https://app.ticketmaster.com/discovery/v2/events.json?size=359&apikey=nXFGaGABlnZ60ow3g6mS88ZUNZD5Zp5A",
  url: "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&keyword=" + input + "&city=phoenix&apikey=nXFGaGABlnZ60ow3g6mS88ZUNZD5Zp5A",
  async: true,
  dataType: "json",
  success: function (json) {
    console.log(json);
    var myObj = JSON.parse(this.text);
    console.log(myObj);
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
  },
  error: function (xhr, status, err) {
    // This time, we do not end up here!
  }
});
};