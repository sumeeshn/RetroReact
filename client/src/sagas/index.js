// Import the watcher we have just created
import {
  watchGetGames,
  watchDeleteGame,
  watchPostGame
} from './games';
import {watchUploadPicture} from './filestack';
import {watchLoginUser, watchSignupUser} from './auth';

export default function* rootSaga() {
  // we start all the sagas in parallel
  yield [
    watchGetGames(),
    watchDeleteGame(),
    watchPostGame(),
    watchUploadPicture(),
    watchLoginUser(),
    watchSignupUser()
  ];
}
