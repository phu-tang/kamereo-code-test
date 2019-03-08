import { path, random } from 'lodash/fp';

export default (next, getState) => async req => {
  if (path('isMock', req)) {
    return await mockAPI(req);
  }
  return await next(req);
};

const sleep = ms =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

const mockAPI = async req => {
  if (path('name', req) === 'storeInfo') {
    await sleep(2000);
    return {
      payload: {
        id: 'string',
        logoUrl:
          'https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/14329896_1116689881733983_4796294319376042370_n.jpg?_nc_cat=1&_nc_oc=AQleT_lkfEuVw5En07i57--63cGEm1IflU02jCQ1iqps0GmWQX5wcV3KoFEiEWBOnds&_nc_ht=scontent.fsgn2-3.fna&oh=ab5aaed42c9a82c4dcdb5fb0fcd67492&oe=5D1A9187',
        name: 'string',
        address: 'string',
        district: '1',
        city: 'TP HCM',
        phone: 'string',
        redInvoice: {
          name: 'string',
          address: 'string',
          district: '3',
          city: 'TP HCM',
          taxCode: 'string',
        },
      },
    };
  }
  if (path('name', req) === 'updateStoreInfo') {
    await sleep(2000);
    const isSuccess = random(0, 1);
    if (isSuccess === 1) {
      return { payload: { success: true } };
    } else {
      throw { payload: { success: false } };
    }
  }
};
