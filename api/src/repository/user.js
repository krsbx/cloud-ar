const _ = require('lodash');
const { factory } = require('./baseRepository');
const { User } = require('../models');
const { hashText } = require('../utils/encryption');

const userRepository = factory(User);

userRepository.resourceToModel = async (resource) => {
  // hash password/passcode if available
  const model = _.pick(resource, ['email', 'firstName', 'lastName', 'avatar']);
  if (resource.password) {
    model.password = await hashText(resource.password);
  }

  return model;
};

userRepository.modelToResource = async (model) => {
  const resource = model.toJSON();
  return _.omit(resource, ['password', 'createdAt', 'updatedAt']);
};

module.exports = userRepository;
