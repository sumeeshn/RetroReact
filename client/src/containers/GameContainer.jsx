import React, { Component } from 'react';
import { Modal, GameListManager } from '../components';

class GameContainer extends React.Component {

  constructor(props) {
    super(props);
    // initial state
    this.state = {
      games: [],
      selectedGame: {},
      searchBar: ''
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.setSearchBar = this.setSearchBar.bind(this);
    this.deleteGame = this.deleteGame.bind(this);
  }

  // Once the component is loaded we need to get the data from server
  componentDidMount() {
    this.getGames();
  }

  getGames() {
    fetch('http://localhost:3000/games', {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .then(data => this.setState({ games: data }));
  }

  toggleModal(index) {
    this.setState({
      selectedGame: this.state.games[index]
    });
    // TODO:look into this
    $('#game-modal').modal();
  }

  setSearchBar(event) {
    this.setState({
      searchBar: event.target.value.toLowerCase()
    });
  }

  deleteGame(id) {
    fetch('http://localhost:3000/games/' + id, {
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(response => {
      // The game is also removed from the state thanks to the filter function
      this.setState({ games: this.state.games.filter(game => game._id !== id) });
      console.log(response.message);
    });
  }

  render () {
    const { games, selectedGame, searchBar } = this.state;
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

export default GameContainer;
