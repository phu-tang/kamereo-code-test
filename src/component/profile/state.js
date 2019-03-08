import { makeFetchAction } from 'redux-api-call';
import { combineReducers } from 'redux';
import { getFormValues } from 'redux-form';
import { path, flow, always, omit } from 'lodash/fp';

export const {
  actionCreator: getStoreInfoAC,
  isFetchingSelector: isFetchingStoreInfoSelector,
  dataSelector: storeInfoSelector,
} = makeFetchAction('storeInfo', () => ({
  endpoint: 'http://localhost',
  isMock: true,
}));

export const {
  actionCreator: updateStoreAC,
  isFetchingSelector: isUpdatingStoreSelector,
} = makeFetchAction('updateStoreInfo', () => ({
  endpoint: 'http://localhost',
  isMock: true,
  method: 'POST',
  body: state =>
    flow(
      storeObjectForUpdate,
      JSON.stringify,
    )(state),
}));

export const isOpenDialogSelector = path('storeInfo.isOpenDialog');

const storeObjectForUpdate = flow(
  getFormValues('updateStore'),
  item => ({
    id: path('id', item),
    logoUrl: path('logoUrl', item),
    name: path('name', item),
    address: path('address', item),
    district: path('district', item),
    city: path('city', item),
    phone: path('phone', item),
    redInvoice: {
      name: path('companyName', item),
      address: path('companyAddress', item),
      district: path('companyDistrict', item),
      city: path('companyCity', item),
      taxCode: path('taxCode', item),
    },
  }),
);

export const getStoreInfoByKeyItemSelector = key =>
  flow(
    storeInfoSelector,
    path(key),
  );

export const getRedInvoceInfoByKeyItemSelector = key =>
  flow(
    storeInfoSelector,
    path('redInvoice'),
    path(key),
  );

export const getStoreDataWithoutRedInvoice = flow(
  storeInfoSelector,
  omit('redInvoice'),
);

const TOGGLE_DIALOG = 'TOGGLE_DIALOG';

export const openDialogAC = always({
  type: TOGGLE_DIALOG,
  payload: true,
});

export const closeDialogAC = always({
  type: TOGGLE_DIALOG,
  payload: false,
});

const dialogReducer = (state = false, { type, payload }) => {
  if (type === TOGGLE_DIALOG) {
    return payload;
  }
  return state;
};

const reducer = combineReducers({
  isOpenDialog: dialogReducer,
});

export default { storeInfo: reducer };
