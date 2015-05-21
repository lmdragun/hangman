var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var io = require('socket.io')(http);

mongoose.connect("mongodb://localhost/hangman");
var db = mongoose.connection;
var Game = mongoose.model("Game", new mongoose.Schema({
  word: String,
  guesses: {right:[], wrong:[]},
  man: [],
	status: Boolean
	})
);

app.set("view engine", "hbs");

app.get('/', function(req, res){
  res.render("index");
});

// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     console.log('message: ' + msg);
//   });
// });

io.on('connection', function(socket){

  socket.on('chat message', function(msg){
		console.log(msg);
		Game.update({word: msg}, function(doc){
			// if (err) return handleError(err);
    	io.emit('chat message', msg);
		});
  });

	socket.on('reset', function(){
		Game.collection.remove();
			new Game({word: "", "guesses.right": [], "guesses.wrong": [], man: [], status: false}).save();
		io.emit('reset');
	});

});



http.listen(3000, function(){
  console.log("Listening on port 3000");
});
