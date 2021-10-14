var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    quiz_id: { type: Schema.Types.ObjectId, ref: 'quizes', required: true},
    description: { type: String, required: true},
    answer: { type: String, required: true},
    options: [{ type: String, required: true}],
    score: { type: Number, required: true}
});

module.exports = mongoose.model('questions', questionSchema);