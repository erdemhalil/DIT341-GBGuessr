var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    quiz_id: { type: Schema.Types.ObjectId, ref: 'quizes'},
    name: String,
    type: String,
    description: String,
    answer: String,
    score: Number
});

module.exports = mongoose.model('questions', questionSchema);