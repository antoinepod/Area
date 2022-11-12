const mongoose = require('mongoose');
mongoose.promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");

module.exports = db;