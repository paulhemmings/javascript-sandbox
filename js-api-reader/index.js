'use strict';

var express = require('express');
var app = express();
var staticFiles = __dirname;
var DEFAULT_PORT = 3000;
var http = require("http");
var https = require("https");
var url=require('url');
var request = require('request');

// server static

console.log('serve static files from:: ' + staticFiles);
app.use(express.static(staticFiles));

// single endpoint

app.get('/api/grab', function (req, res) {
    console.log(url.parse(req.query.targetUrl));
    request(req.query.targetUrl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          res.json(JSON.parse(body));
      }
    });
});

// start app

app.listen(process.env.PORT || DEFAULT_PORT, function () {
  console.log('Example app listening on port 3000!');
});
