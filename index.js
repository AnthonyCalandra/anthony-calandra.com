var http = require('http');
var https = require('https');
var fs = require('fs');
var config = require('./config.js');
var vhost = require('vhost');
var express = require('express');
var anthonyCalandra = require('./anthony-calandra.com');
var dexterslabAnthonyCalandra = require('./dexters-lab.anthony-calandra.com');
var isProduction = process.env.NODE_ENV === 'production';
var app = express();
if (isProduction) {
  app.use(function(req, res, next) {
    // HTTPS redirection.
    if (!req.secure) {
      return res.redirect('https://' + req.headers.host + req.url);
    }

    next();
  })
  .use(vhost('anthony-calandra.com', anthonyCalandra.app))
  .use(vhost('dexters-lab.anthony-calandra.com', dexterslabAnthonyCalandra.app));
} else {
  app.use(vhost('anthony-calandra.com', anthonyCalandra.app));
}

http.createServer(app).listen(process.env.PORT || 80);
if (isProduction) {
  var sslOptions = {
    key: fs.readFileSync(config.key),
    cert: fs.readFileSync(config.cert)
  };
  https.createServer(sslOptions, app).listen(443);
}
