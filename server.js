var express = require("express");
var session = require("express-session");
var app = express();

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(session({secret: 'codingdojorocks'}));

var chatlog=[];

app.get('/', function(request, response) {
	response.render("index");
})

var server = app.listen(6789, function() {
	console.log("listening on port 6789");
})

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){

	socket.emit("init_chat", {chatlog: chatlog});

	socket.on("message_send", function(data){
		chatlog.push(data);
		io.emit("update_chat", {entry: data});
	})
})
