var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var householdSchema = new Schema(
  {
    users: [String],
    shortId: String
  }, {
    collection: 'households',
  }
);

module.exports = mongoose.model('Households', householdSchema);