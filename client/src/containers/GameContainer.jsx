import React, { Component } from 'react';
// import connect
import { connect } from 'react-redux';
// import bindActionCreators
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { Modal, GameListManager } from '../components';
// import all actions
import * as gameActionCreators from '../actions/games';
import * as authActionCreators from '../actions/auth';
import { toastr } from 'react-redux-toastr';

class GameContainer extends Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.setSearchBar = this.setSearchBar.bind(this);
    this.deleteGame = this.deleteGame.bind(this);
  }

  // Once the component is loaded we need to get the data from server
  componentDidMount() {
    this.getGames();
  }

  getGames() {
    this.props.gamesActions.getGames();
  }

  toggleModal(index) {
    this.props.gamesActions.showSelectedGame(this.props.games[index]);
    $('#game-modal').modal();
  }

  setSearchBar(event) {
    this.props.gamesActions.setSearchBar(event.target.value.toLowerCase());
  }

  deleteGame(id) {
    this.props.gamesActions.deleteGame(id);
  }

  logout() {
    this.props.authActions.logoutUser();
    toastr.success('Retrogames archive', 'Your are now logged out');
    localStorage.removeItem('token');
  }

  render () {
    const { games, searchBar, selectedGame, userName, authActions } = this.props
    return (
      <div>
        <Modal game={selectedGame} />
        <GameListManager
          games={games}
          searchBar={searchBar}
          setSearchBar={this.setSearchBar}
          toggleModal={this.toggleModal}
          deleteGame={this.deleteGame}
          userName={userName}
          logout={this.logout}
        />
      </div>
    );
  }
}

// we can read values from the state through mapStateToProps
const mapStateToProps = (state) => {
  return {
    games: state.getIn(['games', 'list'], Immutable.List()).toJS(),
    searchBar: state.getIn(['games', 'searchBar'], ''),
    selectedGame: state.getIn(['games', 'selectedGame'],Immutable.List()).toJS(),
    userName: state.getIn(['auth', 'name'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gamesActions: bindActionCreators(gameActionCreators, dispatch),
    authActions: bindActionCreators(authActionCreators, dispatch)
  }
}

// export the connected GameContainer
export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
