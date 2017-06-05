import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { UPLOAD_PICTURE } from '../constants/filestack';
import {
  uploadPictureSuccess,
  uploadPictureFailure
} from '../actions/filestack';

const pick = () => {
  console.log("in pick");
   return new Promise((resolve, reject) => {
    filepicker.pick (
      {
      // The options are the same as in part1
        mimetype: 'image/*',
        container: 'modal',
        services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'URL', 'IMGUR', 'PICASA'],
        openTo: 'COMPUTER'
      },
      function (Blob) {
        const handler = Blob.url;
        console.log(handler);
        resolve(handler); // The promise resolves
      },
      function (FPError) {
        console.log(FPError.toString());
        reject(FPError.toString()); // the promise rejects
      }
    );
  });
}

function* uploadPicture () {
  try {
    const url = yield call(pick);
    yield put(uploadPictureSuccess(url));
  } catch (error) {
    yield put(uploadPictureFailure());
  }
}

export function* watchUploadPicture () {
  yield takeLatest(UPLOAD_PICTURE, uploadPicture);
}
