var express = require('express');
const router = express.Router()
var Location = require('../models/locations');
   
router.get('/', function (req, res, next) {
  Location.find(function(err, locations) {
    if(err) {return next(err);}
    res.json({Location: locations})
})  
})

router.post('/', function (req, res, next) {
  var location = new Location(req.body);
  location.save(err => {if (err) return next(err)
  res.status(201).json(location)
});
})

router.get('/:id', function (req, res, next) {
  Location.findById(req.params.id, function(err, locations) {
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

router.delete('/:id', function(req, res, next){
  Location.findOneAndDelete({_id: req.params.id}, function(err, locations){
      if (err) { return next(err); }
      if (quiz == null) {
          return res.status(404).json({"message": "Location not found"});
      }
      res.json(locations);
  });
});


router.put('/:id', function (req, res, next){
  var id = req.params.id;
  Location.findById(id, function(err, location){
      if(err){ return next(err); }
      if(location == null){
          return res.status(404).json({"message": "Location not found"});
      }
      location.picture = req.body.picture;
      location.x_coordinate = req.body.x_coordinate;
      location.y_coordinate = req.body.y_coordinate;
      location.save();
      res.json(location);
  });
});

router.patch('/:id', function (req, res, next){
  var id = req.params.id;
  Location.findById(id, function(err, location){
      if(err){ return next(err); }
      if(location == null){
          return res.status(404).json({"message": "Location not found"});
      }
      location.picture = (req.body.picture || location.picture);
      location.x_coordinate = (req.body.x_coordinate || location.x_coordinate);
      location.y_coordinate = (req.body.y_coordinate || location.y_coordinate);
      location.save();
      res.json(location);
  });
});

module.exports = router