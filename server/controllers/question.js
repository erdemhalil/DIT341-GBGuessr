var express = require('express');
const router = express.Router()
var Question = require('../models/questions');


router.post('/', function (req, res, next) {
  var question = new Quiz(req.body);
  question.save(err => {if (err) return next(err)
  res.status(201).json(question)
});
})

router.get('/', function (req, res, next) {
  Question.find(function(err, questions) {
    if(err) {return next(err);}
    res.json({question: questions})
})  
})

router.get('/:id', function (req, res, next) {
  Question.findById(req.params.id, function(err, questions) {
    if(err) {return next(err);}
    res.json({question: questions})
})    
})


router.delete('/', function (req, res, next){
  Question.deleteMany({}, function(err, question){
    if(err) { return next(err); }
    if(question == null){
      return res.status(404).json(
          {"message": "Question not found"})
    }
  });
});

router.delete('/:id', function(req, res, next){
  Question.findOneAndDelete({_id: req.params.id}, function(err, question){
      if (err) { return next(err); }
      if (question == null) {
          return res.status(404).json({"message": "Question not found"});
      }
      res.json(question);
  });
});


router.put('/:id', function (req, res, next){
  var id = req.params.id;
  Question.findById(id, function(err, question){
      if(err){ return next(err); }
      if(question == null){
          return res.status(404).json({"message": "question not found"});
      }
      question.type = req.body.type;
      question.description = req.body.description;
      question.answer = req.body.answer;
      question.score = req.body.score;
      question.save();
      res.json(question);
  });
});

router.patch('/:id', function (req, res, next){
  var id = req.params.id;
  Question.findById(id, function(err, question){
      if(err){ return next(err); }
      if(question == null){
          return res.status(404).json({"message": "quesiton not found"});
      }
      question.type = (req.body.type || question.description);
      question.description = (req.body.description || question.description);
      question.answer = (req.body.answer || question.answer);
      question.score = (req.body.score || question.score);

      question.save();
      res.json(question);
  });
});


module.exports = router