var mongo_config = require('../config').mongo
var mongoose = require('mongoose');
mongoose.connect('mongodb://' + mongo_config.host + '/' + mongo_config.database);

var db = mongoose.connection;

exports.db = db;