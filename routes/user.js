var qrcodeService = require('../services/qrcode');
var userService = require('../services/user');
var crypto = require('crypto');

module.exports = function(app){
  app.get('/user', function(req, res) {
    if(!req.session.user)  return res.redirect('/login');

    qrcodeService.findQrcode({
      username : req.session.user,
      page : 1
    }, function(err, data) {
      if(err) return res.render('user', {
        title: 'user',
        username : req.session.user,
        error : err
      });
      userService.getUserInfo({
        username : req.session.user
      }, function(err, user) {
        if(err) return res.render('user', {
          title: 'user',
          username : req.session.user,
          error : err
        });
        var hash = crypto.createHash('md5').update(user.email).digest('hex');
        res.render('user', {
          title: 'user',
          username: req.session.user,
          data : data,
          user : user,
          hash : hash,
          _page : 1
        });
      })
    });
  });

  app.get('/user/:page', function(req, res) {
    if(!req.session.user) res.send(400, {error : 'user is null'});
    var page = req.param('page');

    qrcodeService.findQrcode({
      username : req.session.user,
      page : page
    },  function(err, data) {
      if(err) return res.render('user', {
        title: 'user',
        username : req.session.user,
        error : err
      });
      userService.getUserInfo({
        username : req.session.user
      }, function(err, user) {
        if(err) return res.render('user', {
          title: 'user',
          username : req.session.user,
          error : err
        });

        var hash = crypto.createHash('md5').update(user.email).digest('hex');
        res.render('user', {
          title: 'user',
          username: req.session.user,
          data : data,
          user : user,
          hash : hash,
          _page : page
        });
      })
    });
  });

  app.put('/user', function(req, res) {
    res.send('respond with a resource');
  });

  app.post('/user', function(req, res) {
    res.send('respond with a resource');
  });
}
