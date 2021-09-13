var express = require('express');
const router = express.Router()
var Location = require('../models/locations');
   
router.get('/', function (req, res) {
  Location.find(function(err, locations) {
    if(err) {return next(err);}
    res.json({Location: locations})
})  
})

router.post('/', function (req, res) {
  var location = new Location(req.body);
  location.save(err => {if (err) return next(err)
  res.status(201).json(location)
});
})

router.get('/:id', function (req, res) {
  Location.find({id: req.body.id}, function(err, locations) {
    if(err) {return next(err);}
    res.json({Location: locations})
})  
})

module.exports = router