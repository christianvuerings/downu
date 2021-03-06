var express = require('express');
var path = require('path');
var app = express();
var http = require('http');
var server = http.createServer(app);
var env = process.env.NODE_ENV || 'development';

/**
 * Since we're showing personal pictures, make sure we only pass data over https
 */
var forceSSL = function(req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

// When in production, force SSL
if (env === 'production') {
  app.use(forceSSL);
}

// List public for the static assets
app.use('/', express.static(__dirname + '/public'));

var port = process.env.PORT || 5000;
server.listen(port);
server.on('listening', function() {
  console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});
