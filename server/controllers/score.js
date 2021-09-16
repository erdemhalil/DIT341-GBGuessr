var express = require('express');
const router = express.Router()
var Score = require('../models/scores');


router.post('/', function (req, res, next) {
    var score = new Score(req.body);
    score.save(err => {if (err) return next(err)
    res.status(201).json(score)
  });
  })
  
router.get('/', function (req, res, next) {
      Score.find(function(err, scores) {
        if(err) {return next(err);}
        res.status(200).json({score: scores})
    })  
  })
  
  router.get('/:id', function (req, res, next) {
    Score.findById(req.params.id, function(err, scores) {
      if(err) {return next(err);}
      res.status(200).json({score: scores})
  })    
  })

router.delete('/:id', function(req, res, next){
    Score.findOneAndDelete({_id: req.params.id}, function(err, score){
        if (err) { return next(err); }
        if (score == null) {
            return res.status(404).json({"message": "Score not found"});
        }
        res.status(200).json({"message": "score deleted"});    });
      });

router.put('/:id', function (req, res, next){
  var id = req.params.id;
  Score.findById(id, function(err, scores){
      if(err){ return next(err); }
      if(scores == null){
          return res.status(404).json({"message": "Score not found"});
      }
      scores.value = req.body.value;
      scores.rank = req.body.rank;
      scores.save();
      res.status(200).json(scores);
  });
});

router.patch('/:id', function (req, res, next){
  var id = req.params.id;
  Score.findById(id, function(err, scores){
      if(err){ return next(err); }
      if(scores == null){
          return res.status(404).json({"message": "Score not found"});
      }
      scores.value = (req.body.value || scores.value);
      scores.rank = (req.body.rank || scores.rank);
      scores.save();
      res.status(200).json(scores);
  });
});

module.exports = router