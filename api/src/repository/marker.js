const _ = require('lodash');
const { factory } = require('./baseRepository');
const { Marker } = require('../models');

const markerRepository = factory(Marker);

markerRepository.resourceToModel = async (resource) => {
  const model = _.pick(resource, ['name', 'width', 'marker', 'metadata']);

  return model;
};

markerRepository.modelToResource = async (model) => {
  const resource = model.toJSON();

  return _.omit(resource, ['createdAt', 'updatedAt']);
};

module.exports = markerRepository;
