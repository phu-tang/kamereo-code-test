import { always } from 'lodash/fp';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducers as apiCalls } from 'redux-api-call';
import storeInfo from '../component/profile/state';
import notification from '../component/notification/state';

const VERSION = process.env.REACT_APP_VERSION || 'DEVELOPMENT';

export default combineReducers({
  version: always(VERSION),
  form: formReducer,
  ...storeInfo,
  ...notification,
  ...apiCalls,
});
