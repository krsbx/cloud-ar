const router = require('express').Router();
const user = require('../middlewares/users');
const marker = require('../middlewares/markers');

router.get('/', marker.getMarkersMw, marker.returnMarkersMw);
router.get('/:id', marker.getMarkerMw, marker.returnMarkerMw);
router.post(
  '/',
  user.authMw,
  user.checkUserAccessMw,
  marker.createMarkerMw,
  marker.returnMarkerMw
);
router.patch(
  '/:id',
  user.authMw,
  user.checkUserAccessMw,
  marker.getMarkerMw,
  marker.updateMarkerMw,
  marker.getMarkerMw,
  marker.returnMarkerMw
);
router.delete(
  '/:id',
  user.authMw,
  user.checkUserAccessMw,
  marker.deleteMarkerMw
);

module.exports = router;
