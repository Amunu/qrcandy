var mongoose = require('mongoose');

var QrcodeSchema = mongoose.Schema({
  username : String,
  updated_at : Date,
  info : String,
  type : String,
  qrcode_id : String
});

var Qrcode = mongoose.model('Qrcode', QrcodeSchema);

exports.createQrcode = function(opts, callback) {
  var qrcode = new Qrcode({
    username : opts.username,
    info : opts.info,
    type : opts.type
  });

  qrcode.save(callback);
}

exports.updateQrcode = function(_id, qrcoce, callback) {
  Qrcode.findOneAndUpdate({
    _id : _id
  }, qrcoce, null, callback);
}

exports.findQrcode = function(opts, callback) {
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
