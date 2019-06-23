// Liri application project
// You can find my current portfolio at www.dhawkinsjr.com


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

// Here we will create a function to fun each command
//////////////////////////////////////////////////////

function concertThis() {
    // code for concertThis functions goes here
    
}

function spotifyThisSong() {
    // code for spotifyThisSong goes here
}

function movieThis() {
    // code for movieThis goes here
}

function doWhatItSays() {
    // code for doWhatItSays goes here
}

// Here we will put a switch statement that will run each function based on the command
switch(command) {
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