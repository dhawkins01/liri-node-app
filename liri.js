// Liri application project
// You can find my current portfolio at www.dhawkinsjr.com


require("dotenv").config();

// import the keys.js file
var keys = require("./keys.js");

// grab the axios package
var axios = require("axios");
// moment package
var moment = require('moment');

// access the keys information for spotify
// var spotify = new Spotify(keys.spotify);

// liri.js needs to be able to hold the following commands:
// - concert-this
// - spotify-this-song
// - movie-this
// - do-what-it-says

// make a variable to hold the command
var command = process.argv[2];

// Here we will create a function to run each command
//////////////////////////////////////////////////////

function concertThis() {
    // code for concertThis functions goes here

    // create an empty variable with the band/artist name
    var artist = "";

    // for loop to handle artist names with more than one word
    for (i = 3; i < process.argv.length; i++) {
        if (i > 3  && i < process.argv.length) {
            artist = artist + "%20" + process.argv[i];
        }
        else {
            artist = process.argv[i];
        }
    }
    // build the url for the bands in town api for axios
    queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    // console.log(queryURL);

    // start our Axios call
    axios.get(queryUrl).then(
        function(response) {
            // create a for loop to display all the information in the data array that is returned from the API

            for (i = 0; i < response.data.length; i++) {
                console.log("**********Concert-This**********");
                console.log("Name of Venue: " + response.data[i].venue.name);
                console.log("Venue Locaction: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
                // use moment to format the date
                var time = moment(response.data[i].datetime).format("MM/DD/YYYY");
                console.log("Date: " + time);
            }

        })
        .catch(function(error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log("---------------Data---------------");
              console.log(error.response.data);
              console.log("---------------Status---------------");
              console.log(error.response.status);
              console.log("---------------Status---------------");
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an object that comes back with details pertaining to the error that occurred.
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
    


}

function spotifyThisSong() {
    // code for spotifyThisSong goes here
}

function movieThis() {
    // code for movieThis goes here

    // create an empty variable for holding the movie name
    var movieName = "";

    // if no movie name is entered, default to Mr Nobody
    if (process.argv[3] === undefined) {
        movieName = "Mr.Nobody";
    } // else build the movie name
    else {
        // create a for loop to handle movie titles with more than one word
        for (i = 3; i < process.argv.length; i++) {
            movieName += process.argv[i] + "+";
        }
    }
    // build the url to access OMDB api with Axios
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // use axios to pull the data from the omdb api
    axios.get(queryUrl).then(
        function (response) {
            console.log("**********Movie-This**********");
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country Produced: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function doWhatItSays() {
    // code for doWhatItSays goes here
}

// Here we will put a switch statement that will run each function based on the command
switch (command) {
    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
}