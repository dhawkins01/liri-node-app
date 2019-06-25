// Liri application project
// You can find my current portfolio at www.dhawkinsjr.com


require("dotenv").config();

// import the keys.js file
var keys = require("./keys.js");

// grab the axios package
var axios = require("axios");
// moment package
var moment = require('moment');
// spotify package

var Spotify = require('node-spotify-api');
// filesystem package
var fs = require("fs");
// access the keys information for spotify
var spotify = new Spotify(keys.spotify);
// chalk package
const chalk = require('chalk');



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
        if (i > 3 && i < process.argv.length) {
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
        function (response) {
            // create a for loop to display all the information in the data array that is returned from the API

            for (i = 0; i < response.data.length; i++) {
                console.log(chalk.bgRed("///////**********Concert-This**********///////"));
                console.log(chalk.bgBlueBright("Name of Venue: " + response.data[i].venue.name));
                console.log(chalk.bgBlueBright("Venue Locaction: " + response.data[i].venue.city + ", " + response.data[i].venue.region));
                // use moment to format the date
                var time = moment(response.data[i].datetime).format("MM/DD/YYYY");
                console.log(chalk.bgBlueBright("Date: " + time));
                console.log(chalk.bgRed("///////********************************///////\n"));
            }

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

function spotifyThisSong() {
    // code for spotifyThisSong goes here

    // variable to hold the song name
    var songName = "";
    // check to see if no song is entered, default to "i saw the sign" by ace of base
    if (process.argv[3] === undefined) {
        songName = "the sign ace of base";
    }
    else {
        // create a for loop to handle multi word song names
        for (i = 3; i < process.argv.length; i++) {
            songName += process.argv[i] + " ";

        }
    }
    // add the single quotes to the song name as required by the spotify api
    songName = "'" + songName + "'";
    // console.log(songName);
    // Grab the data from the spotify npm package api
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(chalk.yellow.bold("///////**********Spotify-This-Song**********///////"));
        console.log(chalk.bgYellow.black("Artist: " + data.tracks.items[0].artists[0].name));
        console.log(chalk.bgYellow.black("Song Name: " + data.tracks.items[0].name));
        console.log(chalk.bgYellow.black("Preview: " + data.tracks.items[3].preview_url));
        console.log(chalk.bgYellow.black("Album: " + data.tracks.items[0].album.name));
        console.log(chalk.yellow.bold("///////*************************************///////"));
    });
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
            console.log(chalk.bgYellow.black("**********Movie-This**********"));
            console.log(chalk.bgGreen.black("Title: " + response.data.Title));
            console.log(chalk.bgGreen.black("Year: " + response.data.Year));
            console.log(chalk.bgGreen.black("IMDB Rating: " + response.data.Ratings[0].Value));
            console.log(chalk.bgGreen.black("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value));
            console.log(chalk.bgGreen.black("Country Produced: " + response.data.Country));
            console.log(chalk.bgGreen.black("Language: " + response.data.Language));
            console.log(chalk.bgGreen.black("Plot: " + response.data.Plot));
            console.log(chalk.bgGreen.black("Actors: " + response.data.Actors));
            console.log(chalk.bgYellow.black("*******************************"));
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

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        // get the data from random.txt and turn it into an array
        var dataArray = data.split(",");
        var randomCommand = dataArray[0];
        var randomSearch = dataArray[1];
        // console.log(randomCommand);
        // console.log(randomSearch);

        // check the command, then run the appropriate api

        if (randomCommand === "spotify-this-song") {

            spotify.search({ type: 'track', query: randomSearch }, function (err, song) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                console.log(chalk.yellow.bold("///////**********Spotify-This-Song**********///////"));
                console.log(chalk.bgYellow.black("Artist: " + data.tracks.items[0].artists[0].name));
                console.log(chalk.bgYellow.black("Song Name: " + data.tracks.items[0].name));
                console.log(chalk.bgYellow.black("Preview: " + data.tracks.items[3].preview_url));
                console.log(chalk.bgYellow.black("Album: " + data.tracks.items[0].album.name));
                console.log(chalk.yellow.bold("///////*************************************///////"));
            });

        }

        else if (randomCommand === "movie-this") {
            var queryUrl = "http://www.omdbapi.com/?t=" + randomSearch + "&y=&plot=short&apikey=trilogy";

            // use axios to pull the data from the omdb api
            axios.get(queryUrl).then(
                function (response) {
                    console.log(chalk.bgYellow.black("**********Movie-This**********"));
                    console.log(chalk.bgGreen.black("Title: " + response.data.Title));
                    console.log(chalk.bgGreen.black("Year: " + response.data.Year));
                    console.log(chalk.bgGreen.black("IMDB Rating: " + response.data.Ratings[0].Value));
                    console.log(chalk.bgGreen.black("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value));
                    console.log(chalk.bgGreen.black("Country Produced: " + response.data.Country));
                    console.log(chalk.bgGreen.black("Language: " + response.data.Language));
                    console.log(chalk.bgGreen.black("Plot: " + response.data.Plot));
                    console.log(chalk.bgGreen.black("Actors: " + response.data.Actors));
                    console.log(chalk.bgYellow.black("*******************************"));
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
        else if (randomCommand === "concert-this") {
            queryUrl = "https://rest.bandsintown.com/artists/" + randomSearch + "/events?app_id=codingbootcamp";
            // console.log(queryURL);

            // start our Axios call
            axios.get(queryUrl).then(
                function (response) {
                    // create a for loop to display all the information in the data array that is returned from the API

                    for (i = 0; i < response.data.length; i++) {
                        console.log(chalk.bgRed("**********Concert-This**********"));
                        console.log(chalk.bgBlue("Name of Venue: " + response.data[i].venue.name));
                        console.log(chalk.bgBlue("Venue Locaction: " + response.data[i].venue.city + ", " + response.data[i].venue.region));
                        // use moment to format the date
                        var time = moment(response.data[i].datetime).format("MM/DD/YYYY");
                        console.log(chalk.bgBlue("Date: " + time));
                        console.log(chalk.bgRed("*********************************\n"));
                    }

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
    })
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