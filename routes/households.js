const Household = require('../api/household/householdModel');

exports.getAllHouseholds = function(req, res) {
  return function(req, res) {
    res.send('get all households')
  }
}

exports.createHousehold = function(req, res) {
  return function(req, res) {
    res.send('create a household')
  }
}

exports.getOneHousehold = function(req, res) {
  return function(req, res) {
    res.send('get one household')
  }
}