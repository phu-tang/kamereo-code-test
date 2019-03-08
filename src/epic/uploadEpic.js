import { ACTIONS } from 'redux-api-call';
import { path, flow } from 'lodash/fp';
import { combineEpics } from 'redux-observable';
import { map, filter } from 'rxjs/operators';

const nofifyWhenUpdateComplete = action$ =>
  action$.pipe(
    filter(
      ({ type, payload }) =>
        type === ACTIONS.COMPLETE && payload.name === 'updateLoadImage',
    ),
    map(({ payload }) => {
      const imageURL = flow(path('json.url'))(payload);
      console.log(imageURL);
      if (path('transforms.fn', payload)) {
        const fn = path('transforms.fn', payload);
        return fn(imageURL);
      } else {
        return { type: 'uploaded', payload };
      }
    }),
  );

export default combineEpics(nofifyWhenUpdateComplete);
