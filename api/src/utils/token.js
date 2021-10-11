const jwtToken = require('jsonwebtoken');

const jwtSecret = process.env.JWT_TOKEN_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

module.exports = {
  signAccessToken: (payload) =>
    jwtToken.sign(payload, jwtSecret, { expiresIn: '2m' }),
  verifyAccessToken: (token, onComplete) =>
    jwtToken.verify(token, jwtSecret, onComplete),
  signRefreshToken: (payload) =>
    jwtToken.sign(payload, refreshSecret, { expiresIn: '3h' }),
  verifyRefreshToken: (token, onComplete) =>
    jwtToken.verify(token, refreshSecret, onComplete),
};
