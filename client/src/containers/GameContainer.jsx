import React, { Component } from 'react';
// import connect
import { connect } from 'react-redux';
// import bindActionCreators
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { Modal, GameListManager } from '../components';
// import all actions
import * as gameActionCreators from '../actions/games';

class GameContainer extends React.Component {

  constructor(props) {
    super(props);

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

  render () {
    const { games, searchBar, selectedGame } = this.props
    return (
      <div>
        <Modal game={selectedGame} />
        <GameListManager
          games={games}
          searchBar={searchBar}
          setSearchBar={this.setSearchBar}
          toggleModal={this.toggleModal}
          deleteGame={this.deleteGame}
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
    selectedGame: state.getIn(['games', 'selectedGame'],Immutable.List()).toJS()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gamesActions: bindActionCreators(gameActionCreators, dispatch)
  }
}

// export the connected GameContainer
export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
