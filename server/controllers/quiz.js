var express = require('express');
const router = express.Router()
var Quiz = require('../models/quizes');
var Question = require('../models/questions');

router.post('/', function (req, res) {
  var quizes = new Quiz(req.body);
  quizes.save(err => {if (err) return next(err)
  res.status(201).json(quizes)
});
})

  router.get('/', function (req, res) {
    Quiz.find(function(err, quizes) {
      if(err) {return next(err);}
      res.json({quiz: quizes})
  })  
})

router.get('/:id', function (req, res) {
  Quiz.find({id: req.body.id }, function(err, quizes) {
    if(err) {return next(err);}
    res.json({quiz: quizes})
})    
})


router.post('/question', function (req, res) {
  var question = new Quiz(req.body);
  question.save(err => {if (err) return next(err)
  res.status(201).json(question)
});
})

router.get('/question', function (req, res) {
  Question.find(function(err, questions) {
    if(err) {return next(err);}
    res.json({question: questions})
})  
})

router.get('/question/:id', function (req, res) {
  Question.find({id: req.body.id }, function(err, questions) {
    if(err) {return next(err);}
    res.json({question: questions})
})    
})


module.exports = router