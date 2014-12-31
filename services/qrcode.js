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
      url = 'http://qrcandy.b0.upaiyun.com/'+ qrcode.username + '/' + short_id;
      QRCode.save('./qrcode-img/' + short_id + '.png', url, next);
    },
    function(data, next) {
      upyun.uploadFile('/' + qrcode_data.username + '/' + short_id, './qrcode-img/' + short_id + '.png', 'image/png', true, next);
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

  Qrcode.updateQrcode(req.qrcode_id, {
    info : req.info
  }, function(err, qrcode) {
    if(err) callback(err);
    callback(err, qrcode);
  });
}

exports.deleteQrcode = function(req, callback) {
  if(!req) return callback('not null');
  if(!req.qrcode_id) return callback('qrcode_id not null');

  async.waterfall([
    //find qrcode at database
    function(next) {
      Qrcode.findQrcode({qrcode_id : req.qrcode_id}, next);
    },
    //delete upyun qrcode png
    function(qrcode, next) {
      if(!qrcode || !qrcode.length) return callback('qrcode not found');
      upyun.removeFile('/' + qrcode[0].username + '/' + req.qrcode_id, function(err, data) {
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

//------------test------------

    // exports.createQrcode({
    //   username : 'minary',
    //   info : 'wulalala',
    //   type : 'what'
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
