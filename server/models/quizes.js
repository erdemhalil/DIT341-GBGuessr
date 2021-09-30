var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quizSchema = new Schema({
    category: { type: String},
    name: { type: String, unique: true, required: true},
    image: { type: String},
    description: { type: String}
});

module.exports = mongoose.model('quizes', quizSchema);