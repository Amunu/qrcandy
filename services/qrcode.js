var async = require('async');
var crypto = require('crypto');
var validator = require('validator');
var QRCode = require('qrcode');
var UPYUN = require('upyun');

var upyun = new UPYUN('qrcandy', 'root', 'admin123456', '', '');

var db = require('../models/connection').db;
var Qrcode = require('../models/qrcode');

// console.log(Qrcode.createQrcode);
exports.createQrcode = function(req, callback) {
  if(!req) return callback('not null');
  if(!req.username) return callback('user not null');
  if(!req.info) return callback('info not null');
  if(!req.type) return callback('type not null');

  var url = '';
  var short_id = '';

  async.waterfall([
    function(next) {
      Qrcode.createQrcode({
        username : req.username,
        info : req.info,
        type : req.type
      }, next);
    },
    function(qrcode, next) {
      short_id = qrcode.id.substring(18, 24);
      url = 'http://qrcandy.b0.upaiyun.com/'+ qrcode.username + '/' + short_id;
      QRCode.save('../qrcode-img/' + short_id + '.png', url, next);
    },
    function(data, next) {

    }
  ], function(err, data) {
    if(err) callback(err);

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
  //delete local database
  //delete upyun database
}

exports.createQrcode({
  username : 'minary',
  info : 'wulalala',
  type : 'what'
}, function(err, data) {
  console.log(err, data);
});

// exports.updateQrcode({
//   qrcode_id : '54978ff55659964d2d0daa60',
//   info : 'wulalala'
// }, function(err, data) {
//   console.log(err, data);
// });