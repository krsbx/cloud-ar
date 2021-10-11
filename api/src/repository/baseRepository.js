const _ = require('lodash');
const { Op, Sequelize } = require('sequelize');
const moment = require('moment');

exports.findAll =
  (model) =>
  (conditions, filterQueryParams = {}, options = {}) => {
    const limit = +(options.limit === 'all' ? 0 : _.get(options, 'limit', 10));
    const offset =
      options.page && options.page > 0 ? limit * (options.page - 1) : 0;
    const otherOptions = _.omit(options, ['limit', 'offset']);

    // translate filterQueryParams to sequelize conditions
    // only works for AND condition for now
    const rules = [];
    _.forEach(filterQueryParams.rules, ({ field, operator, value }) => {
      let sequelizeOp = null;
      let sequelizeValue = value;
      switch (operator) {
        case '=':
          sequelizeOp = Op.eq;
          break;
        case '>':
          sequelizeOp = Op.gt;
          break;
        case '<':
          sequelizeOp = Op.lt;
          break;
        case '>=':
          sequelizeOp = Op.gte;
          break;
        case '<=':
          sequelizeOp = Op.lte;
          break;
        case 'CONTAINS':
          sequelizeOp = Op.like;
          sequelizeValue = `%${value}%`;
          break;
        case 'IN':
          sequelizeOp = Op.in;
          break;
        default:
          sequelizeOp = operator;
      }

      // Need to wrap the value with DATE() function if want to compare date using YYYY-MM-DD format
      if (moment(sequelizeValue, 'YYYY-MM-DD', true).isValid()) {
        rules.push(
          Sequelize.where(
            Sequelize.fn('Date', Sequelize.col(field)),
            sequelizeOp,
            sequelizeValue
          )
        );
      } else {
        rules.push({
          [field]: { [sequelizeOp]: sequelizeValue },
        });
      }
    });

    const where = { ...conditions };
    if (where[Op.and]) {
      where[Op.and] = [...where[Op.and], ...rules];
    } else {
      where[Op.and] = rules;
    }

    return model.findAll({
      where,
      ...(limit === 0 ? {} : { limit }),
      offset,
      ...otherOptions,
    });
  };

exports.create = (model) => (data) => model.create(data);

exports.update = (model) => (conditions) => {
  const dbCond = _.isObject(conditions) ? conditions : { id: conditions };

  return model.update(data, { where: dbCond });
};

exports.delete = (model) => (conditions) => {
  const dbCond = _.isObject(conditions) ? conditions : { id: conditions };

  return model.destroy({ where: dbCond });
};

exports.findOne = (model) => (conditions) => {
  const dbCond = _.isObject(conditions) ? conditions : { id: conditions };

  return model.findOne({ where: dbCond });
};

exports.modelToResource = async (model) => model;

exports.resourceToModel = async (resource) => resource;

exports.factory = (model) => ({
  findAll: exports.findAll(model),
  findOne: exports.findOne(model),
  create: exports.create(model),
  update: exports.update(model),
  delete: exports.delete(model),
  modelToResource: exports.modelToResource,
  resourceToModel: exports.resourceToModel,
});
