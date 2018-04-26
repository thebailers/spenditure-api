var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var householdSchema = new Schema(
    {
      users: [String],
    }, {
      collection: 'households',
    }
);

module.exports = mongoose.model('Housholds', householdSchema);