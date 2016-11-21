var express = require('express'),
  expressHandlebars = require('express-handlebars'),
  app = express();

app.use(express.static(__dirname + '/public'));
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main'
}));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
  res.locals.siteTitle = "hockey.anthony-calandra.com";
  res.render('home', {
    layout: false
  });
});

app.use(function(req, res) {
  res.type('text/plain').status(404).send('404 - Not Found');
});

app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.type('text/plain').status(500).send('500 - Internal Server Error');
});

exports.app = app;
