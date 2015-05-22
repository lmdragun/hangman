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

io.on('connection', function(socket){

  socket.on('new word', function(msg){
		console.log(msg);
		Game.update({word: msg}, function(doc){
			// if (err) return handleError(err);
			var array = msg.split('');
    	io.emit('new word', array);
		});
  });

	socket.on('guess', function(letter){
		console.log(letter);
		Game.find({}, "-_id word", function(err, word){
			if (err) return handleError(err);
			console.log(word);
		})

	});
			// Game.update({"guesses.right": letter}, function(doc){
			// 	io.emit(word, "found it" );
			// });
		// if ( word.indexOf(letter) > -1 ) {
		// 	Game.update({"guesses.right": letter}, function(doc){
		// 		io.emit('guess', "found it" );
		// 	});
		// } else {
		// 	Game.update({"guesses.right": letter}, function(doc){
		// 		io.emit('guess', "not found");
		// 	});
		// }



	socket.on('restart', function(){
		Game.collection.remove();
		console.log("removed collections");
		var test = new Game({
		  word: 'New Game'
		});
		test.save(function(err, test) {
		  // if (err) return console.error(err);
		  console.dir(test.word);
			io.emit('restart');
		});
	});

});

http.listen(3000, function(){
  console.log("Listening on port 3000");
});
