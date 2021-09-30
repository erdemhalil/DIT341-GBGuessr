var express = require('express');
const router = express.Router()
var Question = require('../models/questions');


router.post('/', function (req, res, next) {
  var question = new Question(req.body);
  question.save(err => {if (err) return next(err)
  res.status(201).json(question)
});
})

router.get('/', function (req, res, next) {
  Question.find(function(err, questions) {
    if(err) {return next(err);}
    res.status(200).json(questions)
})  
})

router.get('/:id', function (req, res, next) {
  Question.findById(req.params.id, function(err, questions) {
    if(err) {return next(err);}
    res.status(200).json(questions)
})    
})


router.delete('/', function (req, res, next){
  Question.deleteMany({}, function(err, question){
    if(err) { return next(err); }
    if(question.deletedCount == 0){
      return res.status(404).json(
          {"message": "Question not found"})
    }
    res.status(200).json({"message": "questions deleted"});
  });
});

router.delete('/:id', function(req, res, next){
  Question.findOneAndDelete({_id: req.params.id}, function(err, question){
      if (err) { return next(err); }
      if (question == null) {
          return res.status(404).json({"message": "Question not found"});
      }
      res.status(200).json({"message": "question deleted"});
    });
});


router.put('/:id', function (req, res, next){
  var id = req.params.id;
  Question.findById(id, function(err, question){
      if(err){ return next(err); }
      if(question == null){
          return res.status(404).json({"message": "Question not found"});
      }
      question.type = req.body.type;
      question.location_id = req.body.location_id;
      question.description = req.body.description;
      question.answer = req.body.answer;
      question.options = req.body.options;
      question.score = req.body.score;
      question.save();
      res.status(200).json(question);
  });
});

router.patch('/:id', function (req, res, next){
  var id = req.params.id;
  Question.findById(id, function(err, question){
      if(err){ return next(err); }
      if(question == null){
          return res.status(404).json({"message": "Quesiton not found"});
      }
      question.type = (req.body.type || question.description);
      question.location_id = (req.body.location_id || question.location_id);
      question.description = (req.body.description || question.description);
      question.answer = (req.body.answer || question.answer);
      question.options = (req.body.options || question.options);
      question.score = (req.body.score || question.score);

      question.save();
      res.status(200).json(question);
  });
});


module.exports = router