const users = require('./routes/users')
const households = require('./routes/households')

module.exports = function(app) {

  // users
  app.get('/users', users.getAllUsers()) // works
  app.post('/users/create', users.createUser())
  app.put('/users/update', users.updateUser())
  app.get('/users/:id', users.getOneUser()) // testing

  // households
  app.get('/households', households.getAllHouseholds())
  app.post('/households/create', households.createHousehold())
  app.get('/households/:id', households.getOneHousehold())
}