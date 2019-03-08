import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Snackbar from '@material-ui/core/Snackbar';
import {
  shouldShowNotificationSelector,
  lastNotificationMessagesSelector,
  hideNotification,
} from './state';

const mapStateToProps = createSelector(
  shouldShowNotificationSelector,
  lastNotificationMessagesSelector,
  (shouldShowNotification, notification) => ({
    shouldShowNotification,
    ...notification,
  }),
);

const mapDispatchToProps = dispatch => ({
  requestTurnOffNotification: () => dispatch(hideNotification()),
  dispatch,
});

const mergeProps = (state, { dispatch, ...actions }, own) => ({
  ...state,
  ...own,
  ...actions,
  applyAction: () => dispatch(state.action),
});

const connectToRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
);

const Notification = ({
  shouldShowNotification,
  message,
  label,
  applyAction,
  requestTurnOffNotification,
}) => (
  <Snackbar
    open={shouldShowNotification}
    message={message}
    action={label}
    autoHideDuration={1500}
    onClose={requestTurnOffNotification}
  />
);

export default connectToRedux(Notification);
