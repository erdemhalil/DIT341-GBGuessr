var express = require('express');
const router = express.Router()
    
router.get('/', function (req, res) {
    res.json({'quiz': 'list of all quizzes'});
  })

router.get('/:id', function (req, res) {
    res.json({'quiz': 'get quiz by id'});
  })

router.post('/:id', function (req, res) {
    res.json({'quiz': 'submit specific quiz on completion by user'});
  })

router.get('/question', function (req, res) {
    res.json({'question': 'list of all questions'});
  })

router.get('/question/:id', function (req, res) {
    res.json({'question': 'get question by id'});
  })


module.exports = router