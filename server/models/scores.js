var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Consider adding 'max', 'min' for value, rank

var scoreSchema = new Schema({
    value: { type: Number, required: true},
    rank: { type: Number},
    quiz_id: {type: Schema.Types.ObjectId, ref: 'quizes'},
    user_id: { type: Schema.Types.ObjectId, ref: 'users'},
    created_on: { type: Date, default: Date.now}
});

module.exports = mongoose.model('scores', scoreSchema);