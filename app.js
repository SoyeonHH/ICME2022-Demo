var express = require('express');
var app = express();

var cors = require('cors');
var http = require('http');
var fs = require('fs');

const port = 80;

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/script', express.static(__dirname + '/script'));
app.use('/style', express.static(__dirname + '/style'));
app.use('/data', express.static(__dirname + '/data'));
app.use('/image', express.static(__dirname + '/image'));
app.use('/dataset', express.static(__dirname + '/dataset'));
app.use('/score', express.static(__dirname + '/score'));

var server = http.createServer(app).listen(port, function() {
  console.log('Server run');
})

app.get('/analyzer', function(req, res) {
  fs.readFile('analysis.html', function(error, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
});

app.get('/explorer', function(req, res) {
  fs.readFile('index.html', function(error, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
});

var localFileText = require('./routes/localFileText')();
app.use('/text', localFileText);

var localFileCsv = require('./routes/localFileCsv')();
app.use('/csv', localFileCsv);

var localFileScore = require('./routes/localFileScore')();
app.use('/score', localFileScore);