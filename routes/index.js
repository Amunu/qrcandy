var qrcodeService = require('../services/qrcode');
var session = require('express-session');

module.exports = function(app){
  app.get('/index', function(req, res) {
    return res.redirect('/');
  });

  app.get('/', function(req, res) {
    res.render('index', {
      title: 'index',
      username: session.user
    });
  });
}
