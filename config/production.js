var shh = require('./shh');

module.exports = {
  logging: false,
  seed: false,
  db: {
    url: shh.db.url.production,
  },
};
