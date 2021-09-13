var express = require('express');
const router = express.Router()
    
    router.post('/register', function (req, res) {
        res.json({'register': 'create new user'});
      })
    
    router.get('/authenticate', function (req, res) {
        res.json({'authentication': 'user authentication'});
      })


module.exports = router