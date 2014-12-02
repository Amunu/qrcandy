var mongoose = require('mongoose');
var mongo_config = require('../config').mongo

mongoose.connect('mongodb://' + mongo_config.host + '/' + mongo_config.database);

exports.db = mongoose.connection;
