var qrcodeService = require('../services/qrcode');
var userService = require('../services/user');
var session = require('express-session');

module.exports = function(app){
  app.get('/user', function(req, res) {
    if(!session.user) res.send(400, {error : 'user is null'});

    qrcodeService.findQrcode({
      username : session.user,
      page : 1
    }, function(err, data) {
      if(err) res.render('user', {
        title: 'user',
        username : session.user,
        error : err
      });
      res.render('user', {
        title: 'user',
        username: session.user,
        data : data
      });
    });
  });

  app.get('/user/:page', function(req, res) {
    if(!session.user) res.send(400, {error : 'user is null'});
    var page = req.param('page');

    qrcodeService.findQrcode({
      username : session.user,
      page : page
    }, function(err, data) {
      if(err) res.render('user', {
        title: 'user',
        username : session.user,
        error : err
      });
      res.render('user', {
        title: 'user',
        username: session.user,
        data : data
      });
    });
  });

  app.put('/user', function(req, res) {
    res.send('respond with a resource');
  });

  app.post('/user', function(req, res) {
    res.send('respond with a resource');
  });
}
