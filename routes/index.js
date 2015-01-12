var qrcodeService = require('../services/qrcode');
var multiparty = require('multiparty');
var async = require('async');

module.exports = function(app){
  app.get('/index', function(req, res) {
   return res.redirect('/');
  });

  app.get('/', function(req, res) {
    res.render('index', {
      title: 'Qrcandy-index',
      username: req.session.user
    });
  });

  app.post('/file-upload',function(req, res){
    var form = new multiparty.Form({uploadDir :'./qrcode-img/'});
    form.parse(req, function(err, fields, files) {
      if(err) return res.send(500, {error: err});
      qrcodeService.createQrcode({
        username : req.session.user,
        info : fields.text[0],
        type : 'img',
        img : files.file[0]
      }, function(err, data) {
        if(err) return res.send(500, {error: err});
        else res.send(200, {qrcode: data});
      })
    });
  });
}
