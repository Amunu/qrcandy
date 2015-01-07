var qrcodeService = require('../services/qrcode');

module.exports = function(app){
  app.get('/index', function(req, res) {
    return res.redirect('/');
  });

  app.get('/', function(req, res) {
    res.render('index', {
      title: 'index',
      username: req.session.user
    });
  });
}
