var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema({
    id: String,
    picture: String,
    grid: {
        x_coordinate: Number,
        y_coordinate: Number
    }
});

module.exports = mongoose.model('locations', locationSchema);