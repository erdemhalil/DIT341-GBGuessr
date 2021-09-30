var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Consider adding 'min', 'max' for score, add required true if we don't have any locations

var questionSchema = new Schema({
    quiz_id: { type: Schema.Types.ObjectId, ref: 'quizes', required: true},
    location_id: { type: Schema.Types.ObjectId, ref: 'locations'},
    type: { type: String},
    description: { type: String, required: true},
    answer: { type: String, required: true},
    options: [{ type: String}],
    score: { type: Number}
});

module.exports = mongoose.model('questions', questionSchema);