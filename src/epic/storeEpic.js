import { ACTIONS } from 'redux-api-call';
import { path, flow } from 'lodash/fp';
import { combineEpics } from 'redux-observable';
import { map, filter } from 'rxjs/operators';
import { showNotification } from '../component/notification/state';
import { getStoreInfoAC } from '../component/profile/state';

const notifyAndRefreshStoreInfoWhenUpdateSuccess = action$ =>
  action$.pipe(
    filter(
      ({ type, payload }) =>
        type === ACTIONS.COMPLETE && payload.name === 'updateStoreInfo',
    ),
    map(({ payload }) => [
      showNotification('Update Store successful'),
      getStoreInfoAC(),
    ]),
  );

const notifyWhenUpdateStoreInfoFail = action$ =>
  action$.pipe(
    filter(
      ({ type, payload }) =>
        type === ACTIONS.FAILURE && payload.name === 'updateStoreInfo',
    ),
    map(({ payload }) => showNotification('Update Store fail')),
  );
export default combineEpics(
  notifyAndRefreshStoreInfoWhenUpdateSuccess,
  notifyWhenUpdateStoreInfoFail,
);
