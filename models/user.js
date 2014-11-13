var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    username : String,
    email : String,
    password : String,
    reg_time : Date,
    qrcode : Array
});

module.exports = function(connection) {
    return (connection || mongoose).model('User');
} 

module.exports.createUser = function(user, callback) {
  var user_info = new User({
    username : user.username,
    email : user.email,
    password : user.password,
    reg_time : user.reg_time,
    qrcode : user.qrcode    //[[qrcode_url: '', link: ''], ...]
  });

  user_info.save(function(err, data){
    if(err) return callback(err);
    else return callback(err, data);
  });
};

module.exports.updateUser = function(id, user, callback) {
  User.findOneAndUpdate({
      _id : id
  }, user, null, function(err, res) {
      return callback(err, res);
  });
}

module.exports.getUserByXX = function(XX, type, callback){
    if(type === 'id'){
        User.find({_id : XX}, function(err, data){
            return callback(err, data);
        });
    }
    if(type === 'email'){
        User.find({email : XX}, function(err, data){
            return callback(err, data);
        });
    }
    if(type === 'username'){
        User.find({username : XX}, function(err, data){
            return callback(err, data);
        });
    }
}

var User = mongoose.model('User', UserSchema);

