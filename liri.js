require("dotenv").config();

// import the keys.js file
var keys = require("./keys.js");

// access the keys inmormation for spotify
var spotify = new Spotify(keys.spotify);

// liri.js needs to be able to hold the following commands:
// - concert-this
// - spotify-this-song
// - movie-this
// - do-what-it-says

// make a variable to hold the command
var command = process.argv[2];