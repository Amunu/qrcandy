var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  username : { type: String, unique: true },
  email :   { type : String, unique : true },
  password : String,
  reg_time : Date
});

var User = mongoose.model('User', UserSchema);

exports.createUser = function(user, callback) {
  var user_info = new User({
    username : user.username,
    email : user.email,
    password : user.password,
    reg_time : user.reg_time
//    qrcode : user.qrcode    //[[qrcode_url: '', link: ''], ...]
  });

  user_info.save(function(err, data){
    if(err) return callback(err);
    else return callback(err, data);
  });
};

exports.updateUser = function(username, user, callback) {
  User.findOneAndUpdate({
    username : username
  }, user, null, function(err, res) {
    return callback(err, res);
  });
}

exports.getUserByXX = function(XX, type, callback){
  if(type === 'id'){
    User.findOne({_id : XX}, function(err, data){
      return callback(err, data);
    });
  }
  if(type === 'email'){
    User.findOne({email : XX}, function(err, data){
      return callback(err, data);
    });
  }
  if(type === 'username'){
    User.findOne({username : XX}, function(err, data){
      return callback(err, data);
    });
  }
}


