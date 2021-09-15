var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema({
    picture: { type: String},
    x_coordinate: { type: Number, required: true},
    y_coordinate: { type: Number, required: true}
});

module.exports = mongoose.model('locations', locationSchema);