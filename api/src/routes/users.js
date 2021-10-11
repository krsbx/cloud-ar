const router = require('express').Router();
const user = require('../middlewares/users');
const token = require('../middlewares/token');

router.get('/', user.authMw, user.getUsersMw, user.returnUsersMw);
router.get('/:id', user.authMw, user.getUserMw, user.returnUserMw);
router.post('/login', token.loginMw);
router.post(
  '/',
  user.authMw,
  user.checkUserAccessMw,
  user.createUserMw,
  user.returnUserMw
);
router.patch(
  '/:id',
  user.authMw,
  user.getUserMw,
  user.updateUserMw,
  user.getUserMw,
  user.returnUserMw
);

module.exports = router;
