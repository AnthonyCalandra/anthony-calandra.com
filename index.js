var express = require('express'),
  expressHandlebars = require('express-handlebars'),
  app = express();

app.use(express.static(__dirname + '/public'));
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/posts', function(req, res) {
  res.render('posts-index');
});

// TODO: Simple blog software.
app.get('/posts/:post', function(req, res) {
  res.render(req.params.post);
});

app.use(function(req, res) {
  res.type('text/plain').status(404).send('404 - Not Found');
});

app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.type('text/plain').status(500).send('500 - Internal Server Error');
});

app.listen(app.get('port'), function() {
  console.log('Express started on localhost:' + app.get('port'));
  console.log('Press Ctrl-C to terminate.');
});
