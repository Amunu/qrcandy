var async = require('async');
var crypto = require('crypto');
var validator = require('validator');

var db = require('../models/connection').db;
var Qrcode = require('../models/qrcode');
var User = require('../models/user');

exports.createUser = function(req, res) {
  if(!req) return res.error('not null');
  if(!req.username) return res.error('username not null');
  if(!req.email) return res.error('email not null');
  if(!req.password) return res.error('password not null');

  if(req.username.length > 15) return res.error('looooong username');
  if (!validator.isEmail(req.email)) return res.error('email bad format');

  async.waterfall([
    function(next) {
        User.getUserByXX(req.username, 'username', function(err, data) {
        if(data) return res.error('username already exist');
        next();
      });
    },
    function(next) {
      User.getUserByXX(req.email, 'email', function(err, data) {
        if(data) return res.error('email already exist');
        next();
      });
    },
    function(next) {
      User.createUser({
        username : req.username,
        email : req.email,
        password : crypto.createHash('md5').update(req.password, 'utf8').digest('hex'),
        reg_time : new Date()
      }, next);
    }
  ], function(err, data) {
    if(err) res.error(err);
    res.send(data);
  });
}

exports.updateUser = function(req, res) {
  if(!req) return res.error('not null');
  if (!validator.isEmail(req.email)) return res.error('email bad format');

  async.waterfall([
    function(next) {
        User.getUserByXX(req.username, 'username', function(err, data) {
        if(!data) return res.error('user not exist');
        next(null, data);
      });
    },
    function(user, next) {
      if(!req.email) {
        User.getUserByXX(req.email, 'email', function(err, data) {
          if(data && data.username !== req.username) return res.error('email already exist');
          next();
        });
      }
      else next();
    },
    function(next) {
      var query = {};
      if(!req.email) query.email = req.email;
      if(!password) query.password = crypto.createHash('md5').update(req.password, 'utf8').digest('hex')
      User.updateUser(req.username, query, next);
    }
  ], function(err, data) {
    if(err) res.error(err);
    res.send(data);
  });
}



// exports.createUser({
//   username : 'linea',
//   email : 'i@q98.com',
//   password : 'password'
// }, function(err, data) {
//   console.log(err, data);
// });