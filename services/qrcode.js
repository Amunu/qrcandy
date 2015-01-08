var async = require('async');
var crypto = require('crypto');
var validator = require('validator');
var QRCode = require('qrcode');
var UPYUN = require('upyun');
var fs = require('fs');
var config = require('../config').upyun;

var upyun = new UPYUN(config.space, config.operator, config.password, 'v0', 'legacy');

var db = require('../models/connection').db;
var Qrcode = require('../models/qrcode');

exports.createQrcode = function(req, callback) {
  if(!req) return callback('not null');
  if(!req.username) return callback('user not null');
  if(!req.info) return callback('info not null');
  if(!req.type) return callback('type not null');
  var url = '';
  var short_id = '';
  var qrcode_data = {};

  async.waterfall([
    function(next) {
      Qrcode.createQrcode({
        username : req.username,
        info : req.info,
        type : req.type
      }, next);
    },
    function(qrcode, num, next) {
      short_id = qrcode.id.substring(18, 24);
      Qrcode.updateQrcode(qrcode.id, {qrcode_id : short_id}, next);
    },
    function(qrcode, next) {
      qrcode_data = qrcode;
      url = 'http://qrcandy.f10.moe/qrcode/' + short_id;
      QRCode.save('./qrcode-img/' + short_id + '.png', url, next);
    },
    function(data, next) {
      upyun.uploadFile('/qrcode/' + short_id, './qrcode-img/' + short_id + '.png', 'image/png', true, next);
    },
    function(data, next) {
        var localFile = './qrcode-img/' + short_id + '.png';
        if(fs.existsSync(localFile)) {
          fs.unlink(localFile, function(err) {
            next(err, qrcode_data);
          });
        }
        else next(null, qrcode_data);
      }
  ], function(err, data) {
    if(err) callback(err);
    else callback(err, data);
  });
}

exports.updateQrcode = function(req, callback) {
  if(!req) return callback('not null');
  if(!req.qrcode_id) return callback('qrcode id not null');
  if(!req.info) return callback('info not null');
  if(req.type) return callback('type cannot change');

  async.waterfall([
    function (next) {
      Qrcode.findQrcode({qrcode_id : req.qrcode_id}, next)
    },
    function (data, next) {
      if(!data) callback('qrcode_id error');
      Qrcode.updateQrcode(data[0]._id, {
        info : req.info
      }, next);
    }
  ],function (err, data) {
    if(err) callback(err);
    else callback(err, data);
  });
}

exports.deleteQrcode = function(req, callback) {
  if(!req) return callback('not null');
  if(!req.qrcode_id) return callback('qrcode_id not null');

  async.waterfall([
    //find qrcode at database
    function(next) {
      Qrcode.getQrcode({qrcode_id : req.qrcode_id}, next);
    },
    //delete upyun qrcode png
    function(qrcode, next) {
      if(!qrcode || !qrcode.length) return callback('qrcode not found');
      upyun.removeFile('/qrcode/' + req.qrcode_id, function(err, data) {
        if(err) callback(err);
        if(data.statusCode === 200) {
          next(err, qrcode, data);
        }
        else callback(data);
      });
    },
    //delete qrcode at database
    function(qrcode, data, next) {
      Qrcode.removeQrcode(qrcode[0].id, next);
    },
    //delete local qrcode
    function(qrcode, next) {
      var localFile = './qrcode-img/' + req.qrcode_id + '.png';
      if(fs.existsSync(localFile)) {
        fs.unlink(localFile, next);
      }
      else next(null, null);
    }
  ], function(err, data) {
    if(err) return callback(err);
    else callback(err, {status : 'ok'});
  });
}

exports.findQrcode = function(req, callback) {
  if(!req) return callback('not null');
  if(!req.username) return callback('user not null');
  if(!req.page) return callback('page info ne!');
  var pages = 0;
  var limit = 13;
  var sum = 0;

  async.waterfall([
    function(next) {
      Qrcode.countQrcode({
        username : req.username
      }, next);
    },
    function(count, next) {
      sum = count
      pages = parseInt(count % limit !== 0 ? count / limit + 1 : count / limit);
      skip = (req.page - 1) * limit

      Qrcode.findQrcode({
        username : req.username,
        skip : skip
      }, next);
    }
  ], function(err, data) {
    var _data = JSON.parse(JSON.stringify(data));
    if(err) callback(err);
    else callback(null, {pages : pages, data : _data, count : sum});
  });
}

exports.getQrcode = function (qrcode_id, callback) {
  if(!qrcode_id) callback('qrcode_id not null');
  Qrcode.getQrcode({qrcode_id : qrcode_id}, callback);
}


//------------test------------
// exports.findQrcode({
//   username : 'linea',
//   page : 1
// }, function(err, data) {
//   console.log(err, data);
// });



// exports.updateQrcode({
//   qrcode_id : '54978ff55659964d2d0daa60',
//   info : 'wulalala'
// }, function(err, data) {
//   console.log(err, data);
// });

// exports.deleteQrcode({
//     qrcode_id : 'fba9d6',
// }, function(err, data) {
//   console.log(err, data);
// });


// upyun.getUsage(function(err, data) {
//   console.log(err, data);
// })


// upyun.listDir('/minary', function(err, data) {
//   console.log(err, data.data);
// });


// upyun.downloadFile('/minary/7b16e8', function(err, data) {
//   console.log(err, data);
// });
