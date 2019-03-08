import {
  createAPIMiddleware,
  defaultTransformers,
  composeAdapters,
} from 'redux-api-call';
import customAdapter from './customAdapter';

const transformers = [...defaultTransformers];

const apiMiddleware = createAPIMiddleware(
  composeAdapters(customAdapter, ...transformers),
);

export default apiMiddleware;
