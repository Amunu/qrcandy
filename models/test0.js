var database = require('./mongodb');
var db = database.connection;
var user = require('./user')(db);

user.getUserByXX('minary', 'username', function(err, data){
  console.log(err, data); 
});

// console.log(userModel);
// var user = {
//   username : 'linea',
//   email : 'i@f10.moe',
//   password : 'user.password',
//   reg_time : new Date().getTime(),
//   qrcode : 'user.qrcode'  //[[qrcode_url: '', link: ''], ...]
// };    


// userModel.createUser(user, function(err, data){
//   console.log(err, data);
// });
// userModel.getUserByXX('i@f10.moe', 'email', function(err, data){
//   console.log(err, data);
//   data.username = 'minary';
//   userModel.updateUser(data[0]._id, data, function (err, res) {
//     console.log(data[0]._id);
//     console.log(err, res);
//   });
// });


