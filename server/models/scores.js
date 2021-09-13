var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scoreSchema = new Schema({
    value: Number,
    rank: Number,
    quiz_id: {type: Schema.Types.ObjectId, ref: 'quizes'},
    user_id: String,
    created_on: Date,
    user_id: { type: Schema.Types.ObjectId, ref: 'users'}
});

module.exports = mongoose.model('scores', scoreSchema);