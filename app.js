var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');
var server = http.createServer(app);
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

server.listen(8080, '172.20.10.13', function () {
    console.log('Express server listening on port ' + server.address().port);
});

app.post('/', function (req, res, next) {
    var jsondata = " ";
    req.on('data', function (chunk) {
        jsondata += chunk;
    });
    req.on('end', function () {
        var test = JSON.parse(jsondata);
        console.log(test);
        var test2 = {
            'idx': test.idx,
            'flavor_1': test.flavor_1,
            'flavor_2': test.flavor_2,
            'flavor_3': test.flavor_3,
            'flavor_4': test.flavor_4,
        }
        res.writeHead(200);
        res.end(JSON.stringify(test2));
    });
});

module.exports = app;