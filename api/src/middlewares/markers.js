const _ = require('lodash');
const repository = require('../repository');

exports.getMarkerMw = async (req, res, next) => {
  try {
    const marker = await repository.marker.findOne(req.params.id);
    if (!marker) return res.status(404).json({ message: 'Marker not found!' });

    req.marker = marker;

    return next();
  } catch (err) {
    next(err);
  }
};

exports.getMarkersMw = async (req, res, next) => {
  try {
    const markers = await repository.marker.findAll(
      {},
      req.filterQueryParams,
      req.query
    );

    req.markers = markers;

    return next();
  } catch (err) {
    next(err);
  }
};

exports.createMarkerMw = async (req, res, next) => {
  try {
    const { name, marker } = req.body;

    if (!name || !marker)
      return res.status(400).json({ message: 'Name and marker are needed!' });

    const data = await repository.marker.resourceToModel(req.body);
    req.marker = data;

    return next();
  } catch (err) {
    next(err);
  }
};

exports.updateMarkerMw = async (req, res, next) => {
  try {
    const { marker } = req;

    const udpateMarker = await repository.marker.resourceToModel(req.body);

    await repository.user.update(marker.id, udpateMarker);

    return next();
  } catch (err) {
    next(err);
  }
};

exports.deleteMarkerMw = async (req, res, next) => {
  try {
    await repository.marker.delete(req.params.id);

    return res.status(201).json({ message: 'Marker deleted successfully!' });
  } catch (err) {
    next(err);
  }
};

exports.returnMarkerMw = async (req, res) => {
  return res.json(await repository.marker.modelToResource(req.marker));
};

exports.returnMarkersMw = async (req, res) => {
  const markers = await Promise.all(
    _.map(req.markers, (marker) => repository.marker.modelToResource(marker))
  );

  return res.json(markers);
};
