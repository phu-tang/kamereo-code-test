import {
  dialogReducer,
  openDialogAC,
  closeDialogAC,
  isOpenDialogSelector,
  getStoreInfoByKeyItemSelector,
  getRedInvoceInfoByKeyItemSelector,
  getStoreDataWithoutRedInvoice,
} from '../state';

describe('dialog reducer', () => {
  it('returns the payload when receive Toogle dialog action', () => {
    const state = null;
    const action = { type: 'TOGGLE_DIALOG', payload: true };
    const result = dialogReducer(state, action);
    expect(result).toEqual(true);
  });
});

describe('openDialogAC', () => {
  it('returns correct action', () => {
    const result = openDialogAC();
    expect(result.type).toEqual('TOGGLE_DIALOG');
    expect(result.payload).toEqual(true);
  });
});

describe('closeDialogAC', () => {
  it('returns correct action', () => {
    const result = closeDialogAC();
    expect(result.type).toEqual('TOGGLE_DIALOG');
    expect(result.payload).toEqual(false);
  });
});

describe('isOpenDialogSelector', () => {
  it('returns value that can show dialog or not', () => {
    const state = {
      storeInfo: {
        isOpenDialog: true,
      },
    };
    const result = isOpenDialogSelector(state);
    expect(result).toEqual(true);
  });
});

describe('selector from api', () => {
  const state = {
    api_calls: {
      storeInfo: {
        data: {
          id: 'string',
          logoUrl:
            'https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/14329896_1116689881733983_4796294319376042370_n.jpg?_nc_cat=1&_nc_oc=AQleT_lkfEuVw5En07i57--63cGEm1IflU02jCQ1iqps0GmWQX5wcV3KoFEiEWBOnds&_nc_ht=scontent.fsgn2-3.fna&oh=ab5aaed42c9a82c4dcdb5fb0fcd67492&oe=5D1A9187',
          name: 'string1',
          address: 'string2',
          district: '1',
          city: 'TP HCM',
          phone: 'string3',
          redInvoice: {
            name: 'string4',
            address: 'string5',
            district: '3',
            city: 'TP HCM',
            taxCode: 'string6',
          },
        },
      },
    },
  };
  describe('getStoreInfoByKeyItemSelector', () => {
    it('returns the item with key input', () => {
      const result = getStoreInfoByKeyItemSelector('name')(state);
      expect(result).toEqual('string1');
    });
    it('returns the undefined with wrong key input', () => {
      const result = getStoreInfoByKeyItemSelector('name1')(state);
      expect(result).toEqual(undefined);
    });
  });

  describe('getRedInvoceInfoByKeyItemSelector', () => {
    it('returns the item in RedInvoice with key input', () => {
      const result = getRedInvoceInfoByKeyItemSelector('name')(state);
      expect(result).toEqual('string4');
    });
    it('returns the undefined with wrong key input', () => {
      const result = getRedInvoceInfoByKeyItemSelector('name1')(state);
      expect(result).toEqual(undefined);
    });
  });

  describe('getStoreDataWithoutRedInvoice', () => {
    it('returns the object without RedInvoice', () => {
      const result = getStoreDataWithoutRedInvoice(state);
      expect(result).toEqual({
        id: 'string',
        logoUrl:
          'https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/14329896_1116689881733983_4796294319376042370_n.jpg?_nc_cat=1&_nc_oc=AQleT_lkfEuVw5En07i57--63cGEm1IflU02jCQ1iqps0GmWQX5wcV3KoFEiEWBOnds&_nc_ht=scontent.fsgn2-3.fna&oh=ab5aaed42c9a82c4dcdb5fb0fcd67492&oe=5D1A9187',
        name: 'string1',
        address: 'string2',
        district: '1',
        city: 'TP HCM',
        phone: 'string3',
      });
    });
  });
});
