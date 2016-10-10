var http = require('http');
var https = require('https');
var fs = require('fs');
var config = require('./config.js');
var vhost = require('vhost');
var express = require('express');
var anthonyCalandra = require('./anthony-calandra.com');
var hockeyAnthonyCalandra = require('./hockey.anthony-calandra.com');
var app = express()
.use(function(req, res, next) {
  // HTTPS redirection.
  if (!req.secure) {
    return res.redirect('https://' + req.headers.host + req.url);
  }

  next();
})
.use(vhost('anthony-calandra.com', anthonyCalandra.app))
.use(vhost('hockey.anthony-calandra.com', hockeyAnthonyCalandra.app));

var sslOptions = {
  key: fs.readFileSync(config.key),
  cert: fs.readFileSync(config.cert)
};
http.createServer(app).listen(80);
https.createServer(sslOptions, app).listen(443);
