var Post = require('../models/post.js');
module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('home');
	});
};
