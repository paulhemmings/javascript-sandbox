'use strict';

var express = require('express');
var app = express();
var staticFiles = __dirname;
var DEFAULT_PORT = 3000;
var request = require('request');

// server static

console.log('serve static files from:: ' + staticFiles);
app.use(express.static(staticFiles));

// single endpoint

app.get('/api/grab', function (req, res) {
    console.log('request:' + req.query.targetUrl);
    request(req.query.targetUrl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          res.json(JSON.parse(body));
      }
    });
});

// start app

app.listen(process.env.PORT || DEFAULT_PORT, function () {
    console.log('Api Reader app listening on port: ' + (process.env.PORT || DEFAULT_PORT));
});
