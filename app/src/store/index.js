import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';
import { interceptResponse } from '../utils/axios';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers(reducers);

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);

interceptResponse(store.dispatch, store.getState);
export default store;
