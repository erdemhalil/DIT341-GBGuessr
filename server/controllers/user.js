var express = require('express');
var router = express.Router()
var User = require('../models/users');

router.post('/register', function (req, res, next) {
    var user = new User(req.body);
    user.save(err => {if (err) return next(err)
    res.status(201).json(user)
});
})

router.post('/authenticate', function (req, res) {
    User.find({email: req.body.email, password: req.body.password }, function(err, users) {
        if(err) {return next(err);}
        res.json({user: users})
    })
}) // JWT Token? for authentication


module.exports = router