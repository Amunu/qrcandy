var qrcodeService = require('../services/qrcode');
var userService = require('../services/user');

module.exports = function(app){
  app.get('/qrcode', function(req, res) {
    res.render('qrcode', { title: 'qrcode' });
  });

  app.put('/qrcode', function(req, res) {
  	res.render('qrcode', {title : 'qrcode'});
  });

  app.post('/qrcode', function(req, res) {
  	res.render('qrcode', {title : 'qrcode'});
  });

  app.delete('/qrcode', function(req, res) {
  	res.render('qrcode', {title : 'qrcode'});
  });

}
