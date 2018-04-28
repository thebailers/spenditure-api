var ObjectId = require('mongodb').ObjectID;
var User = require('../api/user/userModel');

exports.getAllUsers = function(req, res) {
  return function(req, res) {
    User.find({})
      .select('-password')
      .exec()
      .then(
        function(users) {
          res.json(users)
        }, function(err) {
          next(err)
        })
  }
}

exports.createUser = function(req, res) {
  return function(req, res) {
    res.send('create user')
  }
}

exports.updateUser = function(req, res) {
  return function(req, res) {
    res.send('update the user')
  }
}

exports.getOneUser = function(req, res, next) {
  return function(req, res, next) {
    User.findById(req.params.id)
      .select('-password')
      .exec()
      .then(
        function(user) {
          if (!user) {
            next(new Error('No new user with that id'));
          } else {
            res.json(user)
            next()
          }
        },
        function(err) {
          next(err);
        }
      );
  }
}