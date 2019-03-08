import { combineReducers } from 'redux';
import { always } from 'lodash/fp';

const EMPTY_MESSAGE = { message: '' };

// SELECTORS
export const lastNotificationMessagesSelector = state =>
  state.notification.lastNotificationMessage;

export const shouldShowNotificationSelector = state =>
  state.notification.lastNotificationMessage !== EMPTY_MESSAGE;

// ACTIONS
const TURN_OFF_NOTIFICATIONS = 'card/actions/TURN_OFF_NOTIFICATIONS';
const TURN_ON_NOTIFICATIONS = 'card/actions/TURN_ON_NOTIFICATIONS';

// ACTION CREATORS
export const hideNotification = always({
  type: TURN_OFF_NOTIFICATIONS,
});

export const showNotification = message => ({
  type: TURN_ON_NOTIFICATIONS,
  payload: { message },
});

export const showNotificationWithAction = (message, label, action) => ({
  type: TURN_ON_NOTIFICATIONS,
  payload: {
    message,
    label,
    action,
  },
});

// REDUCERS
const lastNotificationMessage = (state = EMPTY_MESSAGE, { type, payload }) => {
  if (type === TURN_OFF_NOTIFICATIONS) {
    return EMPTY_MESSAGE;
  }

  if (type === TURN_ON_NOTIFICATIONS) {
    return payload;
  }

  return state;
};

const reducers = combineReducers({
  lastNotificationMessage,
});

export default { notification: reducers };
