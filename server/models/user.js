var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: String,
    password: String,
    created_on: Date
});

module.exports = mongoose.model('users', userSchema);

