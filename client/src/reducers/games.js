import Immutable from 'immutable';
import {
  GET_GAMES_SUCCESS,
  GET_GAMES_FAILURE,
  SET_SEARCH_BAR,
  SHOW_SELECTED_GAME,
  DELETE_GAME_SUCCESS,
  DELETE_GAME_FAILURE
} from '../constants/games';

// Initial state is just an empty map
const initialState = Immutable.Map();

export default (state = initialState , action) => {
  switch (action.type) {

    case GET_GAMES_SUCCESS:
      return state.merge({
        list: action.games
      });

    case GET_GAMES_FAILURE:
      return state.clear();

    case SET_SEARCH_BAR:
      return state.merge({
        searchBar: action.keyword
      });

    case SHOW_SELECTED_GAME:
      return state.merge({
        selectedGame: action.game
      });

    case DELETE_GAME_SUCCESS:
      return state.merge({
        list: action.games
      });

    case DELETE_GAME_FAILURE:
      return state.clear();

    default:
      return state;
  }
}
