var uniqid = require('uniqid');
var Household = require('./householdModel');

exports.post = function(req, res) {
  const householdId = uniqid.time();
  var household = new Household();
  household.shortId = householdId;
  household.users = [req.body.id];
  console.log(household);
  console.log(req.body);

  household.save(function(err) {
    if (err) res.send(err);
    res.json({ message: 'Household added successfully.', id: householdId });
  })
}