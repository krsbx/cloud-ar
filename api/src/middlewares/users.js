const _ = require('lodash');
const repository = require('../repository');
const { USER_ROLE } = require('../utils/constant');
const token = require('../utils/token');

exports.authMw = async (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(401);

    const authorizationHeader = req.headers.authorization;

    const accessToken =
      authorizationHeader && authorizationHeader.split(' ')[1];

    token.verifyAccessToken(accessToken, async (err, payload) => {
      if (err) return res.status(401).json({ message: 'Unauthorized' });
      req.userAuth = await repository.user.findOne(payload.id);

      return next();
    });
  } catch (err) {
    return res.status(401);
  }
};

exports.getUserMw = async (req, res, next) => {
  try {
    const { userAuth } = req;

    if (userAuth.roles !== USER_ROLE.ADMIN && userAuth.id !== req.params.id)
      return res.status(401).json({ message: 'Unauthorized!' });

    const user = await repository.user.findOne(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found!' });

    req.user = user;

    return next();
  } catch (err) {
    next(err);
  }
};

exports.getUsersMw = async (req, res, next) => {
  try {
    const { userAuth } = req;

    if (userAuth.roles !== USER_ROLE.ADMIN)
      return res.status(401).json({ message: 'Unauthorized!' });

    const users = await repository.user.findAll(
      {},
      req.filterQueryParams,
      req.query
    );

    if (!users) return res.status(400).json({ message: 'Wrong request!' });

    req.users = users;

    return next();
  } catch (err) {
    next(err);
  }
};

exports.checkUserAccessMw = async (req, res, next) => {
  if (req.role !== USER_ROLE.ADMIN)
    return res.status(401).json({ message: 'Unauthorized!' });

  return next();
};

exports.createUserMw = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: 'Email and password are needed!' });

    const exist = await repository.user.findOne({ where: { email: email } });
    if (!exist)
      return res.status(400).json({ message: 'Email already in use!' });

    const data = await repository.user.resourceToModel(req.body);
    req.user = await repository.user.create(data);

    return next();
  } catch (err) {
    next(err);
  }
};

exports.updateUserMw = async (req, res, next) => {
  try {
    const { user } = req;

    if (req.body.email) {
      const exist = await repository.user.findOne({ email: req.body.email });

      if (exist && exist.id !== user.id)
        return res.status(400).json({ message: 'Email already in use!' });
    }

    const updateUser = await repository.user.resourceToModel(req.body);

    await repository.user.update(user.id, updateUser);

    return next();
  } catch (err) {
    next(err);
  }
};

exports.returnUserMw = async (req, res) => {
  return res.json(await repository.user.modelToResource(req.user));
};

exports.returnUsersMw = async (req, res) => {
  const users = await Promise.all(
    _.map(req.users, (user) => repository.user.modelToResource(user))
  );

  return res.json(users);
};
