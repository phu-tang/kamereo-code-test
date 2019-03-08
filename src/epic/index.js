import { combineEpics } from 'redux-observable';
import uploadEpic from './uploadEpic';

export default combineEpics(uploadEpic);
