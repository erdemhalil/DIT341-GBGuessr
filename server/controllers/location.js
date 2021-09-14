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

router.delete('/', function (req, res, next){
  Location.deleteMany({}, function(err, locations){
    if(err) { return next(err); }
    if(locations == null){
      return res.status(404).json(
          {"message": "Location not found"})
    }
  });
});

module.exports = router