var qrcodeService = require('../services/qrcode');
var userService = require('../services/user');

module.exports = function(app){
  app.get('/login', function(req, res) {
    res.render('login', { title: 'login' });
  });

  app.put('/login', function(req, res) {
  	res.render('login', {title : 'login'});
  });
}
