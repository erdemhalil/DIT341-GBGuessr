var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var scoreSchema = new Schema({
    value: { type: Number, required: true},
    quiz_id: {type: Schema.Types.ObjectId, ref: 'quizes'},
    username: { type: String, default: 'Anonymous'},
    created_on: { type: Date, default: Date.now}
});

module.exports = mongoose.model('scores', scoreSchema);