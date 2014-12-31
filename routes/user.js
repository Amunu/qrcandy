var qrcodeService = require('../services/qrcode');
var userService = require('../services/user');
var session = require('express-session');

module.exports = function(app){
  app.get('/user', function(req, res) {
    res.render('user', {
      title: 'user',
      username: session.user
    });
  });

  app.put('/user', function(req, res) {
    res.send('respond with a resource');
  });

  app.post('/user', function(req, res) {
    res.send('respond with a resource');
  });
}
