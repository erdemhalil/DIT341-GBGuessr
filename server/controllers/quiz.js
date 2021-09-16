var express = require('express');
const questions = require('../models/questions');
const router = express.Router()
var Quiz = require('../models/quizes');

router.post('/', function (req, res, next) {
  var quizes = new Quiz(req.body);
  quizes.save(err => {if (err) return next(err)
  res.status(201).json(quizes)
});
})

router.get('/', function (req, res, next) {
    Quiz.find(function(err, quizes) {
      if(err) {return next(err);}
      res.json({quiz: quizes})
  })  
})

router.get('/:id', function (req, res, next) {
  Quiz.findById(req.params.id, function(err, quizes) {
    if(err) {return next(err);}
    res.json({quiz: quizes})
})    
})

router.delete('/', function(req, res, next){
    var id = req.params.id;
    Quiz.deleteMany({}, function(err, quiz){
        if (err) { return next(err); }
        if (quiz.deletedCount == 0) {
            return res.status(404).json({"message": "Quiz not found"});
        }
        res.json({"message": "All quizes deleted"});
    });
});

router.delete('/:id', function(req, res, next){
  var id = req.params.id;
  Quiz.findOneAndDelete({_id: id}, function(err, quiz){
      if (err) { return next(err); }
      if (quiz == null) {
          return res.status(404).json({"message": "Quiz not found"});
      }
      res.json(quiz);
  });
});


router.put('/:id', function (req, res, next){
  var id = req.params.id;
  Quiz.findById(id, function(err, quiz){
      if(err){ return next(err); }
      if(quiz == null){
          return res.status(404).json({"message": "Quiz not found"});
      }
      quiz.category = req.body.category;
      quiz.name = req.body.name;
      quiz.save();
      res.json(quiz);
  });
});

router.patch('/:id', function (req, res, next){
  var id = req.params.id;
  Quiz.findById(id, function(err, quiz){
      if(err){ return next(err); }
      if(quiz == null){
          return res.status(404).json({"message": "Quiz not found"});
      }
      quiz.category = (req.body.category || quiz.category);
      quiz.name = (req.body.name || quiz.name);
      quiz.save();
      res.json(quiz);
  });
});


router.get('/:id/questions', function (req, res, next){
  var id = req.params.id;
  Questions.find((err, questions) => {
    if(err){return next(err)}
    var questionsId = [];
      questions.forEach(question =>{
        if(question.quiz_id == id){
          questionsId.push(question)
        }
      })
    if(questionsId.length == 0){
      return res.status(404).json({"message": "Question not found"})
    }  
    res.json({"questions": questionsId})
  })
})



module.exports = router