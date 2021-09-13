var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quizSchema = new Schema({
    category: String,
    name: String
});

module.exports = mongoose.model('quizes', quizSchema);