var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var io = require('socket.io')(http);


var db = mongoose.connection;
db.on('error', console.error);

mongoose.connect("mongodb://localhost/hangman");
var Game = mongoose.model("Game", new mongoose.Schema({
  word: String,
  // guesses: {right:[], wrong:[]},
  // man: [],
	// status: Boolean
	})
);

// var test = new Game({
//   word: 'Test'
// });
// test.save(function(err, test) {
//   if (err) return console.error(err);
//   console.dir(test.word);
// });

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

  socket.on('new word', function(msg){
		console.log(msg);
		Game.update({word: msg}, function(doc){
			// if (err) return handleError(err);
    	io.emit('new word', msg);
		});
  });

	socket.on('restart', function(){

		Game.collection.remove();
		console.log("removed collections");
		var test = new Game({
		  word: 'New Game'
		});
		test.save(function(err, test) {
		  if (err) return console.error(err);
		  console.dir(test.word);
			io.emit('restart');
		});

	});

});



http.listen(3000, function(){
  console.log("Listening on port 3000");
});
