var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var quizSchema = new Schema({
    category: { type: String, required: true},
    name: { type: String, unique: true, required: true},
    image: { type: String, required: true},
    description: { type: String, required: true}
});

module.exports = mongoose.model('quizes', quizSchema);