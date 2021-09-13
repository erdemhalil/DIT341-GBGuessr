var express = require('express');
const router = express.Router()
    
router.get('/', function (req, res) {
    res.json({'location': 'list all locations'});
  })

router.get('/:id', function (req, res) {
    res.json({'location': 'get location by ud'});
  })

module.exports = router