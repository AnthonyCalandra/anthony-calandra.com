module.exports = function(app) {
  app.get('/wikipedia-tfidf', function(req, res) {
    res.render('tfidf', {
      layout: false
    });
  });

  app.post('/wikipedia-tfidf', function(req, res) {
    const exec = require('child_process').exec;
    const validator = require('validator');
    const query = validator.whitelist(req.body.query, 'a-zA-Z0-9 ');
    const basePath = '/var/www/node/node-blog/wikipedia-index';
    const jarPath = `${basePath}/wikipedia-indexer-1.0.jar`;
    const args = `-index ${basePath}/wikipedia-index -collection ${basePath}/wikipedia_utf8_filtered_20pageviews.csv -query "${query}"`;
    exec(`java -cp ${jarPath} com.anthony_calandra.wikipedia_indexer.ArticleRetriever ${args}`, function(err, stdout) {
      if (err !== null) {
        res.send(new Error());
        return;
      }

      res.send(stdout);
    });
  });
};
