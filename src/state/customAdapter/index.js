import { isMock } from '../../config';

export default (next, getState) => async req => {
  if (isMock) {
    ///
  }
  return await next(req);
};
