var router = require('express').Router();
var logger = require('../../util/logger');
var controller = require('./householdController');
var authenticate = require('../../auth/auth').authenticate;

router
  .route('/')
  .post(authenticate, controller.post);

module.exports = router;