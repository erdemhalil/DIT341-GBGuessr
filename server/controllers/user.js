var express = require('express');
var router = express.Router()
var User = require('../models/users');


router.get('/', function (req, res, next) {
    User.find(function(err, users) {
      if(err) {return next(err);}
      res.json({User: users})
  })  
  })

  router.get('/:id', function (req, res, next) {
    User.findById(req.params.id, function(err, users) {
      if(err) {return next(err);}
      if (users == null) {
          return res.status(404).json({"message": "user not found"});
      }
      res.json(users)
  })  
  })

// !?!?!?!!?
router.post('/register', function (req, res, next) {
    var user = new User(req.body);
    user.save(err => {if (err) return next(err)
    res.status(201).json(user)
});
})

//?!?!?!
router.post('/authenticate', function (req, res) {
    User.find({email: req.body.email, password: req.body.password }, function(err, users) {
        if(err) {return next(err);}
        res.json({user: users})
    })
}) // JWT Token? for authentication

router.delete('/:id', function (req, res, next){
     var id = req.params.id;
     User.findByIdAndDelete(id, function(err, users){
         if(err) { return next(err); }
         if(users == null){
             return res.status(404).json(
                 {"message": "User not found"})
         }
         res.json(user);
     });
});


router.put('/:id', function (req, res, next){
    var id = req.params.id;
    User.findById(id, function(err, user){
        if(err){ return next(err); }
        if(user == null){
            return res.status(404).json({"message": "User not found"});
        }
        user.email = req.body.email;
        user.password = req.body.password;
        user.save();
        res.json(user);
    });
});

router.patch('/:id', function (req, res, next){
    var id = req.params.id;
    User.findById(id, function(err, user){
        if(err){ return next(err); }
        if(user == null){
            return res.status(404).json({"message": "User not found"});
        }
        user.email = (req.body.email || user.email);
        user.password = (req.body.password || user.password);
        user.save();
        res.json(user);
    });
});


module.exports = router