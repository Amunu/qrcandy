var mongoose = require('mongoose');

var QrcodeSchema = mongoose.Schema({
  username : String,
  updated_at : Date,
  created_at : Date,
  info : String,
  type : String,
  qrcode_id : String
});

var Qrcode = mongoose.model('Qrcode', QrcodeSchema);

exports.createQrcode = function(opts, callback) {
  var qrcode = new Qrcode({
    username : opts.username,
    info : opts.info,
    type : opts.type,
    updated_at : new Date(),
    created_at : new Date()
  });

  qrcode.save(callback);
}

exports.updateQrcode = function(_id, qrcode, callback) {
  qrcode.updated_at = new Date();
  Qrcode.findOneAndUpdate({
    _id : _id
  }, qrcode, null, callback);
}

exports.countQrcode = function(opts, callback) {
  var query = {};
  if(opts.qrcode_id) query.qrcode_id = opts.qrcode_id;
  if(opts.ID) query._id = opts.ID;
  if(opts.username) query.username = opts.username;

  Qrcode
  .count(query)
  .exec(callback);
}

exports.findQrcode = function(opts, callback) {
  var query = {};
  if(opts.qrcode_id) query.qrcode_id = opts.qrcode_id;
  if(opts.username) query.username = opts.username;
  var limit = opts.limit || 13;
  var skip = opts.skip;

  Qrcode
  .find(query)
  .sort({created_at : -1})
  .skip(skip)
  .limit(limit)
  .exec(callback);
}

exports.getQrcode = function(opts, callback) {
  var query = {};
  if(opts.qrcode_id) query.qrcode_id = opts.qrcode_id;
  if(opts.ID) query._id = opts.ID;
  if(opts.username) query.username = opts.username;

  Qrcode.find(query, callback);
}

exports.removeQrcode = function(_id, callback) {
  Qrcode.findOneAndRemove({
    _id : _id
  }, callback);
}
