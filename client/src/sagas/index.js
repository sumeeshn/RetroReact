// Import the watcher we have just created
import {
  watchGetGames,
  watchDeleteGame,
  watchPostGame
} from './games';
import {watchUploadPicture} from './filestack';

export default function* rootSaga() {
  // we start all the sagas in parallel
  yield [
    watchGetGames(),
    watchDeleteGame(),
    watchPostGame(),
    watchUploadPicture()
  ];
}
