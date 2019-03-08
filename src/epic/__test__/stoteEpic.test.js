import { combineEpics, createEpicMiddleware } from 'redux-observable';
import configureMockStore from 'redux-mock-store';
import { find, path } from 'lodash/fp';
import arrayMiddleware from '../../state/middleware/arrayMiddleware';
import rootEpic from '../index';
import { ACTIONS, middleware } from 'redux-api-call';
import { TURN_ON_NOTIFICATIONS } from '../../component/notification/state';

describe('Store epic', () => {
  it('dispatchs show notification action when update store error', () => {
    const epicMiddleware = createEpicMiddleware();

    const createMockStore = configureMockStore([
      arrayMiddleware,
      epicMiddleware,
    ]);

    const store = createMockStore({});
    epicMiddleware.run(rootEpic);
    store.dispatch({
      type: ACTIONS.FAILURE,
      payload: {
        name: 'updateStoreInfo',
      },
    });

    const notificationAction = find(
      action => path('type', action) === TURN_ON_NOTIFICATIONS,
      store.getActions(),
    );
    expect(notificationAction).toBeDefined();
    expect(notificationAction.payload.message).toEqual('Update Store fail');
  });

  it('dispatchs show notification action when update store success ', () => {
    const epicMiddleware = createEpicMiddleware();
    const createMockStore = configureMockStore([
      arrayMiddleware,
      epicMiddleware,
    ]);

    const store = createMockStore({});
    epicMiddleware.run(rootEpic);
    store.dispatch({
      type: ACTIONS.COMPLETE,
      payload: {
        name: 'updateStoreInfo',
      },
    });

    const notificationAction = find(
      action => path('type', action) === TURN_ON_NOTIFICATIONS,
      store.getActions(),
    );
    expect(notificationAction).toBeDefined();
    expect(notificationAction.payload.message).toEqual(
      'Update Store successful',
    );
  });

  it('dispatchs get store info action when update store success', () => {
    const epicMiddleware = createEpicMiddleware();
    const createMockStore = configureMockStore([
      arrayMiddleware,
      epicMiddleware,
      middleware,
    ]);

    const store = createMockStore({});
    epicMiddleware.run(rootEpic);
    store.dispatch({
      type: ACTIONS.COMPLETE,
      payload: {
        name: 'updateStoreInfo',
      },
    });

    const notificationAction = find(
      action =>
        path('type', action) === ACTIONS.START &&
        path('payload.name', action) === 'storeInfo',
      store.getActions(),
    );
    expect(notificationAction).toBeDefined();
  });
});
