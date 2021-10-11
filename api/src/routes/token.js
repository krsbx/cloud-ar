const router = require('express').Router();
const token = require('../middlewares/token');

router.post('/', token.loginMw);
router.post('/refresh', token.generateNewTokenMw);

module.exports = router;
