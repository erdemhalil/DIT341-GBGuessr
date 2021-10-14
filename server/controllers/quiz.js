var express = require('express');
const Question = require('../models/questions');
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
      res.status(200).json(quizes)
  })  
})

router.get('/filter', function (req, res, next) {
  Quiz.find({category: req.query.category}, function(err, quizes) {
    if(err) {return next(err);}
    res.status(200).json(quizes)
}) 
})

router.get('/:id', function (req, res, next) {
  Quiz.findById(req.params.id, function(err, quizes) {
    if(err) {return next(err);}
    res.status(200).json(quizes)
})    
})


router.delete('/', function(req, res, next){
    var id = req.params.id;
    Quiz.deleteMany({}, function(err, quiz){
        if (err) { return next(err); }
        if (quiz.deletedCount == 0) {
            return res.status(404).json({"message": "Quiz not found"});
        }
        res.status(200).json({"message": "All quizes deleted"});
    });
});

router.delete('/:id', function(req, res, next){
  var id = req.params.id;
  Quiz.findOneAndDelete({_id: id}, function(err, quiz){
      if (err) { return next(err); }
      if (quiz == null) {
          return res.status(404).json({"message": "Quiz not found"});
      }
      res.status(200).json({"message": "Quiz deleted"});
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
      quiz.image = req.body.image;
      quiz.description = req.body.description;
      quiz.save();
      res.status(200).json(quiz);
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
      quiz.image = (req.body.image || quiz.image);
      quiz.description = (req.body.description || quiz.description);
      quiz.save();
      res.status(200).json(quiz);
  });
});


router.get('/:id/questions', function (req, res, next){
  // var id = req.params.id;
  // var result = [];
  // var questionsId = [];
  // Question.find((err, questions) => {
  //   if(err){return next(err)}
  //     questions.forEach(question =>{
  //       if(question.quiz_id == id){
  //         if (question.location_id != undefined) {
  //           questionsId.push(question.location_id)
  //         }

  //       }
  //     })
        
  //     console.log(questionsId)
        
  //     Location.find((err, locations) => {
  //       if(err){return next(err)}
  //       locations.forEach(location =>{
  //         questionsId.forEach(question => {
  //           console.log(question)
  //           if(location._id == question){
  //             result.push(location)
  //           }
  //         })
  //         console.log(result)

  //       })
//   res.json({"questions": result})
// })
// })
// })

var id = req.params.id;
  Question.find((err, questions) => {
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
    res.status(200).json({"questions": questionsId})
  })
})

router.get('/:id/questions/:question_id', function (req, res, next){
var id = req.params.id;
var question_id = req.params.question_id;

  Quiz.findById(id, function(err, quiz) {
    if(err){return next(err)}
    if(quiz == null){
      return res.status(404).json({"message": "Quiz not found"})
    }  

    Question.findById(question_id, function(err, question) {
      if(err){return next(err)}
      if(question == null){
        return res.status(404).json({"message": "Question not found"})
      }  
    
    res.status(200).json({question})
  })
})
})

router.post('/:id/questions', function (req, res, next){
  var question = new Question(req.body);
  question.quiz_id = req.params.id;
  question.save(err => {if (err) return next(err)
  res.status(201).json(question)
});
})

router.delete('/:id/questions/:question_id', function (req, res, next){
      
var id = req.params.id;
var question_id = req.params.question_id;
  Quiz.findById(id, function(err, quiz){
    if(err){return next(err)}
    if (quiz == null) {
      return res.status(404).json({"message": "Quiz not found"});
      }
    Question.findByIdAndDelete(question_id, function(err, question) {
      if (question == null) {
        return res.status(404).json({"message": "Question not found"});
      }
      res.status(200).json({"questions": question})
    })
    })
  })



module.exports = router