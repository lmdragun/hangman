var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var io = require('socket.io');
var io = io(http);
// var io = require("socket.io")(http);

mongoose.connect("mongodb://localhost/hangman");
var db = mongoose.connection;
var game = mongoose.model("Game", new mongoose.Schema({
  word: String,
  Guesses: {right:[], wrong:[]},
  Man: [],
	Status: Boolean
	})
);

http.listen(3000, function(){
  console.log("Listening on port 3000");
});
