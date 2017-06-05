// import a saga helper -- takeLatest -- which helps to cancel the previous request and process the latest request
import {
  takeLatest
} from 'redux-saga';
// saga effects are useful to interact with the saga middleware
import {
  put,
  select,
  call
} from 'redux-saga/effects';
// saga will take care of GET_GAMES actions
import {
  GET_GAMES,
  DELETE_GAME,
  POST_GAME
} from '../constants/games';
// either one is yielded once the fetch is done
import {
  getGamesSuccess,
  getGamesFailure,
  deleteGameSuccess,
  deleteGameFailure,
  postGameSuccess,
  postGameFailure
} from '../actions/games';

const selectedGames = (state) => {
  return state.getIn(['games', 'list']).toJS();
}

const selectedPicture = (state) => {
  return state.getIn(['filestack', 'url'], '');
}

const deleteServerGame = (id) => {
  return fetch(`http://localhost:3000/games/${id}`, {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    method: 'DELETE',
  })
  .then(response => response.json());
}

const fetchGames = () => {
  return fetch("http://localhost:3000/games", {
    headers: new Headers({
      'Content-Type': 'applicaiton/json'
    })
  })
  .then(response => response.json());
}

const postServerGame = (game) => {
  return fetch('http://localhost:3000/games', {
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    method: 'POST',
    body: JSON.stringify(game)
  })
  .then(response => response.json());
}

const getGameForm = (state) => {
  return state.getIn(['form', 'game']).toJS();
}

// yield call to fetchGames
function* getGames() {
  try {
    const games = yield call(fetchGames);
    yield put(getGamesSuccess(games));
  } catch(err) {
    yield put(getGamesFailure(err));
  }
}

function* deleteGame (action) {
  const { id } = action;
  // We take the games from the state
  const games = yield select(selectedGames);
  try {
    yield call(deleteServerGame, id);
    // The new state will contain the games except for the deleted one.
    yield put(deleteGameSuccess(games.filter(game => game._id !== id)));
  } catch (e) {
    // In case of error
    yield put(deleteGameFailure());
  }
}

function* postGame() {
  const picture = yield select(selectedPicture);
  const game = yield select(getGameForm);
  // adding picture url to game
  const newGame = Object.assign({}, game.values, { picture });
  try {
    yield call(postServerGame, newGame);
    yield put(postGameSuccess());
  } catch(err) {
    yield put(postGameFailure());
  }
}

// The watcher saga waits for dispatched GET_GAMES actions
function* watchGetGames() {
  yield takeLatest(GET_GAMES, getGames);
}

function* watchDeleteGame() {
  yield takeLatest(DELETE_GAME, deleteGame);
}

function* watchPostGame() {
  yield takeLatest(POST_GAME, postGame);
}

// Export the watcher to be run in parallel in sagas/index.js
export {
    watchGetGames,
    watchDeleteGame,
    watchPostGame
};
