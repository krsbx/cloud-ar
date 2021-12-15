import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';
import { applyInterceptors } from 'utils/axios';

const composeEnhancers = // @ts-ignore
  (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const rootReducers = combineReducers(reducers);

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);

applyInterceptors(store.dispatch);

export default store;

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducers>;
