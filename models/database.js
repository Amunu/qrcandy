var mongo_config = require('../config').mongo
var mongoose = require('mongoose');

var connection = mongoose.createConnection('mongodb://' + mongo_config.host + '/' + mongo_config.database);
connection.on('error', function (err) {
  console.log(err);
})

exports.connection = connection;
