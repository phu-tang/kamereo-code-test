import { combineEpics } from 'redux-observable';
import uploadEpic from './uploadEpic';
import storeEpic from './storeEpic';

export default combineEpics(uploadEpic, storeEpic);
