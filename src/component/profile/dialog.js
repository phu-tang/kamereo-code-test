import React from 'react';
import {
  Field,
  reduxForm,
  change,
  getFormValues,
  getFormInitialValues,
} from 'redux-form';
import { map, flow, path } from 'lodash/fp';
import { TextField, Select } from 'redux-form-material-ui';
import {
  Dialog,
  InputLabel,
  FormControl,
  MenuItem,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { compose, branch, renderNothing, renderComponent } from 'recompose';
import { connect } from 'react-redux';
import Profile from '../uploadAvatar';
import dataProince from '../../config/province.json';
import dataDistrict from '../../config/district.json';
import {
  isOpenDialogSelector,
  closeDialogAC,
  getStoreDataWithoutRedInvoice,
  getRedInvoceInfoByKeyItemSelector,
  updateStoreAC,
  isUpdatingStoreSelector,
} from './state';

const Layout = ({ isOpen, onClose, image, changeUrl, origin }) => (
  <Dialog fullWidth maxWidth={'xl'} open={isOpen} onClose={onClose}>
    <div style={{ display: 'flex' }}>
      <div style={{ padding: 10 }}>
        <h3>Store Image</h3>

        <Profile
          image={image}
          notify={url => change('updateStore', 'logoUrl', url)}
          reset={() => changeUrl('updateStore', 'logoUrl', origin)}
        />
      </div>
      <div style={{ flex: 1, padding: 10 }}>
        <h3>Basic Info</h3>
        <Field
          name={'name'}
          component={TextField}
          fullWidth
          label={'Store Name'}
          margin="normal"
        />
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 2 }}>
            <Field
              name={'address'}
              component={TextField}
              fullWidth
              label={'Store Address'}
              margin="normal"
            />
          </div>

          <div style={{ paddingTop: 16, marginLeft: 5, marginRight: 5 }}>
            <FormControl>
              <InputLabel htmlFor="demo-controlled-open-select">
                District
              </InputLabel>
              <Field
                style={{ width: 150 }}
                name={'district'}
                component={Select}
                label={'District'}
                placeHolder={'District'}
                margin="normal"
              >
                {map(
                  item => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ),
                  dataDistrict,
                )}
              </Field>
            </FormControl>
          </div>
          <div style={{ paddingTop: 16, marginLeft: 5, marginRight: 5 }}>
            <FormControl>
              <InputLabel htmlFor="demo-controlled-open-select">
                City
              </InputLabel>
              <Field
                style={{ width: 150 }}
                name={'city'}
                component={Select}
                label={'City'}
                placeHolder={'City'}
                margin="normal"
              >
                {map(
                  item => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ),
                  dataProince,
                )}
              </Field>
            </FormControl>
          </div>
        </div>
        <Field
          name={'phone'}
          component={TextField}
          fullWidth
          label={'Phone #'}
          margin="normal"
        />
        <h3>Red invoice Info.</h3>

        <Field
          name={'companyName'}
          component={TextField}
          fullWidth
          label={'Company Name'}
          margin="normal"
        />
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 2 }}>
            <Field
              name={'companyAddress'}
              component={TextField}
              fullWidth
              label={'Company Address'}
              margin="normal"
            />
          </div>

          <div style={{ paddingTop: 16, marginLeft: 5, marginRight: 5 }}>
            <FormControl>
              <InputLabel htmlFor="demo-controlled-open-select">
                District
              </InputLabel>
              <Field
                style={{ width: 150 }}
                name={'companyDistrict'}
                component={Select}
                label={'District'}
                placeHolder={'District'}
                margin="normal"
              >
                {map(
                  item => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ),
                  dataDistrict,
                )}
              </Field>
            </FormControl>
          </div>
          <div style={{ paddingTop: 16, marginLeft: 5, marginRight: 5 }}>
            <FormControl>
              <InputLabel htmlFor="demo-controlled-open-select">
                City
              </InputLabel>
              <Field
                style={{ width: 150 }}
                name={'companyCity'}
                component={Select}
                label={'City'}
                fullWidth
                placeHolder={'City'}
                margin="normal"
              >
                {map(
                  item => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ),
                  dataProince,
                )}
              </Field>
            </FormControl>
          </div>
        </div>
        <Field
          name={'taxCode'}
          component={TextField}
          fullWidth
          label={'MST'}
          margin="normal"
        />
        <ConnectedAction />
      </div>
    </div>
  </Dialog>
);

export default compose(
  connect(
    state => ({
      initialValues: {
        ...getStoreDataWithoutRedInvoice(state),
        companyName: getRedInvoceInfoByKeyItemSelector('name')(state),
        companyAddress: getRedInvoceInfoByKeyItemSelector('address')(state),
        companyCity: getRedInvoceInfoByKeyItemSelector('city')(state),
        companyDistrict: getRedInvoceInfoByKeyItemSelector('district')(state),
        taxCode: getRedInvoceInfoByKeyItemSelector('taxCode')(state),
      },
      isOpen: isOpenDialogSelector(state),
      origin: flow(
        getFormInitialValues('updateStore'),
        path('logoUrl'),
      )(state),
      image: flow(
        getFormValues('updateStore'),
        path('logoUrl'),
      )(state),
    }),
    { onClose: closeDialogAC, changeUrl: change },
  ),
  branch(({ isOpen }) => !isOpen, renderNothing),
  reduxForm({
    form: 'updateStore',
  }),
)(Layout);

const ActionComponent = ({ save, cancel }) => (
  <div>
    <Button
      onClick={save}
      style={{ background: 'green', width: '100%' }}
      variant={'contained'}
    >
      Save
    </Button>
    <Button onClick={cancel} style={{ width: '100%' }}>
      Cancel
    </Button>
  </div>
);

export const ConnectedAction = compose(
  connect(
    state => ({
      isFetching: isUpdatingStoreSelector(state),
    }),
    { save: updateStoreAC, cancel: closeDialogAC },
  ),
  branch(
    ({ isFetching }) => isFetching,
    renderComponent(() => (
      <div align="center">
        <CircularProgress size={40} thickness={7} />
      </div>
    )),
  ),
)(ActionComponent);
