var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var config = require('../config/config');
var checkToken = expressJwt({ secret: config.secrets.jwt });
var User = require('../api/user/userModel');
var logger = require('../util/logger');

exports.authenticate = function(req, res, next) {
  const authorizationHeader = req.headers['authorization'];
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if (token) {
    jwt.verify(token, config.secrets.jwt, (err, decoded) => {
      if (err) {
        logger.log(err);
        res.status(401).json({ error: 'Failed to authenticate' });
      } else {
        User.findById(decoded._id)
          .select('-password')
          .exec()
          .then(user => {
            if (!user) {
              res.status(404).json({ error: 'No such user.' });
            } else {
              req.user = user;
              next();
            }
          });
      }
    });
  } else {
    res.status(403).json({ error: 'No token provided.' });
  }
};

exports.decodeToken = function() {
  return function(req, res, next) {
    // make it optional to place token on query string
    // if it is, place it on the headers where it should be
    // so checkToken can see it. See follow the 'Bearer 034930493' format
    // so checkToken can see it and decode it
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = 'Bearer ' + req.query.access_token;
    }

    // this will call next if token is valid
    // and send error if its not. It will attach
    // the decoded token to req.user
    checkToken(req, res, next);
  };
};

exports.getFreshUser = function() {
  return function(req, res, next) {
    User.findById(req.user._id).then(
      function(user) {
        if (!user) {
          // if no user is found it was not
          // it was a valid JWT but didn't decode
          // to a real user in our DB. Either the user was deleted
          // since the client got the JWT, or
          // it was a JWT from some other source
          res.status(401).send('Unauthorized');
        } else {
          // update req.user with fresh user from
          // stale token data
          req.user = user;
          next();
        }
      },
      function(err) {
        next(err);
      }
    );
  };
};

// check the user exists in the database
// and that the password is correct
exports.verifyUser = function() {
  return function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    // if no username or password then send
    if (!username || !password) {
      return res.status(400).send('You need a username and a password');
    }

    // look user up in the DB so we can check
    // if the passwords match for the username
    User.findOne({ username: username }).then(
      function(user) {
        if (!user) {
          // res.status(401).send('No user with the given username')
          res.status(401).json({ errors: { form: 'Invalid Username' } });
        } else {
          // checking the passowords here
          if (!user.authenticate(password)) {
            // res.status(401).send('Wrong password')
            res.status(401).json({ errors: { form: 'Invalid Password' } });
          } else {
            // if everything is good,
            // then attach to req.user
            // and call next so the controller
            // can sign a token from the req.user._id
            req.user = user;
            next();
          }
        }
      },
      function(err) {
        next(err);
      }
    );
  };
};

// util method to sign tokens on signup
exports.signToken = function(id, username, firstname, lastname) {
  return jwt.sign(
    { _id: id, username: username, firstname: firstname, lastname: lastname },
    config.secrets.jwt,
    { expiresIn: config.expireTime }
  );
};
