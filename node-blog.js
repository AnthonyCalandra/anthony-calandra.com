var config = require('./config.js');
var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');
var expressHandlebars = require('express-handlebars');
var mongoose = require('mongoose');
var MongoSessionStore = require('session-mongoose')(require('connect'));
var sessionStore = new MongoSessionStore({
  url: config.mongoConnStr
});
var app = express();
var serverOptions = {
  key: fs.readFileSync(config.key),
  cert: fs.readFileSync(config.cert)
};

app.use(express.static(__dirname + '/public'));
mongoose.connect(config.mongoConnStr, config.mongoOpts);
app.use(require('body-parser').urlencoded({
  extended: true
}));
app.use(require('cookie-parser')(config.cookieSecret));
app.use(require('express-session')({
  store: sessionStore,
  secret: config.cookieSecret,
  resave: false,
  saveUninitialized: true
}));
app.use(require('csurf')());
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(function(req, res, next) {
  // Have the following available to every view/layout.
  res.locals.csrfToken = req.csrfToken();
  res.locals.siteTitle = config.siteTitle;
  res.locals.siteDesc = config.siteDesc;
  app.locals.loggedIn = req.session.loggedIn;
  // Used for having the 'edit post' link available.
  app.locals.inPost = false;
  app.locals.postId = 0;
  // Used for loading extra stylesheets and scripts for posts.
  app.locals.footerHtml = '';
  next();
});

require('./routes/index.js')(app);
require('./routes/post.js')(app);
require('./routes/login-logout.js')(app);

app.use(function(req, res) {
  res.type('text/plain').status(404).send('404 - Not Found');
});

app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.type('text/plain').status(500).send('500 - Internal Server Error');
});

https.createServer(serverOptions, app).listen(443, function() {
  console.log('Express started in ' + app.get('env') +
    ' mode on localhost:443');
  console.log('Press Ctrl-C to terminate.');
});
http.createServer(app).listen(80, function() {
  console.log('Express started in ' + app.get('env') +
    ' mode on localhost:80');
  console.log('Press Ctrl-C to terminate.');
});
