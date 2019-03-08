import React from 'react';
import { makeFetchAction } from 'redux-api-call';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import encode from 'form-urlencoded';
import { CircularProgress } from '@material-ui/core';

const Layout = ({ image, upload, notify, isFetching, reset }) => {
  return (
    <div>
      <div>
        {isFetching ? (
          <CircularProgress size={40} thickness={7} />
        ) : (
          <div>
            <img
              src={image}
              alt={'logoUrl'}
              style={{
                width: 250,
                border: '1px solid black',
                backgroundSize: 'cover',
              }}
            />
          </div>
        )}
      </div>
      <input
        style={{ display: 'none' }}
        accept="image/*"
        multiple={false}
        id="contained-button-file"
        type="file"
        onChange={e => {
          if (e.target.files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
              upload(reader.result, notify);
            };
            reader.onerror = error => {
              console.log('Error: ', error);
            };
          }
        }}
      />
      <label htmlFor="contained-button-file">
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }} />
          <Button onClick={reset}>Remove</Button>
          <Button variant="contained" component="span">
            Upload Image
          </Button>
        </div>
      </label>
    </div>
  );
};

const upLoadFileFA = makeFetchAction('updateLoadImage', (file, transform) => ({
  endpoint: 'https://api.cloudinary.com/v1_1/hocba/image/upload',
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: state =>
    encode({
      file,
      upload_preset: 'profilePic',
    }),
  transforms: {
    fn: transform,
  },
}));

export default compose(
  connect(
    state => ({
      isFetching: upLoadFileFA.isFetchingSelector(state),
    }),
    { upload: upLoadFileFA.actionCreator },
  ),
)(Layout);
