var qrcodeService = require('../services/qrcode');
var userService = require('../services/user');

module.exports = function(app){
  app.get('/qrcode/:id', function(req, res) {
    var qrcode_id = req.param('id');
    if(!qrcode_id) res.send(400, {error: 'qrcode_id not null'});

    qrcodeService.getQrcode(qrcode_id, function (err, qrcode) {
      res.render('qrcode', {
        qrcode_id: qrcode[0].qrcode_id,
        info : qrcode[0].info
      });
    });
  });

  app.put('/qrcode', function(req, res) {
    if(!req.session.user) return res.send(400, {error: '请先<a href="/login">登录</a>'});
    qrcodeService.updateQrcode({
      info : req.body.info,
      qrcode_id : req.body.qrcode_id
    }, function(err, data) {
      if(err) return res.send(500, {error: err});
      return res.send(200, {result: 'ok'});
    });
  });

  app.post('/qrcode/text', function(req, res) {
  	if(!req.session.user) return res.send(400, {error: '请先<a href="/login">登录</a>'});
    qrcodeService.createQrcode({
      username : req.session.user,
      type : 'text',
      info : req.body.text,
      ip : req.ip
    }, function(err, data) {
      if(err) return res.send(500, {error: err});
      return res.send(200, {data : data});
    });
  });

  app.delete('/qrcode', function(req, res) {
    if(!req.session.user) return res.send(400, {error: '请先<a href="/login">登录</a>'});
    if(!req.body.qrcode_id) return res.send(400, {error: 'qrcode not null'});
    qrcodeService.deleteQrcode({
      qrcode_id : req.body.qrcode_id
    }, function(err, data) {
      if(err) return res.send(500, {error: err});
      return res.send(200, {data: data});
    });
  });

}
