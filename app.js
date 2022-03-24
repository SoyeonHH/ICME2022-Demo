var express = require('express');
var app = express();

var cors = require('cors');
var http = require('http');
var fs = require('fs');

const port = 3000;

app.use(cors());
app.use('/script', express.static(__dirname + '/script'));
app.use('/style', express.static(__dirname + '/style'));
app.use('/data', express.static(__dirname + '/data'));

var server = http.createServer(app).listen(port, function() {
  console.log('Server run');
})

app.get('/', function(req, res) {
  fs.readFile('index.html', function(error, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
});

var localFileSystem = require('./routes/localFileSystem')();
app.use('/file', localFileSystem);