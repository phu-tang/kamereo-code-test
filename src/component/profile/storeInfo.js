import React from 'react';
import { connect } from 'react-redux';
import { CircularProgress, Card, Button } from '@material-ui/core';
import { compose, lifecycle, branch, renderComponent } from 'recompose';

import {
  isFetchingStoreInfoSelector,
  getStoreInfoByKeyItemSelector,
  getRedInvoceInfoByKeyItemSelector,
  getStoreInfoAC,
  openDialogAC,
} from './state';

const Layout = ({
  logoUrl,
  name,
  address,
  phone,
  companyName,
  companyAddress,
  taxCode,
  openDialog,
}) => (
  <div align="center">
    <Card style={{ width: 400, padding: 10 }}>
      <div>
        <img src={logoUrl} style={{ width: '100%' }} alt="logoUrl" />
        <div align="left">
          <h3>STORE INFO.</h3>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, color: '#E8EBF2', minWidth: 125 }}>
              Name:
            </div>
            <div style={{ flex: 3, color: 'black' }}>{name}</div>
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, color: '#E8EBF2', minWidth: 125 }}>
              Address:
            </div>
            <div style={{ flex: 3, color: 'black' }}>{address}</div>
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, color: '#E8EBF2', minWidth: 125 }}>
              Phone #:
            </div>
            <div style={{ flex: 3, color: 'black' }}>{phone}</div>
          </div>
        </div>

        <div align="left">
          <h3>RED INVOICE INFO.</h3>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, color: '#E8EBF2', minWidth: 125 }}>
              Company Name:
            </div>
            <div style={{ flex: 3, color: 'black' }}>{companyName}</div>
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, color: '#E8EBF2', minWidth: 125 }}>
              Address:
            </div>
            <div style={{ flex: 3, color: 'black' }}>{companyAddress}</div>
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, color: '#E8EBF2', minWidth: 125 }}>MST:</div>
            <div style={{ flex: 3, color: 'black' }}>{taxCode}</div>
          </div>
        </div>
        <Button
          variant="contained"
          style={{ width: '100%', marginTop: 18 }}
          onClick={openDialog}
        >
          Edit Profile
        </Button>
      </div>
    </Card>
  </div>
);

export default compose(
  connect(
    state => ({
      isFetching: isFetchingStoreInfoSelector(state),
      logoUrl: getStoreInfoByKeyItemSelector('logoUrl')(state),
      name: getStoreInfoByKeyItemSelector('name')(state),
      address: getStoreInfoByKeyItemSelector('address')(state),
      phone: getStoreInfoByKeyItemSelector('phone')(state),

      companyName: getRedInvoceInfoByKeyItemSelector('name')(state),
      companyAddress: getRedInvoceInfoByKeyItemSelector('address')(state),
      taxCode: getRedInvoceInfoByKeyItemSelector('taxCode')(state),
    }),
    { getStoreInfo: getStoreInfoAC, openDialog: openDialogAC },
  ),
  lifecycle({
    componentDidMount() {
      this.props.getStoreInfo();
    },
  }),
  branch(
    ({ isFetching }) => isFetching,
    renderComponent(() => <CircularProgress size={40} thickness={7} />),
  ),
)(Layout);
