var Post = require('../models/post.js');
module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('home', {
      layout: false
    });
  });

  app.get('/dexterslab', function(req, res) {
    res.render('dexterslab', {
      layout: false
    });
  });
};
