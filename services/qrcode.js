var async = require('async');
var crypto = require('crypto');
var validator = require('validator');

var db = require('../models/connection').db;
var Qrcode = require('../models/qrcode');

exports.createQrcode = function(req, callback) {
  if(!req) return callback('not null');
  if(!req.user) return callback('user not null');
  if(!req.info) return callback('info not null');
  if(!req.type) return callback('type not null');

  async.waterfall([
    function(next) {
      Qrcode.createQrcode({
        user : req.user,
        info : req.info,
        type : req.type
      }, next);
    },
    function(qrcode, next) {
      console.log(qrcode.id);
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

}


// exports.updateQrcode({
//   qrcode_id : '54978ff55659964d2d0daa60',
//   info : 'wulalala'
// }, function(err, data) {
//   console.log(err, data);
// });