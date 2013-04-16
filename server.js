var http = require('http');
var express = require('express');
var holla = require('holla');

var app = express();

app.use(express.static(__dirname + '/interface'));

server = http.createServer(app).listen(8080);

var rtc = holla.createServer(server, {debug:true, presence:true});

console.log('Server running on port 8080');
