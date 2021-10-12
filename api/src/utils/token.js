const jwtToken = require('jsonwebtoken');

const jwtSecret = process.env.JWT_TOKEN_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

exports.signAccessToken = (payload) =>
  jwtToken.sign(payload, jwtSecret, { expiresIn: '2m' });

exports.verifyAccessToken = (token, onComplete) =>
  jwtToken.verify(token, jwtSecret, onComplete);

exports.signRefreshToken = (payload) =>
  jwtToken.sign(payload, refreshSecret, { expiresIn: '3h' });

exports.verifyRefreshToken = (token, onComplete) =>
  jwtToken.verify(token, refreshSecret, onComplete);

exports.generateToken = (payload) => ({
  accessToken: exports.signAccessToken(payload),
  refreshToken: exports.signRefreshToken(payload),
});
