import { applyMiddleware, createStore, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { compact } from 'lodash/fp';
import rootEpic from '../epic';
import rootReducer from './rootReducer';
import arrayMiddleware from './middleware/arrayMiddleware';
import emptyMiddleware from './middleware/emptyMiddleware';
import apiMiddleware from './api';

const epicMiddleware = createEpicMiddleware();

const enhancers = compact([
  applyMiddleware(
    emptyMiddleware,
    arrayMiddleware,
    apiMiddleware,
    epicMiddleware,
  ),
  // autoRehydrate(),
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
]);

export default () => {
  const store = createStore(rootReducer, {}, compose(...enhancers));
  epicMiddleware.run(rootEpic);

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      // eslint-disable-next-line global-require
      const nextReducer = require('./rootReducer').default;
      console.log('nextReducer', nextReducer);
      store.replaceReducer(nextReducer());
    });
  }

  return store;
};
