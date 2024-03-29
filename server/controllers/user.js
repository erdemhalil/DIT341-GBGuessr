var express = require('express');
var router = express.Router()
var User = require('../models/users');


router.get('/', function (req, res, next) {
    User.find(function(err, users) {
      if(err) {return next(err);}
      if (users == null) {
          return res.status(404).json({"message": "No users found"});
      }
      res.status(200).json({User: users})
  })  
  })

  router.get('/:id', function (req, res, next) {
    User.findById(req.params.id, function(err, users) {
      if(err) {return next(err);}
      if (users == null) {
          return res.status(404).json({"message": "User not found"});
      }
      res.status(200).json(users)
  })  
  })

router.post('/', function (req, res, next) {
    var user = new User(req.body);
    user.save(err => {if (err) return next(err)
    res.status(201).json(user)
});
})

router.delete('/:id', function (req, res, next){
     var id = req.params.id;
     User.findByIdAndDelete(id, function(err, users){
         if(err) { return next(err); }
         if(users == null){
             return res.status(404).json(
                 {"message": "User not found"})
         }
         res.status(200).json({"message": "User deleted"});
     });
});

/*
router.delete('/', function (req, res, next){
    User.deleteMany({}, function(err, user){
        if (err) { return next(err); }
        if (user.deletedCount == 0) {
            return res.status(404).json({"message": "User not found"});
        }
        res.status(200).json({"message": "All users deleted"});
    });
})
*/


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
        res.status(200).json(user);
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
        res.status(200).json(user);
    });
});


module.exports = router