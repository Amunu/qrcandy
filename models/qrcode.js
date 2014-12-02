var mongoose = require('mongoose');

var QrcodeSchema = mongoose.Schema({
  user : String,
  updated_at : Date,
  info : String
});

var Qrcode = mongoose.model('Qrcode', QrcodeSchema);

exports.createQrcode = function(opts, callback) {
  var qrcode = new Qrcode({
    user : opts.user,
    info : opts.info
  });

  qrcode.save(function(err, data) {
    if(err) return callback(err);
    return callback(err, data);
  });
}

exports.find = function(opts, callback) {
  var query = {};
  if(opts.ID) query._id = opts.ID;
  if(opts.user) query.user = opts.user;

  Qrcode.find(query, function(err, data){
    return callback(err, data);
  });
}
