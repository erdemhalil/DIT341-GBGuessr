var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: { type: String, unique: true},
    password: { type: String},
    created_on: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('users', userSchema);

