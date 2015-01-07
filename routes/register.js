var qrcodeService = require('../services/qrcode');
var userService = require('../services/user');

module.exports = function(app){
  app.get('/register', function(req, res) {
    res.render('register', {
      title: 'register' ,
      username : null
    });
  });

  app.post('/register', function(req, res) {
    userService.createUser({
      username : req.body.username,
      email : req.body.userEmail,
      password : req.body.password
    }, function(err, user) {
      if(err) return res.send(400, {error : err});
      return res.send(200, {user : user.toJSON()});
    });
  });
}
