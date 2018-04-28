var uniqid = require('uniqid');
const Household = require('../api/household/householdModel');

exports.getAllHouseholds = function(req, res) {
  return function(req, res) {
    res.send('get all households')
  }
}

exports.createHousehold = function(req, res) {
  return function(req, res) {
    const householdId = uniqid.time()
    var household = new Household()
    household.shortId = householdId
    household.users = [req.body.id]

    household.save(function(err) {
      if (err) res.send(err)
      res.json({ message: 'Household added successfully.', id: householdId })
    })
  }
}

exports.getOneHousehold = function(req, res) {
  return function(req, res) {
    res.send('get one household')
  }
}