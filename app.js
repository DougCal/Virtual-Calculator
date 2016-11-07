var express = require('express');
var favicon = require('express-favicon');
var path = require('path');

var app = express();

app.use('/views', express.static('views'));
app.use(favicon(__dirname + '/views/favicon.ico'));

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res){ 
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

var port = 3000;

app.listen(port, process.env.IP, function(){
    console.log('LISTENING');
});