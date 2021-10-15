var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Consider adding 'match' type to validate regex for email
// If there won't be an email associated to it, replace it with username (remember to change routes and postman tests)

var userSchema = new Schema({
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true},
    created_on: { type: Date, default: Date.now()}
});

module.exports = mongoose.model('users', userSchema);

