const _ = require('lodash');
const token = require('../utils/token');
const encryption = require('../utils/encryption');
const repository = require('../repository');

exports.loginMw = async (req, res) => {
  try {
    const user = await repository.user.findOne({ email: req.body.email });

    if (!user) return res.status(404).json({ message: 'User not found!' });

    const isMatch = await encryption.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Wrong password!' });

    console.log(_.pick(user, ['id']));

    const accessToken = token.signAccessToken(_.pick(user, ['id']));
    const refreshToken = token.signRefreshToken(_.pick(user, ['id']));

    return res.json({ token: accessToken, refreh: refreshToken, id: user.id });
  } catch (err) {
    return res.status(400).json({ message: 'Wrong credentials!' });
  }
};

exports.generateNewTokenMw = async (req, res) => {
  try {
    if (!req.headers.refreshtoken) return res.status(401);
    const refreshHeader = req.headers.refreshtoken;
    const refreshToken = refreshHeader && refreshHeader.split(' ')[1];

    token.verifyRefreshToken(refreshToken, async (err, payload) => {
      if (err) return res.status(401).json({ message: 'Unauthorized' });

      const { id } = payload;

      const accessToken = token.signAccessToken({ id });
      const refreshToken = token.signRefreshToken({ id });

      return res.json({
        token: accessToken,
        refreh: refreshToken,
        id,
      });
    });
  } catch (err) {
    return res.status(401);
  }
};
