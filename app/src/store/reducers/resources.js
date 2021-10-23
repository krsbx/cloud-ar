import _ from 'lodash';
import { combineReducers } from 'redux';

export const RESOURCE_NAME = {
  USERS: 'users',
  MARKERS: 'markers',
  STORAGE: 'storage',
};

const reducer =
  (resourceName) =>
  (state = {}, action) => {
    const resourcePath = `resources.${resourceName}`;

    let temp = {};

    switch (action.type) {
      case `${resourcePath}.set`:
        const data = _.isArray(action.payload)
          ? action.payload
          : [action.payload];

        return {
          ...state,
          ..._.keyBy(data, 'id'),
        };
      case `${resourcePath}.update`:
        return {
          ...state,
          [action.payload.id]: {
            ..._.cloneDeep(state[action.payload.id]),
            ...action.payload.data,
          },
        };
      case `${resourcePath}.overwrite`:
        const data1 = _.isArray(action.payload)
          ? action.payload
          : [action.payload];
        return {
          ..._.keyBy(data1, 'id'),
        };
      case `${resourcePath}.delete`:
        temp = _.cloneDeep(state);
        delete temp[action.payload.id];
        return temp;
      default:
        return state;
    }
  };

const allReducers = {};

for (let r in RESOURCE_NAME) {
  allReducers[RESOURCE_NAME[r]] = reducer(RESOURCE_NAME[r]);
}

export default combineReducers(allReducers);
