var crypto = require('crypto');
var session = require('express-session');
var qrcodeService = require('../services/qrcode');
var userService = require('../services/user');

module.exports = function(app){
  app.get('/login', function(req, res) {
    console.log('username: ', session.user);
    res.render('login', {
      title: 'login' ,
      username: session.user
    });
  });

  app.post('/login', function(req, res) {
    console.log(req.body);
    userService.getUserInfo({username : req.body.username}, function(err, data) {
      if(err) return res.send(400, {error: err});
      if(!data) return res.send(404, {error: err});

      var password = crypto.createHash('md5').update(req.body.password, 'utf8').digest('hex');
      if(data.password !== password) return res.send(400, {error: '密码错误'});
      else {
        console.log(session);
        session.user = req.body.username;
        return res.send(200, {result : 'ok'});
      }
    })
  });

  app.get('/logout', function(req, res) {
    session.user = null;
    return res.send(200, {result : 'ok'});
  });
}
