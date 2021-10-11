const userRepository = require('./user');
const markerRepository = require('./marker');

module.exports = {
  user: userRepository,
  marker: markerRepository,
};
