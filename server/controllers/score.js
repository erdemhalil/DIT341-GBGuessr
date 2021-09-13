var express = require('express');
const router = express.Router()
    
    router.get('/:id', function (req, res) {
    res.json({'score': 'get highscore by id'});
    })

    router.get('/', function (req, res) {
    res.json({'score': 'list of all highscores'});
    })

    router.post('/', function (req, res) {
    res.json({'score': 'add new score'});
    })

    router.patch('/', function (req, res) { // If user only can har one score saved
    res.json({'score': 'update user score'});
    })

module.exports = router