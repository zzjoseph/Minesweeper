var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
})

app.listen(8080, function() {
	console.log('server running');
});